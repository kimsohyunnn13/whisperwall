// ============================================================
// ADMIN PORTAL CLIENT JAVASCRIPT — BISIK SEMENTARA
// Khusus Bahasa Indonesia untuk Pengelola / Admin
// ============================================================

const ADMIN_STATE = {
  token: sessionStorage.getItem('admin_token') || '',
  notes: [],
  filteredNotes: [],
  reports: [],
  blacklist: [],
  boardFrozen: false,
  searchQuery: '',
  stats: null,
  // Pagination state
  notesPage: 1,
  notesPerPage: 10,
  reportsPage: 1,
  reportsPerPage: 10
};

// DOM References
const loginScreen = document.getElementById('loginScreen');
const dashboardScreen = document.getElementById('dashboardScreen');
const loginForm = document.getElementById('loginForm');
const adminPinInput = document.getElementById('adminPinInput');
const loginError = document.getElementById('loginError');
const logoutBtn = document.getElementById('logoutBtn');
const refreshBtn = document.getElementById('refreshBtn');
const adminSearchInput = document.getElementById('adminSearchInput');

// Freeze & Status DOMs
const toggleFreezeBtn = document.getElementById('toggleFreezeBtn');
const adminBoardStatusBadge = document.getElementById('adminBoardStatusBadge');
const freezeStatusText = document.getElementById('freezeStatusText');

// Board Settings DOMs
const boardSettingsForm = document.getElementById('boardSettingsForm');
const maxCharLimitInput = document.getElementById('maxCharLimitInput');
const spamCooldownInput = document.getElementById('spamCooldownInput');

// Stat DOMs
const statActiveNotes = document.getElementById('statActiveNotes');
const statPinnedNotes = document.getElementById('statPinnedNotes');
const statReportedNotes = document.getElementById('statReportedNotes');
const statBlacklistCount = document.getElementById('statBlacklistCount');
const statTotalPurged = document.getElementById('statTotalPurged');
const statTotalReactions = document.getElementById('statTotalReactions');
const notesTableBody = document.getElementById('notesTableBody');
const logsList = document.getElementById('logsList');

// Reported Notes DOMs
const reportedCounterBadge = document.getElementById('reportedCounterBadge');
const reportsTableBody = document.getElementById('reportsTableBody');
const refreshReportsBtn = document.getElementById('refreshReportsBtn');

// Blacklist DOMs
const addBlacklistForm = document.getElementById('addBlacklistForm');
const newBlacklistInput = document.getElementById('newBlacklistInput');
const blacklistContainer = document.getElementById('blacklistContainer');

// Pagination DOMs — Notes
const notesPagination    = document.getElementById('notesPagination');
const notesPaginationInfo = document.getElementById('notesPaginationInfo');
const notesPrevBtn       = document.getElementById('notesPrevBtn');
const notesNextBtn       = document.getElementById('notesNextBtn');
const notesPageNumbers   = document.getElementById('notesPageNumbers');

// Pagination DOMs — Reports
const reportsPagination    = document.getElementById('reportsPagination');
const reportsPaginationInfo = document.getElementById('reportsPaginationInfo');
const reportsPrevBtn       = document.getElementById('reportsPrevBtn');
const reportsNextBtn       = document.getElementById('reportsNextBtn');
const reportsPageNumbers   = document.getElementById('reportsPageNumbers');

// Modal Forms & Buttons
const openPinModalBtn = document.getElementById('openPinModalBtn');
const openChangePinModalBtn = document.getElementById('openChangePinModalBtn');
const openResetBoardModalBtn = document.getElementById('openResetBoardModalBtn');
const confirmResetBtn = document.getElementById('confirmResetBtn');
const pinForm = document.getElementById('pinForm');
const changePinForm = document.getElementById('changePinForm');

