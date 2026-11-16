// ============================================================
// WHISPER WALL / BISIK SEMENTARA — CLIENT APPLICATION
// Ephemeral Anonymous Board with Multi-Language (i18n) Support
// ============================================================

// Translation Dictionaries (Popular Languages)
const TRANSLATIONS = {
  en: {
    page_title: "Whisper Wall — Ephemeral Anonymous Confessions",
    brand_title: "Whisper Wall",
    brand_tagline: "Anonymous thoughts & confessions that vanish after 12–24 hours",
    theme_cork: "Cork Board",
    theme_dark: "Silent Room",
    theme_toggle_title: "Switch Board Theme",
    btn_post_confession: "Post Confession",
    status_active_notes: "{count} Active Notes",
    banner_notice: "All messages on this board are <strong>100% anonymous</strong> and will <strong>automatically disappear</strong> in 12–24 hours without a trace.",
    next_cleanup: "Next cleanup:",
    loading: "Loading...",
    board_clean: "Board is Clear",
    cleaning_now: "Cleaning up now...",
    cat_all: "✨ All",
    cat_curhat: "Vent & Confess",
    cat_asmara: "Romance",
    cat_karir: "Career & Study",
    cat_motivasi: "Uplift & Hope",
    cat_filosofis: "Secret & Thoughts",
    cat_random: "Random Musings",
    search_placeholder: "Search through whispers...",
    sort_label: "Sort by:",
    sort_newest: "Newest Posted",
    sort_popular: "Most Reactions",
    sort_expiring_soon: "⏳ Expiring Soon",
    sort_oldest: "Oldest First",
    loading_board: "Gathering whispers on the board...",
    empty_title: "The Board is Quiet",
    empty_desc: "No confessions in this category yet, or previous messages have naturally vanished.",
    btn_first_post: "Be the First to Post a Message",
    modal_title: "Write Anonymous Note",
    modal_subtitle: "Speak your heart. No names, no judgment.",
    preview_label: "Your Paper Preview:",
    preview_placeholder: "Start typing your confession below...",
    preview_duration_12: "⚡ Lasts 12 Hours",
    preview_duration_24: "⏳ Lasts 24 Hours",
    preview_duration_demo: "⚡ Lasts 1 Minute (Demo)",
    input_label: "Message / Confession / Quote",
    input_placeholder: "Write whatever weighs on your mind, your favorite quote, or a secret you've never told anyone...",
    mood_category_label: "Mood Category",
    paper_color_label: "Sticky Paper Color",
    font_style_label: "Writing Style",
    font_handwriting: "✍️ Casual Handwriting",
    font_serif: "📖 Poetic Novel (Serif)",
    font_monospace: "📟 Retro Typewriter (Mono)",
    font_modern: "📱 Clean Modern (Sans)",
    duration_label: "How long should this message stay before self-destructing?",
    duration_12h: "12 Hours",
    duration_12h_desc: "Brief & quick to vanish",
    duration_24h: "24 Hours",
    duration_24h_desc: "Full day & night",
    duration_demo: "1 Minute",
    duration_demo_desc: "Demo vanish test",
    btn_cancel: "Cancel",
    btn_submit: "Pin to Board",
    btn_submitting: "Pinning...",
    fab_label: "Confess",
    rx_love: "Hug",
    rx_hug: "Relate",
    rx_sad: "Sad",
    rx_fire: "Inspire",
    rx_chill: "Chill",
    rx_click_to_react: "React with {label}",
    rx_click_to_cancel: "Click to cancel {label} reaction",
    admin_pinned: "ADMIN ANNOUNCEMENT",
    pinned_badge: "Pinned",
    time_just_now: "Just now",
    time_minutes_ago: "{m}m ago",
    time_hours_ago: "{h}h ago",
    time_yesterday: "Yesterday",
    btn_copy: "📋 Copy",
    btn_download: "📸 Save",
    btn_report: "Report",
    toast_reported: "Note successfully reported to admin.",
    toast_already_reported: "You have already reported this note.",
    report_prompt: "Reason for reporting this note (optional):",
    toast_posted: "Note successfully pinned to the board!",
    toast_empty_error: "Please write your confession first!",
    toast_copied: "Confession text copied to clipboard!",
    toast_downloaded: "Card image downloaded successfully!",
    toast_theme_changed: "Theme switched to: ",
    toast_rx_cancelled: "Reaction cancelled",
    toast_rx_changed: "Reaction changed to ",
    toast_rx_added: "Reacted with ",
    toast_lang_changed: "Language switched to English",
    vanish_now: "Vanishing now...",
    board_frozen_banner: "❄️ The board is currently frozen by the admin (Read-Only Mode).",
    board_frozen_msg: "The board is currently frozen by the admin. Posting is disabled temporarily.",
    btn_load_more: "Load More Whispers",
    notes_count_info: "Showing {visible} of {total} whispers",
    all_notes_loaded: "✨ All whispers have been loaded",
    toast_anti_spam: "Anti-Spam active. Please wait {sec} seconds before posting again.",
    footer_about: "About Us",
    footer_privacy: "Privacy Policy",
    footer_terms: "Terms of Service",
    footer_contact: "Contact Us",
    footer_copy_desc: "Ephemeral Anonymous Confession Board"
  },
  id: {
    page_title: "Bisik Sementara — Papan Curhat & Pesan Anonim",
    brand_title: "Bisik Sementara",
    brand_tagline: "Papan teks & curhat anonim yang musnah setelah 12–24 jam",
    theme_cork: "Papan Gabus",
    theme_dark: "Ruang Sunyi",
    theme_toggle_title: "Ganti Tampilan Papan",
    btn_post_confession: "Tempel Curhat",
    status_active_notes: "{count} Catatan Aktif",
    banner_notice: "Semua pesan di papan ini bersifat <strong>100% anonim</strong> dan akan <strong>terhapus otomatis</strong> dalam 12–24 jam tanpa rekam jejak.",
    next_cleanup: "Pembersihan terdekat:",
    loading: "Memuat...",
    board_clean: "Papan Bersih",
    cleaning_now: "Sedang membersihkan...",
    cat_all: "✨ Semua",
    cat_curhat: "Galau & Curhat",
    cat_asmara: "Asmara",
    cat_karir: "Karir & Belajar",
    cat_motivasi: "Semangat",
    cat_filosofis: "Rahasia & Filosofis",
    cat_random: "Pikiran Acak",
    search_placeholder: "Cari kata di antara ribuan bisikan...",
    sort_label: "Urutkan:",
    sort_newest: "Terbaru Ditempel",
    sort_popular: "Paling Banyak Reaksi",
    sort_expiring_soon: "⏳ Segera Musnah",
    sort_oldest: "Paling Lama",
    loading_board: "Mengambil bisikan di papan...",
    empty_title: "Papan Masih Sepi",
    empty_desc: "Belum ada curhat dalam kategori ini atau pesan-pesan sebelumnya telah musnah secara alami.",
    btn_first_post: "Jadilah Yang Pertama Menempelkan Pesan",
    modal_title: "Tulis Catatan Anonim",
    modal_subtitle: "Keluarkan isi hatimu. Tak ada nama, tak ada penghakiman.",
    preview_label: "Tampilan Kertas Kamu:",
    preview_placeholder: "Mulai ketik isi curhatmu di bawah...",
    preview_duration_12: "⚡ Bertahan 12 Jam",
    preview_duration_24: "⏳ Bertahan 24 Jam",
    preview_duration_demo: "⚡ Bertahan 1 Menit (Demo Musnah)",
    input_label: "Pesan / Curhat / Kutipan",
    input_placeholder: "Tuliskan apapun yang membebani pikiranmu, kutipan favorit, atau rahasia yang tak pernah kamu ceritakan ke siapapun...",
    mood_category_label: "Kategori Suasana Hati",
    paper_color_label: "Warna Kertas Sticky",
    font_style_label: "Gaya Tulisan",
    font_handwriting: "✍️ Tulisan Tangan (Santai)",
    font_serif: "📖 Novel Puitis (Serif)",
    font_monospace: "📟 Mesin Tik (Nostalgia)",
    font_modern: "📱 Modern Minimalis (Sans)",
    duration_label: "Berapa Lama Pesan Ini Akan Bertahan Sebelum Musnah?",
    duration_12h: "12 Jam",
    duration_12h_desc: "Singkat & cepat lenyap",
    duration_24h: "24 Jam",
    duration_24h_desc: "Sehari semalam penuh",
    duration_demo: "1 Menit",
    duration_demo_desc: "Demo uji coba musnah",
    btn_cancel: "Batal",
    btn_submit: "Tempelkan ke Papan",
    btn_submitting: "Menempelkan...",
    fab_label: "Curhat",
    rx_love: "Peluk",
    rx_hug: "Relate",
    rx_sad: "Sedih",
    rx_fire: "Semangat",
    rx_chill: "Santai",
    rx_click_to_react: "Beri reaksi {label}",
    rx_click_to_cancel: "Klik untuk membatalkan reaksi {label}",
    admin_pinned: "PENGUMUMAN ADMIN",
    pinned_badge: "Disematkan",
    time_just_now: "Baru saja",
    time_minutes_ago: "{m} menit lalu",
    time_hours_ago: "{h} jam lalu",
    time_yesterday: "Kemarin",
    btn_copy: "📋 Salin",
    btn_download: "📸 Unduh",
    btn_report: "Laporkan",
    toast_reported: "Pesan berhasil dilaporkan ke admin.",
    toast_already_reported: "Anda sudah pernah melaporkan pesan ini.",
    report_prompt: "Alasan melaporkan pesan ini (opsional):",
    toast_posted: "Pesan berhasil ditempelkan di papan!",
    toast_empty_error: "Silakan isi pesan curhat terlebih dahulu!",
    toast_copied: "Teks curhat berhasil disalin ke clipboard!",
    toast_downloaded: "Gambar kartu curhat berhasil diunduh!",
    toast_theme_changed: "Mode diganti ke: ",
    toast_rx_cancelled: "Reaksi dibatalkan",
    toast_rx_changed: "Reaksi diganti ke ",
    toast_rx_added: "Memberi reaksi ",
    toast_lang_changed: "Bahasa diganti ke Bahasa Indonesia",
    vanish_now: "Musnah sekarang...",
    board_frozen_banner: "❄️ Papan saat ini sedang dibekukan oleh admin (Mode Baca Saja).",
    board_frozen_msg: "Papan sedang dibekukan oleh admin. Tidak dapat menempel pesan baru sementara waktu.",
    btn_load_more: "Muat Lebih Banyak",
    notes_count_info: "Menampilkan {visible} dari {total} bisikan",
    all_notes_loaded: "✨ Semua bisikan telah ditampilkan",
    toast_anti_spam: "Fitur Anti-Spam aktif. Harap tunggu {sec} detik lagi sebelum menempel pesan berikutnya.",
    footer_about: "Tentang Kami",
    footer_privacy: "Kebijakan Privasi",
    footer_terms: "Syarat Layanan",
    footer_contact: "Kontak",
    footer_copy_desc: "Papan Curhat & Pesan Anonim Sementara"
  },
  es: {
    page_title: "Muro de Susurros — Confesiones Anónimas Efímeras",
    brand_title: "Muro de Susurros",
    brand_tagline: "Tablón anónimo de pensamientos que desaparecen en 12–24 horas",
    theme_cork: "Tablón de Corcho",
    theme_dark: "Sala Silenciosa",
    theme_toggle_title: "Cambiar tema",
    btn_post_confession: "Pegar Confesión",
    status_active_notes: "{count} Notas Activas",
    banner_notice: "Todos los mensajes son <strong>100% anónimos</strong> y se <strong>eliminarán automáticamente</strong> en 12–24 horas sin dejar rastro.",
    next_cleanup: "Próxima limpieza:",
    loading: "Cargando...",
    board_clean: "Tablero Limpio",
    cleaning_now: "Limpiando ahora...",
    cat_all: "✨ Todo",
    cat_curhat: "Desahogo",
    cat_asmara: "Romance",
    cat_karir: "Carrera y Estudio",
    cat_motivasi: "Esperanza",
    cat_filosofis: "Secretos",
    cat_random: "Pensamientos",
    search_placeholder: "Buscar entre los susurros...",
    sort_label: "Ordenar por:",
    sort_newest: "Más reciente",
    sort_popular: "Más reacciones",
    sort_expiring_soon: "⏳ Por expirar",
    sort_oldest: "Más antiguo",
    loading_board: "Recopilando notas...",
    empty_title: "El tablero está en silencio",
    empty_desc: "Aún no hay confesiones en esta categoría o los mensajes expiraron.",
    btn_first_post: "Sé el primero en dejar un mensaje",
    modal_title: "Escribir Nota Anónima",
    modal_subtitle: "Abre tu corazón. Sin nombres, sin juicios.",
    preview_label: "Vista previa del papel:",
    preview_placeholder: "Comienza a escribir aquí abajo...",
    preview_duration_12: "⚡ Dura 12 Horas",
    preview_duration_24: "⏳ Dura 24 Horas",
    preview_duration_demo: "⚡ Dura 1 Minuto (Demo)",
    input_label: "Mensaje / Desahogo / Cita",
    input_placeholder: "Escribe lo que pase por tu mente, una cita o un secreto...",
    mood_category_label: "Categoría de Estado de Ánimo",
    paper_color_label: "Color del Papel",
    font_style_label: "Estilo de Letra",
    font_handwriting: "✍️ Manuscrita (Casual)",
    font_serif: "📖 Poética (Serif)",
    font_monospace: "📟 Máquina de escribir",
    font_modern: "📱 Moderna (Sans)",
    duration_label: "¿Cuánto tiempo durará este mensaje?",
    duration_12h: "12 Horas",
    duration_12h_desc: "Breve y rápido",
    duration_24h: "24 Horas",
    duration_24h_desc: "Un día y noche completo",
    duration_demo: "1 Minuto",
    duration_demo_desc: "Prueba rápida demo",
    btn_cancel: "Cancelar",
    btn_submit: "Pegar en el Tablón",
    btn_submitting: "Pegando...",
    fab_label: "Confesar",
    rx_love: "Abrazo",
    rx_hug: "Identifico",
    rx_sad: "Triste",
    rx_fire: "Ánimo",
    rx_chill: "Tranqui",
    rx_click_to_react: "Reaccionar con {label}",
    rx_click_to_cancel: "Cancelar reacción {label}",
    admin_pinned: "ANUNCIO DEL ADMIN",
    pinned_badge: "Fijado",
    time_just_now: "Recién ahora",
    time_minutes_ago: "hace {m}m",
    time_hours_ago: "hace {h}h",
    time_yesterday: "Ayer",
    btn_copy: "📋 Copiar",
    btn_download: "📸 Guardar",
    btn_report: "Reportar",
    toast_reported: "Nota reportada al administrador.",
    toast_already_reported: "Ya has reportado esta nota.",
    report_prompt: "Motivo del reporte (opcional):",
    toast_posted: "¡Nota pegada con éxito en el tablón!",
    toast_empty_error: "¡Por favor escribe tu mensaje primero!",
    toast_copied: "¡Texto copiado al portapapeles!",
    toast_downloaded: "¡Imagen descargada con éxito!",
    toast_theme_changed: "Tema cambiado a: ",
    toast_rx_cancelled: "Reacción cancelada",
    toast_rx_changed: "Reacción cambiada a ",
    toast_rx_added: "Reaccionaste con ",
    toast_lang_changed: "Idioma cambiado a Español",
    vanish_now: "Desapareciendo...",
    board_frozen_banner: "❄️ El tablón está congelado por el administrador (Modo solo lectura).",
    board_frozen_msg: "El tablón está congelado por el administrador. El envío está deshabilitado temporalmente.",
    btn_load_more: "Cargar Más Susurros",
    notes_count_info: "Mostrando {visible} de {total} susurros",
    all_notes_loaded: "✨ Todos los susurros han sido cargados",
    toast_anti_spam: "Función Anti-Spam activa. Por favor espere {sec} segundos antes de publicar de nuevo.",
    footer_about: "Sobre Nosotros",
    footer_privacy: "Política de Privacidad",
    footer_terms: "Términos de Servicio",
    footer_contact: "Contacto",
    footer_copy_desc: "Tablero Efímero de Mensajes Anónimos"
  },
  fr: {
    page_title: "Mur de Chuchotements — Confessions Éphémères",
    brand_title: "Mur de Chuchotements",
    brand_tagline: "Tableau de pensées anonymes disparaissant après 12–24h",
    theme_cork: "Tableau en Liège",
    theme_dark: "Chambre Silencieuse",
    theme_toggle_title: "Changer de thème",
    btn_post_confession: "Épingler un Message",
    status_active_notes: "{count} Notes Actives",
    banner_notice: "Tous les messages sont <strong>100% anonymes</strong> et <strong>disparaîtront automatiquement</strong> en 12–24 heures sans trace.",
    next_cleanup: "Prochain nettoyage :",
    loading: "Chargement...",
    board_clean: "Tableau vide",
    cleaning_now: "Nettoyage en cours...",
    cat_all: "✨ Tout",
    cat_curhat: "Confidences",
    cat_asmara: "Amour",
    cat_karir: "Carrière & Études",
    cat_motivasi: "Espoir",
    cat_filosofis: "Secrets",
    cat_random: "Pensées aléatoires",
    search_placeholder: "Chercher dans les chuchotements...",
    sort_label: "Trier par :",
    sort_newest: "Plus récents",
    sort_popular: "Plus populaires",
    sort_expiring_soon: "⏳ Expire bientôt",
    sort_oldest: "Plus anciens",
    loading_board: "Chargement des messages...",
    empty_title: "Le tableau est silencieux",
    empty_desc: "Aucune confession pour le moment ou les messages ont disparu.",
    btn_first_post: "Soyez le premier à poster",
    modal_title: "Écrire une Note Anonyme",
    modal_subtitle: "Parlez avec le cœur. Aucun nom, aucun jugement.",
    preview_label: "Aperçu de la note :",
    preview_placeholder: "Commencez à écrire ci-dessous...",
    preview_duration_12: "⚡ Dure 12 Heures",
    preview_duration_24: "⏳ Dure 24 Heures",
    preview_duration_demo: "⚡ Dure 1 Minute (Test)",
    input_label: "Message / Confession / Citation",
    input_placeholder: "Écrivez ce qui vous pèse, une citation ou un secret...",
    mood_category_label: "Catégorie d'ambiance",
    paper_color_label: "Couleur du papier",
    font_style_label: "Style d'écriture",
    font_handwriting: "✍️ Manuscrite (Décontractée)",
    font_serif: "📖 Poétique (Serif)",
    font_monospace: "📟 Machine à écrire",
    font_modern: "📱 Moderne (Sans)",
    duration_label: "Combien de temps avant la disparition ?",
    duration_12h: "12 Heures",
    duration_12h_desc: "Bref et rapide",
    duration_24h: "24 Heures",
    duration_24h_desc: "Une journée complète",
    duration_demo: "1 Minute",
    duration_demo_desc: "Test de disparition rapide",
    btn_cancel: "Annuler",
    btn_submit: "Épingler au Tableau",
    btn_submitting: "Épinglage...",
    fab_label: "Confesser",
    rx_love: "Cœur",
    rx_hug: "Soutien",
    rx_sad: "Triste",
    rx_fire: "Force",
    rx_chill: "Détente",
    rx_click_to_react: "Réagir avec {label}",
    rx_click_to_cancel: "Annuler la réaction {label}",
    admin_pinned: "ANNONCE ADMIN",
    pinned_badge: "Épinglé",
    time_just_now: "À l'instant",
    time_minutes_ago: "il y a {m} min",
    time_hours_ago: "il y a {h} h",
    time_yesterday: "Hier",
    btn_copy: "📋 Copier",
    btn_download: "📸 Image",
    btn_report: "Signaler",
    toast_reported: "Message signalé à l'administrateur.",
    toast_already_reported: "Vous avez déjà signalé ce message.",
    report_prompt: "Raison du signalement (optionnel) :",
    toast_posted: "Message épinglé avec succès !",
    toast_empty_error: "Veuillez écrire votre message d'abord !",
    toast_copied: "Texte copié dans le presse-papiers !",
    toast_downloaded: "Image téléchargée avec succès !",
    toast_theme_changed: "Thème changé pour : ",
    toast_rx_cancelled: "Réaction annulée",
    toast_rx_changed: "Réaction changée en ",
    toast_rx_added: "Réaction ajoutée : ",
    toast_lang_changed: "Langue changée en Français",
    vanish_now: "Disparaît maintenant...",
    board_frozen_banner: "❄️ Le tableau est actuellement gelé par l'administrateur (Mode lecture seule).",
    board_frozen_msg: "Le tableau est actuellement gelé par l'administrateur. L'envoi est temporairement désactivé.",
    btn_load_more: "Charger Plus de Chuchotements",
    notes_count_info: "Affichage de {visible} sur {total} chuchotements",
    all_notes_loaded: "✨ Tous les chuchotements ont été affichés",
    toast_anti_spam: "Anti-Spam actif. Veuillez attendre {sec} secondes avant de publier à nouveau.",
    footer_about: "À Propos",
    footer_privacy: "Politique de Confidentialité",
    footer_terms: "Conditions d'Utilisation",
    footer_contact: "Contact",
    footer_copy_desc: "Tableau Éphémère de Confessions Anonymes"
  },
  de: {
    page_title: "Flüsterwand — Vergängliche Anonyme Beichten",
    brand_title: "Flüsterwand",
    brand_tagline: "Anonyme Gedanken, die nach 12–24 Stunden spurlos verschwinden",
    theme_cork: "Pinnwand",
    theme_dark: "Ruhiger Raum",
    theme_toggle_title: "Design wechseln",
    btn_post_confession: "Notiz Anheften",
    status_active_notes: "{count} Aktive Notizen",
    banner_notice: "Alle Nachrichten sind <strong>100% anonym</strong> und werden nach 12–24 Stunden <strong>automatisch gelöscht</strong>.",
    next_cleanup: "Nächste Löschung:",
    loading: "Wird geladen...",
    board_clean: "Pinnwand leer",
    cleaning_now: "Wird bereinigt...",
    cat_all: "✨ Alle",
    cat_curhat: "Kummerkasten",
    cat_asmara: "Liebe",
    cat_karir: "Karriere & Lernen",
    cat_motivasi: "Hoffnung",
    cat_filosofis: "Geheimnisse",
    cat_random: "Zufälliges",
    search_placeholder: "Im Geflüster suchen...",
    sort_label: "Sortieren nach:",
    sort_newest: "Neueste",
    sort_popular: "Beliebteste",
    sort_expiring_soon: "⏳ Läuft bald ab",
    sort_oldest: "Älteste",
    loading_board: "Lade Notizen...",
    empty_title: "Die Pinnwand ist still",
    empty_desc: "Noch keine Notizen in dieser Kategorie oder frühere sind bereits vergangen.",
    btn_first_post: "Hinterlasse die erste Notiz",
    modal_title: "Anonyme Notiz Verfassen",
    modal_subtitle: "Sprich dein Herz aus. Ohne Namen, ohne Vorurteile.",
    preview_label: "Notiz-Vorschau:",
    preview_placeholder: "Schreibe deine Gedanken hier...",
    preview_duration_12: "⚡ Hält 12 Stunden",
    preview_duration_24: "⏳ Hält 24 Stunden",
    preview_duration_demo: "⚡ Hält 1 Minute (Test)",
    input_label: "Nachricht / Gedanke / Zitat",
    input_placeholder: "Schreibe, was dich beschäftigt oder ein Geheimnis...",
    mood_category_label: "Stimmungskategorie",
    paper_color_label: "Papierfarbe",
    font_style_label: "Schreibstil",
    font_handwriting: "✍️ Handschrift",
    font_serif: "📖 Buchschrift (Serif)",
    font_monospace: "📟 Schreibmaschine",
    font_modern: "📱 Modern (Sans)",
    duration_label: "Wie lange soll diese Notiz bestehen?",
    duration_12h: "12 Stunden",
    duration_12h_desc: "Kurz & flüchtig",
    duration_24h: "24 Stunden",
    duration_24h_desc: "Ein ganzer Tag",
    duration_demo: "1 Minute",
    duration_demo_desc: "Schnelltest-Modus",
    btn_cancel: "Abbrechen",
    btn_submit: "Anheften",
    btn_submitting: "Wird angeheftet...",
    fab_label: "Beichten",
    rx_love: "Umarmung",
    rx_hug: "Verstehe dich",
    rx_sad: "Traurig",
    rx_fire: "Mut",
    rx_chill: "Entspannt",
    rx_click_to_react: "Mit {label} reagieren",
    rx_click_to_cancel: "Reaktion {label} zurücknehmen",
    admin_pinned: "ADMIN ANKÜNDIGUNG",
    pinned_badge: "Angeheftet",
    time_just_now: "Gerade eben",
    time_minutes_ago: "vor {m} Min.",
    time_hours_ago: "vor {h} Std.",
    time_yesterday: "Gestern",
    btn_copy: "📋 Kopieren",
    btn_download: "📸 Speichern",
    btn_report: "Melden",
    toast_reported: "Notiz an den Admin gemeldet.",
    toast_already_reported: "Du hast diese Notiz bereits gemeldet.",
    report_prompt: "Grund für die Meldung (optional):",
    toast_posted: "Notiz erfolgreich an die Pinnwand geheftet!",
    toast_empty_error: "Bitte gib zuerst einen Text ein!",
    toast_copied: "Text in die Zwischenablage kopiert!",
    toast_downloaded: "Bild erfolgreich gespeichert!",
    toast_theme_changed: "Design gewechselt zu: ",
    toast_rx_cancelled: "Reaktion entfernt",
    toast_rx_changed: "Reaktion geändert auf ",
    toast_rx_added: "Reagiert mit ",
    toast_lang_changed: "Sprache zu Deutsch geändert",
    vanish_now: "Vergeht jetzt...",
    board_frozen_banner: "❄️ Die Pinnwand ist derzeit vom Admin eingefroren (Nur-Lese-Modus).",
    board_frozen_msg: "Die Pinnwand ist derzeit vom Admin eingefroren. Neue Notizen sind vorübergehend deaktiviert.",
    btn_load_more: "Mehr Notizen Laden",
    notes_count_info: "Zeige {visible} von {total} Notizen",
    all_notes_loaded: "✨ Alle Notizen wurden geladen",
    toast_anti_spam: "Anti-Spam aktiv. Bitte warte noch {sec} Sekunden, bevor du erneut postest.",
    footer_about: "Über Uns",
    footer_privacy: "Datenschutzerklärung",
    footer_terms: "Nutzungsbedingungen",
    footer_contact: "Kontakt",
    footer_copy_desc: "Vergängliche anonyme Beicht-Pinnwand"
  },
  ja: {
    page_title: "ささやきの壁 — 12〜24時間で消える匿名の告白板",
    brand_title: "ささやきの壁",
    brand_tagline: "12〜24時間後に跡形もなく消える匿名の言葉たち",
    theme_cork: "コルクボード",
    theme_dark: "静寂の間",
    theme_toggle_title: "テーマを切り替え",
    btn_post_confession: "告白を貼る",
    status_active_notes: "{count} 件のノート",
    banner_notice: "この掲示板のメッセージはすべて<strong>完全匿名</strong>で、12〜24時間後に<strong>自動消滅</strong>します。",
    next_cleanup: "次の消去まで:",
    loading: "読み込み中...",
    board_clean: "ボードは空です",
    cleaning_now: "消去実行中...",
    cat_all: "✨ すべて",
    cat_curhat: "つぶやき・悩み",
    cat_asmara: "恋愛",
    cat_karir: "仕事・勉強",
    cat_motivasi: "前向き・希望",
    cat_filosofis: "秘密・思考",
    cat_random: "気まぐれ",
    search_placeholder: "ささやきを検索...",
    sort_label: "並び替え:",
    sort_newest: "新着順",
    sort_popular: "人気順",
    sort_expiring_soon: "⏳ 間もなく消滅",
    sort_oldest: "古い順",
    loading_board: "メッセージを取得中...",
    empty_title: "静かなボードです",
    empty_desc: "このカテゴリーにはまだ投稿がないか、自然に消滅しました。",
    btn_first_post: "最初のメッセージを投稿する",
    modal_title: "匿名のメッセージを書く",
    modal_subtitle: "心の内をそっと吐き出してください。名前も批判もありません。",
    preview_label: "ノートのプレビュー:",
    preview_placeholder: "ここに入力した内容が表示されます...",
    preview_duration_12: "⚡ 12時間残る",
    preview_duration_24: "⏳ 24時間残る",
    preview_duration_demo: "⚡ 1分で消える (デモ)",
    input_label: "メッセージ / 悩み / 引用",
    input_placeholder: "誰にも言えない秘密、好きな言葉、心に浮かんだことを自由に書いてください...",
    mood_category_label: "カテゴリー",
    paper_color_label: "付箋の色",
    font_style_label: "文字スタイル",
    font_handwriting: "✍️ 手書き風 (リラックス)",
    font_serif: "📖 小説風 (明朝)",
    font_monospace: "📟 タイプライター風",
    font_modern: "📱 モダン (ゴシック)",
    duration_label: "消滅するまでの時間",
    duration_12h: "12 時間",
    duration_12h_desc: "短くあっという間に消滅",
    duration_24h: "24 時間",
    duration_24h_desc: "丸一日じっくり残る",
    duration_demo: "1 分間",
    duration_demo_desc: "消滅デモ用テスト",
    btn_cancel: "キャンセル",
    btn_submit: "ボードに貼る",
    btn_submitting: "貼っています...",
    fab_label: "書く",
    rx_love: "共感",
    rx_hug: "ハグ",
    rx_sad: "涙",
    rx_fire: "応援",
    rx_chill: "まったり",
    rx_click_to_react: "{label} でリアクション",
    rx_click_to_cancel: "{label} のリアクションを取り消す",
    admin_pinned: "管理者のお知らせ",
    pinned_badge: "固定",
    time_just_now: "たった今",
    time_minutes_ago: "{m}分前",
    time_hours_ago: "{h}時間前",
    time_yesterday: "昨日",
    btn_copy: "📋 コピー",
    btn_download: "📸 画像保存",
    btn_report: "通報",
    toast_reported: "管理者に通報しました。",
    toast_already_reported: "このノートはすでに通報済みです。",
    report_prompt: "通報の理由（任意）:",
    toast_posted: "メッセージがボードに貼られました！",
    toast_empty_error: "メッセージを入力してください！",
    toast_copied: "クリップボードにコピーしました！",
    toast_downloaded: "カード画像を保存しました！",
    toast_theme_changed: "テーマを変更しました: ",
    toast_rx_cancelled: "リアクションを解除しました",
    toast_rx_changed: "リアクションを変更しました: ",
    toast_rx_added: "リアクションしました: ",
    toast_lang_changed: "言語を日本語に切り替えました",
    vanish_now: "まもなく消滅...",
    board_frozen_banner: "❄️ 掲示板は現在管理者によって凍結されています（閲覧専用モード）。",
    board_frozen_msg: "掲示板は現在管理者によって凍結されています。一時的に投稿できません。",
    btn_load_more: "もっと読み込む",
    notes_count_info: "{total} 件中 {visible} 件を表示",
    all_notes_loaded: "✨ すべてのささやきを表示しました",
    toast_anti_spam: "連投防止機能が有効です。次の投稿まであと {sec} 秒お待ちください。",
    footer_about: "当サイトについて",
    footer_privacy: "プライバシーポリシー",
    footer_terms: "利用規約",
    footer_contact: "お問い合わせ",
    footer_copy_desc: "消滅型匿名メッセージボード"
  },
  zh: {
    page_title: "耳语之墙 — 12至24小时限时匿名留言板",
    brand_title: "耳语之墙",
    brand_tagline: "在12至24小时后不留痕迹彻底消散的匿名心声",
    theme_cork: "软木板",
    theme_dark: "静谧之间",
    theme_toggle_title: "切换主题",
    btn_post_confession: "贴上心声",
    status_active_notes: "{count} 条心声",
    banner_notice: "所有留言均为<strong>100%完全匿名</strong>，并在12至24小时后<strong>自动彻底清除</strong>，不留痕迹。",
    next_cleanup: "下次清理:",
    loading: "加载中...",
    board_clean: "留言板暂无内容",
    cleaning_now: "正在清理过期留言...",
    cat_all: "✨ 全部",
    cat_curhat: "倾诉心事",
    cat_asmara: "恋爱心语",
    cat_karir: "学业工作",
    cat_motivasi: "鼓励希望",
    cat_filosofis: "秘密哲学",
    cat_random: "碎碎念",
    search_placeholder: "在耳语中搜索关键词...",
    sort_label: "排序方式:",
    sort_newest: "最新贴上",
    sort_popular: "最多共鸣",
    sort_expiring_soon: "⏳ 即将消散",
    sort_oldest: "最早发布",
    loading_board: "正在获取留言...",
    empty_title: "留言板静悄悄",
    empty_desc: "该分类下暂无留言，或之前的消息已随时间自然消散。",
    btn_first_post: "成为第一个张贴留言的人",
    modal_title: "书写匿名纸条",
    modal_subtitle: "倾吐你心中的千言万语，没有姓名，没有评判。",
    preview_label: "纸条实时预览:",
    preview_placeholder: "开始在下方输入你的心声...",
    preview_duration_12: "⚡ 保存 12 小时",
    preview_duration_24: "⏳ 保存 24 小时",
    preview_duration_demo: "⚡ 1 分钟后消散 (演示)",
    input_label: "留言 / 倾诉 / 摘抄",
    input_placeholder: "写下压在你心头的心事、最喜欢的句子，或者从未向任何人倾诉的秘密...",
    mood_category_label: "心情分类",
    paper_color_label: "便签纸颜色",
    font_style_label: "书写字体",
    font_handwriting: "✍️ 随性手写",
    font_serif: "📖 文艺宋体",
    font_monospace: "📟 复古打字机",
    font_modern: "📱 极简黑体",
    duration_label: "这条留言保存多久后自我销毁？",
    duration_12h: "12 小时",
    duration_12h_desc: "短暂停留，迅速消散",
    duration_24h: "24 小时",
    duration_24h_desc: "留存整整一天一夜",
    duration_demo: "1 分钟",
    duration_demo_desc: "销毁演示测试",
    btn_cancel: "取消",
    btn_submit: "贴到留言板",
    btn_submitting: "正在张贴...",
    fab_label: "倾诉",
    rx_love: "拥抱",
    rx_hug: "懂你",
    rx_sad: "难过",
    rx_fire: "加油",
    rx_chill: "释怀",
    rx_click_to_react: "给予 {label} 共鸣",
    rx_click_to_cancel: "取消 {label} 共鸣",
    admin_pinned: "管理员置顶公告",
    pinned_badge: "置顶",
    time_just_now: "刚刚",
    time_minutes_ago: "{m}分钟前",
    time_hours_ago: "{h}小时前",
    time_yesterday: "昨天",
    btn_copy: "📋 复制",
    btn_download: "📸 存图",
    btn_report: "举报",
    toast_reported: "已向管理员举报该留言。",
    toast_already_reported: "你已经举报过这条留言了。",
    report_prompt: "举报原因（选填）:",
    toast_posted: "留言已成功贴在黑板上！",
    toast_empty_error: "请先填写你的心声内容！",
    toast_copied: "文字已成功复制到剪贴板！",
    toast_downloaded: "便签卡片图片下载成功！",
    toast_theme_changed: "主题已切换为: ",
    toast_rx_cancelled: "已取消共鸣",
    toast_rx_changed: "共鸣已改为: ",
    toast_rx_added: "已给予共鸣: ",
    toast_lang_changed: "语言已切换为简体中文",
    vanish_now: "正在消散...",
    board_frozen_banner: "❄️ 留言板目前已被管理员置为冻结状态（只读模式）。",
    board_frozen_msg: "留言板目前已被管理员冻结，暂时无法张贴新心声。",
    btn_load_more: "加载更多心声",
    notes_count_info: "显示 {visible} / {total} 条心声",
    all_notes_loaded: "✨ 已显示全部心声",
    toast_anti_spam: "防刷屏机制已生效。请等待 {sec} 秒后再张贴下一条心声。",
    footer_about: "关于我们",
    footer_privacy: "隐私政策",
    footer_terms: "服务条款",
    footer_contact: "联系我们",
    footer_copy_desc: "限时完全匿名留言板"
  },
  ar: {
    page_title: "جدار الهمسات — اعترافات مجهولة مؤقتة",
    brand_title: "جدار الهمسات",
    brand_tagline: "خواطر واعترافات مجهولة تتلاشى تلقائيًا خلال 12-24 ساعة",
    theme_cork: "لوح الفلين",
    theme_dark: "الغرفة الهادئة",
    theme_toggle_title: "تغيير مظهر اللوح",
    btn_post_confession: "تثبيت اعتراف",
    status_active_notes: "{count} ملاحظات نشطة",
    banner_notice: "جميع الرسائل <strong>مجهولة المصدر 100%</strong> وتختفي <strong>تلقائيًا</strong> خلال 12-24 ساعة دون أي أثر.",
    next_cleanup: "التنظيف القادم:",
    loading: "جارٍ التحميل...",
    board_clean: "اللوح فارغ",
    cleaning_now: "جارٍ التنظيف...",
    cat_all: "✨ الكل",
    cat_curhat: "فضفضة",
    cat_asmara: "حب",
    cat_karir: "دراسة وعمل",
    cat_motivasi: "أمل وتحفيز",
    cat_filosofis: "أسرار وفلسفة",
    cat_random: "خواطر عشوائية",
    search_placeholder: "ابحث في الهمسات...",
    sort_label: "ترتيب حسب:",
    sort_newest: "الأحدث",
    sort_popular: "الأكثر تفاعلاً",
    sort_expiring_soon: "⏳ سينتهي قريبًا",
    sort_oldest: "الأقدم",
    loading_board: "جارٍ جمع الهمسات...",
    empty_title: "اللوح هادئ تماماً",
    empty_desc: "لا توجد رسائل في هذا القسم حاليًا أو انتهت صلاحيتها.",
    btn_first_post: "كن أول من يثبت رسالة هنا",
    modal_title: "كتابة ملاحظة مجهولة",
    modal_subtitle: "تحدث بحرية من قلبك. بلا أسماء، بلا أحكام.",
    preview_label: "معاينة الورقة:",
    preview_placeholder: "ابدأ بكتابة كلماتك بالأسفل...",
    preview_duration_12: "⚡ تدوم 12 ساعة",
    preview_duration_24: "⏳ تدوم 24 ساعة",
    preview_duration_demo: "⚡ تدوم دقيقة واحدة (تجربة)",
    input_label: "رسالة / اعتراف / اقتباس",
    input_placeholder: "اكتب ما يجول في خاطرك، اقتباسك المفضل، أو سرًا لم تقله لأحد...",
    mood_category_label: "التصنيف",
    paper_color_label: "لون الورقة",
    font_style_label: "نمط الخط",
    font_handwriting: "✍️ خط يدوي",
    font_serif: "📖 خط كلاسيكي",
    font_monospace: "📟 آلة كاتبة",
    font_modern: "📱 حديث وبسيط",
    duration_label: "كم المدة قبل أن تختفي هذه الملاحظة؟",
    duration_12h: "12 ساعة",
    duration_12h_desc: "قصيرة وسريعة الزوال",
    duration_24h: "24 ساعة",
    duration_24h_desc: "يوم وليلة كاملة",
    duration_demo: "دقيقة واحدة",
    duration_demo_desc: "تجربة سريعة للتلاشي",
    btn_cancel: "إلغاء",
    btn_submit: "تثبيت على اللوح",
    btn_submitting: "جارٍ التثبيت...",
    fab_label: "فضفضة",
    rx_love: "عناق",
    rx_hug: "أشعر بك",
    rx_sad: "حزن",
    rx_fire: "حماس",
    rx_chill: "هدوء",
    rx_click_to_react: "تفاعل بـ {label}",
    rx_click_to_cancel: "إلغاء التفاعل {label}",
    admin_pinned: "إعلان المشرف",
    pinned_badge: "مثبت",
    time_just_now: "الآن",
    time_minutes_ago: "منذ {m} د",
    time_hours_ago: "منذ {h} س",
    time_yesterday: "أمس",
    btn_copy: "📋 نسخ",
    btn_download: "📸 حفظ صورة",
    btn_report: "إبلاغ",
    toast_reported: "تم إرسال البلاغ إلى المشرف.",
    toast_already_reported: "لقد أبلغت عن هذه الرسالة مسبقًا.",
    report_prompt: "سبب الإبلاغ عن هذه الرسالة (اختياري):",
    toast_posted: "تم تثبيت الرسالة بنجاح على اللوح!",
    toast_empty_error: "يرجى كتابة اعترافك أولاً!",
    toast_copied: "تم نسخ النص إلى الحافظة!",
    toast_downloaded: "تم تنزيل بطاقة الصورة بنجاح!",
    toast_theme_changed: "تم تغيير المظهر إلى: ",
    toast_rx_cancelled: "تم إلغاء التفاعل",
    toast_rx_changed: "تم تغيير التفاعل إلى ",
    toast_rx_added: "تفاعلت بـ ",
    toast_lang_changed: "تم تغيير اللغة إلى العربية",
    vanish_now: "تتلاشى الآن...",
    board_frozen_banner: "❄️ اللوح مجمد حاليًا بواسطة المشرف (وضع القراءة فقط).",
    board_frozen_msg: "اللوح مجمد حاليًا بواسطة المشرف. النشر معطل مؤقتًا.",
    btn_load_more: "تحميل المزيد من الهمسات",
    notes_count_info: "عرض {visible} من أصل {total} همسة",
    all_notes_loaded: "✨ تم عرض جميع الهمسات",
    toast_anti_spam: "ميزة منع التكرار نشطة. يرجى الانتظار {sec} ثوانٍ قبل نشر الرسالة التالية.",
    footer_about: "من نحن",
    footer_privacy: "سياسة الخصوصية",
    footer_terms: "شروط الخدمة",
    footer_contact: "اتصل بنا",
    footer_copy_desc: "جدار الهمسات والاعترافات المجهولة المؤقتة"
  }
};

