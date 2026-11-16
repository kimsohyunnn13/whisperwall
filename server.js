import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { DatabaseSync } from 'node:sqlite';
import crypto from 'node:crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Pastikan direktori data ada
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, 'papan.db');
const db = new DatabaseSync(dbPath);

// Inisialisasi Tabel SQLite
db.exec(`
  CREATE TABLE IF NOT EXISTS notes (
    id TEXT PRIMARY KEY,
    content TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'random',
    color TEXT NOT NULL DEFAULT '#fef08a',
    font_style TEXT NOT NULL DEFAULT 'handwriting',
    duration_hours REAL NOT NULL DEFAULT 24,
    created_at INTEGER NOT NULL,
    expires_at INTEGER NOT NULL,
    reactions TEXT NOT NULL DEFAULT '{}',
    is_pinned INTEGER NOT NULL DEFAULT 0
  );
  CREATE INDEX IF NOT EXISTS idx_expires_at ON notes(expires_at);
  CREATE INDEX IF NOT EXISTS idx_created_at ON notes(created_at);

  CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS admin_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    action TEXT NOT NULL,
    details TEXT,
    created_at INTEGER NOT NULL
  );

  CREATE TABLE IF NOT EXISTS note_reports (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    note_id TEXT NOT NULL,
    reason TEXT,
    created_at INTEGER NOT NULL,
    ip_hash TEXT
  );
  CREATE INDEX IF NOT EXISTS idx_reports_note_id ON note_reports(note_id);

  CREATE TABLE IF NOT EXISTS word_blacklist (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    word TEXT NOT NULL UNIQUE,
    created_at INTEGER NOT NULL
  );
`);

// Migration jika kolom is_pinned belum ada di database lama
try {
  db.exec(`ALTER TABLE notes ADD COLUMN is_pinned INTEGER NOT NULL DEFAULT 0`);
} catch (e) {
  // Kolom sudah ada
}

// Inisialisasi PIN admin default jika belum diset
const pinRow = db.prepare('SELECT value FROM settings WHERE key = ?').get('admin_pin');
if (!pinRow) {
  db.prepare('INSERT INTO settings (key, value) VALUES (?, ?)').run('admin_pin', 'admin123');
}

// Inisialisasi Counter total pesan musnah
const purgedCountRow = db.prepare('SELECT value FROM settings WHERE key = ?').get('total_purged');
if (!purgedCountRow) {
  db.prepare('INSERT INTO settings (key, value) VALUES (?, ?)').run('total_purged', '0');
}

// Helper Setting Key-Value
function getSetting(key, defaultValue) {
  try {
    const row = db.prepare('SELECT value FROM settings WHERE key = ?').get(key);
    return row ? row.value : defaultValue;
  } catch (e) {
    return defaultValue;
  }
}

function setSetting(key, value) {
  db.prepare('INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)').run(key, String(value));
}

// Inisialisasi pengaturan bawaan papan jika belum ada
if (!db.prepare('SELECT value FROM settings WHERE key = ?').get('max_char_limit')) {
  setSetting('max_char_limit', '400');
}
if (!db.prepare('SELECT value FROM settings WHERE key = ?').get('spam_cooldown_seconds')) {
  setSetting('spam_cooldown_seconds', '60');
}
if (!db.prepare('SELECT value FROM settings WHERE key = ?').get('board_frozen')) {
  setSetting('board_frozen', '0');
}

// Helper Ambil IP Klien yang Bersih & Akurat
function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded) {
    const firstIp = forwarded.split(',')[0].trim();
    if (firstIp) return firstIp;
  }
  return req.socket.remoteAddress || '127.0.0.1';
}

// Anti-Spam Rate Limiting (In-Memory IP Tracker)
const ipLastPostTimes = new Map();
setInterval(() => {
  const now = Date.now();
  for (const [ip, time] of ipLastPostTimes.entries()) {
    if (now - time > 3600 * 1000) {
      ipLastPostTimes.delete(ip);
    }
  }
}, 10 * 60 * 1000);

// Proteksi Brute-Force Login Admin
const ADMIN_MAX_LOGIN_ATTEMPTS = 5;
const ADMIN_LOCKOUT_MS = 15 * 60 * 1000; // 15 Menit
const adminLoginAttempts = new Map(); // IP -> { count, lockedUntil, lastAttempt }

setInterval(() => {
  const now = Date.now();
  for (const [ip, info] of adminLoginAttempts.entries()) {
    if (info.lockedUntil && now > info.lockedUntil) {
      adminLoginAttempts.delete(ip);
    } else if (now - info.lastAttempt > ADMIN_LOCKOUT_MS * 2) {
      adminLoginAttempts.delete(ip);
    }
  }
}, 15 * 60 * 1000);

// Fungsi pembersih pesan kadaluarsa
function purgeExpiredNotes() {
  const now = Date.now();
  // Hanya hapus pesan yang bukan pinned pengumuman
  const countExpired = db.prepare('SELECT COUNT(*) as count FROM notes WHERE expires_at <= ? AND is_pinned = 0').get(now);
  if (countExpired.count > 0) {
    const stmt = db.prepare('DELETE FROM notes WHERE expires_at <= ? AND is_pinned = 0');
    stmt.run(now);
    try {
      db.prepare('DELETE FROM note_reports WHERE note_id NOT IN (SELECT id FROM notes)').run();
    } catch (e) {}
    
    // Update counter pesan musnah
    const curr = parseInt(db.prepare('SELECT value FROM settings WHERE key = ?').get('total_purged')?.value || '0', 10);
    db.prepare('UPDATE settings SET value = ? WHERE key = ?').run((curr + countExpired.count).toString(), 'total_purged');

    console.log(`[Auto-Purge] ${countExpired.count} pesan kadaluarsa telah dihapus dari papan.`);
  }
}