// Helper: Toast Notifikasi Admin
function showAdminToast(message, isError = false) {
  const container = document.getElementById('adminToastContainer');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = 'admin-toast';
  if (isError) {
    toast.style.borderColor = '#ef4444';
    toast.style.background = '#450a0a';
  }
  toast.textContent = message;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// Helper Modal
window.closeAdminModal = function(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove('is-active');
};

function openAdminModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.add('is-active');
}

// Cek autentikasi saat halaman dibuka
function checkAuth() {
  if (ADMIN_STATE.token) {
    loginScreen.style.display = 'none';
    dashboardScreen.style.display = 'flex';
    loadAdminDashboard();
  } else {
    loginScreen.style.display = 'flex';
    dashboardScreen.style.display = 'none';
  }
}

// Proses Login Admin
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  loginError.style.display = 'none';
  const pin = adminPinInput.value.trim();

  try {
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pin })
    });
    const data = await res.json();

    if (data.success) {
      ADMIN_STATE.token = data.token;
      sessionStorage.setItem('admin_token', data.token);
      checkAuth();
      showAdminToast('Login berhasil! Selamat datang di Dasbor Admin.');
    } else {
      loginError.textContent = data.message || 'PIN Admin salah.';
      loginError.style.display = 'block';
      adminPinInput.value = '';
      if (res.status === 429) {
        adminPinInput.blur();
      } else {
        adminPinInput.focus();
      }
    }
  } catch (err) {
    loginError.textContent = 'Gagal terhubung ke server.';
    loginError.style.display = 'block';
  }
});

// Proses Logout
logoutBtn.addEventListener('click', () => {
  ADMIN_STATE.token = '';
  sessionStorage.removeItem('admin_token');
  checkAuth();
  showAdminToast('Anda telah keluar dari Dasbor Admin.');
});

// Ambil Seluruh Data Dasbor
async function loadAdminDashboard() {
  await Promise.all([
    fetchAdminStats(),
    fetchAdminNotes(),
    fetchAdminReports(),
    fetchAdminBlacklist(),
    fetchAdminSettings()
  ]);
}

// 1. Ambil Statistik
async function fetchAdminStats() {
  try {
    const res = await fetch('/api/admin/stats', {
      headers: { 'Authorization': `Bearer ${ADMIN_STATE.token}` }
    });
    if (res.status === 401) {
      logoutBtn.click();
      return;
    }
    const data = await res.json();

    if (data.success) {
      ADMIN_STATE.stats = data;
      statActiveNotes.textContent = data.activeNotes;
      statPinnedNotes.textContent = data.pinnedNotes;
      if (statReportedNotes) statReportedNotes.textContent = data.reportedCount || 0;
      if (statBlacklistCount) statBlacklistCount.textContent = data.blacklistCount || 0;
      if (reportedCounterBadge) reportedCounterBadge.textContent = `${data.reportedCount || 0} Laporan`;
      statTotalPurged.textContent = data.totalPurged;
      statTotalReactions.textContent = data.totalReactions;

      // Render riwayat log
      renderLogs(data.recentLogs || []);
    }
  } catch (err) {
    console.error('Error saat mengambil statistik admin:', err);
  }
}

// 2. Ambil Daftar Catatan Aktif
async function fetchAdminNotes() {
  try {
    const res = await fetch('/api/admin/notes', {
      headers: { 'Authorization': `Bearer ${ADMIN_STATE.token}` }
    });
    if (res.status === 401) {
      logoutBtn.click();
      return;
    }
    const data = await res.json();

    if (data.success) {
      ADMIN_STATE.notes = data.notes;
      applyFilterAndRenderTable();
    }
  } catch (err) {
    console.error('Error saat mengambil catatan:', err);
  }
}

// Filter & Pencarian Catatan
function applyFilterAndRenderTable() {
  const q = ADMIN_STATE.searchQuery.toLowerCase();
  ADMIN_STATE.filteredNotes = ADMIN_STATE.notes.filter(n => {
    return n.content.toLowerCase().includes(q) || (n.category || '').toLowerCase().includes(q);
  });
  ADMIN_STATE.notesPage = 1; // reset ke halaman 1 saat filter berubah
  renderNotesTable();
}

