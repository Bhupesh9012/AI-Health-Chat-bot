
import React from 'react';
import { cn } from '@/lib/utils';
import { HeartPulse } from 'lucide-react';

interface HeaderProps {
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <header className={cn("border-b backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 py-3 px-4 shadow-sm", className)}>
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="size-10 bg-gradient-to-br from-primary to-blue-700 rounded-full flex items-center justify-center shadow-md">
            <HeartPulse className="size-6 text-primary-foreground animate-pulse-slow" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-blue-800 bg-clip-text text-transparent">HealthChat</h1>
            <p className="text-xs text-muted-foreground">Your AI Health Assistant</p>
          </div>
        </div>
      </div>
    </header>
  );
};