// Application State
const STATE = {
  lang: localStorage.getItem('papan_lang') || 'en', // Default English
  notes: [],
  activeCategory: 'all',
  searchQuery: '',
  sortBy: 'newest',
  currentTheme: localStorage.getItem('papan_theme') || 'cork',
  userReactions: JSON.parse(localStorage.getItem('papan_user_reactions') || '{}'),
  reportedNotes: JSON.parse(localStorage.getItem('papan_reported_notes') || '{}'),
  boardFrozen: false,
  maxCharLimit: 400,
  spamCooldownSeconds: 60,
  visibleCount: 12,
  notesPerPage: 12,
  timerInterval: null,
  pollInterval: null
};

// Helper to get translated string
function t(key, vars = {}) {
  const dict = TRANSLATIONS[STATE.lang] || TRANSLATIONS.en;
  let text = dict[key] || TRANSLATIONS.en[key] || key;
  for (const [varKey, varVal] of Object.entries(vars)) {
    text = text.replaceAll(`{${varKey}}`, varVal);
  }
  return text;
}

// Category Configuration (keys match translations)
const CATEGORY_MAP = {
  curhat: { key: 'cat_curhat', icon: '💔' },
  asmara: { key: 'cat_asmara', icon: '💕' },
  karir: { key: 'cat_karir', icon: '💼' },
  motivasi: { key: 'cat_motivasi', icon: '🌱' },
  filosofis: { key: 'cat_filosofis', icon: '🤫' },
  random: { key: 'cat_random', icon: '☕' }
};

