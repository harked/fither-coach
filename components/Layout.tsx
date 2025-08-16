
import React, { ReactNode } from 'react';

interface SidebarItemProps {
  icon: ReactNode;
  text: string;
  active?: boolean;
  onClick: () => void;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({ icon, text, active, onClick }) => {
  return (
    <li
      onClick={onClick}
      className={`
        relative flex items-center py-3 px-4 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${
          active
            ? "bg-gradient-to-tr from-pink-200 to-pink-100 text-pink-800"
            : "hover:bg-pink-100 text-gray-600"
        }
    `}
    >
      {icon}
      <span className="ml-3">{text}</span>
      {active && (
        <div className="absolute right-0 w-1 h-6 bg-pink-500 rounded-l-lg" />
      )}
    </li>
  );
};

interface SidebarProps {
  children: ReactNode;
}

export const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  return (
    <aside className="h-screen w-64 bg-white shadow-lg p-4">
      <div className="flex items-center pb-4 border-b border-gray-200">
         <img src="https://picsum.photos/seed/fither/40/40" alt="Logo" className="w-10 h-10 rounded-full" />
        <h1 className="text-2xl font-bold ml-3 text-pink-600">FitHer Coach</h1>
      </div>
      <ul className="mt-4">
        {children}
      </ul>
    </aside>
  );
};
