export interface AcademyLevel {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  conceptName: string;
  summary: string;
  description: string;
  color: string;
  icon: string;
  sampleProblems: {
    problem: string;
    num1: number;
    num2: number;
    op: 'addition' | 'subtraction';
    stepByStep: string[];
    explanation: string;
  }[];
  trickList?: {
    letter: string;
    name: string;
    rule: string;
    example: string;
    steps: string;
    whyWorks: string;
  }[];
}

export const ACADEMY_LEVELS: AcademyLevel[] = [
  {
    id: 1,
    slug: 'level-1-benda-konkret',
    title: 'Level 1: Menghitung dengan Benda',
    subtitle: 'Metode Benda Konkret (Concrete Counting)',
    conceptName: 'Benda Nyata & Visual',
    color: 'emerald',
    icon: 'Apple',
    summary: 'Belajar penjumlahan dan pengurangan menggunakan benda konkret seperti buah apel, bintang, dan kelereng.',
    description: 'Sebelum mengenal rumus abstrak, anak belajar bahwa berhitung adalah menambah atau mengambil benda nyata di sekitar kita.',
    sampleProblems: [
      {
        problem: '3 + 2 = ?',
        num1: 3,
        num2: 2,
        op: 'addition',
        stepByStep: [
          'Ambil 3 buah apel merah di keranjang pertama.',
          'Ambil 2 buah apel hijau di keranjang kedua.',
          'Satukan semua apel lalu hitung bersama: 1, 2, 3, 4, 5!',
          'Jadi, 3 + 2 = 5 apel.'
        ],
        explanation: 'Penjumlahan adalah proses menggabungkan dua kelompok benda menjadi satu kelompok yang lebih banyak.'
      },
      {
        problem: '5 − 2 = ?',
        num1: 5,
        num2: 2,
        op: 'subtraction',
        stepByStep: [
          'Terdapat 5 buah apel segar di atas meja.',
          'Ambil atau makan 2 buah apel.',
          'Hitung sisa apel yang masih ada: 1, 2, 3.',
          'Jadi, 5 − 2 = 3 apel.'
        ],
        explanation: 'Pengurangan adalah proses mengambil atau memisahkan sebagian benda dari kelompok semula.'
      }
    ]
  },
  {
    id: 2,
    slug: 'level-2-maju-mundur',
    title: 'Level 2: Menghitung Maju & Mundur',
    subtitle: 'Counting On & Counting Back',
    conceptName: 'Garis Bilangan Interaktif',
    color: 'sky',
    icon: 'ArrowRightLeft',
    summary: 'Melompat maju di garis bilangan untuk penjumlahan, dan melompat mundur untuk pengurangan.',
    description: 'Anak tidak perlu mulai dari 1 lagi. Cukup simpan angka pertama di kepala, lalu hitung maju atau mundur dengan langkah teratur.',
    sampleProblems: [
      {
        problem: '7 + 4 = ?',
        num1: 7,
        num2: 4,
        op: 'addition',
        stepByStep: [
          'Simpan angka 7 di kepala kita.',
          'Lompat maju 4 langkah di garis bilangan: 8, 9, 10, 11.',
          'Kita mendarat tepat di angka 11!',
          'Jadi, 7 + 4 = 11.'
        ],
        explanation: 'Counting On menghemat waktu karena kita langsung melanjutkan hitungan dari angka terbesar.'
      },
      {
        problem: '12 − 5 = ?',
        num1: 12,
        num2: 5,
        op: 'subtraction',
        stepByStep: [
          'Mulai berdiri di angka 12 pada garis bilangan.',
          'Lompat mundur 5 langkah: 11, 10, 9, 8, 7.',
          'Kita berhenti di angka 7.',
          'Jadi, 12 − 5 = 7.'
        ],
        explanation: 'Counting Back adalah cara alami mundur langkah demi langkah untuk mencari selisih.'
      }
    ]
  },
  {
    id: 3,
    slug: 'level-3-sahabat-sepuluh',
    title: 'Level 3: Membuat Kelompok Sepuluh',
    subtitle: 'Make Ten & Number Bonds',
    conceptName: 'Sahabat Sepuluh (Pasangan 10)',
    color: 'amber',
    icon: 'Boxes',
    summary: 'Kuasai pasangan angka yang menghasilkan 10 (1+9, 2+8, 3+7, 4+6, 5+5) untuk memudahkan hitungan besar.',
    description: 'Angka 10 adalah pahlawan matematika! Jika kita bisa mengubah angka menjadi 10, hitungan apapun menjadi sangat mudah.',
    sampleProblems: [
      {
        problem: '8 + 5 = ?',
        num1: 8,
        num2: 5,
        op: 'addition',
        stepByStep: [
          'Angka 8 butuh berapa agar menjadi 10? Butuh 2!',
          'Pecah angka 5 menjadi 2 dan 3.',
          'Gabungkan 8 + 2 = 10.',
          'Tinggal tambahkan sisa 3: 10 + 3 = 13!',
          'Jadi, 8 + 5 = 13.'
        ],
        explanation: 'Strategi Make Ten membuat anak tidak perlu menghitung dengan jari satu per satu ketika melewati angka 10.'
      },
      {
        problem: '9 + 7 = ?',
        num1: 9,
        num2: 7,
        op: 'addition',
        stepByStep: [
          'Angka 9 butuh 1 agar menjadi 10.',
          'Pinjam 1 dari 7, sehingga 7 bersisa 6.',
          '9 + 1 = 10, lalu 10 + 6 = 16.',
          'Jadi, 9 + 7 = 16.'
        ],
        explanation: 'Sangat cepat dan akurat untuk angka yang mendekati 10.'
      }
    ]
  },
  {
    id: 4,
    slug: 'level-4-memecah-bilangan',
    title: 'Level 4: Memecah Bilangan',
    subtitle: 'Number Decomposition',
    conceptName: 'Puluhan & Satuan',
    color: 'indigo',
    icon: 'LayoutGrid',
    summary: 'Memecah bilangan dua digit menjadi puluhan dan satuan agar angka besar terasa ringan dan teratur.',
    description: 'Angka 23 sebenarnya adalah 20 dan 3. Saat dipisahkan, kita bisa menjumlahkan puluhan dengan puluhan, dan satuan dengan satuan!',
    sampleProblems: [
      {
        problem: '23 + 14 = ?',
        num1: 23,
        num2: 14,
        op: 'addition',
        stepByStep: [
          'Pecah bilangan pertama: 23 = 20 + 3.',
          'Pecah bilangan kedua: 14 = 10 + 4.',
          'Jumlahkan puluhannya dulu: 20 + 10 = 30.',
          'Jumlahkan satuannya: 3 + 4 = 7.',
          'Gabungkan keduanya: 30 + 7 = 37!'
        ],
        explanation: 'Pemisahan nilai tempat menjamin ketelitian tinggi tanpa beban mengingat terlalu banyak angka sekaligus.'
      },
      {
        problem: '46 − 23 = ?',
        num1: 46,
        num2: 23,
        op: 'subtraction',
        stepByStep: [
          'Pecah bilangan: 46 = 40 + 6 dan 23 = 20 + 3.',
          'Kurangkan puluhannya: 40 − 20 = 20.',
          'Kurangkan satuannya: 6 − 3 = 3.',
          'Gabungkan hasilnya: 20 + 3 = 23.'
        ],
        explanation: 'Pengurangan puluhan dan satuan secara terpisah menghindarkan kebingungan pada anak kelas 1-2.'
      }
    ]
  },
  {
    id: 5,
    slug: 'level-5-puluhan-terdekat',
    title: 'Level 5: Strategi Puluhan Terdekat',
    subtitle: 'Bridge to Ten & Bridge to the Next Ten',
    conceptName: 'Jembatan Menuju Puluhan',
    color: 'teal',
    icon: 'Compass',
    summary: 'Singgah di angka puluhan (10, 20, 30, 40...) sebagai stasiun perhentian yang nyaman.',
    description: 'Seperti jembatan penyeberangan, kita melompat ke puluhan terdekat terlebih dahulu, lalu melanjutkan sisa lompatannya.',
    sampleProblems: [
      {
        problem: '28 + 5 = ?',
        num1: 28,
        num2: 5,
        op: 'addition',
        stepByStep: [
          'Dari 28, puluhan berikutnya adalah 30 (butuh 2 langkah).',
          '28 + 2 = 30.',
          'Kita masih punya sisa langkah dari 5, yaitu 5 − 2 = 3.',
          'Dari stasiun 30, maju 3 langkah lagi: 30 + 3 = 33.'
        ],
        explanation: 'Jembatan puluhan membuat operasi penyeberangan puluhan menjadi mulus dan intuitif.'
      },
      {
        problem: '43 − 6 = ?',
        num1: 43,
        num2: 6,
        op: 'subtraction',
        stepByStep: [
          'Dari 43, mundur dulu ke puluhan terdekat yaitu 40 (mundur 3 langkah).',
          '43 − 3 = 40.',
          'Pengurangan kita adalah 6, tersisa 6 − 3 = 3 langkah mundur.',
          'Dari 40, mundur 3 langkah lagi: 40 − 3 = 37.'
        ],
        explanation: 'Mundur singgah di 40 jauh lebih mudah dibayangkan daripada langsung menghitung mundur 6 dari 43.'
      }
    ]
  },
  {
    id: 6,
    slug: 'level-6-bersusun',
    title: 'Level 6: Bersusun Menyimpan & Meminjam',
    subtitle: 'Vertical Addition & Subtraction',
    conceptName: 'Nilai Tempat Bersusun',
    color: 'violet',
    icon: 'Columns3',
    summary: 'Mengatur angka dalam kolom puluhan dan satuan, memahami arti menyimpan 1 puluhan dan meminjam 10 satuan.',
    description: 'Bukan sekadar hafalan teknik! Anak melihat langsung bahwa 1 puluhan yang disimpan bernilai 10 satuan.',
    sampleProblems: [
      {
        problem: '27 + 18 = ?',
        num1: 27,
        num2: 18,
        op: 'addition',
        stepByStep: [
          'Susun angka: Satuan (7 dan 8), Puluhan (2 dan 1).',
          'Hitung satuan: 7 + 8 = 15.',
          'Angka 15 memiliki 1 puluhan dan 5 satuan.',
          'Tulis 5 di kolom satuan, dan SIMPAN 1 di atas kolom puluhan.',
          'Hitung puluhan: 1 (simpanan) + 2 + 1 = 4 puluhan.',
          'Gabungkan: 45!'
        ],
        explanation: 'Kotak simpanan di atas kolom puluhan menjaga anak agar tidak lupa menambahkan puluhan baru.'
      },
      {
        problem: '52 − 27 = ?',
        num1: 52,
        num2: 27,
        op: 'subtraction',
        stepByStep: [
          'Susun angka: Satuan (2 dikurangi 7). Karena 2 lebih kecil dari 7, kita tidak bisa langsung menguranginya.',
          'PINJAM 1 puluhan dari 5 puluhan. 5 puluhan menjadi 4 puluhan.',
          '1 puluhan itu bernilai 10 satuan. Ditambah 2 satuan lama menjadi 12 satuan.',
          'Hitung satuan: 12 − 7 = 5.',
          'Hitung puluhan: 4 − 2 = 2.',
          'Hasil akhirnya adalah 25!'
        ],
        explanation: 'Meminjam adalah menukarkan 1 batang puluhan menjadi 10 kubus satuan kecil.'
      }
    ]
  },
  {
    id: 7,
    slug: 'level-7-trik-cepat',
    title: 'Level 7: Trik Berhitung Cepat',
    subtitle: 'Mental Math Super Strategies (A sampai I)',
    conceptName: '9 Trik Rahasia Kilat',
    color: 'orange',
    icon: 'Zap',
    summary: 'Pelajari 9 trik mental cerdas: +9, +11, -9, -11, pembulatan puluhan, pisah puluhan, operasi kebalikan, pasangan 100, dan pemecah angka.',
    description: 'Trik-trik ini digunakan oleh juara olimpiade cilik untuk menghitung di kepala tanpa kertas dan pensil!',
    sampleProblems: [
      {
        problem: '26 + 9 = ?',
        num1: 26,
        num2: 9,
        op: 'addition',
        stepByStep: [
          'Trik +9: Karena 9 itu 10 dikurangi 1...',
          'Langkah 1: Tambahkan 10 dulu! 26 + 10 = 36.',
          'Langkah 2: Kurangi 1! 36 − 1 = 35.',
          'Hanya dalam 2 detik jawabannya ketemu: 35!'
        ],
        explanation: 'Menambah 10 jauh lebih mudah di luar kepala daripada menambah 9.'
      }
    ],
    trickList: [
      {
        letter: 'A',
        name: 'Menambah 9 (+9)',
        rule: 'Tambahkan 10, kemudian kurangi 1.',
        example: '26 + 9 = 26 + 10 − 1 = 35',
        steps: '26 + 10 = 36 → 36 - 1 = 35',
        whyWorks: 'Karena 9 bernilai tepat 1 angka lebih sedikit daripada 10.'
      },
      {
        letter: 'B',
        name: 'Menambah 11 (+11)',
        rule: 'Tambahkan 10, kemudian tambahkan 1.',
        example: '32 + 11 = 32 + 10 + 1 = 43',
        steps: '32 + 10 = 42 → 42 + 1 = 43',
        whyWorks: 'Karena 11 bernilai 1 angka lebih banyak daripada 10.'
      },
      {
        letter: 'C',
        name: 'Mengurangi 9 (−9)',
        rule: 'Kurangi 10, kemudian tambahkan 1.',
        example: '47 − 9 = 47 − 10 + 1 = 38',
        steps: '47 - 10 = 37 → 37 + 1 = 38',
        whyWorks: 'Kita mengurangkan 10 (terlalu banyak 1), jadi kembalikan 1.'
      },
      {
        letter: 'D',
        name: 'Mengurangi 11 (−11)',
        rule: 'Kurangi 10, kemudian kurangi 1 lagi.',
        example: '56 − 11 = 56 − 10 − 1 = 45',
        steps: '56 - 10 = 46 → 46 - 1 = 45',
        whyWorks: 'Mengurangi 11 sama dengan mengurangi 10 lalu mengurangi 1 lagi.'
      },
      {
        letter: 'E',
        name: 'Membulatkan ke Puluhan',
        rule: 'Bulatkan angka yang berakhiran 8 atau 9 ke puluhan terdekat, lalu sesuaikan.',
        example: '39 + 24 = 40 + 24 − 1 = 63',
        steps: '39 bulatkan ke 40 (+1) → 40 + 24 = 64 → 64 - 1 = 63',
        whyWorks: 'Menghitung dengan angka kelipatan 10 jauh lebih cepat di kepala.'
      },
      {
        letter: 'F',
        name: 'Pisah Puluhan & Satuan',
        rule: 'Jumlahkan puluhan bersama puluhan, dan satuan bersama satuan.',
        example: '42 + 36 = (40 + 30) + (2 + 6) = 70 + 8 = 78',
        steps: '40 + 30 = 70; 2 + 6 = 8; 70 + 8 = 78',
        whyWorks: 'Membagi masalah besar menjadi dua masalah kecil yang mudah.'
      },
      {
        letter: 'G',
        name: 'Hubungan Operasi Kebalikan',
        rule: 'Gunakan fakta bahwa pengurangan adalah kebalikan dari penjumlahan.',
        example: 'Jika 8 + 7 = 15, maka 15 − 8 = 7 dan 15 − 7 = 8',
        steps: 'Tiga angka ini adalah keluarga segitiga fakta (8, 7, 15).',
        whyWorks: 'Mengurangi jadi seringan mengingat penjumlahan yang sudah kita hafal.'
      },
      {
        letter: 'H',
        name: 'Pasangan Menghasilkan 100',
        rule: 'Cari pasangan puluhan yang berjumlah 90 dan satuan yang berjumlah 10.',
        example: '67 + 33 = (60+30) + (7+3) = 90 + 10 = 100',
        steps: '60 + 30 = 90; 7 + 3 = 10; 90 + 10 = 100',
        whyWorks: '100 adalah angka emas! Sangat berguna saat berbelanja dan uang kembalian.'
      },
      {
        letter: 'I',
        name: 'Mengurangi dengan Memecah',
        rule: 'Kurangkan puluhannya terlebih dahulu, lalu kurangkan satuannya.',
        example: '74 − 28 = 74 − 20 − 8 = 54 − 8 = 46',
        steps: '74 - 20 = 54 → 54 - 4 = 50 → 50 - 4 = 46',
        whyWorks: 'Mengurangi secara bertahap menjaga konsentrasi anak tetap fokus.'
      }
    ]
  },
  {
    id: 8,
    slug: 'level-8-strategi-campuran',
    title: 'Level 8: Strategi Campuran & Berhitung Mental',
    subtitle: 'Pilih Strategimu Sendiri (Flexible Math Thinking)',
    conceptName: 'Pemikir Fleksibel',
    color: 'pink',
    icon: 'Brain',
    summary: 'Menyelesaikan berbagai soal 1–100 dengan memilih strategi yang paling nyaman untuk anak.',
    description: 'Tidak ada satu cara kaku dalam matematika! Anak diajak membandingkan metode dan menemukan cara tercepat bagi dirinya sendiri.',
    sampleProblems: [
      {
        problem: '39 + 26 = ?',
        num1: 39,
        num2: 26,
        op: 'addition',
        stepByStep: [
          'Metode A (Membulatkan): 39 jadi 40 (+1) → 40 + 26 = 66 → 66 − 1 = 65.',
          'Metode B (Pisah Puluhan): 30 + 20 = 50; 9 + 6 = 15; 50 + 15 = 65.',
          'Metode C (Bersusun): 9 + 6 = 15 (simpan 1); 1 + 3 + 2 = 6 puluhan → 65.',
          'Semua metode menghasilkan 65! Anak bebas memilih yang paling disukainya.'
        ],
        explanation: 'Memahami banyak strategi memberi anak rasa percaya diri yang tinggi dalam berhitung.'
      },
      {
        problem: '81 − 46 = ?',
        num1: 81,
        num2: 46,
        op: 'subtraction',
        stepByStep: [
          'Metode A (Mundur Bertahap): 81 − 40 = 41; 41 − 1 = 40; 40 − 5 = 35.',
          'Metode B (Dekat ke 50): 81 − 50 = 31; karena lebih 4, maka 31 + 4 = 35.',
          'Metode C (Bersusun): 1 pinjam 1 jadi 11 − 6 = 5; 7 − 4 = 3 → 35.'
        ],
        explanation: 'Keberagaman strategi menumbuhkan ketangkasan matematika sejati.'
      }
    ]
  }
];
