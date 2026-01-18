import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white py-4 border-b border-app-border sticky top-0 z-50">
      <div className="max-w-[960px] mx-auto px-4 flex items-center justify-between">
        {/* Logo - Link to home */}
        <a href="/" className="flex items-end gap-2 group cursor-pointer no-underline">
          <div className="flex gap-1 mb-1">
            <div className="w-6 h-6 bg-black group-hover:bg-app-text transition-colors"></div>
            <div className="w-6 h-6 bg-app-blue group-hover:bg-[#2850a7] transition-colors"></div>
          </div>
          <span className="text-2xl font-bold text-black tracking-tight leading-none">
            linkkiste
          </span>
        </a>
        
        {/* Nav */}
        <nav className="flex items-center gap-5 text-sm font-bold">
          <a 
            href="installation.html" 
            className="flex items-center gap-1.5 bg-[#f0f0f0] border border-[#999] border-b-[#666] border-r-[#666] px-3 py-1 text-xs text-[#333] hover:bg-[#e8e8e8] active:border-[#666] active:border-b-[#999] active:border-r-[#999] active:translate-y-px font-sans no-underline cursor-pointer"
            title="Install Application"
          >
             <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="square" strokeLinejoin="miter" className="mt-px">
              <path d="M12 3v13M5 10l7 7 7-7"/>
            </svg>
            INSTALLATION
          </a>
        </nav>
      </div>
    </header>
  );
};