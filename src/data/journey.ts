export interface JourneyItem {
  id: number;
  title: string;
  imageUrl: string;
}

export const journeyItems: JourneyItem[] = [
  { id: 1, title: "Desain Backdrop Banner Perpisahan", imageUrl: "/Journey/Backdrop_banner_perpisahan.jpeg" },
  { id: 2, title: "Bogor Night Run 2025", imageUrl: "/Journey/Bogor_Night_Run_2025.jpeg" },
  { id: 3, title: "Gathering Yatim: Treasure Hunt 2024", imageUrl: "/Journey/Gathering_yatim2.jpeg" },
  { id: 4, title: "Gathering Yatim 3", imageUrl: "/Journey/Gathering_yatim3.jpeg" },
  { id: 5, title: "Juara Harapan UI/UX HMIF UNMA", imageUrl: "/Journey/Lomba_UIUX_HMIFUNMA.jpeg" },
  { id: 6, title: "Organisasi MPK di SMA Negeri 9", imageUrl: "/Journey/MPK_SMA_9.jpeg" },
  { id: 7, title: "Finisher Medali PKB Run 2025", imageUrl: "/Journey/PKB_RUN_2025.jpeg" },
  { id: 8, title: "Panitia Sikrab TPL", imageUrl: "/Journey/Panitia_SIkrab_TPL.jpeg" },
  { id: 9, title: "After Pitching Project Multimedia", imageUrl: "/Journey/after_pitching_multimedia.jpeg" },
  { id: 10, title: "Desain Banner Festival Musik", imageUrl: "/Journey/backdrop_banner_music_festival.jpeg" },
  { id: 11, title: "Summit Gunung Gede", imageUrl: "/Journey/gunung_gede.jpeg" },
  { id: 12, title: "Desain dan Hasil Packaging Produk", imageUrl: "/Journey/hasilpackaging.jpeg" },
  { id: 13, title: "Juara 1 TPL League", imageUrl: "/Journey/juara_1_tpl_league.jpeg" },
  { id: 14, title: "Juara 2 OMI", imageUrl: "/Journey/juara_2_omi.jpeg" },
  { id: 15, title: "Lomba Desain UI/UX", imageUrl: "/Journey/lomba_uiux.jpeg" },
  { id: 16, title: "Mengajar Bahasa Inggris", imageUrl: "/Journey/ngajar_inggris.jpeg" },
  { id: 17, title: "Sharing Session Mengajar UI/UX", imageUrl: "/Journey/ngajar_uiux.jpeg" },
  { id: 18, title: "Penerimaan Piala Juara 2 OMI", imageUrl: "/Journey/omi_juara_2.jpeg" },
  { id: 19, title: "Kepanitiaan TPL League", imageUrl: "/Journey/panitia_tplleague.jpeg" },
  { id: 20, title: "Kepanitiaan Event VISCO 2025", imageUrl: "/Journey/panitia_visco.jpeg" },
  { id: 21, title: "Penyerahan Project PT Mitra Jasa Power", imageUrl: "/Journey/penyerahan_mitrajasapower.jpeg" },
  { id: 22, title: "Penyerahan Project RAMENRAMEiN", imageUrl: "/Journey/penyerahan_project.jpeg" },
  { id: 23, title: "Sesi Pitching Aplikasi Solar Verse", imageUrl: "/Journey/pitching_solarverser.jpeg" },
  { id: 24, title: "Karya Desain Poster Sayembara", imageUrl: "/Journey/poster_sayembara.jpeg" },
  { id: 25, title: "Pingpong TPL League 2025", imageUrl: "/Journey/tpl_league_2025.jpeg" },
  { id: 26, title: "Badminton TPL League", imageUrl: "/Journey/tpl_league_badminton.jpeg" },
  { id: 27, title: "Juara 2 Pingpong VISCO 2025", imageUrl: "/Journey/visco_2025.jpeg" },
  { id: 28, title: "Bismillah Team After HMIFUNMA", imageUrl: "/Journey/WhatsApp Image 2026-03-22 at 4.31.35 PM.jpeg" },
  { id: 29, title: "Saber Roam", imageUrl: "/Journey/WhatsApp Image 2026-03-22 at 4.32.14 PM (2).jpeg" },
  { id: 30, title: "After Kerkom Multimedia", imageUrl: "/Journey/WhatsApp Image 2026-03-22 at 4.32.15 PM.jpeg" },
  { id: 31, title: "After Pitching Multimedia", imageUrl: "/Journey/WhatsApp Image 2026-03-22 at 4.32.17 PM.jpeg" },
];

export const journeyTrailImages = journeyItems.map((item) =>
  item.imageUrl
    .replace("/Journey/", "/Journey/trail/")
    .replace(/\.[^.]+$/, ".webp")
);