// ==================== PAGINATION HELPERS ====================

function renderPageNumbers(container, currentPage, totalPages, onClickFn) {
  container.innerHTML = '';
  if (totalPages <= 1) return;

  const maxVisible = 5;
  let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
  let end   = Math.min(totalPages, start + maxVisible - 1);
  if (end - start + 1 < maxVisible) start = Math.max(1, end - maxVisible + 1);

  if (start > 1) {
    const btn = makePgBtn('1', currentPage === 1, () => onClickFn(1));
    container.appendChild(btn);
    if (start > 2) {
      const dots = document.createElement('span');
      dots.className = 'page-dots';
      dots.textContent = '…';
      container.appendChild(dots);
    }
  }

  for (let i = start; i <= end; i++) {
    const btn = makePgBtn(String(i), currentPage === i, () => onClickFn(i));
    if (currentPage === i) btn.classList.add('active');
    container.appendChild(btn);
  }

  if (end < totalPages) {
    if (end < totalPages - 1) {
      const dots = document.createElement('span');
      dots.className = 'page-dots';
      dots.textContent = '…';
      container.appendChild(dots);
    }
    const btn = makePgBtn(String(totalPages), currentPage === totalPages, () => onClickFn(totalPages));
    container.appendChild(btn);
  }
}

function makePgBtn(label, isActive, onClick) {
  const btn = document.createElement('button');
  btn.className = 'page-btn page-num-btn' + (isActive ? ' active' : '');
  btn.textContent = label;
  btn.addEventListener('click', onClick);
  return btn;
}