// Reactions definitions
const REACTIONS = [
  { type: 'love', icon: '❤️', key: 'rx_love' },
  { type: 'hug', icon: '🫂', key: 'rx_hug' },
  { type: 'sad', icon: '🌧️', key: 'rx_sad' },
  { type: 'fire', icon: '🔥', key: 'rx_fire' },
  { type: 'chill', icon: '☕', key: 'rx_chill' }
];

// Web Audio API Sound Effects Synthesizer
class SoundEffects {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
  }

  playStick() {
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(140, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(40, this.ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.4, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.15);
    } catch (e) {}
  }

  playPop() {
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(580, this.ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.1);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.1);
    } catch (e) {}
  }

  playBurn() {
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(180, this.ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(60, this.ctx.currentTime + 0.4);
      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.4);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.4);
    } catch (e) {}
  }
}

const sfx = new SoundEffects();

// Helper: Format Countdown
function formatRemainingTime(ms) {
  if (ms <= 0) return t('vanish_now');
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${hours}h ${minutes.toString().padStart(2, '0')}m ${seconds.toString().padStart(2, '0')}s`;
  }
  if (minutes > 0) {
    return `${minutes}m ${seconds.toString().padStart(2, '0')}s`;
  }
  return `${seconds}s`;
}

// Helper: Format Relative Time
function formatRelativeTime(timestamp) {
  const diffSec = Math.floor((Date.now() - timestamp) / 1000);
  if (diffSec < 60) return t('time_just_now');
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return t('time_minutes_ago', { m: diffMin });
  const diffHours = Math.floor(diffMin / 60);
  if (diffHours < 24) return t('time_hours_ago', { h: diffHours });
  return t('time_yesterday');
}

// Toast Notification
function showToast(message, icon = '✨') {
  const container = document.getElementById('toastContainer');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// DOM Elements
const notesBoard = document.getElementById('notesBoard');
const boardLoading = document.getElementById('boardLoading');
const boardEmpty = document.getElementById('boardEmpty');
const loadMoreContainer = document.getElementById('loadMoreContainer');
const loadMoreCounter = document.getElementById('loadMoreCounter');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const loadMoreBtnText = document.getElementById('loadMoreBtnText');
const allLoadedText = document.getElementById('allLoadedText');
const searchInput = document.getElementById('searchInput');
const clearSearchBtn = document.getElementById('clearSearchBtn');
const sortSelect = document.getElementById('sortSelect');
const categoryTabs = document.getElementById('categoryTabs');
const activeNotesCountEl = document.getElementById('activeNotesCount');
const nextExpiringValEl = document.getElementById('nextExpiringVal');
const nextExpiringLabelEl = document.getElementById('nextExpiringLabel');
const bannerNoticeText = document.getElementById('bannerNoticeText');
const themeToggleBtn = document.getElementById('themeToggleBtn');
const themeIcon = document.getElementById('themeIcon');
const themeLabel = document.getElementById('themeLabel');
const langSelect = document.getElementById('langSelect');

// Modal Elements
const writeModal = document.getElementById('writeModal');
const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const cancelModalBtn = document.getElementById('cancelModalBtn');
const writeForm = document.getElementById('writeForm');
const noteContent = document.getElementById('noteContent');
const charCount = document.getElementById('charCount');
const fontSelect = document.getElementById('fontSelect');
const colorPicker = document.getElementById('colorPicker');

// Preview Elements
const stickyPreview = document.getElementById('stickyPreview');
const previewCategoryBadge = document.getElementById('previewCategoryBadge');
const previewText = document.getElementById('previewText');
const previewTimerBadge = document.getElementById('previewTimerBadge');

// ============================================================
// LANGUAGE / i18n ENGINE
// ============================================================
function setLanguage(lang, showNotification = false) {
  if (!TRANSLATIONS[lang]) lang = 'en';
  STATE.lang = lang;
  localStorage.setItem('papan_lang', lang);

  // Set HTML lang & text direction (for Arabic)
  document.documentElement.lang = lang;
  document.documentElement.dir = (lang === 'ar') ? 'rtl' : 'ltr';

  // Update lang dropdown value if it differs
  if (langSelect && langSelect.value !== lang) {
    langSelect.value = lang;
  }

  // Update Page Title
  document.title = t('page_title');

  // Translate all [data-i18n] elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.innerHTML = t(key);
  });

  // Translate [data-i18n-placeholder]
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    el.setAttribute('placeholder', t(key));
  });

  // Translate banner text
  if (bannerNoticeText) {
    bannerNoticeText.innerHTML = t('banner_notice');
  }

  // Update next cleanup label
  if (nextExpiringLabelEl) {
    nextExpiringLabelEl.textContent = t('next_cleanup');
  }

  // Update Theme Label
  updateThemeButton();

  // Update live preview in modal
  updateLivePreview();

  // Re-render notes so cards, reactions, timestamps translate
  renderNotes();
  updateStats();

  if (showNotification) {
    showToast(t('toast_lang_changed'), '🌐');
  }
}

// Update Theme UI
function updateThemeButton() {
  const isDark = STATE.currentTheme === 'dark';
  document.body.className = isDark ? 'theme-dark' : 'theme-cork';
  themeIcon.textContent = isDark ? '🌙' : '🪵';
  themeLabel.textContent = isDark ? t('theme_dark') : t('theme_cork');
}

function applyTheme(theme) {
  STATE.currentTheme = theme;
  localStorage.setItem('papan_theme', theme);
  updateThemeButton();
}

// ============================================================
// DATA FETCHING & RENDERING
// ============================================================

// Fetch Notes from Server
async function fetchNotes(silent = false) {
  if (!silent && STATE.notes.length === 0) {
    boardLoading.style.display = 'block';
  }

  try {
    const params = new URLSearchParams({
      category: STATE.activeCategory,
      sort: STATE.sortBy,
      q: STATE.searchQuery
    });

    const res = await fetch(`/api/notes?${params.toString()}`);
    const data = await res.json();

    if (data.success) {
      STATE.notes = data.notes;
      if (data.config) {
        applyBoardConfig(data.config);
      }
      renderNotes();
      updateStats();
    }
  } catch (err) {
    console.error('Failed to fetch notes:', err);
    if (!silent) {
      showToast('Could not connect to server', '⚠️');
    }
  } finally {
    boardLoading.style.display = 'none';
  }
}

// Render Notes to Board Grid
function renderNotes() {
  notesBoard.innerHTML = '';

  const total = STATE.notes.length;

  if (total === 0) {
    boardEmpty.style.display = 'block';
    if (loadMoreContainer) loadMoreContainer.style.display = 'none';
    return;
  }
  boardEmpty.style.display = 'none';

  const visibleCount = Math.min(STATE.visibleCount, total);
  const visibleNotes = STATE.notes.slice(0, visibleCount);
  const now = Date.now();

  visibleNotes.forEach((note) => {
    const card = document.createElement('div');
    const isDarkColor = note.color === '#1e293b';
    const isPinned = Boolean(note.is_pinned);
    card.className = `sticky-card font-${note.font_style} ${isDarkColor ? 'is-dark' : ''} ${isPinned ? 'is-pinned-card' : ''}`;
    card.id = `note-${note.id}`;
    card.style.backgroundColor = note.color;

    const remainingMs = note.expires_at - now;
    const isUrgent = !isPinned && (remainingMs < (3600 * 1000)); // Under 1 hour

    let catIcon = '📌';
    let catLabel = note.category;
    if (isPinned) {
      catIcon = '📢';
      catLabel = t('admin_pinned');
    } else if (CATEGORY_MAP[note.category]) {
      catIcon = CATEGORY_MAP[note.category].icon;
      catLabel = t(CATEGORY_MAP[note.category].key);
    }

    const activeReaction = STATE.userReactions[note.id] || null;
    const isAlreadyReported = !!STATE.reportedNotes[note.id];

    // Reactions HTML (strictly 1 active reaction per card)
    const reactionsHtml = REACTIONS.map(r => {
      const count = (note.reactions && note.reactions[r.type]) || 0;
      const hasReacted = activeReaction === r.type;
      const reactionName = t(r.key);
      const title = hasReacted 
        ? t('rx_click_to_cancel', { label: reactionName }) 
        : t('rx_click_to_react', { label: reactionName });

      return `
        <button 
          class="reaction-btn ${hasReacted ? 'has-reacted' : ''}" 
          onclick="handleReaction('${note.id}', '${r.type}', event)"
          title="${title}"
          data-type="${r.type}"
          aria-label="${reactionName}"
        >
          <span>${r.icon}</span>
          <span class="react-count">${count > 0 ? count : ''}</span>
        </button>
      `;
    }).join('');

    card.innerHTML = `
      <div class="card-pin ${isPinned ? 'golden-pin' : ''}"></div>
      
      <div class="card-top">
        <span class="card-category ${isPinned ? 'pinned-tag' : ''}">
          <span>${catIcon}</span>
          <span>${catLabel}</span>
        </span>
        <span class="card-countdown ${isPinned ? 'pinned-time-badge' : (isUrgent ? 'urgent' : '')}" id="countdown-${note.id}">
          <span>${isPinned ? '⭐' : '⏳'}</span>
          <span class="time-text">${isPinned ? t('pinned_badge') : formatRemainingTime(remainingMs)}</span>
        </span>
      </div>

      <div class="card-body">
        ${escapeHtml(note.content)}
      </div>

      <div class="card-footer">
        <div class="reactions-list">
          ${reactionsHtml}
        </div>

        <div class="card-meta-row">
          <span class="card-time">${formatRelativeTime(note.created_at)}</span>
          <div class="card-actions">
            <button class="icon-action-btn" onclick="copyNoteText('${note.id}', event)" title="${t('btn_copy')}">${t('btn_copy')}</button>
            <button class="icon-action-btn" onclick="exportNoteAsImage('${note.id}', event)" title="${t('btn_download')}">${t('btn_download')}</button>
            <button class="icon-action-btn report-btn ${isAlreadyReported ? 'already-reported' : ''}" onclick="reportNote('${note.id}', event)" title="${isAlreadyReported ? t('toast_already_reported') : t('btn_report')}">${isAlreadyReported ? '✓' : '🚩'} ${t('btn_report')}</button>
          </div>
        </div>
      </div>
    `;

    notesBoard.appendChild(card);
  });

  updateLoadMoreUI();
}

// Update Load More Section UI
function updateLoadMoreUI() {
  if (!loadMoreContainer) return;
  const total = STATE.notes.length;
  if (total <= STATE.notesPerPage) {
    loadMoreContainer.style.display = 'none';
    return;
  }

  loadMoreContainer.style.display = 'flex';
  const visible = Math.min(STATE.visibleCount, total);

  if (loadMoreCounter) {
    loadMoreCounter.textContent = t('notes_count_info', { visible, total });
  }

  if (visible < total) {
    if (loadMoreBtn) loadMoreBtn.style.display = 'inline-flex';
    if (allLoadedText) allLoadedText.style.display = 'none';
  } else {
    if (loadMoreBtn) loadMoreBtn.style.display = 'none';
    if (allLoadedText) {
      allLoadedText.style.display = 'block';
      allLoadedText.textContent = t('all_notes_loaded');
    }
  }
}

// Live Countdown Updater (Tick every second)
function startCountdownTimers() {
  if (STATE.timerInterval) clearInterval(STATE.timerInterval);

  STATE.timerInterval = setInterval(() => {
    const now = Date.now();

    STATE.notes.forEach(note => {
      if (note.is_pinned) return;
      const countdownEl = document.getElementById(`countdown-${note.id}`);
      if (!countdownEl) return;

      const remainingMs = note.expires_at - now;

      if (remainingMs <= 0) {
        countdownEl.innerHTML = `<span>💥</span> <span>${t('vanish_now')}</span>`;
        
        const card = document.getElementById(`note-${note.id}`);
        if (card && !card.classList.contains('card-burning')) {
          card.classList.add('card-burning');
          sfx.playBurn();
          setTimeout(() => {
            card.remove();
            STATE.notes = STATE.notes.filter(n => n.id !== note.id);
            if (STATE.notes.length === 0) boardEmpty.style.display = 'block';
            updateStats();
            updateLoadMoreUI();
          }, 1200);
        }
      } else {
        const timeText = countdownEl.querySelector('.time-text');
        if (timeText) {
          timeText.textContent = formatRemainingTime(remainingMs);
        }
        if (remainingMs < 3600 * 1000) {
          countdownEl.classList.add('urgent');
        }
      }
    });

    updateNextExpiringBanner(now);
  }, 1000);
}

// Update Banner Countdown for earliest expiring note
function updateNextExpiringBanner(now = Date.now()) {
  if (STATE.notes.length === 0) {
    nextExpiringValEl.textContent = t('board_clean');
    return;
  }

  const sortedExpiring = [...STATE.notes].filter(n => !n.is_pinned).sort((a, b) => a.expires_at - b.expires_at);
  if (sortedExpiring.length === 0) {
    nextExpiringValEl.textContent = t('board_clean');
    return;
  }

  const nextNote = sortedExpiring[0];
  const remainingMs = nextNote.expires_at - now;
  
  if (remainingMs > 0) {
    nextExpiringValEl.textContent = formatRemainingTime(remainingMs);
  } else {
    nextExpiringValEl.textContent = t('cleaning_now');
  }
}

// Update Global Stats
async function updateStats() {
  activeNotesCountEl.textContent = t('status_active_notes', { count: STATE.notes.length });
  updateNextExpiringBanner();
}

// Instant DOM update for card reactions
function updateCardReactionsDom(noteId, reactions, activeReaction) {
  const card = document.getElementById(`note-${noteId}`);
  if (!card) return;
  const reactionsList = card.querySelector('.reactions-list');
  if (!reactionsList) return;

  reactionsList.innerHTML = REACTIONS.map(r => {
    const count = (reactions && reactions[r.type]) || 0;
    const hasReacted = activeReaction === r.type;
    const reactionName = t(r.key);
    const title = hasReacted 
      ? t('rx_click_to_cancel', { label: reactionName }) 
      : t('rx_click_to_react', { label: reactionName });

    return `
      <button 
        class="reaction-btn ${hasReacted ? 'has-reacted' : ''}" 
        onclick="handleReaction('${noteId}', '${r.type}', event)"
        title="${title}"
        data-type="${r.type}"
      >
        <span>${r.icon}</span>
        <span class="react-count">${count > 0 ? count : ''}</span>
      </button>
    `;
  }).join('');
}

// Handle Reaction: strictly 1 reaction per note
window.handleReaction = async function(noteId, type, event) {
  event.stopPropagation();

  const previousReaction = STATE.userReactions[noteId] || null;
  let nextReaction = type;

  const targetReaction = REACTIONS.find(r => r.type === type);
  const targetLabel = targetReaction ? t(targetReaction.key) : type;

  if (previousReaction === type) {
    nextReaction = null;
    showToast(t('toast_rx_cancelled'), '⚪');
  } else {
    sfx.playPop();
    if (previousReaction) {
      showToast(`${t('toast_rx_changed')} ${targetReaction?.icon || ''} ${targetLabel}`, targetReaction?.icon || '✨');
    } else {
      showToast(`${t('toast_rx_added')} ${targetReaction?.icon || ''} ${targetLabel}`, targetReaction?.icon || '✨');
    }
  }

  // Save reaction state in local storage
  if (nextReaction) {
    STATE.userReactions[noteId] = nextReaction;
  } else {
    delete STATE.userReactions[noteId];
  }
  localStorage.setItem('papan_user_reactions', JSON.stringify(STATE.userReactions));

  // Optimistic update in memory
  const note = STATE.notes.find(n => n.id === noteId);
  if (note) {
    note.reactions = note.reactions || {};
    if (previousReaction && note.reactions[previousReaction]) {
      note.reactions[previousReaction] = Math.max(0, (Number(note.reactions[previousReaction]) || 0) - 1);
    }
    if (nextReaction) {
      note.reactions[nextReaction] = (Number(note.reactions[nextReaction]) || 0) + 1;
    }
    updateCardReactionsDom(noteId, note.reactions, nextReaction);
  }

  // Send update to server API
  try {
    const res = await fetch(`/api/notes/${noteId}/react`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: nextReaction, previousType: previousReaction })
    });
    const data = await res.json();
    if (data.success && note) {
      note.reactions = data.reactions;
      updateCardReactionsDom(noteId, data.reactions, nextReaction);
    }
  } catch (err) {
    console.error('Failed to submit reaction:', err);
  }
};

// Copy Note Text
window.copyNoteText = function(noteId, event) {
  event.stopPropagation();
  const note = STATE.notes.find(n => n.id === noteId);
  if (!note) return;

  navigator.clipboard.writeText(note.content).then(() => {
    showToast(t('toast_copied'), '📋');
  }).catch(() => {
    showToast('Failed to copy text.', '⚠️');
  });
};

// Report Note to Admin
window.reportNote = async function(noteId, event) {
  if (event) event.stopPropagation();

  if (STATE.reportedNotes[noteId]) {
    showToast(t('toast_already_reported'), '⚠️');
    return;
  }

  const reason = prompt(t('report_prompt'));
  if (reason === null) return; // User cancelled prompt

  try {
    const res = await fetch(`/api/notes/${noteId}/report`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reason: reason.trim() })
    });
    const data = await res.json();

    if (data.success) {
      STATE.reportedNotes[noteId] = true;
      localStorage.setItem('papan_reported_notes', JSON.stringify(STATE.reportedNotes));
      showToast(t('toast_reported'), '🚩');

      // Update button appearance immediately
      const card = document.getElementById(`note-${noteId}`);
      if (card) {
        const btn = card.querySelector('.report-btn');
        if (btn) {
          btn.classList.add('already-reported');
          btn.innerHTML = `✓ ${t('btn_report')}`;
          btn.title = t('toast_already_reported');
        }
      }
    } else {
      showToast(data.message || 'Gagal mengirim laporan', '⚠️');
    }
  } catch (err) {
    showToast('Terjadi kesalahan jaringan.', '⚠️');
  }
};

// Export Note as Image (Canvas)
window.exportNoteAsImage = function(noteId, event) {
  event.stopPropagation();
  const note = STATE.notes.find(n => n.id === noteId);
  if (!note) return;

  const canvas = document.getElementById('exportCanvas');
  const ctx = canvas.getContext('2d');
  
  const width = 600;
  const height = 600;
  canvas.width = width;
  canvas.height = height;

  // Background Canvas
  ctx.fillStyle = STATE.currentTheme === 'dark' ? '#0f172a' : '#dfb587';
  ctx.fillRect(0, 0, width, height);

  // Sticky Paper
  const paperX = 50;
  const paperY = 50;
  const paperW = 500;
  const paperH = 500;

  ctx.shadowColor = 'rgba(0, 0, 0, 0.25)';
  ctx.shadowBlur = 30;
  ctx.shadowOffsetY = 15;

  ctx.fillStyle = note.color;
  ctx.beginPath();
  ctx.roundRect(paperX, paperY, paperW, paperH, 8);
  ctx.fill();

  ctx.shadowColor = 'transparent';

  // Washi Tape at Top
  ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
  ctx.fillRect(paperX + (paperW / 2) - 50, paperY - 12, 100, 24);

  // Category Header
  ctx.fillStyle = note.color === '#1e293b' ? '#94a3b8' : '#64748b';
  ctx.font = 'bold 15px sans-serif';
  const cat = CATEGORY_MAP[note.category] 
    ? { icon: CATEGORY_MAP[note.category].icon, label: t(CATEGORY_MAP[note.category].key) }
    : { icon: '📌', label: note.category };
  ctx.fillText(`${cat.icon} ${cat.label.toUpperCase()}`, paperX + 30, paperY + 50);

  // Note Content (Word Wrap)
  ctx.fillStyle = note.color === '#1e293b' ? '#f8fafc' : '#1e293b';
  ctx.font = '24px "Plus Jakarta Sans", sans-serif';
  wrapText(ctx, `"${note.content}"`, paperX + 30, paperY + 110, paperW - 60, 36);

  // Footer on sticky note
  ctx.font = '13px sans-serif';
  ctx.fillStyle = note.color === '#1e293b' ? '#64748b' : '#94a3b8';
  ctx.fillText('⏳ ' + t('banner_notice').replace(/<[^>]+>/g, '').substring(0, 50) + '...', paperX + 30, paperY + paperH - 45);
  ctx.fillText('📌 ' + t('brand_title'), paperX + 30, paperY + paperH - 25);

  // Download Image
  const link = document.createElement('a');
  link.download = `whisper-${note.id.substring(0, 8)}.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();

  showToast(t('toast_downloaded'), '📸');
};

