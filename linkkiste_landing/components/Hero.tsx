import React from 'react';

export const Hero: React.FC = () => {
  return (
    <section className="pt-24 pb-20 px-4">
      <div className="max-w-[800px] mx-auto text-center">
        
        <h1 className="text-4xl md:text-5xl font-bold text-app-text mb-6 tracking-tight">
          Your Bookmarks.<br />
          <span className="text-app-blue">Simply Sorted.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          Save links like it's 2004. Fast, text-based, and without algorithmic clutter.
        </p>

        {/* Primary CTA */}
        <div className="flex justify-center mb-12">
           <a 
              href="https://linkkiste.mfprojects.workers.dev"
              className="bg-app-green text-white font-bold px-10 py-4 text-base uppercase hover:bg-[#7ab332] transition-colors shadow-sm inline-flex items-center gap-2 border-b-2 border-[#6ea02e]"
            >
              Start Bookmarking
            </a>
        </div>

        {/* Tags */}
        <div className="flex justify-center gap-2 opacity-70">
            <span className="bg-white border border-gray-300 px-2 py-0.5 text-xs text-app-meta">minimalism</span>
            <span className="bg-white border border-gray-300 px-2 py-0.5 text-xs text-app-meta">productivity</span>
            <span className="bg-white border border-gray-300 px-2 py-0.5 text-xs text-app-meta">speed</span>
        </div>

      </div>
    </section>
  );
};