# 📌 Bisik Sementara — Papan Curhat & Teks Anonim Sementara

Aplikasi web modern untuk menempelkan kutipan, pikiran, atau pesan anonim (curhat) yang **hanya bertahan selama 12–24 jam** sebelum musnah total tanpa meninggalkan jejak digital.

---

## 🌟 Fitur Utama

1. **100% Anonim & Tanpa Jejak**
   - Tidak perlu login, tidak ada pendaftaran akun, dan tidak ada identitas yang disimpan.
   - Semua orang bebas menyampaikan isi hati, keluh kesah, atau kutipan favorit dengan aman dan tenang.

2. **Sistem Musnah Otomatis (Auto-Purge & Ephemeral)**
   - Setiap pesan memiliki batas waktu hidup (**12 Jam** atau **24 Jam**).
   - Dilengkapi penghitung mundur waktu nyata (*Live Countdown Timer*) di setiap sticky note (`⏳ Sisa 18j 24m 10s`).
   - Ketika waktu habis, pesan akan terbakar/musnah dengan animasi disintegrasi dan suara unik, lalu dihapus dari database secara otomatis.
   - **Mode Uji Coba Cepat (1 Menit)** tersedia pada form agar Anda bisa langsung melihat efek pesan lenyap tanpa perlu menunggu 12 jam.

3. **Tampilan Papan Interaktif (Corkboard & Glassmorphism)**
   - **Papan Gabus Realistis (Corkboard)**: Efek tekstur kayu & gabus klasik, sticky note kertas pastel dengan sedikit kemiringan acak yang natural serta selotip (*washi tape*) di bagian atas.
   - **Mode Gelap / Ruang Sunyi**: Nuansa malam minimalis yang tenang dan nyaman untuk membaca di waktu senggang.
   - Tombol pengubah tema (*Theme Switcher*) dengan penyimpanan preferensi otomatis.

4. **Kustomisasi Sticky Note**
   - **Pilihan Warna Kertas**: Kuning Klasik, Pink Pastel, Biru Langit, Hijau Mint, Ungu Lavender, Oranye Sunset, dan Abu Malam Gulita.
   - **Pilihan Gaya Tulisan (Tipografi)**: Tulisan Tangan Santai (*Caveat*), Novel Puitis (*Lora Serif*), Mesin Tik Retro (*Space Mono*), dan Modern Bersih (*Plus Jakarta Sans*).
   - **Kategori Suasana Hati**: Galau & Curhat 💔, Asmara 💕, Karir & Belajar 💼, Harapan & Semangat 🌱, Rahasia & Filosofis 🤫, serta Pikiran Acak ☕.
   - **Pratinjau Langsung (*Live Preview*)**: Melihat tampilan kertas sticky note secara langsung saat sedang mengetik sebelum ditempel.

5. **Interaksi & Empati (Emoji Reactions — Maksimal 1 Reaksi per Kartu)**
   - Pembaca dapat memberikan reaksi empati tanpa kata:
     - ❤️ Peluk / Cinta
     - 🫂 Kamu Tidak Sendiri (*Relate*)
     - 🌧️ Turut Sedih
     - 🔥 Kobarkan Semangat
     - ☕ Santai / Tenang
   - **Aturan 1 Reaksi per Kartu**: Setiap pembaca hanya bisa memilih maksimal 1 reaksi per sticky note.
     - Jika memilih emoji lain, reaksi lama otomatis berpindah ke emoji baru.
     - Jika mengklik kembali emoji yang sedang aktif, reaksi akan dibatalkan (*un-react*).
   - Dilengkapi efek suara *pop* interaktif (disintesis via Web Audio API tanpa perlu file audio eksternal).

6. **Pencarian, Filter, & Pengurutan**
   - Filter cepat berdasarkan kategori suasana hati.
   - Pencarian instan (*instant live search*) berdasarkan kata kunci.
   - Pengurutan: *Terbaru Ditempel*, *Paling Banyak Reaksi*, *Segera Musnah*, atau *Paling Lama*.

7. **Fitur Ekspor Kartu Cerita (Download Image)**
   - Tombol **📸 Unduh Kartu** merender kartu curhat ke dalam gambar PNG berkualitas tinggi via HTML5 Canvas—siap diunggah ke status WhatsApp atau Instagram Story.
   - Tombol **📋 Salin** untuk menyalin kutipan langsung ke clipboard.

8. **🛡️ Dasbor Admin & Moderasi Penuh (`/admin`)**
   - **Keamanan PIN**: Dilindungi otentikasi PIN (Default: `admin123`, dapat diganti langsung lewat dasbor).
   - **Moderasi & Hapus Paksa**: Melihat daftar seluruh pesan aktif dan menghapus pesan spam/tidak pantas seketika tanpa menunggu batas waktu 12–24 jam.
   - **Pengumuman Resmi Disematkan (Pinned Announcement)**: Admin dapat memasang pesan resmi bertanda khusus yang tidak akan musnah dan selalu tampil di urutan teratas papan.
   - **Statistik Real-time**: Memantau pesan aktif, pesan yang telah musnah, total reaksi empati, dan log riwayat tindakan.
   - **Emergency Reset (Kosongkan Papan Total)**: Tombol darurat untuk menghapus seluruh pesan di papan dalam 1 klik.

---

## 📁 Struktur Proyek

```
d:\coba gravity\
├── server.js               # Backend native Node.js HTTP server & REST API (SQLite built-in)
├── package.json            # Konfigurasi proyek ES Module
├── start.bat               # File launcher otomatis untuk Windows
├── README.md               # Dokumentasi lengkap
├── data/
│   └── papan.db            # Database SQLite (dibuat otomatis untuk menyimpan catatan)
└── public/
    ├── index.html          # Antarmuka web responsif papan publik
    ├── style.css           # Styling papan gabus, sticky notes, animasi disintegrasi
    ├── app.js              # Logika frontend papan publik & generator gambar
    ├── admin.html          # Portal Dasbor Admin
    ├── admin.css           # Styling antarmuka dasbor admin
    └── admin.js            # Logika otentikasi PIN & moderasi admin
```

---

## 🚀 Cara Menjalankan Website

### Cara 1: Menggunakan file `start.bat` (Paling Praktis)
Cukup klik ganda (double-click) pada file **`start.bat`** di folder ini. Server akan langsung menyala dan menampilkan URL lokal.

### Cara 2: Menjalankan via Terminal
Buka PowerShell atau Command Prompt di direktori ini, lalu jalankan:
```bash
agy-node server.js
```
*(atau jika Node.js standar sudah terpasang di path sistem: `node server.js`)*

Setelah server menyala, buka browser Anda dan akses:
👉 **`http://localhost:3000`**
