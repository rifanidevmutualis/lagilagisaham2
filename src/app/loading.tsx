export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0B0F19]">
      <div className="flex flex-col items-center gap-6">
        <div className="relative flex items-center justify-center">
          {/* Outer glowing rings */}
          <div className="absolute w-24 h-24 border border-lime-500/20 rounded-full animate-ping" style={{ animationDuration: '3s' }}></div>
          <div className="absolute w-16 h-16 border border-lime-500/40 rounded-full animate-ping" style={{ animationDuration: '2s' }}></div>
          
          {/* Center Logo Area */}
          <div className="relative z-10 w-16 h-16 bg-lime-400 rounded-2xl flex items-center justify-center shadow-[0_0_40px_rgba(163,230,53,0.5)] animate-pulse">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0B0F19" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
              <polyline points="17 6 23 6 23 12"></polyline>
            </svg>
          </div>
        </div>
        
        {/* Loading Text */}
        <div className="text-lime-400 font-bold tracking-widest text-sm uppercase animate-pulse">
          Memuat Radar...
        </div>
      </div>
    </div>
  );
}