// Canvas Word Wrap Helper
function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(' ');
  let line = '';

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line, x, y);
      line = words[n] + ' ';
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, y);
}

// ============================================================
// MODAL & LIVE PREVIEW CONTROLS
// ============================================================

// Terapkan Konfigurasi Papan (Status Beku & Batas Karakter)
function applyBoardConfig(config) {
  if (!config) return;
  STATE.boardFrozen = Boolean(config.boardFrozen);
  if (config.maxCharLimit) STATE.maxCharLimit = parseInt(config.maxCharLimit, 10);
  if (config.spamCooldownSeconds !== undefined) STATE.spamCooldownSeconds = parseInt(config.spamCooldownSeconds, 10);

  const frozenBanner = document.getElementById('frozenBanner');
  if (frozenBanner) {
    frozenBanner.style.display = STATE.boardFrozen ? 'block' : 'none';
  }

  if (openModalBtn) {
    if (STATE.boardFrozen) {
      openModalBtn.classList.add('is-frozen-mode');
      openModalBtn.title = t('board_frozen_msg');
    } else {
      openModalBtn.classList.remove('is-frozen-mode');
      openModalBtn.title = '';
    }
  }

  const mobileFab = document.getElementById('mobileFabBtn');
  if (mobileFab) {
    if (STATE.boardFrozen) {
      mobileFab.classList.add('is-frozen-mode');
      mobileFab.title = t('board_frozen_msg');
    } else {
      mobileFab.classList.remove('is-frozen-mode');
      mobileFab.title = '';
    }
  }

  if (noteContent) {
    noteContent.maxLength = STATE.maxCharLimit;
  }
}

