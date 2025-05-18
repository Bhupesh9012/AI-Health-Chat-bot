
import React from 'react';
import { cn } from '@/lib/utils';
import { HeartPulse } from 'lucide-react';

interface HeaderProps {
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <header className={cn("bg-black text-white py-3 px-4", className)}>
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="size-10 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center shadow-md">
            <HeartPulse className="size-6 text-white" />
          </div>
          <h1 className="text-xl font-bold text-white">Health Center</h1>
        </div>
        
        <nav>
          <ul className="flex items-center space-x-6">
            <li><a href="#" className="text-white hover:text-gray-300">Home</a></li>
            <li><a href="#" className="text-white hover:text-gray-300">About</a></li>
            <li><a href="#" className="text-white hover:text-gray-300">Contact</a></li>
            <li><a href="#" className="text-white hover:text-gray-300">Developer</a></li>
            <li><a href="#" className="text-white hover:text-gray-300">Blog</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
