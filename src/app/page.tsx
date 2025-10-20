'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Package, Shield, Zap, Globe, Menu } from 'lucide-react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';

export default function LandingPage() {
  const { setTheme, theme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      <Navbar userType="admin" onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar userType="admin" isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className={`${sidebarOpen ? 'ml-64' : ''} md:ml-64 p-4 md:p-8 transition-[margin] duration-300`}>
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Hero Section */}
          <section className="container mx-auto px-4 py-20">
            <div className="text-center space-y-8 fade-in">
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
                Streamline Your{' '}
                <span className="gradient-text animate-pulse">
                  Import & Export
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Professional tracking and management system for seamless international trade operations
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
                <Link href="/admin/dashboard">
                  <Button 
                    size="lg" 
                    className="w-full sm:w-auto h-14 px-8 text-lg font-semibold hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    <div className="flex items-center space-x-2">
                      <Shield className="h-5 w-5" />
                      <span>Admin Portal</span>
                    </div>
                  </Button>
                </Link>
                <Link href="/client/dashboard">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="w-full sm:w-auto h-14 px-8 text-lg font-semibold hover:scale-105 transition-all duration-200 border-2 hover:border-primary/50"
                  >
                    <div className="flex items-center space-x-2">
                      <Package className="h-5 w-5" />
                      <span>Client Portal</span>
                    </div>
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          {/* Features */}
          <section className="container mx-auto px-4 py-16">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Package,
              title: "Easy Tracking",
              description: "Track your shipments in real-time from origin to destination",
              color: "text-p1",
              bgColor: "bg-p1/30",
            },
            {
              icon: Shield,
              title: "Secure Platform",
              description: "Your data is protected with enterprise-grade security",
              color: "text-p2",
              bgColor: "bg-p2/30",
            },
            {
              icon: Zap,
              title: "Fast Processing",
              description: "Quick request approvals and invoice generation",
              color: "text-p3",
              bgColor: "bg-p3/30",
            },
            {
              icon: Globe,
              title: "Global Coverage",
              description: "Import and export services to countries worldwide",
              color: "text-p4",
              bgColor: "bg-p4/30",
            },
          ].map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={feature.title}
                className="slide-in-from-bottom animate-in modern-card hover:modern-shadow-lg transition-all duration-300 hover:scale-[1.02] group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="pt-6">
                  <div className={`mb-4 rounded-xl ${feature.bgColor} p-4 w-fit group-hover:scale-110 transition-transform duration-200`}>
                    <Icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <h3 className="font-semibold mb-2 text-lg">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
            </div>
          </section>

          {/* Demo Notice */}
          <section className="container mx-auto px-4 py-16">
        <Card className="border-primary/50 bg-gradient-to-br from-primary/5 to-blue-600/5 modern-card slide-in-from-bottom animate-in">
          <CardContent className="pt-8 pb-8">
            <div className="text-center space-y-6">
              <div className="inline-flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-full">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-primary">Demo Version</span>
              </div>
              <h2 className="text-3xl font-bold gradient-text">
                Try TradeFlow Today
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
                This is a demonstration version of the TradeFlow system. All data shown is sample data for presentation purposes.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center pt-6">
                <div className="p-6 bg-background/80 backdrop-blur-sm rounded-xl border border-primary/20 hover:border-primary/40 transition-all duration-200 hover:scale-105 group modern-card">
                  <div className="flex items-center space-x-3 mb-2">
                    <Shield className="h-5 w-5 text-primary" />
                    <div className="text-sm font-medium text-muted-foreground">Admin Access</div>
                  </div>
                  <div className="font-mono text-lg font-semibold group-hover:text-primary transition-colors">
                    admin@tradeflow.com
                  </div>
                </div>
                <div className="p-6 bg-background/80 backdrop-blur-sm rounded-xl border border-blue-600/20 hover:border-blue-600/40 transition-all duration-200 hover:scale-105 group modern-card">
                  <div className="flex items-center space-x-3 mb-2">
                    <Package className="h-5 w-5 text-blue-600" />
                    <div className="text-sm font-medium text-muted-foreground">Client Access</div>
                  </div>
                  <div className="font-mono text-lg font-semibold group-hover:text-blue-600 transition-colors">
                    client@example.com
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          </Card>
          </section>
        </div>
      </main>
    </div>
  );
}