function handleOpenModal() {
  if (STATE.boardFrozen) {
    showToast(t('board_frozen_msg'), '❄️');
    return;
  }
  writeModal.classList.add('is-open');
  noteContent.focus();
  updateLivePreview();
}

openModalBtn.addEventListener('click', handleOpenModal);

const mobileFabBtn = document.getElementById('mobileFabBtn');
if (mobileFabBtn) {
  mobileFabBtn.addEventListener('click', handleOpenModal);
}

function closeModal() {
  writeModal.classList.remove('is-open');
}

closeModalBtn.addEventListener('click', closeModal);
cancelModalBtn.addEventListener('click', closeModal);

writeModal.addEventListener('click', (e) => {
  if (e.target === writeModal) closeModal();
});

// Live Preview Updater
function updateLivePreview() {
  const text = noteContent.value.trim();
  previewText.textContent = text || t('preview_placeholder');
  charCount.textContent = `${noteContent.value.length} / ${STATE.maxCharLimit}`;

  // Selected Category
  const checkedCat = document.querySelector('input[name="category"]:checked');
  if (checkedCat) {
    const cat = CATEGORY_MAP[checkedCat.value];
    if (cat) {
      previewCategoryBadge.textContent = `${cat.icon} ${t(cat.key)}`;
    }
  }

  // Selected Duration
  const checkedDur = document.querySelector('input[name="duration"]:checked');
  if (checkedDur) {
    const val = parseFloat(checkedDur.value);
    if (val < 0.1) {
      previewTimerBadge.textContent = t('preview_duration_demo');
    } else if (val === 12) {
      previewTimerBadge.textContent = t('preview_duration_12');
    } else {
      previewTimerBadge.textContent = t('preview_duration_24');
    }
  }

  // Selected Font
  const selectedFont = fontSelect.value;
  previewText.className = `preview-text font-${selectedFont}`;
}