// Render Tabel Catatan
function renderNotesTable() {
  notesTableBody.innerHTML = '';

  const total = ADMIN_STATE.filteredNotes.length;

  if (total === 0) {
    notesPagination.style.display = 'none';
    notesTableBody.innerHTML = `
      <tr>
        <td colspan="7" style="text-align: center; color: #9ca3af; padding: 2rem;">
          Tidak ada pesan aktif di papan saat ini.
        </td>
      </tr>
    `;
    return;
  }

  const perPage    = ADMIN_STATE.notesPerPage;
  const totalPages = Math.ceil(total / perPage);
  ADMIN_STATE.notesPage = Math.min(ADMIN_STATE.notesPage, totalPages);
  const page  = ADMIN_STATE.notesPage;
  const start = (page - 1) * perPage;
  const end   = Math.min(start + perPage, total);
  const pageData = ADMIN_STATE.filteredNotes.slice(start, end);

  const now = Date.now();

  pageData.forEach(note => {
    const tr = document.createElement('tr');
    const totalReactions = Object.values(note.reactions || {}).reduce((a, b) => a + Number(b), 0);
    
    let timeText = 'Musnah';
    if (note.is_pinned) {
      timeText = '<span style="color: #facc15; font-weight: bold;">⭐ Disematkan</span>';
    } else {
      const remMs = note.expires_at - now;
      if (remMs > 0) {
        const h = Math.floor(remMs / 3600000);
        const m = Math.floor((remMs % 3600000) / 60000);
        timeText = `${h}j ${m}m`;
      }
    }

    const createdDate = new Date(note.created_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

    tr.innerHTML = `
      <td>
        <span class="color-dot" style="background-color: ${note.color};" title="${note.color}"></span>
      </td>
      <td>
        <div class="note-text-cell">
          ${note.is_pinned ? '<span class="pinned-badge">📢 PENGUMUMAN RESMI</span><br>' : ''}
          ${escapeHtml(note.content)}
        </div>
      </td>
      <td>
        <span class="cat-pill">${escapeHtml(note.category)}</span>
      </td>
      <td>
        <span class="time-pill">${timeText}</span>
      </td>
      <td>
        <span title="Total reaksi">❤️ ${totalReactions}</span>
      </td>
      <td>
        <span style="color: #9ca3af; font-size: 0.8rem;">${createdDate}</span>
      </td>
      <td style="text-align: right;">
        <button class="btn-delete-note" onclick="deleteNotePrompt('${note.id}')">
          🗑️ Hapus
        </button>
      </td>
    `;

    notesTableBody.appendChild(tr);
  });

  // Update pagination UI
  notesPaginationInfo.textContent = `Menampilkan ${start + 1}–${end} dari ${total} pesan`;
  notesPrevBtn.disabled = page <= 1;
  notesNextBtn.disabled = page >= totalPages;
  notesPagination.style.display = totalPages > 1 ? 'flex' : 'none';
  renderPageNumbers(notesPageNumbers, page, totalPages, (p) => {
    ADMIN_STATE.notesPage = p;
    renderNotesTable();
  });
}

// ==================== 🚩 SISTEM LAPORAN PENGUNJUNG ====================

// Ambil Daftar Laporan
async function fetchAdminReports() {
  if (!reportsTableBody) return;
  try {
    const res = await fetch('/api/admin/reports', {
      headers: { 'Authorization': `Bearer ${ADMIN_STATE.token}` }
    });
    if (res.status === 401) return;
    const data = await res.json();

    if (data.success) {
      ADMIN_STATE.reports = data.reports || [];
      renderReportsTable();
    }
  } catch (err) {
    console.error('Error saat mengambil laporan:', err);
  }
}

// Render Tabel Laporan
function renderReportsTable() {
  if (!reportsTableBody) return;
  reportsTableBody.innerHTML = '';

  const total = ADMIN_STATE.reports.length;

  if (total === 0) {
    if (reportsPagination) reportsPagination.style.display = 'none';
    reportsTableBody.innerHTML = `
      <tr>
        <td colspan="6" style="text-align: center; color: #10b981; padding: 2rem;">
          ✨ Tidak ada pesan yang dilaporkan saat ini. Papan aman dan bersih!
        </td>
      </tr>
    `;
    return;
  }

  const perPage    = ADMIN_STATE.reportsPerPage;
  const totalPages = Math.ceil(total / perPage);
  ADMIN_STATE.reportsPage = Math.min(ADMIN_STATE.reportsPage, totalPages);
  const page     = ADMIN_STATE.reportsPage;
  const start    = (page - 1) * perPage;
  const end      = Math.min(start + perPage, total);
  const pageData = ADMIN_STATE.reports.slice(start, end);

  pageData.forEach(report => {
    const tr = document.createElement('tr');
    tr.style.backgroundColor = 'rgba(239, 68, 68, 0.05)';

    tr.innerHTML = `
      <td>
        <span class="color-dot" style="background-color: ${report.color};" title="${report.color}"></span>
      </td>
      <td>
        <div class="note-text-cell">
          ${report.is_pinned ? '<span class="pinned-badge">📢 PENGUMUMAN RESMI</span><br>' : ''}
          ${escapeHtml(report.content)}
        </div>
      </td>
      <td>
        <span class="cat-pill">${escapeHtml(report.category)}</span>
      </td>
      <td>
        <span class="report-count-badge">🚩 ${report.report_count} Laporan</span>
      </td>
      <td>
        <div class="report-reasons-cell" title="${escapeHtml(report.reasons || '')}">
          ${escapeHtml(report.reasons || 'Tidak ada alasan khusus')}
        </div>
      </td>
      <td style="text-align: right; white-space: nowrap;">
        <div style="display: inline-flex; gap: 0.35rem;">
          <button class="btn-dismiss-report" onclick="dismissReportPrompt('${report.note_id}')" title="Abaikan laporan tanpa menghapus pesan">
            ✓ Abaikan
          </button>
          <button class="btn-delete-reported" onclick="deleteReportedPrompt('${report.note_id}')" title="Hapus pesan dan laporannya">
            🗑️ Hapus
          </button>
        </div>
      </td>
    `;

    reportsTableBody.appendChild(tr);
  });

  // Update pagination UI
  if (reportsPaginationInfo) reportsPaginationInfo.textContent = `Menampilkan ${start + 1}–${end} dari ${total} laporan`;
  if (reportsPrevBtn) reportsPrevBtn.disabled = page <= 1;
  if (reportsNextBtn) reportsNextBtn.disabled = page >= totalPages;
  if (reportsPagination) reportsPagination.style.display = totalPages > 1 ? 'flex' : 'none';
  if (reportsPageNumbers) {
    renderPageNumbers(reportsPageNumbers, page, totalPages, (p) => {
      ADMIN_STATE.reportsPage = p;
      renderReportsTable();
    });
  }
}

// Abaikan Laporan (Pesan Tetap Ada di Papan)
window.dismissReportPrompt = async function(noteId) {
  if (!confirm('Abaikan laporan untuk pesan ini? Pesan akan tetap ada di papan publik.')) return;

  try {
    const res = await fetch(`/api/admin/reports/${noteId}/dismiss`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${ADMIN_STATE.token}` }
    });
    const data = await res.json();

    if (data.success) {
      showAdminToast(data.message || 'Laporan berhasil diabaikan.');
      await Promise.all([fetchAdminReports(), fetchAdminStats()]);
    } else {
      showAdminToast(data.message || 'Gagal memproses.', true);
    }
  } catch (err) {
    showAdminToast('Terjadi kesalahan jaringan.', true);
  }
};

// Hapus Pesan yang Dilaporkan
window.deleteReportedPrompt = async function(noteId) {
  if (!confirm('Apakah Anda yakin ingin menghapus pesan yang dilaporkan ini dari papan?')) return;

  try {
    const res = await fetch(`/api/admin/reports/${noteId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${ADMIN_STATE.token}` }
    });
    const data = await res.json();

    if (data.success) {
      showAdminToast(data.message || 'Pesan berhasil dihapus!');
      loadAdminDashboard();
    } else {
      showAdminToast(data.message || 'Gagal menghapus pesan.', true);
    }
  } catch (err) {
    showAdminToast('Terjadi kesalahan jaringan.', true);
  }
};

if (refreshReportsBtn) {
  refreshReportsBtn.addEventListener('click', () => {
    fetchAdminReports();
    fetchAdminStats();
    showAdminToast('Daftar laporan diperbarui!');
  });
}

// ==================== 🛡️ FILTER KATA TERLARANG ====================

// Ambil Daftar Kata Terlarang
async function fetchAdminBlacklist() {
  if (!blacklistContainer) return;
  try {
    const res = await fetch('/api/admin/blacklist', {
      headers: { 'Authorization': `Bearer ${ADMIN_STATE.token}` }
    });
    if (res.status === 401) return;
    const data = await res.json();

    if (data.success) {
      ADMIN_STATE.blacklist = data.words || [];
      renderBlacklist();
    }
  } catch (err) {
    console.error('Error saat mengambil blacklist:', err);
  }
}

// Render Chip Kata Terlarang
function renderBlacklist() {
  if (!blacklistContainer) return;
  blacklistContainer.innerHTML = '';

  if (ADMIN_STATE.blacklist.length === 0) {
    blacklistContainer.innerHTML = `
      <div style="color: #9ca3af; font-size: 0.88rem; padding: 0.5rem 0;">
        Belum ada kata terlarang dalam daftar filter. Tambahkan kata di atas untuk mulai memblokir secara otomatis.
      </div>
    `;
    return;
  }

  ADMIN_STATE.blacklist.forEach(item => {
    const chip = document.createElement('div');
    chip.className = 'word-chip';
    chip.innerHTML = `
      <span class="chip-word">${escapeHtml(item.word)}</span>
      <button class="chip-remove" onclick="removeBlacklistWord(${item.id}, '${escapeHtml(item.word)}')" title="Hapus dari filter">✕</button>
    `;
    blacklistContainer.appendChild(chip);
  });
}

// Tambah Kata Terlarang
if (addBlacklistForm) {
  addBlacklistForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const word = newBlacklistInput.value.trim().toLowerCase();
    if (!word) return;

    try {
      const res = await fetch('/api/admin/blacklist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${ADMIN_STATE.token}`
        },
        body: JSON.stringify({ word })
      });
      const data = await res.json();

      if (data.success) {
        newBlacklistInput.value = '';
        showAdminToast(data.message || 'Kata berhasil ditambahkan ke filter.');
        await Promise.all([fetchAdminBlacklist(), fetchAdminStats()]);
      } else {
        showAdminToast(data.message || 'Gagal menambahkan kata.', true);
      }
    } catch (err) {
      showAdminToast('Terjadi kesalahan server.', true);
    }
  });
}

