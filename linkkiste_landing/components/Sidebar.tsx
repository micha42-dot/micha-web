import React from 'react';

const SidebarSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="mb-8">
    <h3 className="bg-app-green text-white px-3 py-1.5 font-bold text-sm uppercase mb-3">
      {title}
    </h3>
    <div className="px-1">
      {children}
    </div>
  </div>
);

export const Sidebar: React.FC = () => {
  return (
    <>
      <SidebarSection title="Navigation">
        <ul className="space-y-2 text-sm">
          <li>
            <a href="https://linkkiste.mfprojects.workers.dev" className="text-app-blue hover:underline block">
              + Add a new bookmark
            </a>
          </li>
          <li>
            <a href="#" className="text-app-blue hover:underline block">
              Unread items (0)
            </a>
          </li>
        </ul>
      </SidebarSection>

      <SidebarSection title="Folders">
        <ul className="space-y-1 text-sm">
          {[
            { name: "Documentation", count: 12 },
            { name: "Inspiration", count: 8 },
            { name: "Tools", count: 5 },
            { name: "Articles", count: 24 }
          ].map((item, i) => (
            <li key={i} className="flex justify-between items-center group cursor-pointer">
              <span className="text-app-blue group-hover:underline">{item.name}</span>
              <span className="text-app-meta text-xs">{item.count}</span>
            </li>
          ))}
        </ul>
      </SidebarSection>

      <SidebarSection title="Popular Tags">
        <ul className="space-y-1 text-sm">
          {[
            { name: "minimalism", count: 42 },
            { name: "productivity", count: 15 },
            { name: "webdev", count: 12 },
            { name: "design", count: 9 },
            { name: "news", count: 7 },
            { name: "tech", count: 6 }
          ].map((item, i) => (
            <li key={i} className="flex justify-between items-center group cursor-pointer">
              <span className="text-app-blue group-hover:underline">{item.name}</span>
              <span className="text-app-meta text-xs">{item.count}</span>
            </li>
          ))}
        </ul>
      </SidebarSection>
    </>
  );
};