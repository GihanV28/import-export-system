'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
  Package,
  Clock,
  Truck,
  CheckCircle,
  DollarSign,
  TrendingUp,
  FileText,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Users,
  Globe,
} from 'lucide-react';
import { mockDashboardStats, mockRequests } from '@/lib/mockData';
import { formatCurrency, getStatusColor, formatStatus, formatDate } from '@/lib/utils';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const stats = mockDashboardStats;
  const recentRequests = mockRequests.slice(0, 5);

  const statCards = [
    {
      title: 'Total Requests',
      value: stats.totalRequests,
      icon: FileText,
      color: 'text-p1',
      bgColor: 'bg-p1/30',
      trend: '+12.5%',
      trendIcon: ArrowUpRight,
      trendColor: 'text-p1',
    },
    {
      title: 'Pending Requests',
      value: stats.pendingRequests,
      icon: Clock,
      color: 'text-p2',
      bgColor: 'bg-p2/30',
      trend: '+5.2%',
      trendIcon: ArrowUpRight,
      trendColor: 'text-p2',
    },
    {
      title: 'Active Shipments',
      value: stats.activeShipments,
      icon: Truck,
      color: 'text-p3',
      bgColor: 'bg-p3/30',
      trend: '+8.1%',
      trendIcon: ArrowUpRight,
      trendColor: 'text-p3',
    },
    {
      title: 'Completed',
      value: stats.completedDeliveries,
      icon: CheckCircle,
      color: 'text-p4',
      bgColor: 'bg-p4/30',
      trend: '+15.3%',
      trendIcon: ArrowUpRight,
      trendColor: 'text-p4',
    },
  ];

  const revenueCards = [
    {
      title: 'Total Revenue',
      value: formatCurrency(stats.totalRevenue),
      icon: DollarSign,
      trend: '+12.5%',
      trendIcon: ArrowUpRight,
      trendColor: 'text-green-600',
      description: 'vs last month',
    },
    {
      title: 'This Month',
      value: formatCurrency(stats.monthlyRevenue),
      icon: TrendingUp,
      trend: '+8.2%',
      trendIcon: ArrowUpRight,
      trendColor: 'text-green-600',
      description: 'vs last month',
    },
  ];

  const quickStats = [
    {
      title: 'Active Clients',
      value: '24',
      icon: Users,
      color: 'text-p1',
      bgColor: 'bg-p1/30',
    },
    {
      title: 'Countries Served',
      value: '15',
      icon: Globe,
      color: 'text-p2',
      bgColor: 'bg-p2/30',
    },
    {
      title: 'System Uptime',
      value: '99.9%',
      icon: Activity,
      color: 'text-p4',
      bgColor: 'bg-p4/30',
    },
  ];


  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      <Navbar userType="admin" onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar userType="admin" isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className={`${sidebarOpen ? 'ml-64' : ''} md:ml-64 p-4 md:p-8 transition-[margin] duration-300`}>
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Breadcrumb */}
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/admin/dashboard" className="hover:text-primary transition-colors">Admin</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Dashboard</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Header */}
          <div className="fade-in">
            <h1 className="text-4xl font-bold tracking-tight gradient-text">
              Dashboard
            </h1>
            <p className="text-muted-foreground text-lg mt-2">
              Welcome back! Here&apos;s an overview of your operations.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {statCards.map((stat, index) => {
              const Icon = stat.icon;
              const TrendIcon = stat.trendIcon;
              return (
                <Card
                  key={stat.title}
                  className="slide-in-from-bottom animate-in modern-card hover:modern-shadow-lg transition-all duration-300 hover:scale-[1.02]"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </CardTitle>
                    <div className={`${stat.bgColor} p-3 rounded-xl modern-shadow`}>
                      <Icon className={`h-5 w-5 ${stat.color}`} />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="text-3xl font-bold tracking-tight">{stat.value}</div>
                    <div className="flex items-center space-x-1">
                      <TrendIcon className={`h-4 w-4 ${stat.trendColor}`} />
                      <span className={`text-sm font-medium ${stat.trendColor}`}>
                        {stat.trend}
                      </span>
                      <span className="text-xs text-muted-foreground">vs last month</span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Revenue Cards */}
          <div className="grid gap-6 md:grid-cols-2">
            {revenueCards.map((card, index) => {
              const Icon = card.icon;
              const TrendIcon = card.trendIcon;
              return (
                <Card
                  key={card.title}
                  className="slide-in-from-bottom animate-in modern-card hover:modern-shadow-lg transition-all duration-300 hover:scale-[1.01]"
                  style={{ animationDelay: `${(index + 4) * 100}ms` }}
                >
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {card.title}
                    </CardTitle>
                    <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-xl modern-shadow">
                      <Icon className="h-5 w-5 text-green-600" />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="text-3xl font-bold tracking-tight">{card.value}</div>
                    <div className="flex items-center space-x-1">
                      <TrendIcon className={`h-4 w-4 ${card.trendColor}`} />
                      <span className={`text-sm font-medium ${card.trendColor}`}>
                        {card.trend}
                      </span>
                      <span className="text-xs text-muted-foreground">{card.description}</span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Quick Stats */}
          <div className="grid gap-4 md:grid-cols-3">
            {quickStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card
                  key={stat.title}
                  className="slide-in-from-bottom animate-in modern-card hover:modern-shadow-lg transition-all duration-300 hover:scale-[1.01]"
                  style={{ animationDelay: `${(index + 6) * 100}ms` }}
                >
                  <CardContent className="flex items-center space-x-4 p-6">
                    <div className={`${stat.bgColor} p-3 rounded-xl modern-shadow`}>
                      <Icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.title}</div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Recent Requests */}
          <Card className="slide-in-from-bottom animate-in modern-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-semibold gradient-text">Recent Requests</CardTitle>
                <Link href="/admin/requests">
                  <Button variant="ghost" size="sm" className="hover:bg-accent rounded-lg">
                    View All
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentRequests.map((request, index) => (
                  <div
                    key={request.id}
                    className="flex items-center justify-between p-4 border rounded-xl hover:bg-accent/50 transition-all duration-200 hover:modern-shadow group modern-card"
                    style={{ animationDelay: `${(index + 9) * 50}ms` }}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="bg-primary/10 p-3 rounded-xl group-hover:bg-primary/20 transition-colors">
                        <Package className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-semibold text-sm">{request.id}</div>
                        <div className="text-sm text-muted-foreground">
                          {request.clientName}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {request.itemName}
                        </div>
                      </div>
                    </div>
                    <div className="text-right space-y-2">
                      <Badge className={`${getStatusColor(request.status)} font-medium`}>
                        {formatStatus(request.status)}
                      </Badge>
                      <div className="text-xs text-muted-foreground">
                        {formatDate(request.updatedAt)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="slide-in-from-bottom animate-in modern-card">
            <CardHeader>
              <CardTitle className="text-xl font-semibold gradient-text">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <Link href="/admin/requests">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start h-12 hover:bg-accent/50 hover:scale-[1.02] transition-all duration-200 group rounded-lg"
                  >
                    <AlertCircle className="mr-3 h-5 w-5 group-hover:text-orange-600 transition-colors" />
                    <div className="text-left">
                      <div className="font-medium">Review Pending</div>
                      <div className="text-xs text-muted-foreground">Check new requests</div>
                    </div>
                  </Button>
                </Link>
                <Link href="/admin/invoices">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start h-12 hover:bg-accent/50 hover:scale-[1.02] transition-all duration-200 group rounded-lg"
                  >
                    <FileText className="mr-3 h-5 w-5 group-hover:text-blue-600 transition-colors" />
                    <div className="text-left">
                      <div className="font-medium">Create Invoice</div>
                      <div className="text-xs text-muted-foreground">Generate new invoice</div>
                    </div>
                  </Button>
                </Link>
                <Link href="/admin/tracking">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start h-12 hover:bg-accent/50 hover:scale-[1.02] transition-all duration-200 group rounded-lg"
                  >
                    <Truck className="mr-3 h-5 w-5 group-hover:text-purple-600 transition-colors" />
                    <div className="text-left">
                      <div className="font-medium">Update Tracking</div>
                      <div className="text-xs text-muted-foreground">Track shipments</div>
                    </div>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}