// Hapus Kata Terlarang
window.removeBlacklistWord = async function(id, word) {
  if (!confirm(`Hapus kata "${word}" dari daftar filter terlarang?`)) return;

  try {
    const res = await fetch(`/api/admin/blacklist/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${ADMIN_STATE.token}` }
    });
    const data = await res.json();

    if (data.success) {
      showAdminToast(data.message || 'Kata berhasil dihapus.');
      await Promise.all([fetchAdminBlacklist(), fetchAdminStats()]);
    } else {
      showAdminToast(data.message || 'Gagal menghapus kata.', true);
    }
  } catch (err) {
    showAdminToast('Terjadi kesalahan server.', true);
  }
};

// ==================== ⚙️ PENGATURAN PAPAN & BEKUKAN PAPAN ====================

// Ambil Pengaturan Batas Huruf & Anti-Spam
async function fetchAdminSettings() {
  try {
    const res = await fetch('/api/admin/settings', {
      headers: { 'Authorization': `Bearer ${ADMIN_STATE.token}` }
    });
    if (res.status === 401) return;
    const data = await res.json();
    if (data.success) {
      if (maxCharLimitInput) maxCharLimitInput.value = data.maxCharLimit || 400;
      if (spamCooldownInput) spamCooldownInput.value = data.spamCooldownSeconds !== undefined ? data.spamCooldownSeconds : 60;
      updateFreezeUI(data.boardFrozen);
    }
  } catch (err) {
    console.error('Error saat mengambil pengaturan admin:', err);
  }
}