// Jalankan pembersihan setiap 30 detik
setInterval(purgeExpiredNotes, 30 * 1000);

// Seed data awal jika papan masih kosong (hanya dijalankan sekali saat setup pertama)
function seedInitialNotesIfEmpty() {
  const seededRow = db.prepare('SELECT value FROM settings WHERE key = ?').get('notes_seeded');
  if (seededRow) return; // Sudah pernah di-seed, jangan masukkan lagi meskipun papan sengaja dikosongkan

  const countRow = db.prepare('SELECT COUNT(*) as count FROM notes').get();
  if (countRow.count === 0) {
    const now = Date.now();
    const initialNotes = [
      {
        id: crypto.randomUUID(),
        content: "Kadang capek banget pura-pura kuat di depan semua orang, padahal malam-malam nangis sendiri di kamar sambil mikirin masa depan.",
        category: "curhat",
        color: "#fbcfe8",
        font_style: "handwriting",
        duration_hours: 24,
        created_at: now - (4 * 3600 * 1000),
        expires_at: now + (20 * 3600 * 1000),
        reactions: JSON.stringify({ hug: 14, love: 9, sad: 7 }),
        is_pinned: 0
      },
      {
        id: crypto.randomUUID(),
        content: "Kepada siapapun yang lagi baca ini: Tarik napas dalam-dalam. Kamu sudah berjuang sejauh ini, istirahat sebentar nggak bikin kamu gagal kok ✨",
        category: "motivasi",
        color: "#fef08a",
        font_style: "serif",
        duration_hours: 24,
        created_at: now - (2 * 3600 * 1000),
        expires_at: now + (22 * 3600 * 1000),
        reactions: JSON.stringify({ love: 28, hug: 19, fire: 11 }),
        is_pinned: 0
      },
      {
        id: crypto.randomUUID(),
        content: "Aku keterima di perusahaan impian setelah 8 bulan nganggur dan 120+ lamaran ditolak! Jangan pernah putus asa ya kawan-kawan seperjuangan!",
        category: "karir",
        color: "#bbf7d0",
        font_style: "modern",
        duration_hours: 12,
        created_at: now - (1 * 3600 * 1000),
        expires_at: now + (11 * 3600 * 1000),
        reactions: JSON.stringify({ fire: 35, love: 22 }),
        is_pinned: 0
      },
      {
        id: crypto.randomUUID(),
        content: "Diam-diam masih sering stalking akun media sosial dia, padahal dia udah bahagia sama yang lain. Kapan ya hati ini bisa benar-benar ikhlas?",
        category: "asmara",
        color: "#bae6fd",
        font_style: "handwriting",
        duration_hours: 12,
        created_at: now - (7 * 3600 * 1000),
        expires_at: now + (5 * 3600 * 1000),
        reactions: JSON.stringify({ sad: 18, hug: 25 }),
        is_pinned: 0
      },
      {
        id: crypto.randomUUID(),
        content: "Pesan ini akan hilang beberapa jam lagi, sama seperti rasa sesak yang sedang kamu rasakan saat ini. Semuanya cuma sementara.",
        category: "filosofis",
        color: "#e9d5ff",
        font_style: "monospace",
        duration_hours: 12,
        created_at: now - (10 * 3600 * 1000),
        expires_at: now + (2 * 3600 * 1000),
        reactions: JSON.stringify({ chill: 16, love: 12 }),
        is_pinned: 0
      },
      {
        id: crypto.randomUUID(),
        content: "Pengen banget makan mie instan kuah pedas pake telur setengah matang jam 2 pagi tanpa mikirin kolesterol dan berat badan 🍜",
        category: "random",
        color: "#fed7aa",
        font_style: "modern",
        duration_hours: 24,
        created_at: now - (5 * 3600 * 1000),
        expires_at: now + (19 * 3600 * 1000),
        reactions: JSON.stringify({ fire: 15, chill: 21 }),
        is_pinned: 0
      }
    ];

    const insert = db.prepare(`
      INSERT INTO notes (id, content, category, color, font_style, duration_hours, created_at, expires_at, reactions, is_pinned)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    for (const note of initialNotes) {
      insert.run(
        note.id,
        note.content,
        note.category,
        note.color,
        note.font_style,
        note.duration_hours,
        note.created_at,
        note.expires_at,
        note.reactions,
        note.is_pinned
      );
    }
    console.log('[Seed] Data contoh awal berhasil dimasukkan.');
  }
  db.prepare('INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)').run('notes_seeded', '1');
}
seedInitialNotesIfEmpty();

// Seed data filter kata terlarang jika belum pernah diinisialisasi
function seedBlacklistIfEmpty() {
  try {
    const seededRow = db.prepare('SELECT value FROM settings WHERE key = ?').get('blacklist_seeded');
    if (seededRow) return; // Sudah pernah di-seed sebelumnya, jangan kembalikan kata jika admin sudah menghapusnya

    const countRow = db.prepare('SELECT COUNT(*) as count FROM word_blacklist').get();
    if (countRow.count === 0) {
      const defaultWords = ['kasar', 'anjing', 'bodoh', 'tolol', 'penipu', 'scam', 'spam'];
      const insert = db.prepare('INSERT OR IGNORE INTO word_blacklist (word, created_at) VALUES (?, ?)');
      const now = Date.now();
      for (const w of defaultWords) {
        insert.run(w, now);
      }
      console.log('[Seed] Kata terlarang awal berhasil diinisialisasi.');
    }
    // Tandai bahwa proses seeding awal sudah selesai
    db.prepare('INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)').run('blacklist_seeded', '1');
  } catch (e) {
    console.error('Error saat seed blacklist:', e);
  }
}
seedBlacklistIfEmpty();

// MIME Types untuk Static Files
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

// Helper JSON response
function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'SAMEORIGIN',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin'
  });
  res.end(JSON.stringify(data));
}

// Verifikasi Auth Admin
function isAuthorizedAdmin(req) {
  const authHeader = req.headers['authorization'] || '';
  const token = authHeader.replace(/^Bearer\s+/i, '').trim();
  const pinRow = db.prepare('SELECT value FROM settings WHERE key = ?').get('admin_pin');
  const validPin = pinRow ? pinRow.value : 'admin123';
  return token === validPin;
}

// Server Utama
const server = http.createServer(async (req, res) => {
  // Pasang HTTP Security Headers untuk setiap respons (API & File Statis)
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
  res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: blob:; media-src 'self' data: blob:; connect-src 'self';");

  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = parsedUrl.pathname;

  // Handle CORS Preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });
    res.end();
    return;
  }

  // --- API PUBLIK ---

  // 1. GET /api/notes
  if (req.method === 'GET' && pathname === '/api/notes') {
    purgeExpiredNotes();
    const now = Date.now();
    const category = parsedUrl.searchParams.get('category');
    const sort = parsedUrl.searchParams.get('sort') || 'newest';
    const search = parsedUrl.searchParams.get('q') || '';

    // Ambil pesan yang belum kadaluarsa ATAU pesan pinned admin
    let query = 'SELECT * FROM notes WHERE (expires_at > ? OR is_pinned = 1)';
    const params = [now];

    if (category && category !== 'all') {
      query += ' AND category = ?';
      params.push(category);
    }

    if (search.trim()) {
      query += ' AND content LIKE ?';
      params.push(`%${search.trim()}%`);
    }

    // Pinned notes selalu berada di paling atas
    let orderBy = 'is_pinned DESC, ';
    if (sort === 'expiring_soon') {
      orderBy += 'expires_at ASC';
    } else if (sort === 'oldest') {
      orderBy += 'created_at ASC';
    } else {
      orderBy += 'created_at DESC';
    }
    query += ` ORDER BY ${orderBy}`;

    const rows = db.prepare(query).all(...params);
    const parsedNotes = rows.map(r => ({
      ...r,
      reactions: JSON.parse(r.reactions || '{}')
    }));

    if (sort === 'popular') {
      parsedNotes.sort((a, b) => {
        if (a.is_pinned !== b.is_pinned) return b.is_pinned - a.is_pinned;
        const totalA = Object.values(a.reactions).reduce((acc, v) => acc + (Number(v) || 0), 0);
        const totalB = Object.values(b.reactions).reduce((acc, v) => acc + (Number(v) || 0), 0);
        return totalB - totalA;
      });
    }

    sendJson(res, 200, {
      success: true,
      serverTime: now,
      total: parsedNotes.length,
      notes: parsedNotes,
      config: {
        boardFrozen: getSetting('board_frozen', '0') === '1',
        maxCharLimit: parseInt(getSetting('max_char_limit', '400'), 10),
        spamCooldownSeconds: parseInt(getSetting('spam_cooldown_seconds', '60'), 10)
      }
    });
    return;
  }

  // 2. POST /api/notes (Buat Catatan Anonim Baru)
  if (req.method === 'POST' && pathname === '/api/notes') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        // Cek apakah papan sedang dibekukan oleh admin
        if (getSetting('board_frozen', '0') === '1') {
          sendJson(res, 403, { 
            success: false, 
            message: 'Papan saat ini sedang dibekukan oleh admin. Tidak dapat menempel pesan baru sementara waktu.' 
          });
          return;
        }

        const data = JSON.parse(body || '{}');
        const content = (data.content || '').trim();
        const category = data.category || 'random';
        const color = data.color || '#fef08a';
        const fontStyle = data.fontStyle || 'handwriting';
        let durationHours = parseFloat(data.durationHours) || 24;
        if (durationHours < 0.01) durationHours = 0.01;
        if (durationHours > 48) durationHours = 24;

        if (!content) {
          sendJson(res, 400, { success: false, message: 'Isi curhatan tidak boleh kosong.' });
          return;
        }

        // Cek Batas Maksimal Karakter Dinamis
        const maxCharLimit = parseInt(getSetting('max_char_limit', '400'), 10);
        if (content.length > maxCharLimit) {
          sendJson(res, 400, { 
            success: false, 
            message: `Isi pesan melebihi batas maksimal (${maxCharLimit} karakter). Panjang saat ini: ${content.length} karakter.` 
          });
          return;
        }

        // Cek Fitur Anti-Spam (Jeda Waktu per Pengunjung)
        const clientIp = getClientIp(req);
        const ipHash = crypto.createHash('md5').update(clientIp).digest('hex');
        const cooldownSec = parseInt(getSetting('spam_cooldown_seconds', '60'), 10);
        if (cooldownSec > 0) {
          const lastTime = ipLastPostTimes.get(ipHash) || 0;
          const elapsedSec = Math.floor((Date.now() - lastTime) / 1000);
          if (elapsedSec < cooldownSec) {
            const waitSec = cooldownSec - elapsedSec;
            sendJson(res, 429, { 
              success: false, 
              code: 'ANTI_SPAM',
              waitSec: waitSec,
              message: `Fitur Anti-Spam aktif. Harap tunggu ${waitSec} detik lagi sebelum menempel pesan berikutnya.` 
            });
            return;
          }
        }

        // Filter kata terlarang
        const blacklistWords = db.prepare('SELECT word FROM word_blacklist').all();
        const lowerContent = content.toLowerCase();
        for (const row of blacklistWords) {
          if (lowerContent.includes(row.word.toLowerCase())) {
            sendJson(res, 400, { success: false, message: 'Pesan Anda mengandung kata yang tidak diperbolehkan.' });
            return;
          }
        }

        const now = Date.now();
        const expiresAt = Math.round(now + (durationHours * 3600 * 1000));
        const id = crypto.randomUUID();

        const insert = db.prepare(`
          INSERT INTO notes (id, content, category, color, font_style, duration_hours, created_at, expires_at, reactions, is_pinned)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 0)
        `);

        insert.run(id, content, category, color, fontStyle, durationHours, now, expiresAt, '{}');

        // Catat waktu tempel pesan untuk rate limiting anti-spam
        if (cooldownSec > 0) {
          ipLastPostTimes.set(ipHash, now);
        }

        sendJson(res, 201, {
          success: true,
          message: 'Pesan berhasil ditempelkan di papan!',
          note: {
            id,
            content,
            category,
            color,
            font_style: fontStyle,
            duration_hours: durationHours,
            created_at: now,
            expires_at: expiresAt,
            reactions: {},
            is_pinned: 0
          }
        });
      } catch (err) {
        sendJson(res, 400, { success: false, message: 'Format data tidak valid.' });
      }
    });
    return;
  }

  // 3. POST /api/notes/:id/react (Beri Reaksi Emoticon - Maksimal 1 Reaksi per Pengguna per Kartu)
  if (req.method === 'POST' && pathname.startsWith('/api/notes/') && pathname.endsWith('/react')) {
    const parts = pathname.split('/');
    const noteId = parts[3];

    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const data = JSON.parse(body || '{}');
        const reactionType = data.type; // null jika membatalkan reaksi
        const previousType = data.previousType; // tipe reaksi sebelumnya jika berpindah/batal
        const validTypes = ['love', 'hug', 'sad', 'fire', 'chill'];

        if (reactionType !== null && !validTypes.includes(reactionType)) {
          sendJson(res, 400, { success: false, message: 'Tipe reaksi tidak didukung.' });
          return;
        }

        const note = db.prepare('SELECT reactions FROM notes WHERE id = ?').get(noteId);
        if (!note) {
          sendJson(res, 404, { success: false, message: 'Catatan tidak ditemukan atau sudah lenyap.' });
          return;
        }

        const reactions = JSON.parse(note.reactions || '{}');

        // Kurangi hitungan reaksi lama jika pengguna sebelumnya sudah berekspresi
        if (previousType && validTypes.includes(previousType)) {
          reactions[previousType] = Math.max(0, (Number(reactions[previousType]) || 0) - 1);
        }

        // Tambah hitungan reaksi baru jika ada
        if (reactionType && validTypes.includes(reactionType)) {
          reactions[reactionType] = (Number(reactions[reactionType]) || 0) + 1;
        }

        db.prepare('UPDATE notes SET reactions = ? WHERE id = ?').run(JSON.stringify(reactions), noteId);

        sendJson(res, 200, {
          success: true,
          reactions,
          activeReaction: reactionType
        });
      } catch (err) {
        sendJson(res, 400, { success: false, message: 'Permintaan tidak valid.' });
      }
    });
    return;
  }

  // 3b. POST /api/notes/:id/report (Laporkan Pesan Tertentu oleh Pengunjung)
  if (req.method === 'POST' && pathname.startsWith('/api/notes/') && pathname.endsWith('/report')) {
    const parts = pathname.split('/');
    const noteId = parts[3];

    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const data = JSON.parse(body || '{}');
        const reason = (data.reason || '').trim().substring(0, 200);

        const note = db.prepare('SELECT id FROM notes WHERE id = ?').get(noteId);
        if (!note) {
          sendJson(res, 404, { success: false, message: 'Catatan tidak ditemukan atau sudah lenyap.' });
          return;
        }

        const clientIp = getClientIp(req);
        const ipHash = crypto.createHash('md5').update(clientIp).digest('hex');

        const existingReport = db.prepare('SELECT id FROM note_reports WHERE note_id = ? AND ip_hash = ?').get(noteId, ipHash);
        if (existingReport) {
          sendJson(res, 200, { success: true, message: 'Anda sudah pernah melaporkan pesan ini sebelumnya.' });
          return;
        }

        db.prepare('INSERT INTO note_reports (note_id, reason, created_at, ip_hash) VALUES (?, ?, ?, ?)').run(
          noteId,
          reason || 'Konten tidak pantas / spam',
          Date.now(),
          ipHash
        );

        sendJson(res, 201, {
          success: true,
          message: 'Pesan berhasil dilaporkan ke admin.'
        });
      } catch (err) {
        sendJson(res, 400, { success: false, message: 'Gagal memproses laporan.' });
      }
    });
    return;
  }

  // 4. GET /api/stats (Statistik Publik Papan)
  if (req.method === 'GET' && pathname === '/api/stats') {
    purgeExpiredNotes();
    const now = Date.now();
    const activeCount = db.prepare('SELECT COUNT(*) as count FROM notes WHERE expires_at > ? OR is_pinned = 1').get(now);
    const nextExpiring = db.prepare('SELECT expires_at FROM notes WHERE expires_at > ? AND is_pinned = 0 ORDER BY expires_at ASC LIMIT 1').get(now);

    sendJson(res, 200, {
      success: true,
      activeNotes: activeCount.count,
      serverTime: now,
      nextExpiringAt: nextExpiring ? nextExpiring.expires_at : null,
      boardFrozen: getSetting('board_frozen', '0') === '1',
      maxCharLimit: parseInt(getSetting('max_char_limit', '400'), 10),
      spamCooldownSeconds: parseInt(getSetting('spam_cooldown_seconds', '60'), 10)
    });
    return;
  }

  // --- API ADMIN ---

  // 5. POST /api/admin/login (Login Admin dengan PIN & Proteksi Brute-Force)
  if (req.method === 'POST' && pathname === '/api/admin/login') {
    const clientIp = getClientIp(req);
    const now = Date.now();
    const attemptInfo = adminLoginAttempts.get(clientIp) || { count: 0, lockedUntil: 0, lastAttempt: now };

    // Cek apakah IP sedang diblokir karena brute-force
    if (attemptInfo.lockedUntil && now < attemptInfo.lockedUntil) {
      const remainingMs = attemptInfo.lockedUntil - now;
      const remainingMins = Math.ceil(remainingMs / (60 * 1000));
      sendJson(res, 429, {
        success: false,
        message: `⛔ Akses login admin dikunci sementara karena 5x percobaan salah. Silakan coba lagi dalam ${remainingMins} menit.`
      });
      return;
    }

    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const data = JSON.parse(body || '{}');
        const inputPin = (data.pin || '').trim();
        const pinRow = db.prepare('SELECT value FROM settings WHERE key = ?').get('admin_pin');
        const correctPin = pinRow ? pinRow.value : 'admin123';

        if (inputPin === correctPin) {
          // Reset percobaan gagal jika login berhasil
          adminLoginAttempts.delete(clientIp);

          // Catat di riwayat log admin
          db.prepare('INSERT INTO admin_logs (action, details, created_at) VALUES (?, ?, ?)')
            .run('ADMIN_LOGIN_SUCCESS', `Login admin berhasil dari IP: ${clientIp}`, Date.now());

          sendJson(res, 200, {
            success: true,
            message: 'Autentikasi admin berhasil',
            token: correctPin
          });
        } else {
          attemptInfo.count = (attemptInfo.count || 0) + 1;
          attemptInfo.lastAttempt = now;

          if (attemptInfo.count >= ADMIN_MAX_LOGIN_ATTEMPTS) {
            attemptInfo.lockedUntil = now + ADMIN_LOCKOUT_MS;
            adminLoginAttempts.set(clientIp, attemptInfo);

            // Catat di log admin bahwa ada upaya pembobolan
            db.prepare('INSERT INTO admin_logs (action, details, created_at) VALUES (?, ?, ?)')
              .run('ADMIN_LOGIN_LOCKED', `Akses login dikunci selama 15 menit untuk IP ${clientIp} (5x percobaan salah)`, Date.now());

            sendJson(res, 429, {
              success: false,
              message: `⛔ Anda telah salah memasukkan PIN sebanyak 5 kali. Akses login admin dikunci selama 15 menit demi keamanan.`
            });
          } else {
            adminLoginAttempts.set(clientIp, attemptInfo);
            const remainingTries = ADMIN_MAX_LOGIN_ATTEMPTS - attemptInfo.count;
            sendJson(res, 401, {
              success: false,
              message: `PIN Admin salah. Sisa percobaan: ${remainingTries} kali sebelum akses dikunci.`
            });
          }
        }
      } catch (err) {
        sendJson(res, 400, { success: false, message: 'Format data tidak valid.' });
      }
    });
    return;
  }

  // 6. GET /api/admin/stats (Statistik Lengkap Admin)
  if (req.method === 'GET' && pathname === '/api/admin/stats') {
    if (!isAuthorizedAdmin(req)) {
      sendJson(res, 401, { success: false, message: 'Akses ditolak: Token admin tidak valid.' });
      return;
    }

    purgeExpiredNotes();
    const now = Date.now();
    const activeCount = db.prepare('SELECT COUNT(*) as count FROM notes WHERE expires_at > ? OR is_pinned = 1').get(now);
    const pinnedCount = db.prepare('SELECT COUNT(*) as count FROM notes WHERE is_pinned = 1').get();
    const purgedRow = db.prepare('SELECT value FROM settings WHERE key = ?').get('total_purged');
    const totalPurged = parseInt(purgedRow ? purgedRow.value : '0', 10);

    // Kategori breakdown
    const categoryStats = db.prepare(`
      SELECT category, COUNT(*) as count 
      FROM notes 
      WHERE expires_at > ? OR is_pinned = 1 
      GROUP BY category
    `).all(now);

    // Total reaksi yang diberikan
    const allNotes = db.prepare('SELECT reactions FROM notes').all();
    let totalReactions = 0;
    allNotes.forEach(n => {
      const parsed = JSON.parse(n.reactions || '{}');
      totalReactions += Object.values(parsed).reduce((acc, c) => acc + (Number(c) || 0), 0);
    });

    const recentLogs = db.prepare('SELECT * FROM admin_logs ORDER BY created_at DESC LIMIT 10').all();
    const reportedRow = db.prepare('SELECT COUNT(DISTINCT note_id) as count FROM note_reports').get();
    const blacklistRow = db.prepare('SELECT COUNT(*) as count FROM word_blacklist').get();

    sendJson(res, 200, {
      success: true,
      activeNotes: activeCount.count,
      pinnedNotes: pinnedCount.count,
      totalPurged,
      totalReactions,
      reportedCount: reportedRow.count,
      blacklistCount: blacklistRow.count,
      boardFrozen: getSetting('board_frozen', '0') === '1',
      maxCharLimit: parseInt(getSetting('max_char_limit', '400'), 10),
      spamCooldownSeconds: parseInt(getSetting('spam_cooldown_seconds', '60'), 10),
      categories: categoryStats,
      recentLogs
    });
    return;
  }

  // 7. GET /api/admin/notes (Semua Catatan untuk Moderasi)
  if (req.method === 'GET' && pathname === '/api/admin/notes') {
    if (!isAuthorizedAdmin(req)) {
      sendJson(res, 401, { success: false, message: 'Akses ditolak.' });
      return;
    }

    purgeExpiredNotes();
    const now = Date.now();
    const notes = db.prepare('SELECT * FROM notes WHERE expires_at > ? OR is_pinned = 1 ORDER BY is_pinned DESC, created_at DESC').all(now);
    const parsedNotes = notes.map(n => ({
      ...n,
      reactions: JSON.parse(n.reactions || '{}')
    }));

    sendJson(res, 200, {
      success: true,
      notes: parsedNotes
    });
    return;
  }

  // 8. DELETE /api/admin/notes/:id (Hapus Paksa Catatan Tertentu oleh Admin)
  if (req.method === 'DELETE' && pathname.startsWith('/api/admin/notes/')) {
    if (!isAuthorizedAdmin(req)) {
      sendJson(res, 401, { success: false, message: 'Akses ditolak.' });
      return;
    }

    const noteId = pathname.replace('/api/admin/notes/', '').trim();
    
    // Khusus jika DELETE /api/admin/notes/all (Reset Total Papan)
    if (noteId === 'all') {
      const activeCount = db.prepare('SELECT COUNT(*) as count FROM notes').get();
      db.prepare('DELETE FROM notes').run();
      db.prepare('DELETE FROM note_reports').run();

      // Log aksi
      db.prepare('INSERT INTO admin_logs (action, details, created_at) VALUES (?, ?, ?)')
        .run('RESET_ALL', `Mengosongkan papan total (${activeCount.count} pesan dihapus)`, Date.now());

      sendJson(res, 200, {
        success: true,
        message: `Papan berhasil dikosongkan total! ${activeCount.count} pesan dihapus.`
      });
      return;
    }

    // Hapus single note
    const note = db.prepare('SELECT content FROM notes WHERE id = ?').get(noteId);
    if (!note) {
      sendJson(res, 404, { success: false, message: 'Pesan tidak ditemukan.' });
      return;
    }

    db.prepare('DELETE FROM notes WHERE id = ?').run(noteId);
    db.prepare('DELETE FROM note_reports WHERE note_id = ?').run(noteId);

    // Catat ke admin log
    db.prepare('INSERT INTO admin_logs (action, details, created_at) VALUES (?, ?, ?)')
      .run('DELETE_NOTE', `Menghapus pesan: "${note.content.substring(0, 40)}..."`, Date.now());

    sendJson(res, 200, {
      success: true,
      message: 'Pesan berhasil dihapus dari papan oleh admin.'
    });
    return;
  }

  // 9. POST /api/admin/pinned-note (Buat Pengumuman Pinned Resmi)
  if (req.method === 'POST' && pathname === '/api/admin/pinned-note') {
    if (!isAuthorizedAdmin(req)) {
      sendJson(res, 401, { success: false, message: 'Akses ditolak.' });
      return;
    }

    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const data = JSON.parse(body || '{}');
        const content = (data.content || '').trim();
        const color = data.color || '#e9d5ff';
        const fontStyle = data.fontStyle || 'modern';

        if (!content) {
          sendJson(res, 400, { success: false, message: 'Isi pengumuman tidak boleh kosong.' });
          return;
        }

        const now = Date.now();
        // Pinned note diberi masa aktif 7 hari secara default, tapi tidak akan musnah di auto-purge
        const expiresAt = now + (7 * 24 * 3600 * 1000);
        const id = crypto.randomUUID();

        db.prepare(`
          INSERT INTO notes (id, content, category, color, font_style, duration_hours, created_at, expires_at, reactions, is_pinned)
          VALUES (?, ?, 'pengumuman', ?, ?, 168, ?, ?, '{}', 1)
        `).run(id, content, color, fontStyle, now, expiresAt);

        db.prepare('INSERT INTO admin_logs (action, details, created_at) VALUES (?, ?, ?)')
          .run('PIN_NOTE', `Membuat pengumuman resmi: "${content.substring(0, 40)}..."`, now);

        sendJson(res, 201, {
          success: true,
          message: 'Pengumuman resmi berhasil disematkan di bagian atas papan!',
          noteId: id
        });
      } catch (err) {
        sendJson(res, 400, { success: false, message: 'Format data tidak valid.' });
      }
    });
    return;
  }

  // 10. POST /api/admin/change-pin (Ubah PIN Admin)
  if (req.method === 'POST' && pathname === '/api/admin/change-pin') {
    if (!isAuthorizedAdmin(req)) {
      sendJson(res, 401, { success: false, message: 'Akses ditolak.' });
      return;
    }

    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const data = JSON.parse(body || '{}');
        const newPin = (data.newPin || '').trim();

        if (!newPin || newPin.length < 4) {
          sendJson(res, 400, { success: false, message: 'PIN baru minimal 4 karakter.' });
          return;
        }

        db.prepare('UPDATE settings SET value = ? WHERE key = ?').run(newPin, 'admin_pin');
        db.prepare('INSERT INTO admin_logs (action, details, created_at) VALUES (?, ?, ?)')
          .run('CHANGE_PIN', 'PIN Admin berhasil diubah', Date.now());

        adminLoginAttempts.delete(getClientIp(req));

        sendJson(res, 200, {
          success: true,
          message: 'PIN Admin berhasil diperbarui!',
          newToken: newPin
        });
      } catch (err) {
        sendJson(res, 400, { success: false, message: 'Format data tidak valid.' });
      }
    });
    return;
  }

  // 11. GET /api/admin/reports (Daftar Pesan yang Dilaporkan Pengunjung)
  if (req.method === 'GET' && pathname === '/api/admin/reports') {
    if (!isAuthorizedAdmin(req)) {
      sendJson(res, 401, { success: false, message: 'Akses ditolak.' });
      return;
    }

    const rows = db.prepare(`
      SELECT 
        n.id as note_id,
        n.content,
        n.category,
        n.color,
        n.font_style,
        n.created_at,
        n.expires_at,
        n.is_pinned,
        COUNT(r.id) as report_count,
        MAX(r.created_at) as latest_report_at,
        GROUP_CONCAT(r.reason, ' | ') as reasons
      FROM note_reports r
      INNER JOIN notes n ON r.note_id = n.id
      GROUP BY n.id
      ORDER BY report_count DESC, latest_report_at DESC
    `).all();

    sendJson(res, 200, {
      success: true,
      total: rows.length,
      reports: rows
    });
    return;
  }

  // 12. POST /api/admin/reports/:noteId/dismiss (Abaikan / Hapus Laporan Tanpa Menghapus Pesan)
  if (req.method === 'POST' && pathname.startsWith('/api/admin/reports/') && pathname.endsWith('/dismiss')) {
    if (!isAuthorizedAdmin(req)) {
      sendJson(res, 401, { success: false, message: 'Akses ditolak.' });
      return;
    }

    const parts = pathname.split('/');
    const noteId = parts[4];

    db.prepare('DELETE FROM note_reports WHERE note_id = ?').run(noteId);
    db.prepare('INSERT INTO admin_logs (action, details, created_at) VALUES (?, ?, ?)')
      .run('DISMISS_REPORT', `Mengabaikan laporan untuk pesan: ${noteId.substring(0, 8)}...`, Date.now());

    sendJson(res, 200, {
      success: true,
      message: 'Laporan berhasil diabaikan. Pesan tetap ada di papan.'
    });
    return;
  }

  // 13. DELETE /api/admin/reports/:noteId (Hapus Pesan yang Dilaporkan Beserta Laporannya)
  if (req.method === 'DELETE' && pathname.startsWith('/api/admin/reports/')) {
    if (!isAuthorizedAdmin(req)) {
      sendJson(res, 401, { success: false, message: 'Akses ditolak.' });
      return;
    }

    const noteId = pathname.replace('/api/admin/reports/', '').trim();
    const note = db.prepare('SELECT content FROM notes WHERE id = ?').get(noteId);
    if (note) {
      db.prepare('DELETE FROM notes WHERE id = ?').run(noteId);
      db.prepare('DELETE FROM note_reports WHERE note_id = ?').run(noteId);
      db.prepare('INSERT INTO admin_logs (action, details, created_at) VALUES (?, ?, ?)')
        .run('DELETE_REPORTED', `Menghapus pesan yang dilaporkan: "${note.content.substring(0, 40)}..."`, Date.now());
    } else {
      db.prepare('DELETE FROM note_reports WHERE note_id = ?').run(noteId);
    }

    sendJson(res, 200, {
      success: true,
      message: 'Pesan yang dilaporkan berhasil dihapus dari papan!'
    });
    return;
  }

  // 14. GET /api/admin/blacklist (Daftar Kata Terlarang)
  if (req.method === 'GET' && pathname === '/api/admin/blacklist') {
    if (!isAuthorizedAdmin(req)) {
      sendJson(res, 401, { success: false, message: 'Akses ditolak.' });
      return;
    }

    const words = db.prepare('SELECT id, word, created_at FROM word_blacklist ORDER BY created_at DESC').all();
    sendJson(res, 200, {
      success: true,
      total: words.length,
      words
    });
    return;
  }

  // 15. POST /api/admin/blacklist (Tambah Kata Terlarang Baru)
  if (req.method === 'POST' && pathname === '/api/admin/blacklist') {
    if (!isAuthorizedAdmin(req)) {
      sendJson(res, 401, { success: false, message: 'Akses ditolak.' });
      return;
    }

    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const data = JSON.parse(body || '{}');
        const word = (data.word || '').trim().toLowerCase();

        if (!word) {
          sendJson(res, 400, { success: false, message: 'Kata terlarang tidak boleh kosong.' });
          return;
        }

        if (word.length > 50) {
          sendJson(res, 400, { success: false, message: 'Kata terlarang maksimal 50 karakter.' });
          return;
        }

        const existing = db.prepare('SELECT id FROM word_blacklist WHERE word = ?').get(word);
        if (existing) {
          sendJson(res, 400, { success: false, message: `Kata "${word}" sudah terdaftar dalam filter.` });
          return;
        }

        const now = Date.now();
        const insertRes = db.prepare('INSERT INTO word_blacklist (word, created_at) VALUES (?, ?)').run(word, now);
        
        db.prepare('INSERT INTO admin_logs (action, details, created_at) VALUES (?, ?, ?)')
          .run('ADD_BLACKLIST', `Menambahkan filter kata terlarang: "${word}"`, now);

        sendJson(res, 201, {
          success: true,
          message: `Kata "${word}" berhasil ditambahkan ke filter terlarang!`,
          item: {
            id: Number(insertRes.lastInsertRowid),
            word,
            created_at: now
          }
        });
      } catch (err) {
        sendJson(res, 400, { success: false, message: 'Format data tidak valid.' });
      }
    });
    return;
  }

  // 16. DELETE /api/admin/blacklist/:id (Hapus Kata Terlarang)
  if (req.method === 'DELETE' && pathname.startsWith('/api/admin/blacklist/')) {
    if (!isAuthorizedAdmin(req)) {
      sendJson(res, 401, { success: false, message: 'Akses ditolak.' });
      return;
    }

    const id = parseInt(pathname.replace('/api/admin/blacklist/', '').trim(), 10);
    const existing = db.prepare('SELECT word FROM word_blacklist WHERE id = ?').get(id);

    if (!existing) {
      sendJson(res, 404, { success: false, message: 'Kata tidak ditemukan dalam daftar.' });
      return;
    }

    db.prepare('DELETE FROM word_blacklist WHERE id = ?').run(id);
    db.prepare('INSERT INTO admin_logs (action, details, created_at) VALUES (?, ?, ?)')
      .run('REMOVE_BLACKLIST', `Menghapus kata terlarang dari filter: "${existing.word}"`, Date.now());

    sendJson(res, 200, {
      success: true,
      message: `Kata "${existing.word}" berhasil dihapus dari filter.`
    });
    return;
  }

  // 17. GET /api/admin/settings (Ambil Pengaturan Batas Huruf & Anti-Spam & Status Beku)
  if (req.method === 'GET' && pathname === '/api/admin/settings') {
    if (!isAuthorizedAdmin(req)) {
      sendJson(res, 401, { success: false, message: 'Akses ditolak.' });
      return;
    }

    sendJson(res, 200, {
      success: true,
      maxCharLimit: parseInt(getSetting('max_char_limit', '400'), 10),
      spamCooldownSeconds: parseInt(getSetting('spam_cooldown_seconds', '60'), 10),
      boardFrozen: getSetting('board_frozen', '0') === '1'
    });
    return;
  }

  // 18. POST /api/admin/settings (Simpan Pengaturan Batas Huruf & Anti-Spam)
  if (req.method === 'POST' && pathname === '/api/admin/settings') {
    if (!isAuthorizedAdmin(req)) {
      sendJson(res, 401, { success: false, message: 'Akses ditolak.' });
      return;
    }

    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const data = JSON.parse(body || '{}');
        let maxCharLimit = parseInt(data.maxCharLimit, 10);
        let spamCooldownSeconds = parseInt(data.spamCooldownSeconds, 10);

        if (isNaN(maxCharLimit) || maxCharLimit < 50) maxCharLimit = 50;
        if (maxCharLimit > 2000) maxCharLimit = 2000;

        if (isNaN(spamCooldownSeconds) || spamCooldownSeconds < 0) spamCooldownSeconds = 0;
        if (spamCooldownSeconds > 3600) spamCooldownSeconds = 3600;

        setSetting('max_char_limit', maxCharLimit);
        setSetting('spam_cooldown_seconds', spamCooldownSeconds);

        db.prepare('INSERT INTO admin_logs (action, details, created_at) VALUES (?, ?, ?)')
          .run('UPDATE_SETTINGS', `Ubah pengaturan: Batas huruf ${maxCharLimit}, Jeda anti-spam ${spamCooldownSeconds}s`, Date.now());

        sendJson(res, 200, {
          success: true,
          message: 'Pengaturan batas huruf & jeda anti-spam berhasil disimpan!',
          settings: {
            maxCharLimit,
            spamCooldownSeconds,
            boardFrozen: getSetting('board_frozen', '0') === '1'
          }
        });
      } catch (err) {
        sendJson(res, 400, { success: false, message: 'Format data tidak valid.' });
      }
    });
    return;
  }

  // 19. POST /api/admin/toggle-freeze (Bekukan atau Cairkan Papan Publik)
  if (req.method === 'POST' && pathname === '/api/admin/toggle-freeze') {
    if (!isAuthorizedAdmin(req)) {
      sendJson(res, 401, { success: false, message: 'Akses ditolak.' });
      return;
    }

    const currentFrozen = getSetting('board_frozen', '0') === '1';
    const nextFrozen = currentFrozen ? '0' : '1';
    setSetting('board_frozen', nextFrozen);

    const actionText = nextFrozen === '1'
      ? 'Membekukan seluruh papan (Mode baca-saja diaktifkan)'
      : 'Mencairkan papan (Mode tempel curhat aktif kembali)';

    db.prepare('INSERT INTO admin_logs (action, details, created_at) VALUES (?, ?, ?)')
      .run(nextFrozen === '1' ? 'FREEZE_BOARD' : 'UNFREEZE_BOARD', actionText, Date.now());

    sendJson(res, 200, {
      success: true,
      boardFrozen: nextFrozen === '1',
      message: nextFrozen === '1'
        ? 'Papan berhasil DIBEKUKAN! Pengunjung saat ini hanya dapat membaca pesan.'
        : 'Papan berhasil DICAIRKAN! Pengunjung kini dapat kembali menempelkan curhat.'
    });
    return;
  }

  // --- STATIC FILE SERVING ---
  let filePath;
  if (pathname === '/' || pathname === '') {
    filePath = path.join(__dirname, 'public', 'index.html');
  } else if (pathname === '/admin' || pathname === '/admin/') {
    filePath = path.join(__dirname, 'public', 'admin.html');
  } else {
    filePath = path.join(__dirname, 'public', pathname);
  }

  // Security check against directory traversal
  if (!filePath.startsWith(path.join(__dirname, 'public'))) {
    res.writeHead(403);
    res.end('Akses dilarang');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      if (!pathname.startsWith('/api/')) {
        filePath = path.join(__dirname, 'public', 'index.html');
      } else {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('404 Not Found');
        return;
      }
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (readErr, content) => {
      if (readErr) {
        res.writeHead(500);
        res.end('Server Error');
        return;
      }
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    });
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`📌 Papan Curhat Anonim Sementara Aktif!`);
  console.log(`🌐 Papan Publik : http://localhost:${PORT}`);
  console.log(`🛡️ Dasbor Admin : http://localhost:${PORT}/admin`);
  console.log(`🔑 PIN Default  : admin123`);
  console.log(`⏱️ Pesan otomatis musnah dalam 12 - 24 jam.`);
  console.log(`======================================================\n`);
});
