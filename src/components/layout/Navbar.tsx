'use client';

import { Moon, Sun, Package, Menu } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';

interface NavbarProps {
  userType?: 'admin' | 'client';
  onMenuClick?: () => void;
}

export default function Navbar({ userType = 'admin', onMenuClick }: NavbarProps) {
  const { setTheme, theme } = useTheme();

  return (
    <nav className="sticky top-0 z-50 border-b bg-white/90 dark:bg-neutral-900/90 backdrop-blur supports-[backdrop-filter]:bg-white/80 modern-shadow">
      <div className="flex h-16 items-center px-4 md:px-8">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden mr-3 hover:bg-accent/50 transition-all duration-200 rounded-lg"
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" />
        </Button>

        <Link 
          href={userType === 'admin' ? '/admin/dashboard' : '/client/dashboard'} 
          className="flex items-center space-x-3 group"
        >
          <div className="rounded-xl p-2.5 modern-shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105 brand-badge">
            <Package className="h-5 w-5 text-white" />
          </div>
          <span className="hidden font-bold text-xl md:inline-block brand-text group-hover:scale-105 transition-all duration-300">
            TradeFlow
          </span>
        </Link>

        <div className="ml-auto flex items-center space-x-3">
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-accent/50 transition-all duration-200 hover:scale-105 rounded-lg"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className="hidden md:flex hover:bg-accent/50 transition-all duration-200 hover:scale-105 rounded-lg px-3 py-2"
              >
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="font-medium">{userType === 'admin' ? 'Admin' : 'Client'}</span>
                  <span className="text-muted-foreground text-xs">▼</span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 modern-shadow-lg">
              <DropdownMenuItem className="cursor-pointer hover:bg-accent/50 transition-colors rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Profile</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer hover:bg-accent/50 transition-colors rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>Settings</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer hover:bg-accent/50 transition-colors rounded-lg">
                <Link href="/" className="flex items-center space-x-2 w-full">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span>Logout</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}