// Update Tampilan Status Pembekuan Papan
function updateFreezeUI(isFrozen) {
  ADMIN_STATE.boardFrozen = isFrozen;

  if (toggleFreezeBtn) {
    if (isFrozen) {
      toggleFreezeBtn.className = 'btn-action-freeze is-frozen';
      toggleFreezeBtn.innerHTML = '<span>🔥 Cairkan Papan</span>';
      toggleFreezeBtn.title = 'Papan saat ini dibekukan. Klik untuk mencairkan dan mengizinkan penempelan pesan kembali.';
    } else {
      toggleFreezeBtn.className = 'btn-action-freeze';
      toggleFreezeBtn.innerHTML = '<span>❄️ Bekukan Papan</span>';
      toggleFreezeBtn.title = 'Kunci papan agar pengunjung tidak bisa menempel pesan baru.';
    }
  }

  if (adminBoardStatusBadge) {
    if (isFrozen) {
      adminBoardStatusBadge.className = 'status-pill frozen';
      adminBoardStatusBadge.textContent = '❄️ Papan Dibekukan';
    } else {
      adminBoardStatusBadge.className = 'status-pill active';
      adminBoardStatusBadge.textContent = '🟢 Papan Aktif';
    }
  }

  if (freezeStatusText) {
    if (isFrozen) {
      freezeStatusText.style.color = '#ef4444';
      freezeStatusText.textContent = '❄️ Dibekukan (Mode Baca-Saja Aktif)';
    } else {
      freezeStatusText.style.color = '#10b981';
      freezeStatusText.textContent = '🟢 Aktif (Pengunjung Bisa Menempel Curhat)';
    }
  }
}

