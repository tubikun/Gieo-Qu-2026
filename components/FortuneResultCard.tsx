import React from 'react';
import { FortuneResult } from '../types';

interface Props {
  data: FortuneResult;
  onReset: () => void;
}

const FortuneResultCard: React.FC<Props> = ({ data, onReset }) => {
  return (
    <div className="animate-[float_0.5s_ease-out] w-full max-w-2xl relative bg-[#fffdf0] text-red-900 rounded-xl shadow-[0_0_50px_rgba(255,215,0,0.4)] overflow-hidden border-4 border-tet-gold p-1">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')]"></div>

      {/* Header with Title and Logo */}
      <div className="relative z-10 bg-red-800 p-4 text-center border-b-4 border-tet-gold shadow-md">
         <div className="flex justify-center items-center gap-2 mb-2">
            {/* AIVA Logo Placeholder - Replace with actual asset if available */}
            <div className="bg-white/90 px-3 py-1 rounded-full flex items-center gap-2 shadow-sm">
                <span className="text-blue-600 font-extrabold text-lg tracking-tighter">AIVA</span>
                <span className="text-blue-400 text-[10px] uppercase font-bold tracking-widest hidden sm:block">Hạnh phúc từ trí tuệ</span>
            </div>
         </div>
         <h2 className="font-serif text-3xl sm:text-4xl font-bold text-yellow-400 uppercase tracking-wide drop-shadow-md">
          {data.title}
        </h2>
      </div>

      {/* Main Content List */}
      <div className="relative z-0 p-6 md:p-8 overflow-y-auto max-h-[60vh]">
        
        {/* Lucky Indicators */}
        <div className="flex justify-center gap-4 mb-6">
           <div className="bg-red-100 border border-red-200 px-4 py-2 rounded-lg flex flex-col items-center min-w-[100px]">
              <span className="text-xs text-red-500 font-bold uppercase">Số đỏ</span>
              <span className="text-3xl font-bold text-red-700">{data.luckyNumber}</span>
           </div>
           <div className="bg-red-100 border border-red-200 px-4 py-2 rounded-lg flex flex-col items-center min-w-[100px]">
              <span className="text-xs text-red-500 font-bold uppercase">Màu hên</span>
              <span className="text-lg font-bold text-purple-700 whitespace-nowrap">{data.luckyColor}</span>
           </div>
        </div>

        {/* The 7 Predictions Grid */}
        <div className="space-y-4">
            <PredictionItem icon="💪" label="Sức Khỏe" content={data.health} />
            <PredictionItem icon="💰" label="Tiền Bạc" content={data.money} />
            <PredictionItem icon="💎" label="Tài Lộc" content={data.wealth} />
            <PredictionItem icon="❤️" label="Tình Duyên" content={data.love} />
            <PredictionItem icon="🏆" label="Công Danh" content={data.fame} />
            <PredictionItem icon="🚀" label="Sự Nghiệp" content={data.career} />
            
            {/* Special AIVA Section */}
            <div className="mt-6 bg-blue-50 border-2 border-blue-200 rounded-xl p-4 transform hover:scale-[1.02] transition-transform">
               <div className="flex items-center gap-2 mb-2">
                 <span className="text-2xl">🤖</span>
                 <h3 className="font-bold text-blue-800 uppercase text-sm">Lời phán AIVA</h3>
               </div>
               <p className="text-blue-900 font-medium italic">"{data.aiva}"</p>
            </div>
        </div>

        <div className="mt-8 text-center">
            <button
            onClick={onReset}
            className="bg-gradient-to-r from-red-700 to-red-900 hover:from-red-600 hover:to-red-800 text-yellow-100 font-bold py-3 px-10 rounded-full shadow-lg transition-all hover:shadow-yellow-500/30 hover:-translate-y-1 active:scale-95 border-2 border-yellow-500"
            >
            Gieo Quẻ Khác
            </button>
        </div>
      </div>
    </div>
  );
};

const PredictionItem: React.FC<{icon: string, label: string, content: string}> = ({ icon, label, content }) => (
  <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-red-50 transition-colors border-b border-red-100/50 last:border-0">
    <div className="text-2xl mt-0.5 select-none">{icon}</div>
    <div>
      <h4 className="font-bold text-red-800 text-sm uppercase mb-0.5">{label}</h4>
      <p className="text-gray-800 text-sm leading-relaxed">{content}</p>
    </div>
  </div>
);

export default FortuneResultCard;
