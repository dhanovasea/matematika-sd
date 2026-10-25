import { VideoTrick } from '../types/math';

export const VIDEO_TRICKS: VideoTrick[] = [
  {
    id: 'vid-plus-9',
    title: 'Trik Kilat Menambah 9 (+9)',
    subtitle: 'Tambah 10, Lalu Kurangi 1',
    category: 'mental_tricks',
    trickKey: '+9',
    thumbnailEmoji: '⚡',
    durationLabel: '1m 20s',
    tags: ['Trik Cepat', 'Penjumlahan', 'Mental Math'],
    description: 'Menghitung penjumlahan dengan angka 9 dalam 2 detik tanpa harus menghitung satu per satu dengan jari tangan.',
    scenes: [
      {
        title: 'Tantangan: 26 + 9 = ?',
        speakerText: 'Halo sahabat matematika! Pernahkah kamu merasa bingung dan lama saat harus menambah 9 dengan jari tangan?',
        mascotMood: 'thinking',
        boardContent: {
          heading: 'Soal: 26 + 9 = ?',
          formula: '26 + 9 = ...',
          highlightText: 'Menghitung satu per satu dengan jari sering membuat kita lelah dan salah hitung.',
          steps: [
            '26 ditambah 9...',
            'Apakah harus menghitung: 27, 28, 29, 30... sampai 9 kali?',
            'Ada cara rahasia yang jauh lebih cepat!'
          ]
        },
        durationSeconds: 8
      },
      {
        title: 'Rahasia Angka 9',
        speakerText: 'Tahukah kamu? Angka 9 itu sangat dekat dengan angka 10! 9 adalah 10 yang dikurangi 1.',
        mascotMood: 'happy',
        boardContent: {
          heading: 'Kunci Rahasia Trik',
          formula: '9 = 10 − 1',
          highlightText: 'Menambah 10 itu super mudah di kepala!',
          steps: [
            'Daripada menambah 9...',
            'Kita tambahkan 10 dulu!',
            'Lalu di akhir, cukup kurangi 1.'
          ]
        },
        durationSeconds: 8
      },
      {
        title: 'Langkah 1: Tambahkan 10',
        speakerText: 'Langkah pertama: tambahkan 10 ke angka 26. Puluhannya bertambah satu menjadi 36!',
        mascotMood: 'cheering',
        boardContent: {
          heading: 'Langkah 1: Tambah 10',
          formula: '26 + 10 = 36',
          highlightText: 'Angka 26 langsung melompat menjadi 36!',
          steps: [
            '26 + 10 = 36 (Mudah sekali kan?)'
          ]
        },
        durationSeconds: 8
      },
      {
        title: 'Langkah 2: Kurangi 1',
        speakerText: 'Langkah kedua: karena tadi kita menambah 10 (kebanyakan 1), sekarang kita kurangi 1 dari 36. Hasilnya adalah 35!',
        mascotMood: 'proud',
        boardContent: {
          heading: 'Langkah 2: Kurangi 1',
          formula: '36 − 1 = 35',
          highlightText: 'Tadaaa! Jawabannya adalah 35!',
          steps: [
            '26 + 10 = 36',
            '36 − 1 = 35',
            'Selesai dalam hitungan 2 detik!'
          ]
        },
        durationSeconds: 8
      },
      {
        title: 'Rangkuman Trik +9',
        speakerText: 'Ingat rumus emas Miko: Tambah 9 sama dengan Tambah 10 kemudian Kurangi 1! Sekarang giliranmu mencoba kuis kilat di bawah!',
        mascotMood: 'cheering',
        boardContent: {
          heading: 'Rumus Emas Trik +9',
          formula: 'Angka + 9 = (Angka + 10) − 1',
          highlightText: 'Contoh lain: 48 + 9 = 48 + 10 − 1 = 57!',
          steps: [
            '1. Lompat +10',
            '2. Mundur -1',
            'Kamu juara berhitung cepat!'
          ]
        },
        durationSeconds: 8
      }
    ],
    practiceQuiz: {
      question: 'Gunakan trik +9: Berapa 48 + 9 = ?',
      num1: 48,
      num2: 9,
      answer: 57,
      options: [56, 57, 58, 59],
      explanation: '48 + 10 = 58, lalu kurangi 1 menjadi 57!'
    }
  },
  {
    id: 'vid-minus-9',
    title: 'Trik Sakti Mengurangi 9 (−9)',
    subtitle: 'Kurang 10, Lalu Tambah 1',
    category: 'mental_tricks',
    trickKey: '-9',
    thumbnailEmoji: '🪄',
    durationLabel: '1m 25s',
    tags: ['Trik Cepat', 'Pengurangan', 'Mental Math'],
    description: 'Cara kilat mengurangkan angka 9 tanpa harus repot pinjam puluhan atau berhitung mundur lambat.',
    scenes: [
      {
        title: 'Tantangan: 47 − 9 = ?',
        speakerText: 'Mengurangi 9 sering kali membuat kita harus meminjam puluhan. Tapi dengan trik sakti Miko, kamu bisa menjawabnya sekejap!',
        mascotMood: 'thinking',
        boardContent: {
          heading: 'Soal: 47 − 9 = ?',
          formula: '47 − 9 = ...',
          highlightText: 'Satuan 7 tidak bisa dikurangi 9? Tenang, jangan panik!',
          steps: [
            'Biasanya kita harus meminjam puluhan...',
            'Tapi mari gunakan trik cerdas!'
          ]
        },
        durationSeconds: 8
      },
      {
        title: 'Kunci Rahasia Trik −9',
        speakerText: 'Ingat, 9 itu hampir 10! Jika kita kurangi 10, kita mengurangkan 1 angka terlalu banyak. Jadi kita tinggal kembalikan 1!',
        mascotMood: 'happy',
        boardContent: {
          heading: 'Kunci Rahasia Trik −9',
          formula: '−9 = −10 + 1',
          highlightText: 'Kurangi 10 dulu, lalu kembalikan 1!',
          steps: [
            '1. Kurangi 10 (Sangat mudah di kepala)',
            '2. Tambahkan 1 kembali'
          ]
        },
        durationSeconds: 8
      },
      {
        title: 'Langkah 1: Kurangi 10',
        speakerText: 'Langkah pertama: 47 dikurangi 10. Puluhannya berkurang 1 menjadi 37!',
        mascotMood: 'cheering',
        boardContent: {
          heading: 'Langkah 1: Kurang 10',
          formula: '47 − 10 = 37',
          highlightText: 'Tinggal ubah puluhan 4 menjadi 3 -> 37',
          steps: [
            '47 − 10 = 37'
          ]
        },
        durationSeconds: 8
      },
      {
        title: 'Langkah 2: Tambahkan 1',
        speakerText: 'Langkah kedua: kembalikan 1 angka ke 37. 37 ditambah 1 adalah 38! Wow, semudah itu!',
        mascotMood: 'proud',
        boardContent: {
          heading: 'Langkah 2: Tambah 1',
          formula: '37 + 1 = 38',
          highlightText: 'Hasil akhirnya tepat 38!',
          steps: [
            '47 − 10 = 37',
            '37 + 1 = 38'
          ]
        },
        durationSeconds: 8
      },
      {
        title: 'Rangkuman Trik −9',
        speakerText: 'Kapan pun kamu melihat pengurangan 9: langsung kurangi 10 lalu tambahkan 1!',
        mascotMood: 'cheering',
        boardContent: {
          heading: 'Rumus Emas Trik −9',
          formula: 'Angka − 9 = (Angka − 10) + 1',
          highlightText: 'Contoh lain: 64 − 9 = 64 − 10 + 1 = 55!',
          steps: [
            '64 − 10 = 54',
            '54 + 1 = 55',
            'Hebat sekali bukan?'
          ]
        },
        durationSeconds: 8
      }
    ],
    practiceQuiz: {
      question: 'Gunakan trik −9: Berapa 53 − 9 = ?',
      num1: 53,
      num2: 9,
      answer: 44,
      options: [43, 44, 45, 46],
      explanation: '53 − 10 = 43, lalu tambahkan kembali 1 menjadi 44!'
    }
  },
  {
    id: 'vid-magic-11',
    title: 'Trik Kembar 11 (+11 & −11)',
    subtitle: 'Pasangan Sejati Angka 10',
    category: 'mental_tricks',
    trickKey: '+11',
    thumbnailEmoji: '🚀',
    durationLabel: '1m 30s',
    tags: ['Trik Cepat', 'Mental Math'],
    description: 'Menambah atau mengurangi 11 hanya dengan melompat ke 10 dan menyesuaikan 1 langkah.',
    scenes: [
      {
        title: 'Trik Tambah 11 (+11)',
        speakerText: 'Angka 11 itu adalah 10 ditambah 1! Jadi kalau ada soal 32 + 11...',
        mascotMood: 'happy',
        boardContent: {
          heading: 'Trik Tambah 11',
          formula: '32 + 11 = ?',
          highlightText: '11 = 10 + 1',
          steps: [
            'Langkah 1: 32 + 10 = 42',
            'Langkah 2: 42 + 1 = 43!',
            'Jadi 32 + 11 = 43.'
          ]
        },
        durationSeconds: 8
      },
      {
        title: 'Trik Kurang 11 (−11)',
        speakerText: 'Sama halnya dengan pengurangan 11! Kurangi 10 terlebih dahulu, lalu kurangi 1 lagi!',
        mascotMood: 'cheering',
        boardContent: {
          heading: 'Trik Kurang 11',
          formula: '56 − 11 = ?',
          highlightText: '−11 = −10 lalu −1',
          steps: [
            'Langkah 1: 56 − 10 = 46',
            'Langkah 2: 46 − 1 = 45!',
            'Jadi 56 − 11 = 45.'
          ]
        },
        durationSeconds: 8
      },
      {
        title: 'Rangkuman Trik 11',
        speakerText: 'Kuasai trik 11 ini, dan kamu akan jadi anak tercepat saat ada latihan di kelas!',
        mascotMood: 'proud',
        boardContent: {
          heading: 'Ringkasan Cepat 11',
          formula: '+11 ➔ (+10, +1) | −11 ➔ (−10, −1)',
          highlightText: 'Matematika jadi sangat mudah dan menyenangkan!',
          steps: [
            'Tambah 11: +10 lalu +1',
            'Kurang 11: -10 lalu -1'
          ]
        },
        durationSeconds: 8
      }
    ],
    practiceQuiz: {
      question: 'Berapa 45 + 11 = ?',
      num1: 45,
      num2: 11,
      answer: 56,
      options: [54, 55, 56, 57],
      explanation: '45 + 10 = 55, lalu 55 + 1 = 56!'
    }
  },
  {
    id: 'vid-pair-100',
    title: 'Rahasia Pasangan Emas 100',
    subtitle: 'Kunci Sukses Berbelanja & Uang Kembalian',
    category: 'mental_tricks',
    trickKey: 'pair_100',
    thumbnailEmoji: '💯',
    durationLabel: '1m 35s',
    tags: ['Pasangan 100', 'Uang Kembalian', 'Kehidupan Nyata'],
    description: 'Cara cepat mencari pasangan angka yang menghasilkan 100: Puluhan berjumlah 90, Satuan berjumlah 10!',
    scenes: [
      {
        title: 'Berapa Pasangan 67 ke 100?',
        speakerText: 'Pernah berbelanja dengan uang 100 dan bingung menghitung uang kembalian? Ada rahasia ajaibnya!',
        mascotMood: 'thinking',
        boardContent: {
          heading: 'Mencari Pasangan 100',
          formula: '67 + ... = 100',
          highlightText: 'Uang Rp 100 dipakai belanja Rp 67. Berapa kembaliannya?',
          steps: [
            'Jangan bingung menghitung mundur panjang!',
            'Gunakan Aturan Puluhan 90 & Satuan 10.'
          ]
        },
        durationSeconds: 8
      },
      {
        title: 'Aturan 90 dan 10',
        speakerText: 'Ingat kuncinya: puluhannya harus berjumlah 90, dan satuannya harus berjumlah 10!',
        mascotMood: 'cheering',
        boardContent: {
          heading: 'Aturan Emas 100',
          formula: 'Puluhan = 90 & Satuan = 10',
          highlightText: 'Karena 90 + 10 = 100!',
          steps: [
            'Untuk 67:',
            'Puluhan 6 butuh 3 (60 + 30 = 90)',
            'Satuan 7 butuh 3 (7 + 3 = 10)'
          ]
        },
        durationSeconds: 9
      },
      {
        title: 'Gabungkan Hasilnya!',
        speakerText: 'Gabungkan puluhan 3 dan satuan 3 menjadi 33! Jadi 67 + 33 = 100, dan kembaliannya adalah 33!',
        mascotMood: 'proud',
        boardContent: {
          heading: 'Jawaban Ditemukan!',
          formula: '67 + 33 = 100',
          highlightText: '100 − 67 = 33!',
          steps: [
            'Puluhan: 3 (30)',
            'Satuan: 3',
            'Gabungan: 33!'
          ]
        },
        durationSeconds: 8
      }
    ],
    practiceQuiz: {
      question: 'Berapa pasangan dari 75 untuk menjadi 100? (100 − 75 = ?)',
      num1: 100,
      num2: 75,
      answer: 25,
      options: [15, 20, 25, 35],
      explanation: '70 butuh 20 (jadi 90), 5 butuh 5 (jadi 10). Maka pasangannya adalah 25!'
    }
  },
  {
    id: 'vid-make-ten',
    title: 'Jurus Make Ten: Sahabat Sepuluh',
    subtitle: 'Ubah Angka Menjadi 10 Terlebih Dahulu',
    category: 'make_ten',
    trickKey: 'make_ten',
    thumbnailEmoji: '📦',
    durationLabel: '1m 20s',
    tags: ['Make Ten', 'Pasangan 10', 'Kelas 1-2 SD'],
    description: 'Memecah angka kedua untuk melengkapi angka pertama menjadi 10 penuh.',
    scenes: [
      {
        title: 'Tantangan: 8 + 5 = ?',
        speakerText: 'Saat kamu melihat 8 + 5, tanyakan pada dirimu: angka 8 butuh berapa agar menjadi 10?',
        mascotMood: 'thinking',
        boardContent: {
          heading: 'Soal: 8 + 5 = ?',
          formula: '8 + ? = 10',
          highlightText: 'Angka 8 butuh 2 agar menjadi 10 penuh!',
          steps: [
            '8 butuh 2 ke 10.',
            'Ambil 2 dari angka 5!'
          ]
        },
        durationSeconds: 8
      },
      {
        title: 'Pecah Angka 5 Menjadi 2 dan 3',
        speakerText: 'Pecah angka 5 menjadi 2 dan 3. Berikan 2 ke angka 8 agar menjadi 10, lalu tambahkan sisa 3!',
        mascotMood: 'cheering',
        boardContent: {
          heading: 'Pecah dan Satukan',
          formula: '8 + (2 + 3) = (8 + 2) + 3',
          highlightText: '10 + 3 = 13!',
          steps: [
            '8 + 2 = 10',
            '10 + 3 = 13',
            'Mudah sekali tanpa menghitung jari!'
          ]
        },
        durationSeconds: 8
      }
    ],
    practiceQuiz: {
      question: 'Gunakan Make Ten: 9 + 6 = ?',
      num1: 9,
      num2: 6,
      answer: 15,
      options: [14, 15, 16, 17],
      explanation: '9 butuh 1 jadi 10. Pecah 6 jadi 1 + 5. Maka 10 + 5 = 15!'
    }
  },
  {
    id: 'vid-round-tens',
    title: 'Trik Membulatkan ke Puluhan',
    subtitle: 'Untuk Angka Berakhiran 8 dan 9',
    category: 'mental_tricks',
    trickKey: 'round_tens',
    thumbnailEmoji: '🎯',
    durationLabel: '1m 25s',
    tags: ['Pembulatan', 'Mental Math'],
    description: 'Bulatkan angka rumit seperti 39 menjadi 40, hitung dengan cepat, lalu kembalikan selisihnya.',
    scenes: [
      {
        title: 'Tantangan: 39 + 24 = ?',
        speakerText: 'Angka 39 itu sangat dekat dengan 40. Bulatkan saja 39 menjadi 40 dengan meminjam 1!',
        mascotMood: 'thinking',
        boardContent: {
          heading: 'Bulatkan 39 ke 40',
          formula: '39 ➔ 40 (+1)',
          highlightText: 'Menjumlahkan 40 jauh lebih santai!',
          steps: [
            '40 + 24 = 64',
            'Karena tadi kita meminjam 1, sekarang kurangi 1:',
            '64 − 1 = 63!'
          ]
        },
        durationSeconds: 8
      },
      {
        title: 'Hasil Sempurna: 63',
        speakerText: 'Hanya dengan membulatkan ke 40, soal yang tampak rumit langsung selesai seketika!',
        mascotMood: 'proud',
        boardContent: {
          heading: 'Hasil Akhir',
          formula: '39 + 24 = 40 + 24 − 1 = 63',
          highlightText: 'Cepat, tepat, dan cerdas!',
          steps: [
            '1. Bulatkan ke 40',
            '2. Jumlahkan',
            '3. Kurangi kelebihannya'
          ]
        },
        durationSeconds: 8
      }
    ],
    practiceQuiz: {
      question: 'Berapa 49 + 35 = ?',
      num1: 49,
      num2: 35,
      answer: 84,
      options: [83, 84, 85, 86],
      explanation: '50 + 35 = 85, kurangi 1 menjadi 84!'
    }
  },
  {
    id: 'vid-stacked-carry',
    title: 'Trik Bersusun: Kotak Simpanan Juara',
    subtitle: 'Menyimpan 1 Puluhan Tanpa Pernah Lupa',
    category: 'carry_borrow',
    trickKey: 'carry',
    thumbnailEmoji: '🏰',
    durationLabel: '1m 30s',
    tags: ['Bersusun', 'Menyimpan', 'Nilai Tempat'],
    description: 'Memahami arti 1 puluhan yang disimpan di atas kolom puluhan pada penjumlahan bersusun.',
    scenes: [
      {
        title: 'Soal: 27 + 18 = ?',
        speakerText: 'Saat menjumlahkan bersusun 27 + 18, selalu mulai dari kolom satuan di sebelah kanan!',
        mascotMood: 'happy',
        boardContent: {
          heading: 'Kolom Satuan Dahulu',
          formula: '7 + 8 = 15',
          highlightText: '15 memiliki 1 puluhan dan 5 satuan!',
          steps: [
            'Tulis angka 5 di bawah satuan.',
            'Simpan angka 1 di atas kolom puluhan.'
          ]
        },
        durationSeconds: 8
      },
      {
        title: 'Hitung Kolom Puluhan',
        speakerText: 'Sekarang jumlahkan puluhannya: 1 (simpanan) + 2 + 1 = 4 puluhan. Gabungkan menjadi 45!',
        mascotMood: 'cheering',
        boardContent: {
          heading: 'Kolom Puluhan Lengkap',
          formula: '1 + 2 + 1 = 4 puluhan',
          highlightText: 'Hasil akhirnya adalah 45!',
          steps: [
            'Simpanan 1 jangan ditinggal!',
            '1 + 2 + 1 = 4',
            'Total = 45'
          ]
        },
        durationSeconds: 8
      }
    ],
    practiceQuiz: {
      question: 'Berapa 36 + 17 = ?',
      num1: 36,
      num2: 17,
      answer: 53,
      options: [43, 51, 53, 55],
      explanation: '6 + 7 = 13 (tulis 3, simpan 1). 1 + 3 + 1 = 5 puluhan. Hasilnya 53!'
    }
  },
  {
    id: 'vid-decompose-tens',
    title: 'Trik Pecah Puluhan & Satuan',
    subtitle: 'Memisahkan Angka Besar Agar Ringan',
    category: 'tens_decompose',
    trickKey: 'decompose',
    thumbnailEmoji: '🧱',
    durationLabel: '1m 20s',
    tags: ['Pecah Bilangan', 'Puluhan & Satuan'],
    description: 'Menjumlahkan puluhan dengan puluhan, dan satuan dengan satuan secara terpisah.',
    scenes: [
      {
        title: 'Tantangan: 42 + 36 = ?',
        speakerText: 'Pecah angka besar menjadi bagian yang mudah: 42 adalah 40 + 2, dan 36 adalah 30 + 6.',
        mascotMood: 'thinking',
        boardContent: {
          heading: 'Pecah Menjadi Puluhan & Satuan',
          formula: '42 = 40 + 2 | 36 = 30 + 6',
          highlightText: 'Hitung puluhannya dulu, lalu satuannya!',
          steps: [
            'Puluhan: 40 + 30 = 70',
            'Satuan: 2 + 6 = 8'
          ]
        },
        durationSeconds: 8
      },
      {
        title: 'Gabungkan: 70 + 8 = 78',
        speakerText: 'Tinggal satukan keduanya: 70 ditambah 8 menjadi 78! Ringan dan bebas stres!',
        mascotMood: 'cheering',
        boardContent: {
          heading: 'Hasil Sempurna',
          formula: '70 + 8 = 78',
          highlightText: '42 + 36 = 78!',
          steps: [
            '40 + 30 = 70',
            '2 + 6 = 8',
            '70 + 8 = 78'
          ]
        },
        durationSeconds: 8
      }
    ],
    practiceQuiz: {
      question: 'Berapa 53 + 34 = ?',
      num1: 53,
      num2: 34,
      answer: 87,
      options: [77, 85, 87, 97],
      explanation: '50 + 30 = 80; 3 + 4 = 7; 80 + 7 = 87!'
    }
  }
];
