import React, { useState, useCallback } from 'react';
import { UserInput, FortuneResult, AppState } from './types';
import { generateFortune } from './services/geminiService';
import FortuneInput from './components/FortuneInput';
import ShakingBox from './components/ShakingBox';
import FortuneResultCard from './components/FortuneResultCard';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [fortuneData, setFortuneData] = useState<FortuneResult | null>(null);

  const handleShake = useCallback(async (data: UserInput) => {
    setAppState(AppState.SHAKING);
    
    // Simulate shaking duration + API call time
    const minShakeTime = 2500;
    const startTime = Date.now();

    try {
      const result = await generateFortune(data);
      
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, minShakeTime - elapsed);

      setTimeout(() => {
        setFortuneData(result);
        setAppState(AppState.RESULT);
      }, remaining);

    } catch (error) {
      console.error(error);
      setAppState(AppState.IDLE); 
      alert("Có lỗi xảy ra khi xin quẻ. Vui lòng thử lại!");
    }
  }, []);

  const handleReset = () => {
    setFortuneData(null);
    setAppState(AppState.IDLE);
  };

  return (
    <div className="min-h-screen flex flex-col items-center relative overflow-x-hidden overflow-y-auto bg-tet-bg">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0">
         {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#8B0000] via-[#570000] to-black"></div>
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-red-600 rounded-full blur-[100px] opacity-30 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-600 rounded-full blur-[120px] opacity-20"></div>
        {/* Pattern */}
        <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(#FFD700 1px, transparent 1px)', backgroundSize: '30px 30px'}}></div>
      </div>

      {/* Header Logo Bar */}
      <div className="relative z-20 w-full p-4 flex justify-center">
          {/* AIVA Logo Representation */}
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-2 rounded-full border border-white/20 shadow-lg">
             <div className="text-3xl font-extrabold text-blue-500 tracking-tighter drop-shadow-sm">AIVA</div>
             <div className="h-6 w-px bg-white/30"></div>
             <div className="text-white/90 text-xs font-serif italic tracking-wider">Hạnh phúc từ trí tuệ</div>
          </div>
      </div>

      {/* Main Content Container */}
      <main className="relative z-10 w-full max-w-4xl flex flex-col items-center justify-center min-h-[85vh] p-4 pb-20">
        
        {/* Branding Text */}
        <header className="text-center mb-6 animate-float">
          <h1 className="font-handwriting text-5xl md:text-7xl text-yellow-400 drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)] mb-2">
            Gieo Quẻ Đầu Năm
          </h1>
          <h2 className="font-serif text-xl md:text-2xl text-yellow-100 tracking-[0.2em] uppercase border-y border-yellow-500/50 py-2 inline-block">
            Xuân Bính Ngọ 2026
          </h2>
        </header>

        {/* Dynamic Section based on State */}
        <div className="w-full flex flex-col items-center justify-center transition-all duration-500">
          
          {appState === AppState.IDLE && (
            <>
              <div className="mb-8 relative group cursor-default">
                 {/* Golden Horse 2026 Visual Construction */}
                 <div className="relative w-64 h-64 rounded-full border-4 border-yellow-500 shadow-[0_0_40px_rgba(255,215,0,0.3)] bg-gradient-to-br from-yellow-700 to-yellow-900 overflow-hidden flex items-center justify-center mx-auto mb-6 transform transition-transform group-hover:scale-105">
                    {/* Horse Silhouette/Image */}
                    <img 
                       src="https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?q=80&w=400&auto=format&fit=crop" 
                       alt="Golden Horse"
                       className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay"
                    />
                    <div className="absolute inset-0 bg-yellow-500/20 mix-blend-color-dodge"></div>
                    
                    {/* Text Overlay */}
                    <div className="relative z-10 text-center">
                        <span className="block text-6xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">🐎</span>
                        <span className="block text-4xl font-serif font-bold text-yellow-300 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] mt-2">2026</span>
                    </div>
                 </div>

                 <p className="text-center text-red-200 max-w-md italic leading-relaxed bg-black/20 p-4 rounded-xl backdrop-blur-sm">
                   "Vạn sự tùy duyên, giàu sang tùy AIVA. <br/>Nhập tên để xem năm Ngựa Vàng này bạn sẽ phi nước đại hay đi bộ ngắm hoa!"
                 </p>
              </div>
              <FortuneInput onSubmit={handleShake} disabled={false} />
            </>
          )}

          {appState === AppState.SHAKING && (
            <div className="flex flex-col items-center">
              <ShakingBox isShaking={true} />
              <p className="mt-8 text-2xl font-handwriting text-yellow-300 animate-pulse text-center px-4">
                Đang lắc ống xăm... <br/>
                <span className="text-lg font-sans text-yellow-100/80">Thần tài AIVA đang kết nối vũ trụ...</span>
              </p>
            </div>
          )}

          {appState === AppState.RESULT && fortuneData && (
            <FortuneResultCard data={fortuneData} onReset={handleReset} />
          )}

        </div>

        {/* Footer */}
        <footer className="mt-auto pt-12 text-red-300 text-xs text-center opacity-60">
          <p>© 2026 AIVA Ecosystem. Ứng dụng mang tính chất giải trí.</p>
          <p>Chúc Mừng Năm Mới - An Khang Thịnh Vượng</p>
        </footer>

      </main>
    </div>
  );
};

export default App;
