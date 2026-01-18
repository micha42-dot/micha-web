import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-app-border py-8">
      <div className="max-w-[960px] mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-xs text-app-meta">
        <div>
          <span className="font-bold text-gray-500">Linkkiste</span> &copy; {new Date().getFullYear()}
        </div>
        <div className="flex gap-4 mt-2 md:mt-0">
            <a href="#" className="hover:text-app-blue hover:underline">Documentation</a>
            <a href="#" className="hover:text-app-blue hover:underline">API</a>
            <a href="#" className="hover:text-app-blue hover:underline">GitHub</a>
        </div>
      </div>
    </footer>
  );
};