'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  Receipt,
  MapPin,
  Users,
  Settings,
  Package,
  X,
  Home,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  userType?: 'admin' | 'client';
  isOpen?: boolean;
  onClose?: () => void;
}

const adminLinks = [
  {
    href: '/',
    label: 'Home',
    icon: Home,
  },
  {
    href: '/admin/dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
  },
  {
    href: '/admin/requests',
    label: 'Requests',
    icon: FileText,
  },
  {
    href: '/admin/invoices',
    label: 'Invoices',
    icon: Receipt,
  },
  {
    href: '/admin/tracking',
    label: 'Tracking',
    icon: MapPin,
  },
  {
    href: '/admin/clients',
    label: 'Clients',
    icon: Users,
  },
  {
    href: '/admin/settings',
    label: 'Settings',
    icon: Settings,
  },
];

const clientLinks = [
  {
    href: '/',
    label: 'Home',
    icon: Home,
  },
  {
    href: '/client/dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
  },
  {
    href: '/client/orders',
    label: 'My Orders',
    icon: Package,
  },
  {
    href: '/client/track',
    label: 'Track Shipment',
    icon: MapPin,
  },
  {
    href: '/client/invoices',
    label: 'Invoices',
    icon: Receipt,
  },
  {
    href: '/client/settings',
    label: 'Settings',
    icon: Settings,
  },
];

export default function Sidebar({ userType = 'admin', isOpen = true, onClose }: SidebarProps) {
  const pathname = usePathname();
  const links = userType === 'admin' ? adminLinks : clientLinks;

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] w-64 border-r bg-white dark:bg-white !bg-white bg-opacity-100 backdrop-blur-0 modern-shadow transition-all duration-300 md:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
        style={{ backgroundColor: '#ffffff' }}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between p-4 md:hidden border-b">
            <span className="text-lg font-semibold gradient-text">
              Menu
            </span>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onClose}
              className="hover:bg-accent/50 transition-colors rounded-lg"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <nav className="flex-1 space-y-2 p-4">
            {links.map((link, index) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className={cn(
                    'flex items-center space-x-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 group',
                    isActive
                      ? 'bg-primary text-white shadow'
                      : 'text-muted-foreground hover:bg-muted hover:text-accent-foreground hover:scale-[1.01]'
                  )}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <Icon className={cn(
                    'h-5 w-5 transition-colors',
                    isActive ? 'text-white' : 'group-hover:text-primary'
                  )} />
                  <span className="transition-colors">{link.label}</span>
                  {isActive && (
                    <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="border-t p-4 bg-muted/30 rounded-t-xl">
            <div className="text-xs text-muted-foreground text-center">
              <div className="font-medium mb-1 gradient-text">© 2025 TradeFlow</div>
              <div className="text-xs opacity-70">Professional Import/Export Management</div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}