// Tombol Bekukan / Cairkan Papan
if (toggleFreezeBtn) {
  toggleFreezeBtn.addEventListener('click', async () => {
    const isCurrentlyFrozen = ADMIN_STATE.boardFrozen;
    const confirmMsg = isCurrentlyFrozen
      ? 'Cairkan papan sekarang? Pengunjung akan dapat kembali menempelkan pesan curhat baru.'
      : 'Bekukan papan sekarang? Pengunjung tidak akan dapat menempel pesan baru (hanya bisa membaca dan memberi reaksi).';
    if (!confirm(confirmMsg)) return;

    try {
      const res = await fetch('/api/admin/toggle-freeze', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${ADMIN_STATE.token}` }
      });
      const data = await res.json();
      if (data.success) {
        updateFreezeUI(data.boardFrozen);
        showAdminToast(data.message);
        fetchAdminStats(); // Refresh log riwayat
      } else {
        showAdminToast(data.message || 'Gagal mengubah status pembekuan papan.', true);
      }
    } catch (err) {
      showAdminToast('Terjadi kesalahan jaringan.', true);
    }
  });
}

// Simpan Pengaturan Batas Huruf & Anti-Spam
if (boardSettingsForm) {
  boardSettingsForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const maxCharLimit = parseInt(maxCharLimitInput.value, 10);
    const spamCooldownSeconds = parseInt(spamCooldownInput.value, 10);

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${ADMIN_STATE.token}`
        },
        body: JSON.stringify({ maxCharLimit, spamCooldownSeconds })
      });
      const data = await res.json();
      if (data.success) {
        showAdminToast(data.message || 'Pengaturan berhasil disimpan!');
        fetchAdminStats(); // Refresh log riwayat
      } else {
        showAdminToast(data.message || 'Gagal menyimpan pengaturan.', true);
      }
    } catch (err) {
      showAdminToast('Terjadi kesalahan server.', true);
    }
  });
}

// Render Riwayat Log Aktivitas
function renderLogs(logs) {
  logsList.innerHTML = '';
  if (logs.length === 0) {
    logsList.innerHTML = '<li class="log-empty">Belum ada aktivitas admin yang tercatat.</li>';
    return;
  }

  logs.forEach(log => {
    const li = document.createElement('li');
    li.className = 'log-item';
    const dateStr = new Date(log.created_at).toLocaleString('id-ID');
    li.innerHTML = `
      <span class="log-action-text">${escapeHtml(log.details || log.action)}</span>
      <span class="log-time">${dateStr}</span>
    `;
    logsList.appendChild(li);
  });
}

// Aksi Hapus Catatan Tunggal
window.deleteNotePrompt = async function(noteId) {
  if (!confirm('Apakah Anda yakin ingin menghapus pesan ini dari papan?')) return;

  try {
    const res = await fetch(`/api/admin/notes/${noteId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${ADMIN_STATE.token}` }
    });
    const data = await res.json();

    if (data.success) {
      showAdminToast(data.message || 'Pesan berhasil dihapus.');
      loadAdminDashboard();
    } else {
      showAdminToast(data.message || 'Gagal menghapus pesan.', true);
    }
  } catch (err) {
    showAdminToast('Terjadi kesalahan jaringan.', true);
  }
};

// Aksi Kosongkan Seluruh Papan
openResetBoardModalBtn.addEventListener('click', () => openAdminModal('resetModal'));