noteContent.addEventListener('input', updateLivePreview);
fontSelect.addEventListener('change', updateLivePreview);

document.querySelectorAll('input[name="category"]').forEach(radio => {
  radio.addEventListener('change', updateLivePreview);
});

document.querySelectorAll('input[name="duration"]').forEach(radio => {
  radio.addEventListener('change', updateLivePreview);
});

// Color Picker Buttons
colorPicker.addEventListener('click', (e) => {
  const btn = e.target.closest('.color-btn');
  if (!btn) return;

  document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  const color = btn.dataset.color;
  stickyPreview.style.backgroundColor = color;
  
  if (color === '#1e293b') {
    stickyPreview.style.color = '#f8fafc';
    stickyPreview.classList.add('is-dark');
  } else {
    stickyPreview.style.color = '#0f172a';
    stickyPreview.classList.remove('is-dark');
  }
});

// Submit Form (Post new note)
writeForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  if (STATE.boardFrozen) {
    showToast(t('board_frozen_msg'), '❄️');
    closeModal();
    return;
  }

  const content = noteContent.value.trim();
  if (!content) {
    showToast(t('toast_empty_error'), '⚠️');
    return;
  }

  const category = document.querySelector('input[name="category"]:checked')?.value || 'random';
  const durationHours = parseFloat(document.querySelector('input[name="duration"]:checked')?.value || 24);
  const activeColorBtn = document.querySelector('.color-btn.active');
  const color = activeColorBtn ? activeColorBtn.dataset.color : '#fef08a';
  const fontStyle = fontSelect.value;

  const submitBtn = document.getElementById('submitNoteBtn');
  submitBtn.disabled = true;
  submitBtn.innerHTML = `<span>${t('btn_submitting')}</span>`;

  try {
    const res = await fetch('/api/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content,
        category,
        color,
        fontStyle,
        durationHours
      })
    });

    const data = await res.json();

    if (data.success) {
      sfx.playStick();
      showToast(t('toast_posted'), '📌');
      
      writeForm.reset();
      updateLivePreview();
      closeModal();

      STATE.notes.unshift(data.note);
      renderNotes();
      updateStats();

      const newCard = document.getElementById(`note-${data.note.id}`);
      if (newCard) {
        newCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    } else {
      if (data.code === 'ANTI_SPAM' && data.waitSec) {
        showToast(t('toast_anti_spam', { sec: data.waitSec }), '⏳');
      } else {
        showToast(data.message || 'Error posting note.', '⚠️');
      }
    }
  } catch (err) {
    console.error('Error:', err);
    showToast('Failed to connect to server.', '⚠️');
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = `<span>${t('btn_submit')}</span> <span class="btn-icon">📌</span>`;
  }
});

