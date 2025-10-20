'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Package,
  Clock,
  CheckCircle,
  Receipt,
  MapPin,
} from 'lucide-react';
import { mockRequests, mockInvoices } from '@/lib/mockData';
import { formatCurrency, getStatusColor, formatStatus, formatDate } from '@/lib/utils';
import Link from 'next/link';

export default function ClientDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Mock data for logged-in client
  const clientRequests = mockRequests.slice(0, 3);
  const clientInvoices = mockInvoices.slice(0, 2);

  const stats = [
    {
      title: 'Active Orders',
      value: '3',
      icon: Package,
      color: 'text-p1',
      bgColor: 'bg-p1/30',
    },
    {
      title: 'Pending Payment',
      value: '1',
      icon: Clock,
      color: 'text-p2',
      bgColor: 'bg-p2/30',
    },
    {
      title: 'Completed',
      value: '12',
      icon: CheckCircle,
      color: 'text-p4',
      bgColor: 'bg-p4/30',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      <Navbar userType="client" onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar userType="client" isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className={`${sidebarOpen ? 'ml-64' : ''} md:ml-64 p-4 md:p-8 transition-[margin] duration-300`}>
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="fade-in">
            <h1 className="text-4xl font-bold tracking-tight gradient-text">Welcome Back!</h1>
            <p className="text-muted-foreground text-lg mt-2">
              Track your shipments and manage your orders
            </p>
          </div>

          {/* Stats */}
          <div className="grid gap-6 md:grid-cols-3">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
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
                  <CardContent>
                    <div className="text-3xl font-bold tracking-tight">{stat.value}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Quick Actions */}
          <Card className="slide-in-from-bottom animate-in modern-card">
            <CardHeader>
              <CardTitle className="text-xl font-semibold gradient-text">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <Link href="/client/track">
                  <Button variant="outline" className="w-full justify-start h-auto py-4 hover:bg-accent/50 hover:scale-[1.02] transition-all duration-200 group rounded-lg">
                    <MapPin className="mr-3 h-5 w-5 group-hover:text-primary transition-colors" />
                    <div className="text-left">
                      <div className="font-semibold">Track Shipment</div>
                      <div className="text-xs text-muted-foreground">
                        Enter tracking ID to view status
                      </div>
                    </div>
                  </Button>
                </Link>
                <Button variant="outline" className="w-full justify-start h-auto py-4 hover:bg-accent/50 hover:scale-[1.02] transition-all duration-200 group rounded-lg">
                  <Package className="mr-3 h-5 w-5 group-hover:text-primary transition-colors" />
                  <div className="text-left">
                    <div className="font-semibold">New Request</div>
                    <div className="text-xs text-muted-foreground">
                      Submit a new import/export request
                    </div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Orders */}
          <Card className="slide-in-from-bottom animate-in modern-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-semibold gradient-text">Recent Orders</CardTitle>
                <Button variant="ghost" size="sm" className="hover:bg-accent rounded-lg">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {clientRequests.map((request, index) => (
                  <div
                    key={request.id}
                    className="flex items-center justify-between p-4 border rounded-xl hover:bg-accent/50 transition-all duration-200 hover:modern-shadow group modern-card"
                    style={{ animationDelay: `${(index + 3) * 50}ms` }}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="bg-primary/10 p-3 rounded-xl group-hover:bg-primary/20 transition-colors">
                        <Package className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-semibold text-sm">{request.id}</div>
                        <div className="text-sm text-muted-foreground">
                          {request.itemName}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {request.originCountry} → {request.destinationCountry}
                        </div>
                      </div>
                    </div>
                    <div className="text-right space-y-2">
                      <Badge className={getStatusColor(request.status)}>
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

          {/* Recent Invoices */}
          <Card className="slide-in-from-bottom animate-in modern-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-semibold gradient-text">Recent Invoices</CardTitle>
                <Button variant="ghost" size="sm" className="hover:bg-accent rounded-lg">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {clientInvoices.map((invoice, index) => (
                  <div
                    key={invoice.id}
                    className="flex items-center justify-between p-4 border rounded-xl hover:bg-accent/50 transition-all duration-200 hover:modern-shadow group modern-card"
                    style={{ animationDelay: `${(index + 6) * 50}ms` }}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-xl group-hover:bg-green-200 dark:group-hover:bg-green-900/50 transition-colors">
                        <Receipt className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-sm">{invoice.invoiceNumber}</div>
                        <div className="text-sm text-muted-foreground">
                          Request: {invoice.requestId}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {formatDate(invoice.createdAt)}
                        </div>
                      </div>
                    </div>
                    <div className="text-right space-y-2">
                      <div className="font-semibold text-lg">
                        {formatCurrency(invoice.total, invoice.currency)}
                      </div>
                      <Badge
                        className={
                          invoice.status === 'paid'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                            : 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400'
                        }
                      >
                        {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}