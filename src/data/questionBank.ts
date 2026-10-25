import { Question, QuestionCategory, DifficultyLevel, InteractionType } from '../types/math';

interface RawQ {
  id: string;
  op: 'addition' | 'subtraction';
  cat: QuestionCategory;
  diff: DifficultyLevel;
  n1: number;
  n2: number;
  rec: string;
  exp: string;
  itype?: InteractionType;
  h1?: string;
  h2?: string;
}

// 26 questions per category = 208 questions total
const rawQuestions: RawQ[] = [
  // ==========================================
  // KATEGORI 1: PENJUMLAHAN DASAR (basic_addition) - 26 Soal
  // ==========================================
  { id: 'ADD-001', op: 'addition', cat: 'basic_addition', diff: 'easy', n1: 3, n2: 2, rec: 'Hitung benda apel', exp: '3 apel ditambah 2 apel sama dengan 5 apel.', itype: 'concrete_apple' },
  { id: 'ADD-002', op: 'addition', cat: 'basic_addition', diff: 'easy', n1: 4, n2: 1, rec: 'Maju satu langkah', exp: 'Dari 4, maju 1 langkah menjadi 5.' },
  { id: 'ADD-003', op: 'addition', cat: 'basic_addition', diff: 'easy', n1: 5, n2: 3, rec: 'Hitung dengan jari', exp: 'Buka 5 jari lalu buka 3 jari lagi, totalnya 8.' },
  { id: 'ADD-004', op: 'addition', cat: 'basic_addition', diff: 'easy', n1: 6, n2: 2, rec: 'Maju 2 langkah', exp: '6 ditambah 2 adalah 8.' },
  { id: 'ADD-005', op: 'addition', cat: 'basic_addition', diff: 'easy', n1: 4, n2: 4, rec: 'Angka kembar (doubles)', exp: '4 ditambah 4 adalah pasangan kembar yaitu 8.' },
  { id: 'ADD-006', op: 'addition', cat: 'basic_addition', diff: 'easy', n1: 7, n2: 2, rec: 'Hitung maju', exp: 'Dari 7, maju dua langkah: 8, 9.' },
  { id: 'ADD-007', op: 'addition', cat: 'basic_addition', diff: 'easy', n1: 5, n2: 5, rec: 'Angka kembar (doubles)', exp: '5 jari tangan kiri + 5 jari tangan kanan = 10 jari.' },
  { id: 'ADD-008', op: 'addition', cat: 'basic_addition', diff: 'easy', n1: 6, n2: 4, rec: 'Pasangan 10', exp: '6 ditambah 4 pas membentuk 10.' },
  { id: 'ADD-009', op: 'addition', cat: 'basic_addition', diff: 'easy', n1: 8, n2: 1, rec: 'Maju 1 langkah', exp: 'Setelah angka 8 adalah angka 9.' },
  { id: 'ADD-010', op: 'addition', cat: 'basic_addition', diff: 'medium', n1: 9, n2: 3, rec: 'Sahabat sepuluh', exp: '9 butuh 1 jadi 10, sisa 2 dari 3, jadi 10 + 2 = 12.' },
  { id: 'ADD-011', op: 'addition', cat: 'basic_addition', diff: 'medium', n1: 8, n2: 4, rec: 'Sahabat sepuluh', exp: '8 butuh 2 jadi 10, sisa 2 jadi 10 + 2 = 12.' },
  { id: 'ADD-012', op: 'addition', cat: 'basic_addition', diff: 'medium', n1: 7, n2: 5, rec: 'Pecah angka', exp: '7 + 3 = 10, lalu 10 + 2 = 12.' },
  { id: 'ADD-013', op: 'addition', cat: 'basic_addition', diff: 'medium', n1: 9, n2: 6, rec: 'Jadikan sepuluh', exp: 'Ambil 1 dari 6 untuk 9 jadi 10, tersisa 5. Maka 10 + 5 = 15.' },
  { id: 'ADD-014', op: 'addition', cat: 'basic_addition', diff: 'medium', n1: 8, n2: 6, rec: 'Pecah 6 jadi 2+4', exp: '8 + 2 = 10, ditambah 4 = 14.' },
  { id: 'ADD-015', op: 'addition', cat: 'basic_addition', diff: 'medium', n1: 7, n2: 6, rec: 'Hampir kembar 6+6+1', exp: '6 + 6 = 12, tambah 1 jadi 13.' },
  { id: 'ADD-016', op: 'addition', cat: 'basic_addition', diff: 'medium', n1: 9, n2: 7, rec: 'Sahabat 10', exp: '9 + 1 = 10, ditambah 6 = 16.' },
  { id: 'ADD-017', op: 'addition', cat: 'basic_addition', diff: 'medium', n1: 8, n2: 8, rec: 'Kembar 8', exp: '8 ditambah 8 adalah 16.' },
  { id: 'ADD-018', op: 'addition', cat: 'basic_addition', diff: 'medium', n1: 9, n2: 9, rec: 'Kembar 9', exp: '9 ditambah 9 sama dengan 18.' },
  { id: 'ADD-019', op: 'addition', cat: 'basic_addition', diff: 'medium', n1: 11, n2: 4, rec: 'Hitung maju', exp: '11 + 4 = 15.' },
  { id: 'ADD-020', op: 'addition', cat: 'basic_addition', diff: 'medium', n1: 12, n2: 5, rec: 'Jumlahkan satuan 2+5', exp: 'Satuan 2 + 5 = 7, dengan puluhan 10 menjadi 17.' },
  { id: 'ADD-021', op: 'addition', cat: 'basic_addition', diff: 'hard', n1: 13, n2: 6, rec: 'Pisah satuan', exp: '3 + 6 = 9, puluhan 10, total 19.' },
  { id: 'ADD-022', op: 'addition', cat: 'basic_addition', diff: 'hard', n1: 14, n2: 5, rec: 'Pisah satuan', exp: '4 + 5 = 9, jadi 14 + 5 = 19.' },
  { id: 'ADD-023', op: 'addition', cat: 'basic_addition', diff: 'hard', n1: 15, n2: 4, rec: 'Hitung maju', exp: '15 + 4 = 19.' },
  { id: 'ADD-024', op: 'addition', cat: 'basic_addition', diff: 'hard', n1: 12, n2: 7, rec: 'Satuan 2+7=9', exp: '10 + (2 + 7) = 19.' },
  { id: 'ADD-025', op: 'addition', cat: 'basic_addition', diff: 'hard', n1: 11, n2: 8, rec: 'Satuan 1+8=9', exp: '10 + (1 + 8) = 19.' },
  { id: 'ADD-026', op: 'addition', cat: 'basic_addition', diff: 'hard', n1: 16, n2: 4, rec: 'Melengkapi ke 20', exp: '16 + 4 pas membentuk 20.' },

  // ==========================================
  // KATEGORI 2: PENGURANGAN DASAR (basic_subtraction) - 26 Soal
  // ==========================================
  { id: 'SUB-001', op: 'subtraction', cat: 'basic_subtraction', diff: 'easy', n1: 5, n2: 2, rec: 'Ambil apel', exp: 'Ada 5 apel, diambil 2 apel, tersisa 3 apel.', itype: 'concrete_apple' },
  { id: 'SUB-002', op: 'subtraction', cat: 'basic_subtraction', diff: 'easy', n1: 4, n2: 1, rec: 'Mundur satu langkah', exp: 'Angka sebelum 4 adalah 3.' },
  { id: 'SUB-003', op: 'subtraction', cat: 'basic_subtraction', diff: 'easy', n1: 6, n2: 2, rec: 'Mundur 2 langkah', exp: '6 mundur dua: 5, 4. Hasilnya 4.' },
  { id: 'SUB-004', op: 'subtraction', cat: 'basic_subtraction', diff: 'easy', n1: 7, n2: 3, rec: 'Hitung jari', exp: '7 dikurangi 3 adalah 4.' },
  { id: 'SUB-005', op: 'subtraction', cat: 'basic_subtraction', diff: 'easy', n1: 8, n2: 4, rec: 'Separuh angka', exp: '8 dikurangi setengahnya (4) adalah 4.' },
  { id: 'SUB-006', op: 'subtraction', cat: 'basic_subtraction', diff: 'easy', n1: 9, n2: 2, rec: 'Mundur 2', exp: '9 dikurangi 2 menghasilkan 7.' },
  { id: 'SUB-007', op: 'subtraction', cat: 'basic_subtraction', diff: 'easy', n1: 10, n2: 3, rec: 'Sahabat 10', exp: 'Pasangan 3 untuk menjadi 10 adalah 7, maka 10 - 3 = 7.' },
  { id: 'SUB-008', op: 'subtraction', cat: 'basic_subtraction', diff: 'easy', n1: 10, n2: 5, rec: 'Separuh 10', exp: '10 dikurangi 5 menghasilkan 5.' },
  { id: 'SUB-009', op: 'subtraction', cat: 'basic_subtraction', diff: 'easy', n1: 10, n2: 7, rec: 'Pasangan 10', exp: '10 - 7 = 3 karena 7 + 3 = 10.' },
  { id: 'SUB-010', op: 'subtraction', cat: 'basic_subtraction', diff: 'medium', n1: 11, n2: 3, rec: 'Mundur ke 10', exp: '11 - 1 = 10, lalu 10 - 2 = 8.' },
  { id: 'SUB-011', op: 'subtraction', cat: 'basic_subtraction', diff: 'medium', n1: 12, n2: 4, rec: 'Singgah di 10', exp: '12 - 2 = 10, lalu 10 - 2 = 8.' },
  { id: 'SUB-012', op: 'subtraction', cat: 'basic_subtraction', diff: 'medium', n1: 13, n2: 5, rec: 'Singgah di 10', exp: '13 - 3 = 10, lalu 10 - 2 = 8.' },
  { id: 'SUB-013', op: 'subtraction', cat: 'basic_subtraction', diff: 'medium', n1: 14, n2: 6, rec: 'Singgah di 10', exp: '14 - 4 = 10, lalu 10 - 2 = 8.' },
  { id: 'SUB-014', op: 'subtraction', cat: 'basic_subtraction', diff: 'medium', n1: 15, n2: 7, rec: 'Pecah 7 jadi 5+2', exp: '15 - 5 = 10, lalu 10 - 2 = 8.' },
  { id: 'SUB-015', op: 'subtraction', cat: 'basic_subtraction', diff: 'medium', n1: 12, n2: 6, rec: 'Separuh 12', exp: '12 dikurangi 6 adalah 6.' },
  { id: 'SUB-016', op: 'subtraction', cat: 'basic_subtraction', diff: 'medium', n1: 14, n2: 7, rec: 'Separuh 14', exp: '14 dikurangi 7 adalah 7.' },
  { id: 'SUB-017', op: 'subtraction', cat: 'basic_subtraction', diff: 'medium', n1: 16, n2: 8, rec: 'Separuh 16', exp: '16 dikurangi 8 adalah 8.' },
  { id: 'SUB-018', op: 'subtraction', cat: 'basic_subtraction', diff: 'medium', n1: 18, n2: 9, rec: 'Separuh 18', exp: '18 dikurangi 9 adalah 9.' },
  { id: 'SUB-019', op: 'subtraction', cat: 'basic_subtraction', diff: 'medium', n1: 15, n2: 6, rec: 'Singgah di 10', exp: '15 - 5 = 10, sisa 1 jadi 10 - 1 = 9.' },
  { id: 'SUB-020', op: 'subtraction', cat: 'basic_subtraction', diff: 'medium', n1: 16, n2: 7, rec: 'Singgah di 10', exp: '16 - 6 = 10, sisa 1 jadi 10 - 1 = 9.' },
  { id: 'SUB-021', op: 'subtraction', cat: 'basic_subtraction', diff: 'hard', n1: 17, n2: 8, rec: 'Singgah di 10', exp: '17 - 7 = 10, sisa 1 jadi 10 - 1 = 9.' },
  { id: 'SUB-022', op: 'subtraction', cat: 'basic_subtraction', diff: 'hard', n1: 19, n2: 7, rec: 'Kurangkan satuan', exp: 'Satuan 9 - 7 = 2, dengan puluhan 10 jadi 12.' },
  { id: 'SUB-023', op: 'subtraction', cat: 'basic_subtraction', diff: 'hard', n1: 18, n2: 6, rec: 'Kurangkan satuan', exp: 'Satuan 8 - 6 = 2, dengan puluhan 10 jadi 12.' },
  { id: 'SUB-024', op: 'subtraction', cat: 'basic_subtraction', diff: 'hard', n1: 20, n2: 5, rec: 'Kurang 5 dari 20', exp: '20 mundur 5 langkah menjadi 15.' },
  { id: 'SUB-025', op: 'subtraction', cat: 'basic_subtraction', diff: 'hard', n1: 20, n2: 8, rec: 'Pasangan 10', exp: '20 = 10 + 10. Ambil 8 dari salah satu 10 (sisa 2). 10 + 2 = 12.' },
  { id: 'SUB-026', op: 'subtraction', cat: 'basic_subtraction', diff: 'hard', n1: 20, n2: 12, rec: 'Kurang puluhan & satuan', exp: '20 - 10 = 10, lalu 10 - 2 = 8.' },

  // ==========================================
  // KATEGORI 3: PASANGAN ANGKA 10 (make_ten) - 26 Soal
  // ==========================================
  { id: 'TEN-001', op: 'addition', cat: 'make_ten', diff: 'easy', n1: 9, n2: 1, rec: 'Sahabat 10', exp: '9 dan 1 adalah sahabat sepuluh: 9 + 1 = 10.' },
  { id: 'TEN-002', op: 'addition', cat: 'make_ten', diff: 'easy', n1: 8, n2: 2, rec: 'Sahabat 10', exp: '8 dan 2 adalah sahabat sepuluh: 8 + 2 = 10.' },
  { id: 'TEN-003', op: 'addition', cat: 'make_ten', diff: 'easy', n1: 7, n2: 3, rec: 'Sahabat 10', exp: '7 dan 3 adalah sahabat sepuluh: 7 + 3 = 10.' },
  { id: 'TEN-004', op: 'addition', cat: 'make_ten', diff: 'easy', n1: 6, n2: 4, rec: 'Sahabat 10', exp: '6 dan 4 adalah sahabat sepuluh: 6 + 4 = 10.' },
  { id: 'TEN-005', op: 'addition', cat: 'make_ten', diff: 'easy', n1: 5, n2: 5, rec: 'Sahabat 10', exp: '5 dan 5 adalah sahabat sepuluh: 5 + 5 = 10.' },
  { id: 'TEN-006', op: 'addition', cat: 'make_ten', diff: 'easy', n1: 8, n2: 5, rec: 'Make ten', exp: '8 butuh 2 jadi 10. Pecah 5 jadi 2 + 3. 10 + 3 = 13.' },
  { id: 'TEN-007', op: 'addition', cat: 'make_ten', diff: 'easy', n1: 9, n2: 4, rec: 'Make ten', exp: '9 butuh 1 jadi 10. Pecah 4 jadi 1 + 3. 10 + 3 = 13.' },
  { id: 'TEN-008', op: 'addition', cat: 'make_ten', diff: 'easy', n1: 7, n2: 4, rec: 'Make ten', exp: '7 butuh 3 jadi 10. Pecah 4 jadi 3 + 1. 10 + 1 = 11.' },
  { id: 'TEN-009', op: 'addition', cat: 'make_ten', diff: 'medium', n1: 8, n2: 7, rec: 'Make ten', exp: '8 butuh 2 jadi 10. Pecah 7 jadi 2 + 5. 10 + 5 = 15.' },
  { id: 'TEN-010', op: 'addition', cat: 'make_ten', diff: 'medium', n1: 9, n2: 5, rec: 'Make ten', exp: '9 butuh 1 jadi 10. Pecah 5 jadi 1 + 4. 10 + 4 = 14.' },
  { id: 'TEN-011', op: 'addition', cat: 'make_ten', diff: 'medium', n1: 7, n2: 7, rec: 'Make ten', exp: '7 butuh 3 jadi 10. Pecah 7 jadi 3 + 4. 10 + 4 = 14.' },
  { id: 'TEN-012', op: 'addition', cat: 'make_ten', diff: 'medium', n1: 6, n2: 7, rec: 'Make ten', exp: '6 butuh 4 jadi 10. Pecah 7 jadi 4 + 3. 10 + 3 = 13.' },
  { id: 'TEN-013', op: 'addition', cat: 'make_ten', diff: 'medium', n1: 18, n2: 4, rec: 'Menuju 20', exp: '18 butuh 2 ke 20. Pecah 4 jadi 2 + 2. 20 + 2 = 22.' },
  { id: 'TEN-014', op: 'addition', cat: 'make_ten', diff: 'medium', n1: 27, n2: 5, rec: 'Menuju 30', exp: '27 butuh 3 ke 30. Pecah 5 jadi 3 + 2. 30 + 2 = 32.' },
  { id: 'TEN-015', op: 'addition', cat: 'make_ten', diff: 'medium', n1: 39, n2: 4, rec: 'Menuju 40', exp: '39 butuh 1 ke 40. Pecah 4 jadi 1 + 3. 40 + 3 = 43.' },
  { id: 'TEN-016', op: 'addition', cat: 'make_ten', diff: 'medium', n1: 48, n2: 6, rec: 'Menuju 50', exp: '48 butuh 2 ke 50. Pecah 6 jadi 2 + 4. 50 + 4 = 54.' },
  { id: 'TEN-017', op: 'addition', cat: 'make_ten', diff: 'medium', n1: 57, n2: 6, rec: 'Menuju 60', exp: '57 butuh 3 ke 60. Pecah 6 jadi 3 + 3. 60 + 3 = 63.' },
  { id: 'TEN-018', op: 'addition', cat: 'make_ten', diff: 'medium', n1: 69, n2: 7, rec: 'Menuju 70', exp: '69 butuh 1 ke 70. Pecah 7 jadi 1 + 6. 70 + 6 = 76.' },
  { id: 'TEN-019', op: 'addition', cat: 'make_ten', diff: 'hard', n1: 78, n2: 5, rec: 'Menuju 80', exp: '78 butuh 2 ke 80. Pecah 5 jadi 2 + 3. 80 + 3 = 83.' },
  { id: 'TEN-020', op: 'addition', cat: 'make_ten', diff: 'hard', n1: 86, n2: 7, rec: 'Menuju 90', exp: '86 butuh 4 ke 90. Pecah 7 jadi 4 + 3. 90 + 3 = 93.' },
  { id: 'TEN-021', op: 'addition', cat: 'make_ten', diff: 'hard', n1: 89, n2: 6, rec: 'Menuju 90', exp: '89 butuh 1 ke 90. Sisa 5, jadi 90 + 5 = 95.' },
  { id: 'TEN-022', op: 'addition', cat: 'make_ten', diff: 'hard', n1: 76, n2: 8, rec: 'Menuju 80', exp: '76 butuh 4 ke 80. Sisa 4, jadi 80 + 4 = 84.' },
  { id: 'TEN-023', op: 'addition', cat: 'make_ten', diff: 'hard', n1: 68, n2: 7, rec: 'Menuju 70', exp: '68 butuh 2 ke 70. Sisa 5, jadi 70 + 5 = 75.' },
  { id: 'TEN-024', op: 'addition', cat: 'make_ten', diff: 'hard', n1: 58, n2: 9, rec: 'Menuju 60', exp: '58 butuh 2 ke 60. Sisa 7, jadi 60 + 7 = 67.' },
  { id: 'TEN-025', op: 'addition', cat: 'make_ten', diff: 'hard', n1: 47, n2: 8, rec: 'Menuju 50', exp: '47 butuh 3 ke 50. Sisa 5, jadi 50 + 5 = 55.' },
  { id: 'TEN-026', op: 'addition', cat: 'make_ten', diff: 'hard', n1: 36, n2: 9, rec: 'Menuju 40', exp: '36 butuh 4 ke 40. Sisa 5, jadi 40 + 5 = 45.' },

  // ==========================================
  // KATEGORI 4: MENGHITUNG MAJU & MUNDUR (counting_steps) - 26 Soal
  // ==========================================
  { id: 'STP-001', op: 'addition', cat: 'counting_steps', diff: 'easy', n1: 7, n2: 4, rec: 'Garis bilangan maju', exp: 'Mulai dari 7, lompat maju 4 langkah: 8, 9, 10, 11.', itype: 'number_line' },
  { id: 'STP-002', op: 'addition', cat: 'counting_steps', diff: 'easy', n1: 8, n2: 3, rec: 'Garis bilangan maju', exp: 'Mulai dari 8, lompat maju 3 langkah: 9, 10, 11.', itype: 'number_line' },
  { id: 'STP-003', op: 'subtraction', cat: 'counting_steps', diff: 'easy', n1: 12, n2: 5, rec: 'Garis bilangan mundur', exp: 'Mulai dari 12, lompat mundur 5 langkah: 11, 10, 9, 8, 7.', itype: 'number_line' },
  { id: 'STP-004', op: 'subtraction', cat: 'counting_steps', diff: 'easy', n1: 11, n2: 4, rec: 'Garis bilangan mundur', exp: 'Mulai dari 11, mundur 4 langkah sampai ke 7.', itype: 'number_line' },
  { id: 'STP-005', op: 'addition', cat: 'counting_steps', diff: 'easy', n1: 13, n2: 3, rec: 'Maju 3 langkah', exp: 'Dari 13, maju 3 langkah menjadi 16.' },
  { id: 'STP-006', op: 'subtraction', cat: 'counting_steps', diff: 'easy', n1: 14, n2: 3, rec: 'Mundur 3 langkah', exp: 'Dari 14, mundur 3 langkah: 13, 12, 11.' },
  { id: 'STP-007', op: 'addition', cat: 'counting_steps', diff: 'easy', n1: 15, n2: 5, rec: 'Maju 5 langkah', exp: 'Dari 15 lompat 5 langkah pas ke 20.' },
  { id: 'STP-008', op: 'subtraction', cat: 'counting_steps', diff: 'easy', n1: 16, n2: 4, rec: 'Mundur 4 langkah', exp: 'Dari 16 mundur 4 langkah ke 12.' },
  { id: 'STP-009', op: 'addition', cat: 'counting_steps', diff: 'medium', n1: 24, n2: 3, rec: 'Maju 3 langkah', exp: 'Dari 24 maju: 25, 26, 27.' },
  { id: 'STP-010', op: 'subtraction', cat: 'counting_steps', diff: 'medium', n1: 28, n2: 4, rec: 'Mundur 4 langkah', exp: 'Dari 28 mundur: 27, 26, 25, 24.' },
  { id: 'STP-011', op: 'addition', cat: 'counting_steps', diff: 'medium', n1: 32, n2: 5, rec: 'Maju 5 langkah', exp: 'Dari 32 maju 5 langkah ke 37.' },
  { id: 'STP-012', op: 'subtraction', cat: 'counting_steps', diff: 'medium', n1: 35, n2: 6, rec: 'Mundur lewat puluhan', exp: '35 mundur 5 ke 30, mundur 1 lagi ke 29.' },
  { id: 'STP-013', op: 'addition', cat: 'counting_steps', diff: 'medium', n1: 43, n2: 4, rec: 'Maju 4 langkah', exp: 'Dari 43 maju: 44, 45, 46, 47.' },
  { id: 'STP-014', op: 'subtraction', cat: 'counting_steps', diff: 'medium', n1: 42, n2: 5, rec: 'Mundur lewat 40', exp: '42 mundur 2 ke 40, lalu mundur 3 lagi ke 37.' },
  { id: 'STP-015', op: 'addition', cat: 'counting_steps', diff: 'medium', n1: 51, n2: 6, rec: 'Maju 6 langkah', exp: '51 + 6 = 57.' },
  { id: 'STP-016', op: 'subtraction', cat: 'counting_steps', diff: 'medium', n1: 54, n2: 7, rec: 'Mundur lewat 50', exp: '54 mundur 4 ke 50, lalu mundur 3 lagi ke 47.' },
  { id: 'STP-017', op: 'addition', cat: 'counting_steps', diff: 'medium', n1: 62, n2: 5, rec: 'Maju 5 langkah', exp: '62 + 5 = 67.' },
  { id: 'STP-018', op: 'subtraction', cat: 'counting_steps', diff: 'medium', n1: 65, n2: 8, rec: 'Mundur lewat 60', exp: '65 mundur 5 ke 60, mundur 3 ke 57.' },
  { id: 'STP-019', op: 'addition', cat: 'counting_steps', diff: 'hard', n1: 71, n2: 7, rec: 'Maju 7 langkah', exp: '71 + 7 = 78.' },
  { id: 'STP-020', op: 'subtraction', cat: 'counting_steps', diff: 'hard', n1: 73, n2: 6, rec: 'Mundur lewat 70', exp: '73 mundur 3 ke 70, mundur 3 lagi ke 67.' },
  { id: 'STP-021', op: 'addition', cat: 'counting_steps', diff: 'hard', n1: 82, n2: 8, rec: 'Maju 8 langkah pas ke 90', exp: '82 + 8 = 90.' },
  { id: 'STP-022', op: 'subtraction', cat: 'counting_steps', diff: 'hard', n1: 84, n2: 7, rec: 'Mundur lewat 80', exp: '84 mundur 4 ke 80, mundur 3 ke 77.' },
  { id: 'STP-023', op: 'addition', cat: 'counting_steps', diff: 'hard', n1: 91, n2: 6, rec: 'Maju 6 langkah', exp: '91 + 6 = 97.' },
  { id: 'STP-024', op: 'subtraction', cat: 'counting_steps', diff: 'hard', n1: 93, n2: 5, rec: 'Mundur 5 langkah', exp: '93 mundur 3 ke 90, mundur 2 ke 88.' },
  { id: 'STP-025', op: 'addition', cat: 'counting_steps', diff: 'hard', n1: 85, n2: 9, rec: 'Maju 9 langkah', exp: '85 maju 5 ke 90, maju 4 lagi ke 94.' },
  { id: 'STP-026', op: 'subtraction', cat: 'counting_steps', diff: 'hard', n1: 100, n2: 6, rec: 'Mundur 6 dari 100', exp: 'Dari 100 mundur 6 langkah sampai ke 94.' },

  // ==========================================
  // KATEGORI 5: MEMECAH PULUHAN & SATUAN (tens_decompose) - 26 Soal
  // ==========================================
  { id: 'DEC-001', op: 'addition', cat: 'tens_decompose', diff: 'easy', n1: 20, n2: 10, rec: 'Jumlahkan puluhan', exp: '2 puluhan + 1 puluhan = 3 puluhan (30).' },
  { id: 'DEC-002', op: 'addition', cat: 'tens_decompose', diff: 'easy', n1: 30, n2: 20, rec: 'Jumlahkan puluhan', exp: '30 + 20 = 50.' },
  { id: 'DEC-003', op: 'subtraction', cat: 'tens_decompose', diff: 'easy', n1: 40, n2: 10, rec: 'Kurangkan puluhan', exp: '4 puluhan - 1 puluhan = 3 puluhan (30).' },
  { id: 'DEC-004', op: 'subtraction', cat: 'tens_decompose', diff: 'easy', n1: 50, n2: 20, rec: 'Kurangkan puluhan', exp: '50 - 20 = 30.' },
  { id: 'DEC-005', op: 'addition', cat: 'tens_decompose', diff: 'easy', n1: 23, n2: 14, rec: 'Pecah puluhan dan satuan', exp: '20 + 10 = 30; 3 + 4 = 7; 30 + 7 = 37.', itype: 'base_ten_blocks' },
  { id: 'DEC-006', op: 'addition', cat: 'tens_decompose', diff: 'easy', n1: 31, n2: 15, rec: 'Pecah puluhan dan satuan', exp: '30 + 10 = 40; 1 + 5 = 6; 40 + 6 = 46.' },
  { id: 'DEC-007', op: 'subtraction', cat: 'tens_decompose', diff: 'easy', n1: 46, n2: 23, rec: 'Pecah puluhan dan satuan', exp: '40 - 20 = 20; 6 - 3 = 3; 20 + 3 = 23.' },
  { id: 'DEC-008', op: 'subtraction', cat: 'tens_decompose', diff: 'easy', n1: 57, n2: 24, rec: 'Pecah puluhan dan satuan', exp: '50 - 20 = 30; 7 - 4 = 3; 30 + 3 = 33.' },
  { id: 'DEC-009', op: 'addition', cat: 'tens_decompose', diff: 'medium', n1: 35, n2: 22, rec: 'Pisah puluhan dan satuan', exp: '30 + 20 = 50; 5 + 2 = 7; 50 + 7 = 57.' },
  { id: 'DEC-010', op: 'addition', cat: 'tens_decompose', diff: 'medium', n1: 42, n2: 26, rec: 'Pisah puluhan dan satuan', exp: '40 + 20 = 60; 2 + 6 = 8; 60 + 8 = 68.' },
  { id: 'DEC-011', op: 'subtraction', cat: 'tens_decompose', diff: 'medium', n1: 68, n2: 35, rec: 'Pisah puluhan dan satuan', exp: '60 - 30 = 30; 8 - 5 = 3; 30 + 3 = 33.' },
  { id: 'DEC-012', op: 'subtraction', cat: 'tens_decompose', diff: 'medium', n1: 79, n2: 43, rec: 'Pisah puluhan dan satuan', exp: '70 - 40 = 30; 9 - 3 = 6; 30 + 6 = 36.' },
  { id: 'DEC-013', op: 'addition', cat: 'tens_decompose', diff: 'medium', n1: 53, n2: 34, rec: 'Pisah puluhan dan satuan', exp: '50 + 30 = 80; 3 + 4 = 7; 80 + 7 = 87.' },
  { id: 'DEC-014', op: 'addition', cat: 'tens_decompose', diff: 'medium', n1: 61, n2: 28, rec: 'Pisah puluhan dan satuan', exp: '60 + 20 = 80; 1 + 8 = 9; 80 + 9 = 89.' },
  { id: 'DEC-015', op: 'subtraction', cat: 'tens_decompose', diff: 'medium', n1: 85, n2: 52, rec: 'Pisah puluhan dan satuan', exp: '80 - 50 = 30; 5 - 2 = 3; 30 + 3 = 33.' },
  { id: 'DEC-016', op: 'subtraction', cat: 'tens_decompose', diff: 'medium', n1: 96, n2: 44, rec: 'Pisah puluhan dan satuan', exp: '90 - 40 = 50; 6 - 4 = 2; 50 + 2 = 52.' },
  { id: 'DEC-017', op: 'addition', cat: 'tens_decompose', diff: 'medium', n1: 44, n2: 35, rec: 'Pisah puluhan dan satuan', exp: '40 + 30 = 70; 4 + 5 = 9; 70 + 9 = 79.' },
  { id: 'DEC-018', op: 'subtraction', cat: 'tens_decompose', diff: 'medium', n1: 77, n2: 36, rec: 'Pisah puluhan dan satuan', exp: '70 - 30 = 40; 7 - 6 = 1; 40 + 1 = 41.' },
  { id: 'DEC-019', op: 'addition', cat: 'tens_decompose', diff: 'hard', n1: 52, n2: 45, rec: 'Pecah puluhan dan satuan', exp: '50 + 40 = 90; 2 + 5 = 7; 90 + 7 = 97.' },
  { id: 'DEC-020', op: 'subtraction', cat: 'tens_decompose', diff: 'hard', n1: 89, n2: 67, rec: 'Pecah puluhan dan satuan', exp: '80 - 60 = 20; 9 - 7 = 2; 20 + 2 = 22.' },
  { id: 'DEC-021', op: 'addition', cat: 'tens_decompose', diff: 'hard', n1: 64, n2: 33, rec: 'Pecah puluhan dan satuan', exp: '60 + 30 = 90; 4 + 3 = 7; 90 + 7 = 97.' },
  { id: 'DEC-022', op: 'subtraction', cat: 'tens_decompose', diff: 'hard', n1: 98, n2: 56, rec: 'Pecah puluhan dan satuan', exp: '90 - 50 = 40; 8 - 6 = 2; 40 + 2 = 42.' },
  { id: 'DEC-023', op: 'addition', cat: 'tens_decompose', diff: 'hard', n1: 34, n2: 53, rec: 'Pecah puluhan dan satuan', exp: '30 + 50 = 80; 4 + 3 = 7; 80 + 7 = 87.' },
  { id: 'DEC-024', op: 'subtraction', cat: 'tens_decompose', diff: 'hard', n1: 95, n2: 63, rec: 'Pecah puluhan dan satuan', exp: '90 - 60 = 30; 5 - 3 = 2; 30 + 2 = 32.' },
  { id: 'DEC-025', op: 'addition', cat: 'tens_decompose', diff: 'hard', n1: 46, n2: 51, rec: 'Pecah puluhan dan satuan', exp: '40 + 50 = 90; 6 + 1 = 7; 90 + 7 = 97.' },
  { id: 'DEC-026', op: 'subtraction', cat: 'tens_decompose', diff: 'hard', n1: 99, n2: 45, rec: 'Pecah puluhan dan satuan', exp: '90 - 40 = 50; 9 - 5 = 4; 50 + 4 = 54.' },

  // ==========================================
  // KATEGORI 6: BERSUSUN MENYIMPAN & MEMINJAM (carry_borrow) - 26 Soal
  // ==========================================
  { id: 'CAR-001', op: 'addition', cat: 'carry_borrow', diff: 'easy', n1: 27, n2: 18, rec: 'Simpan 1 puluhan', exp: 'Satuan 7 + 8 = 15 (tulis 5, simpan 1). Puluhan 1 + 2 + 1 = 4. Hasilnya 45.' },
  { id: 'CAR-002', op: 'addition', cat: 'carry_borrow', diff: 'easy', n1: 36, n2: 17, rec: 'Simpan 1 puluhan', exp: '6 + 7 = 13 (tulis 3, simpan 1). 1 + 3 + 1 = 5. Hasilnya 53.' },
  { id: 'CAR-003', op: 'subtraction', cat: 'carry_borrow', diff: 'easy', n1: 52, n2: 27, rec: 'Pinjam 1 puluhan jadi 10 satuan', exp: '2 pinjam 1 jadi 12; 12 - 7 = 5. Puluhan 5 sisa 4; 4 - 2 = 2. Hasil 25.' },
  { id: 'CAR-004', op: 'subtraction', cat: 'carry_borrow', diff: 'easy', n1: 43, n2: 18, rec: 'Pinjam 1 puluhan', exp: '13 - 8 = 5. Puluhan 4 jadi 3; 3 - 1 = 2. Hasil 25.' },
  { id: 'CAR-005', op: 'addition', cat: 'carry_borrow', diff: 'medium', n1: 48, n2: 25, rec: 'Simpan 1 puluhan', exp: '8 + 5 = 13 (tulis 3, simpan 1). 1 + 4 + 2 = 7. Hasil 73.' },
  { id: 'CAR-006', op: 'addition', cat: 'carry_borrow', diff: 'medium', n1: 59, n2: 26, rec: 'Simpan 1 puluhan', exp: '9 + 6 = 15 (tulis 5, simpan 1). 1 + 5 + 2 = 8. Hasil 85.' },
  { id: 'CAR-007', op: 'subtraction', cat: 'carry_borrow', diff: 'medium', n1: 64, n2: 28, rec: 'Pinjam puluhan', exp: '14 - 8 = 6. Puluhan 6 jadi 5; 5 - 2 = 3. Hasil 36.' },
  { id: 'CAR-008', op: 'subtraction', cat: 'carry_borrow', diff: 'medium', n1: 71, n2: 35, rec: 'Pinjam puluhan', exp: '11 - 5 = 6. Puluhan 7 jadi 6; 6 - 3 = 3. Hasil 36.' },
  { id: 'CAR-009', op: 'addition', cat: 'carry_borrow', diff: 'medium', n1: 38, n2: 47, rec: 'Simpan puluhan', exp: '8 + 7 = 15 (tulis 5, simpan 1). 1 + 3 + 4 = 8. Hasil 85.' },
  { id: 'CAR-010', op: 'addition', cat: 'carry_borrow', diff: 'medium', n1: 46, n2: 38, rec: 'Simpan puluhan', exp: '6 + 8 = 14 (tulis 4, simpan 1). 1 + 4 + 3 = 8. Hasil 84.' },
  { id: 'CAR-011', op: 'subtraction', cat: 'carry_borrow', diff: 'medium', n1: 82, n2: 45, rec: 'Pinjam puluhan', exp: '12 - 5 = 7. Puluhan 8 jadi 7; 7 - 4 = 3. Hasil 37.' },
  { id: 'CAR-012', op: 'subtraction', cat: 'carry_borrow', diff: 'medium', n1: 60, n2: 24, rec: 'Pinjam dari 0', exp: '0 pinjam 1 puluhan jadi 10; 10 - 4 = 6. 6 jadi 5; 5 - 2 = 3. Hasil 36.' },
  { id: 'CAR-013', op: 'addition', cat: 'carry_borrow', diff: 'medium', n1: 57, n2: 29, rec: 'Simpan puluhan', exp: '7 + 9 = 16 (tulis 6, simpan 1). 1 + 5 + 2 = 8. Hasil 86.' },
  { id: 'CAR-014', op: 'addition', cat: 'carry_borrow', diff: 'medium', n1: 45, n2: 37, rec: 'Simpan puluhan', exp: '5 + 7 = 12 (tulis 2, simpan 1). 1 + 4 + 3 = 8. Hasil 82.' },
  { id: 'CAR-015', op: 'subtraction', cat: 'carry_borrow', diff: 'medium', n1: 75, n2: 38, rec: 'Pinjam puluhan', exp: '15 - 8 = 7. 7 jadi 6; 6 - 3 = 3. Hasil 37.' },
  { id: 'CAR-016', op: 'subtraction', cat: 'carry_borrow', diff: 'medium', n1: 90, n2: 46, rec: 'Pinjam dari 0', exp: '10 - 6 = 4. 9 jadi 8; 8 - 4 = 4. Hasil 44.' },
  { id: 'CAR-017', op: 'addition', cat: 'carry_borrow', diff: 'hard', n1: 67, n2: 28, rec: 'Simpan puluhan', exp: '7 + 8 = 15 (tulis 5, simpan 1). 1 + 6 + 2 = 9. Hasil 95.' },
  { id: 'CAR-018', op: 'addition', cat: 'carry_borrow', diff: 'hard', n1: 58, n2: 36, rec: 'Simpan puluhan', exp: '8 + 6 = 14 (tulis 4, simpan 1). 1 + 5 + 3 = 9. Hasil 94.' },
  { id: 'CAR-019', op: 'subtraction', cat: 'carry_borrow', diff: 'hard', n1: 81, n2: 46, rec: 'Pinjam puluhan', exp: '11 - 6 = 5. 8 jadi 7; 7 - 4 = 3. Hasil 35.' },
  { id: 'CAR-020', op: 'subtraction', cat: 'carry_borrow', diff: 'hard', n1: 93, n2: 57, rec: 'Pinjam puluhan', exp: '13 - 7 = 6. 9 jadi 8; 8 - 5 = 3. Hasil 36.' },
  { id: 'CAR-021', op: 'addition', cat: 'carry_borrow', diff: 'hard', n1: 49, n2: 48, rec: 'Simpan puluhan', exp: '9 + 8 = 17 (tulis 7, simpan 1). 1 + 4 + 4 = 9. Hasil 97.' },
  { id: 'CAR-022', op: 'addition', cat: 'carry_borrow', diff: 'hard', n1: 63, n2: 29, rec: 'Simpan puluhan', exp: '3 + 9 = 12 (tulis 2, simpan 1). 1 + 6 + 2 = 9. Hasil 92.' },
  { id: 'CAR-023', op: 'subtraction', cat: 'carry_borrow', diff: 'hard', n1: 92, n2: 68, rec: 'Pinjam puluhan', exp: '12 - 8 = 4. 9 jadi 8; 8 - 6 = 2. Hasil 24.' },
  { id: 'CAR-024', op: 'subtraction', cat: 'carry_borrow', diff: 'hard', n1: 83, n2: 39, rec: 'Pinjam puluhan', exp: '13 - 9 = 4. 8 jadi 7; 7 - 3 = 4. Hasil 44.' },
  { id: 'CAR-025', op: 'addition', cat: 'carry_borrow', diff: 'hard', n1: 56, n2: 38, rec: 'Simpan puluhan', exp: '6 + 8 = 14 (tulis 4, simpan 1). 1 + 5 + 3 = 9. Hasil 94.' },
  { id: 'CAR-026', op: 'subtraction', cat: 'carry_borrow', diff: 'hard', n1: 100, n2: 47, rec: 'Pinjam bertingkat', exp: '100 - 40 = 60, lalu 60 - 7 = 53.' },

  // ==========================================
  // KATEGORI 7: TRIK BERHITUNG CEPAT (mental_tricks) - 26 Soal
  // ==========================================
  { id: 'TRK-001', op: 'addition', cat: 'mental_tricks', diff: 'easy', n1: 26, n2: 9, rec: 'Trik +9 (tambah 10, kurang 1)', exp: '26 + 10 = 36, lalu kurangi 1 menjadi 35.' },
  { id: 'TRK-002', op: 'addition', cat: 'mental_tricks', diff: 'easy', n1: 35, n2: 9, rec: 'Trik +9 (tambah 10, kurang 1)', exp: '35 + 10 = 45, lalu kurangi 1 menjadi 44.' },
  { id: 'TRK-003', op: 'addition', cat: 'mental_tricks', diff: 'easy', n1: 32, n2: 11, rec: 'Trik +11 (tambah 10, tambah 1)', exp: '32 + 10 = 42, lalu tambah 1 menjadi 43.' },
  { id: 'TRK-004', op: 'addition', cat: 'mental_tricks', diff: 'easy', n1: 45, n2: 11, rec: 'Trik +11 (tambah 10, tambah 1)', exp: '45 + 10 = 55, lalu tambah 1 menjadi 56.' },
  { id: 'TRK-005', op: 'subtraction', cat: 'mental_tricks', diff: 'easy', n1: 47, n2: 9, rec: 'Trik -9 (kurang 10, tambah 1)', exp: '47 - 10 = 37, lalu tambah 1 menjadi 38.' },
  { id: 'TRK-006', op: 'subtraction', cat: 'mental_tricks', diff: 'easy', n1: 53, n2: 9, rec: 'Trik -9 (kurang 10, tambah 1)', exp: '53 - 10 = 43, lalu tambah 1 menjadi 44.' },
  { id: 'TRK-007', op: 'subtraction', cat: 'mental_tricks', diff: 'easy', n1: 56, n2: 11, rec: 'Trik -11 (kurang 10, kurang 1)', exp: '56 - 10 = 46, lalu kurangi 1 menjadi 45.' },
  { id: 'TRK-008', op: 'subtraction', cat: 'mental_tricks', diff: 'easy', n1: 68, n2: 11, rec: 'Trik -11 (kurang 10, kurang 1)', exp: '68 - 10 = 58, lalu kurangi 1 menjadi 57.' },
  { id: 'TRK-009', op: 'addition', cat: 'mental_tricks', diff: 'medium', n1: 39, n2: 24, rec: 'Bulatkan 39 ke 40', exp: '40 + 24 = 64, lalu kurangi 1 menjadi 63.' },
  { id: 'TRK-010', op: 'addition', cat: 'mental_tricks', diff: 'medium', n1: 49, n2: 35, rec: 'Bulatkan 49 ke 50', exp: '50 + 35 = 85, lalu kurangi 1 menjadi 84.' },
  { id: 'TRK-011', op: 'addition', cat: 'mental_tricks', diff: 'medium', n1: 59, n2: 27, rec: 'Bulatkan 59 ke 60', exp: '60 + 27 = 87, kurangi 1 jadi 86.' },
  { id: 'TRK-012', op: 'subtraction', cat: 'mental_tricks', diff: 'medium', n1: 74, n2: 28, rec: 'Pecah 28 jadi 20 dan 8', exp: '74 - 20 = 54, lalu 54 - 8 = 46.' },
  { id: 'TRK-013', op: 'subtraction', cat: 'mental_tricks', diff: 'medium', n1: 83, n2: 38, rec: 'Bulatkan 38 ke 40', exp: '83 - 40 = 43, lalu tambahkan kembali 2 menjadi 45.' },
  { id: 'TRK-014', op: 'addition', cat: 'mental_tricks', diff: 'medium', n1: 67, n2: 33, rec: 'Pasangan 100', exp: '60 + 30 = 90; 7 + 3 = 10; 90 + 10 = 100.' },
  { id: 'TRK-015', op: 'addition', cat: 'mental_tricks', diff: 'medium', n1: 75, n2: 25, rec: 'Pasangan 100', exp: '75 ditambah 25 pas bernilai 100.' },
  { id: 'TRK-016', op: 'addition', cat: 'mental_tricks', diff: 'medium', n1: 82, n2: 18, rec: 'Pasangan 100', exp: '82 + 18 pas membentuk 100 (80+10=90, 2+8=10).' },
  { id: 'TRK-017', op: 'subtraction', cat: 'mental_tricks', diff: 'medium', n1: 100, n2: 35, rec: 'Kebalikan pasangan 100', exp: 'Karena 65 + 35 = 100, maka 100 - 35 = 65.' },
  { id: 'TRK-018', op: 'subtraction', cat: 'mental_tricks', diff: 'medium', n1: 100, n2: 42, rec: 'Kebalikan pasangan 100', exp: '100 - 40 = 60, lalu 60 - 2 = 58.' },
  { id: 'TRK-019', op: 'addition', cat: 'mental_tricks', diff: 'hard', n1: 58, n2: 19, rec: 'Bulatkan 19 ke 20', exp: '58 + 20 = 78, lalu kurangi 1 jadi 77.' },
  { id: 'TRK-020', op: 'addition', cat: 'mental_tricks', diff: 'hard', n1: 68, n2: 29, rec: 'Bulatkan 29 ke 30', exp: '68 + 30 = 98, lalu kurangi 1 jadi 97.' },
  { id: 'TRK-021', op: 'subtraction', cat: 'mental_tricks', diff: 'hard', n1: 85, n2: 19, rec: 'Bulatkan 19 ke 20', exp: '85 - 20 = 65, lalu tambah 1 jadi 66.' },
  { id: 'TRK-022', op: 'subtraction', cat: 'mental_tricks', diff: 'hard', n1: 94, n2: 29, rec: 'Bulatkan 29 ke 30', exp: '94 - 30 = 64, lalu tambah 1 jadi 65.' },
  { id: 'TRK-023', op: 'addition', cat: 'mental_tricks', diff: 'hard', n1: 44, n2: 19, rec: 'Trik +19 (tambah 20, kurang 1)', exp: '44 + 20 = 64, lalu kurangi 1 jadi 63.' },
  { id: 'TRK-024', op: 'subtraction', cat: 'mental_tricks', diff: 'hard', n1: 91, n2: 39, rec: 'Bulatkan 39 ke 40', exp: '91 - 40 = 51, lalu tambah 1 jadi 52.' },
  { id: 'TRK-025', op: 'addition', cat: 'mental_tricks', diff: 'hard', n1: 54, n2: 46, rec: 'Pasangan 100', exp: '50 + 40 = 90; 4 + 6 = 10; 90 + 10 = 100.' },
  { id: 'TRK-026', op: 'subtraction', cat: 'mental_tricks', diff: 'hard', n1: 100, n2: 27, rec: 'Sahabat 100', exp: '100 - 20 = 80, lalu 80 - 7 = 73.' },

  // ==========================================
  // KATEGORI 8: TANTANGAN CAMPURAN 1–100 (mixed_challenge) - 26 Soal
  // ==========================================
  { id: 'MIX-001', op: 'addition', cat: 'mixed_challenge', diff: 'easy', n1: 15, n2: 12, rec: 'Cerita sehari-hari', exp: 'Miko punya 15 stiker, diberi kakak 12 stiker. Totalnya 15 + 12 = 27 stiker.' },
  { id: 'MIX-002', op: 'subtraction', cat: 'mixed_challenge', diff: 'easy', n1: 25, n2: 11, rec: 'Cerita sehari-hari', exp: 'Ibu membuat 25 kue, dimakan adik 11 kue. Sisa kue adalah 14.' },
  { id: 'MIX-003', op: 'addition', cat: 'mixed_challenge', diff: 'easy', n1: 30, n2: 25, rec: 'Jumlahkan puluhan', exp: '30 kelereng ditambah 25 kelereng = 55 kelereng.' },
  { id: 'MIX-004', op: 'subtraction', cat: 'mixed_challenge', diff: 'easy', n1: 45, n2: 20, rec: 'Kurangkan puluhan', exp: '45 balon terbang 20 balon, tersisa 25 balon.' },
  { id: 'MIX-005', op: 'addition', cat: 'mixed_challenge', diff: 'medium', n1: 39, n2: 26, rec: 'Strategi bebas', exp: '39 + 1 = 40; 40 + 25 = 65.' },
  { id: 'MIX-006', op: 'subtraction', cat: 'mixed_challenge', diff: 'medium', n1: 62, n2: 19, rec: 'Strategi bebas', exp: '62 - 20 = 42; 42 + 1 = 43.' },
  { id: 'MIX-007', op: 'addition', cat: 'mixed_challenge', diff: 'medium', n1: 45, n2: 37, rec: 'Pisah puluhan', exp: '40 + 30 = 70; 5 + 7 = 12; 70 + 12 = 82.' },
  { id: 'MIX-008', op: 'subtraction', cat: 'mixed_challenge', diff: 'medium', n1: 81, n2: 46, rec: 'Bersusun atau mundur', exp: '81 - 40 = 41; 41 - 6 = 35.' },
  { id: 'MIX-009', op: 'addition', cat: 'mixed_challenge', diff: 'medium', n1: 28, n2: 35, rec: 'Pecah angka', exp: '28 + 2 = 30; 30 + 33 = 63.' },
  { id: 'MIX-010', op: 'subtraction', cat: 'mixed_challenge', diff: 'medium', n1: 72, n2: 35, rec: 'Pecah angka', exp: '72 - 30 = 42; 42 - 5 = 37.' },
  { id: 'MIX-011', op: 'addition', cat: 'mixed_challenge', diff: 'medium', n1: 53, n2: 28, rec: 'Bulatkan ke 30', exp: '53 + 30 = 83; 83 - 2 = 81.' },
  { id: 'MIX-012', op: 'subtraction', cat: 'mixed_challenge', diff: 'medium', n1: 66, n2: 29, rec: 'Bulatkan ke 30', exp: '66 - 30 = 36; 36 + 1 = 37.' },
  { id: 'MIX-013', op: 'addition', cat: 'mixed_challenge', diff: 'medium', n1: 47, n2: 36, rec: 'Bersusun simpan', exp: '47 + 36 = 83.' },
  { id: 'MIX-014', op: 'subtraction', cat: 'mixed_challenge', diff: 'medium', n1: 84, n2: 37, rec: 'Pinjam puluhan', exp: '84 - 30 = 54; 54 - 7 = 47.' },
  { id: 'MIX-015', op: 'addition', cat: 'mixed_challenge', diff: 'hard', n1: 58, n2: 37, rec: 'Pisah puluhan & satuan', exp: '50 + 30 = 80; 8 + 7 = 15; 80 + 15 = 95.' },
  { id: 'MIX-016', op: 'subtraction', cat: 'mixed_challenge', diff: 'hard', n1: 91, n2: 45, rec: 'Pecah angka', exp: '91 - 40 = 51; 51 - 5 = 46.' },
  { id: 'MIX-017', op: 'addition', cat: 'mixed_challenge', diff: 'hard', n1: 64, n2: 29, rec: 'Bulatkan 29 ke 30', exp: '64 + 30 = 94; 94 - 1 = 93.' },
  { id: 'MIX-018', op: 'subtraction', cat: 'mixed_challenge', diff: 'hard', n1: 95, n2: 58, rec: 'Bulatkan 58 ke 60', exp: '95 - 60 = 35; 35 + 2 = 37.' },
  { id: 'MIX-019', op: 'addition', cat: 'mixed_challenge', diff: 'hard', n1: 48, n2: 49, rec: 'Hampir kembar 50', exp: '50 + 50 = 100; kurangi 2 dan 1 (kurang 3) = 97.' },
  { id: 'MIX-020', op: 'subtraction', cat: 'mixed_challenge', diff: 'hard', n1: 96, n2: 48, rec: 'Separuh angka', exp: '48 + 48 = 96, maka 96 - 48 = 48.' },
  { id: 'MIX-021', op: 'addition', cat: 'mixed_challenge', diff: 'hard', n1: 55, n2: 38, rec: 'Make ten', exp: '55 + 5 = 60; 60 + 33 = 93.' },
  { id: 'MIX-022', op: 'subtraction', cat: 'mixed_challenge', diff: 'hard', n1: 86, n2: 49, rec: 'Bulatkan 49 ke 50', exp: '86 - 50 = 36; 36 + 1 = 37.' },
  { id: 'MIX-023', op: 'addition', cat: 'mixed_challenge', diff: 'hard', n1: 67, n2: 25, rec: 'Pisah puluhan', exp: '67 + 20 = 87; 87 + 5 = 92.' },
  { id: 'MIX-024', op: 'subtraction', cat: 'mixed_challenge', diff: 'hard', n1: 97, n2: 69, rec: 'Bulatkan 69 ke 70', exp: '97 - 70 = 27; 27 + 1 = 28.' },
  { id: 'MIX-025', op: 'addition', cat: 'mixed_challenge', diff: 'hard', n1: 52, n2: 48, rec: 'Pasangan 100', exp: '52 + 48 pas tepat 100.' },
  { id: 'MIX-026', op: 'subtraction', cat: 'mixed_challenge', diff: 'hard', n1: 100, n2: 54, rec: 'Mundur dari 100', exp: '100 - 50 = 50; 50 - 4 = 46.' }
];