// Category Tabs Click
categoryTabs.addEventListener('click', (e) => {
  const btn = e.target.closest('.tab-btn');
  if (!btn) return;

  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  STATE.activeCategory = btn.dataset.category;
  STATE.visibleCount = STATE.notesPerPage;
  fetchNotes();
});

// Search Input (Debounced)
let searchTimeout;
searchInput.addEventListener('input', () => {
  clearTimeout(searchTimeout);
  clearSearchBtn.style.display = searchInput.value.trim() ? 'block' : 'none';
  
  searchTimeout = setTimeout(() => {
    STATE.searchQuery = searchInput.value.trim();
    STATE.visibleCount = STATE.notesPerPage;
    fetchNotes();
  }, 350);
});

clearSearchBtn.addEventListener('click', () => {
  searchInput.value = '';
  clearSearchBtn.style.display = 'none';
  STATE.searchQuery = '';
  STATE.visibleCount = STATE.notesPerPage;
  fetchNotes();
});

// Sort Select
sortSelect.addEventListener('change', () => {
  STATE.sortBy = sortSelect.value;
  STATE.visibleCount = STATE.notesPerPage;
  fetchNotes();
});

// Load More Button Click
if (loadMoreBtn) {
  loadMoreBtn.addEventListener('click', () => {
    STATE.visibleCount += STATE.notesPerPage;
    renderNotes();
    if (typeof sfx !== 'undefined' && sfx.playStick) {
      sfx.playStick();
    }
  });
}

