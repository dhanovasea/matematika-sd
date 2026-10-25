import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { sound } from '../../utils/audio';

interface NumberShopGameProps {
  onEarnReward: (xp: number, stars: number) => void;
  onExit: () => void;
}

interface ShopItem {
  name: string;
  price: number;
  icon: string;
}

export const NumberShopGame: React.FC<NumberShopGameProps> = ({
  onEarnReward,
  onExit
}) => {
  const shopCatalog: ShopItem[] = [
    { name: 'Susu Kotak', price: 25, icon: '🥛' },
    { name: 'Biskuit Madu', price: 15, icon: '🍪' },
    { name: 'Apel Manis', price: 20, icon: '🍎' },
    { name: 'Pensil Warna', price: 30, icon: '✏️' },
    { name: 'Buku Cerita', price: 40, icon: '📖' },
    { name: 'Roti Keju', price: 35, icon: '🥐' }
  ];

  const [orderStage, setOrderStage] = useState<'total' | 'change'>('total');
  const [item1, setItem1] = useState<ShopItem>(shopCatalog[0]);
  const [item2, setItem2] = useState<ShopItem>(shopCatalog[1]);
  const [paidMoney, setPaidMoney] = useState(100);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isFinished, setIsFinished] = useState(false);

  const totalPrice = item1.price + item2.price;
  const changeDue = paidMoney - totalPrice;

  // Generate 4 multiple choice options
  const targetAnswer = orderStage === 'total' ? totalPrice : changeDue;

  const generateShopOptions = (ans: number) => {
    const s = new Set<number>();
    s.add(ans);
    [-10, 10, -5, 5, -15, 15].forEach(delta => {
      if (s.size < 4 && ans + delta > 0 && ans + delta <= 100 && ans + delta !== ans) {
        s.add(ans + delta);
      }
    });
    return Array.from(s).sort(() => Math.random() - 0.5);
  };

  const [options, setOptions] = useState<number[]>(() => generateShopOptions(totalPrice));

  const startNewCustomer = () => {
    const i1 = shopCatalog[Math.floor(Math.random() * shopCatalog.length)];
    let i2 = shopCatalog[Math.floor(Math.random() * shopCatalog.length)];
    while (i1.price + i2.price > 90) {
      i2 = shopCatalog[Math.floor(Math.random() * shopCatalog.length)];
    }
    const tot = i1.price + i2.price;
    const paid = tot <= 50 && Math.random() > 0.5 ? 50 : 100;

    setItem1(i1);
    setItem2(i2);
    setPaidMoney(paid);
    setOrderStage('total');
    setOptions(generateShopOptions(tot));
    setFeedback(null);
  };

  const handleSelectOption = (val: number) => {
    if (orderStage === 'total') {
      if (val === totalPrice) {
        sound.playCorrect();
        setFeedback(`Benar! Total belanja adalah Rp ${totalPrice}. Sekarang mari hitung uang kembaliannya!`);
        setOrderStage('change');
        setOptions(generateShopOptions(paidMoney - totalPrice));
      } else {
        sound.playWrong();
        setFeedback(`Kurang tepat, coba jumlahkan harga kedua barang: ${item1.price} + ${item2.price}`);
      }
    } else {
      // change stage
      if (val === changeDue) {
        sound.playCorrect();
        sound.playStar();
        setScore(s => s + 20);

        if (round >= 3) {
          sound.playVictory();
          confetti({ particleCount: 90, spread: 70 });
          setIsFinished(true);
          onEarnReward(60, 4);
        } else {
          setRound(r => r + 1);
          setFeedback(`Hebat sekali! Kembalian Rp ${changeDue} diberikan dengan benar! 🛍️`);
          setTimeout(startNewCustomer, 1200);
        }
      } else {
        sound.playWrong();
        setFeedback(`Kembalian belum tepat. Uang bayar Rp ${paidMoney} dikurangi Rp ${totalPrice} ya!`);
      }
    }
  };

  return (
    <div className="bg-gradient-to-b from-amber-400 via-orange-300 to-amber-100 p-4 md:p-8 rounded-3xl text-slate-900 shadow-xl min-h-[500px] flex flex-col justify-between relative overflow-hidden">
      {/* Top Header */}
      <div className="flex items-center justify-between bg-white/70 backdrop-blur-md px-4 py-2 rounded-2xl z-10 border border-amber-300">
        <button
          onClick={onExit}
          className="bg-amber-100 hover:bg-amber-200 px-3 py-1 rounded-xl text-xs font-bold text-amber-900 transition-transform active:scale-95"
        >
          ← Keluar
        </button>
        <span className="font-black text-sm md:text-base text-amber-950">🏪 Toko Angka Serba Ada</span>
        <span className="text-xs font-bold text-amber-900 bg-amber-200 px-3 py-1 rounded-full">
          Pelanggan {round} / 3
        </span>
      </div>

      {/* Grocery Counter Scene */}
      <div className="my-4 z-10 max-w-2xl mx-auto w-full">
        <div className="bg-white/95 rounded-3xl p-5 border-2 border-amber-300 shadow-lg">
          <div className="flex items-center justify-between border-b pb-3 mb-4">
            <span className="text-xs font-bold text-slate-500 uppercase">Keranjang Belanja Pelanggan</span>
            <span className="text-xs font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
              Uang Dibayar: Rp {paidMoney} 💵
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            {/* Item 1 */}
            <div className="flex items-center gap-3 bg-amber-50 p-3 rounded-2xl border border-amber-200">
              <span className="text-3xl">{item1.icon}</span>
              <div>
                <div className="text-sm font-bold text-slate-800">{item1.name}</div>
                <div className="text-xs font-black text-amber-700">Rp {item1.price}</div>
              </div>
            </div>

            {/* Item 2 */}
            <div className="flex items-center gap-3 bg-amber-50 p-3 rounded-2xl border border-amber-200">
              <span className="text-3xl">{item2.icon}</span>
              <div>
                <div className="text-sm font-bold text-slate-800">{item2.name}</div>
                <div className="text-xs font-black text-amber-700">Rp {item2.price}</div>
              </div>
            </div>
          </div>

          {/* Current Question in Shop */}
          <div className="bg-orange-50 border-2 border-orange-300 rounded-2xl p-4 text-center my-2">
            <div className="text-xs font-bold text-orange-800 uppercase tracking-wide mb-1">
              {orderStage === 'total'
                ? 'Langkah 1: Berapa total belanjaan kedua barang ini?'
                : `Langkah 2: Pelanggan membayar Rp ${paidMoney}. Berapa uang kembaliannya?`}
            </div>

            <div className="text-3xl md:text-4xl font-black text-orange-950 my-1">
              {orderStage === 'total' ? (
                <>Rp {item1.price} + Rp {item2.price} = ?</>
              ) : (
                <>Rp {paidMoney} − Rp {totalPrice} = ?</>
              )}
            </div>

            {feedback && (
              <p className="text-xs font-bold text-orange-700 mt-2 bg-white/80 py-1 px-3 rounded-full inline-block">
                {feedback}
              </p>
            )}
          </div>

          {/* Choices */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
            {options.map((opt) => (
              <button
                key={opt}
                onClick={() => handleSelectOption(opt)}
                className="bg-amber-500 hover:bg-amber-600 text-white font-black text-xl py-3 rounded-2xl shadow-md btn-press transition-transform active:scale-95 cursor-pointer"
              >
                Rp {opt}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Completion Modal */}
      {isFinished && (
        <div className="absolute inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-20">
          <div className="bg-white rounded-3xl p-6 text-center max-w-sm shadow-2xl">
            <div className="text-5xl mb-2">🛍️</div>
            <h3 className="text-2xl font-black text-slate-900 mb-1">Kasir Cilik Berbakat!</h3>
            <p className="text-slate-600 text-xs mb-4">
              Semua pelanggan puas karena hitungan total dan kembalianmu sangat teliti!
            </p>
            <div className="bg-amber-100 p-3 rounded-xl border border-amber-300 font-bold text-amber-900 mb-4 text-sm">
              +60 XP ⭐ +4 Bintang Kasir!
            </div>
            <button
              onClick={onExit}
              className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-6 py-2.5 rounded-xl shadow-xs"
            >
              Kembali ke Menu Game
            </button>
          </div>
        </div>
      )}

      {/* Ground Footer */}
      <div className="h-4" />
    </div>
  );
};
