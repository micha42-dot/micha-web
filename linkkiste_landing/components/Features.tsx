import React from 'react';

// Reusing the "Sidebar Section" design for feature boxes
const FeatureBox: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="h-full">
    <h3 className="bg-app-green text-white px-4 py-2 font-bold text-sm uppercase shadow-sm">
      {title}
    </h3>
    <div className="bg-app-gray/30 border-l border-r border-b border-app-border p-4 h-[calc(100%-36px)]">
      {children}
    </div>
  </div>
);

export const Features: React.FC = () => {
  return (
    <section id="features" className="py-16 border-t border-app-border bg-white">
      <div className="max-w-[960px] mx-auto px-4">
        
        {/* Tab-like separator */}
        <div className="flex items-center gap-4 mb-12">
            <span className="bg-app-blue text-white px-3 py-1 font-bold text-sm">All Features</span>
            <span className="h-px bg-app-border flex-1"></span>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          
          <FeatureBox title="Organization">
            <ul className="space-y-3">
              <li className="flex flex-col">
                <span className="text-app-blue font-bold text-sm hover:underline cursor-pointer">Folders & Tags</span>
                <span className="text-xs text-gray-600 mt-1">Structure your links in folders or use flexible tags for quick retrieval.</span>
              </li>
              <li className="flex flex-col pt-3 border-t border-gray-200">
                <span className="text-app-blue font-bold text-sm hover:underline cursor-pointer">Unread List</span>
                <span className="text-xs text-gray-600 mt-1">Save articles for later ("Read later") in a separate inbox.</span>
              </li>
            </ul>
          </FeatureBox>

          <FeatureBox title="Performance">
             <ul className="space-y-3">
              <li className="flex flex-col">
                <span className="text-app-blue font-bold text-sm hover:underline cursor-pointer">Cloudflare Workers</span>
                <span className="text-xs text-gray-600 mt-1">
                    Runs on the Edge ("The Network is the Computer"). Response times in the millisecond range.
                </span>
                <div className="mt-2 flex gap-1">
                    <span className="bg-[#e0e0e0] text-[#666] text-[10px] px-1 py-0.5">SSR</span>
                    <span className="bg-[#e0e0e0] text-[#666] text-[10px] px-1 py-0.5">EDGE</span>
                </div>
              </li>
              <li className="flex flex-col pt-3 border-t border-gray-200">
                <span className="text-app-blue font-bold text-sm hover:underline cursor-pointer">No Bloat</span>
                <span className="text-xs text-gray-600 mt-1">No React hydration madness (in the app). Pure HTML/CSS feeling.</span>
              </li>
            </ul>
          </FeatureBox>

          <FeatureBox title="Privacy">
             <div className="text-sm text-gray-700 space-y-4">
                <p>
                    <span className="font-bold text-app-text">Your data belongs to you.</span>
                </p>
                <p>
                    We don't track. No cookies, no third-party analytics scripts.
                </p>
                <div className="bg-[#fff8dc] border border-[#e8d8a0] p-2 text-xs text-[#5c4033]">
                    📝 Note: We deliberately avoid social login to guarantee data privacy.
                </div>
             </div>
          </FeatureBox>

        </div>
      </div>
    </section>
  );
};