confirmResetBtn.addEventListener('click', async () => {
  try {
    const res = await fetch('/api/admin/notes/all', {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${ADMIN_STATE.token}` }
    });
    const data = await res.json();

    if (data.success) {
      closeAdminModal('resetModal');
      showAdminToast(data.message || 'Seluruh papan berhasil dikosongkan.');
      loadAdminDashboard();
    } else {
      showAdminToast(data.message || 'Gagal mereset papan.', true);
    }
  } catch (err) {
    showAdminToast('Terjadi kesalahan server.', true);
  }
});

// Aksi Sematkan Pengumuman
openPinModalBtn.addEventListener('click', () => openAdminModal('pinModal'));

pinForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const content = document.getElementById('announcementContent').value.trim();

  if (!content) return;

  try {
    const res = await fetch('/api/admin/pinned-note', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ADMIN_STATE.token}`
      },
      body: JSON.stringify({
        content,
        color: '#fef08a',
        fontStyle: 'modern'
      })
    });
    const data = await res.json();

    if (data.success) {
      pinForm.reset();
      closeAdminModal('pinModal');
      showAdminToast(data.message || 'Pengumuman berhasil disematkan di paling atas papan.');
      loadAdminDashboard();
    } else {
      showAdminToast(data.message || 'Gagal menyematkan pengumuman.', true);
    }
  } catch (err) {
    showAdminToast('Terjadi kesalahan server.', true);
  }
});

// Aksi Ubah PIN Admin
openChangePinModalBtn.addEventListener('click', () => openAdminModal('changePinModal'));

changePinForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const newPin = document.getElementById('newPinInput').value.trim();
  const confirmPin = document.getElementById('confirmPinInput').value.trim();

  if (newPin !== confirmPin) {
    showAdminToast('Konfirmasi PIN tidak cocok!', true);
    return;
  }

  try {
    const res = await fetch('/api/admin/change-pin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ADMIN_STATE.token}`
      },
      body: JSON.stringify({ newPin })
    });
    const data = await res.json();

    if (data.success) {
      ADMIN_STATE.token = data.newToken;
      sessionStorage.setItem('admin_token', data.newToken);
      changePinForm.reset();
      closeAdminModal('changePinModal');
      showAdminToast(data.message || 'PIN Admin berhasil diubah.');
    } else {
      showAdminToast(data.message || 'Gagal mengubah PIN.', true);
    }
  } catch (err) {
    showAdminToast('Terjadi kesalahan server.', true);
  }
});

// Pencarian (Debounced)
adminSearchInput.addEventListener('input', () => {
  ADMIN_STATE.searchQuery = adminSearchInput.value.trim();
  ADMIN_STATE.notesPage = 1; // reset ke halaman pertama saat mencari
  applyFilterAndRenderTable();
});

// Tombol Segarkan
refreshBtn.addEventListener('click', () => {
  loadAdminDashboard();
  showAdminToast('Data dasbor diperbarui!');
});

// ==================== PAGINATION EVENT LISTENERS ====================

// Navigasi halaman — Moderasi Pesan Aktif
if (notesPrevBtn) {
  notesPrevBtn.addEventListener('click', () => {
    if (ADMIN_STATE.notesPage > 1) {
      ADMIN_STATE.notesPage--;
      renderNotesTable();
    }
  });
}
if (notesNextBtn) {
  notesNextBtn.addEventListener('click', () => {
    const totalPages = Math.ceil(ADMIN_STATE.filteredNotes.length / ADMIN_STATE.notesPerPage);
    if (ADMIN_STATE.notesPage < totalPages) {
      ADMIN_STATE.notesPage++;
      renderNotesTable();
    }
  });
}

// Navigasi halaman — Pesan Dilaporkan
if (reportsPrevBtn) {
  reportsPrevBtn.addEventListener('click', () => {
    if (ADMIN_STATE.reportsPage > 1) {
      ADMIN_STATE.reportsPage--;
      renderReportsTable();
    }
  });
}
if (reportsNextBtn) {
  reportsNextBtn.addEventListener('click', () => {
    const totalPages = Math.ceil(ADMIN_STATE.reports.length / ADMIN_STATE.reportsPerPage);
    if (ADMIN_STATE.reportsPage < totalPages) {
      ADMIN_STATE.reportsPage++;
      renderReportsTable();
    }
  });
}

// Helper Escape HTML
function escapeHtml(string) {
  const div = document.createElement('div');
  div.textContent = string;
  return div.innerHTML;
}

// Inisialisasi awal autentikasi
checkAuth();