// Theme Toggle
themeToggleBtn.addEventListener('click', () => {
  // Matikan transisi sesaat di seluruh halaman agar browser tidak reflow/repaint animasi berat
  document.documentElement.classList.add('no-transitions');

  const nextTheme = STATE.currentTheme === 'cork' ? 'dark' : 'cork';
  applyTheme(nextTheme);

  // Jadwalkan pengaktifan kembali transisi setelah frame pertama dirender
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.documentElement.classList.remove('no-transitions');
    });
  });

  // Tampilkan toast setelah paint selesai agar tidak memblokir input latency
  const themeName = nextTheme === 'dark' ? t('theme_dark') : t('theme_cork');
  setTimeout(() => {
    showToast(`${t('toast_theme_changed')}${themeName}`);
  }, 50);
});

// Language Select Change Listener
if (langSelect) {
  langSelect.addEventListener('change', (e) => {
    setLanguage(e.target.value, true);
  });
}

// Helper Escape HTML
function escapeHtml(string) {
  const div = document.createElement('div');
  div.textContent = string;
  return div.innerHTML;
}

// Initialize Application on Page Load
window.addEventListener('DOMContentLoaded', () => {
  // Apply saved theme
  applyTheme(STATE.currentTheme);

  // Apply saved language (defaulting to English)
  setLanguage(STATE.lang, false);

  // Fetch initial notes
  fetchNotes();
  startCountdownTimers();

  // Polling every 20s
  STATE.pollInterval = setInterval(() => {
    fetchNotes(true);
  }, 20000);
});
