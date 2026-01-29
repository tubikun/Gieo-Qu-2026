import React from 'react';

interface Props {
  isShaking: boolean;
}

const ShakingBox: React.FC<Props> = ({ isShaking }) => {
  return (
    <div className="relative w-64 h-80 flex items-center justify-center my-8 perspective-1000">
      {/* Decorative background aura */}
      <div className={`absolute inset-0 bg-yellow-500/20 rounded-full blur-3xl transition-opacity duration-500 ${isShaking ? 'opacity-100 scale-125' : 'opacity-50'}`}></div>

      {/* The Container Cylinder */}
      <div 
        className={`relative w-40 h-64 transition-transform duration-200 ${isShaking ? 'animate-shake-hard' : ''}`}
      >
        {/* Lid/Top */}
        <div className="absolute top-0 w-40 h-10 bg-red-900 border-4 border-yellow-500 rounded-[50%] z-20 shadow-inner flex items-center justify-center">
            <div className="w-32 h-6 bg-red-950 rounded-[50%] opacity-60"></div>
        </div>

        {/* Body */}
        <div className="absolute top-5 w-40 h-56 bg-gradient-to-b from-red-800 via-red-700 to-red-900 border-x-4 border-yellow-600 z-10 rounded-b-3xl shadow-2xl flex flex-col items-center justify-center overflow-hidden">
             {/* Texture/Pattern */}
             <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')]"></div>
             
             {/* Center Emblem - Golden Horse Representation */}
             <div className="w-24 h-24 bg-red-900 rounded-full border-2 border-yellow-400 flex items-center justify-center p-2 shadow-[0_0_15px_rgba(255,215,0,0.5)]">
                <span className="text-4xl">🐎</span>
             </div>
             <div className="mt-4 text-yellow-400 font-serif font-bold text-xl tracking-widest drop-shadow-md">AIVA</div>
             <div className="text-yellow-200 text-xs">BÍNH NGỌ 2026</div>
        </div>

        {/* Sticks inside (visible when shaking or slightly protruding) */}
        <div className={`absolute -top-8 left-1/2 -translate-x-1/2 w-32 h-20 transition-all duration-300 ${isShaking ? 'opacity-100 translate-y-4' : 'opacity-0 translate-y-10'} z-0`}>
             <div className="absolute left-2 top-0 w-2 h-32 bg-yellow-200 rotate-[-15deg] border border-yellow-600 rounded-t-sm"></div>
             <div className="absolute left-10 top-2 w-2 h-32 bg-yellow-300 rotate-[5deg] border border-yellow-600 rounded-t-sm"></div>
             <div className="absolute right-8 top-1 w-2 h-32 bg-yellow-100 rotate-[-5deg] border border-yellow-600 rounded-t-sm"></div>
             <div className="absolute right-4 top-4 w-2 h-32 bg-yellow-400 rotate-[10deg] border border-yellow-600 rounded-t-sm"></div>
        </div>
      </div>
      
      {/* Sound effect hint (Visual only) */}
      {isShaking && (
        <div className="absolute top-0 right-0 animate-ping text-yellow-400 font-bold text-xl">
            Lạch cạch...
        </div>
      )}
    </div>
  );
};

export default ShakingBox;