// Helper to generate 4 realistic, distinct options including the correct answer
function generateOptions(correctAnswer: number, operation: 'addition' | 'subtraction'): number[] {
  const optionsSet = new Set<number>();
  optionsSet.add(correctAnswer);

  const offsets = [-2, 2, -1, 1, -10, 10, -3, 3, -5, 5];
  for (const off of offsets) {
    if (optionsSet.size >= 4) break;
    const candidate = correctAnswer + off;
    if (candidate >= 0 && candidate <= 100 && candidate !== correctAnswer) {
      optionsSet.add(candidate);
    }
  }

  // Fallback if needed
  let fill = 1;
  while (optionsSet.size < 4) {
    const candidate = Math.max(0, Math.min(100, correctAnswer + fill));
    if (!optionsSet.has(candidate)) {
      optionsSet.add(candidate);
    }
    fill++;
  }

  // Shuffle deterministic or pseudo-random options
  const arr = Array.from(optionsSet);
  // Sort or shuffle so correct answer isn't always at same index
  const seed = (correctAnswer * 7 + 13) % 4;
  for (let i = arr.length - 1; i > 0; i--) {
    const j = (seed + i) % (i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Build and validate full question list
export const QUESTION_BANK: Question[] = rawQuestions.map((q) => {
  const answer = q.op === 'addition' ? q.n1 + q.n2 : q.n1 - q.n2;

  // Strict Validation Assertions
  if (q.n1 < 1 || q.n1 > 100 || q.n2 < 1 || q.n2 > 100) {
    throw new Error(`Operand out of range 1-100 in question ${q.id}`);
  }
  if (q.op === 'addition' && answer > 100) {
    throw new Error(`Addition result exceeds 100 in question ${q.id}: ${answer}`);
  }
  if (q.op === 'subtraction' && (answer < 0 || answer > 100)) {
    throw new Error(`Subtraction result negative or >100 in question ${q.id}: ${answer}`);
  }
  if (q.op === 'subtraction' && q.n1 < q.n2) {
    throw new Error(`Subtraction n1 must be >= n2 in question ${q.id}`);
  }

  const sign = q.op === 'addition' ? '+' : '−';
  const questionText = `${q.n1} ${sign} ${q.n2} = ?`;
  const options = generateOptions(answer, q.op);

  // Validate options contains answer and no duplicates
  if (options.length !== 4 || new Set(options).size !== 4 || !options.includes(answer)) {
    throw new Error(`Invalid options for question ${q.id}`);
  }

  const hint1 = q.h1 || `Coba ingat cara: ${q.rec}.`;
  const hint2 = q.h2 || `Petunjuk: Mulailah dari angka ${q.n1}, lalu ${q.op === 'addition' ? 'tambahkan' : 'kurangkan'} ${q.n2}.`;

  return {
    id: q.id,
    operation: q.op,
    category: q.cat,
    difficulty: q.diff,
    question: questionText,
    num1: q.n1,
    num2: q.n2,
    answer,
    options,
    recommendedMethod: q.rec,
    explanation: q.exp,
    interactionType: q.itype || 'multiple_choice',
    hint1,
    hint2,
  };
});

// Category count verification
export function verifyQuestionBank() {
  const counts: Record<string, number> = {};
  for (const q of QUESTION_BANK) {
    counts[q.category] = (counts[q.category] || 0) + 1;
  }
  return {
    total: QUESTION_BANK.length,
    byCategory: counts,
  };
}
