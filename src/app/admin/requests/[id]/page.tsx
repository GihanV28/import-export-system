'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { ArrowLeft, FileText, Package } from 'lucide-react';
import { mockRequests } from '@/lib/mockData';
import { formatDate, formatStatus, getStatusColor } from '@/lib/utils';

export default function RequestDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const requestId = params.id as string;
  const request = mockRequests.find((r) => r.id === requestId);

  if (!request) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar userType="admin" onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <Sidebar userType="admin" isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className="md:ml-64 p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            <Card>
              <CardContent className="p-8 text-center">
                <h2 className="text-2xl font-bold mb-2">Request Not Found</h2>
                <p className="text-muted-foreground mb-4">
                  The request with ID &quot;{requestId}&quot; could not be found.
                </p>
                <Button onClick={() => router.push('/admin/requests')}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Requests
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar userType="admin" onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar userType="admin" isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="md:ml-64 p-4 md:p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Breadcrumb */}
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/admin/dashboard">Admin</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/admin/requests">Requests</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{request.id}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => router.push('/admin/requests')}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
                <h1 className="text-3xl font-bold tracking-tight">Request Details</h1>
              </div>
              <p className="text-muted-foreground mt-2">
                Complete information about request {request.id}
              </p>
            </div>
            <Badge className={getStatusColor(request.status)} style={{ fontSize: '1rem', padding: '0.5rem 1rem' }}>
              {formatStatus(request.status)}
            </Badge>
          </div>

          {/* Request Details */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Client Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Client Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Name</Label>
                  <div className="mt-1 text-sm font-medium">{request.clientName}</div>
                </div>
                <div>
                  <Label>Email</Label>
                  <div className="mt-1 text-sm">{request.clientEmail}</div>
                </div>
                <div>
                  <Label>Phone</Label>
                  <div className="mt-1 text-sm">{request.clientPhone}</div>
                </div>
              </CardContent>
            </Card>

            {/* Item Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Item Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Item Name</Label>
                  <div className="mt-1 text-sm font-medium">{request.itemName}</div>
                </div>
                <div>
                  <Label>Description</Label>
                  <div className="mt-1 text-sm">{request.itemDescription}</div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Quantity</Label>
                    <div className="mt-1 text-sm">{request.quantity} units</div>
                  </div>
                  <div>
                    <Label>Weight</Label>
                    <div className="mt-1 text-sm">{request.weight} kg</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Shipping Information */}
            <Card>
              <CardHeader>
                <CardTitle>Shipping Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Origin Country</Label>
                    <div className="mt-1 text-sm">{request.originCountry}</div>
                  </div>
                  <div>
                    <Label>Destination Country</Label>
                    <div className="mt-1 text-sm">{request.destinationCountry}</div>
                  </div>
                </div>
                <div>
                  <Label>Purpose</Label>
                  <div className="mt-1">
                    <Badge variant="outline" className="capitalize">
                      {request.purpose}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Timeline</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Created At</Label>
                  <div className="mt-1 text-sm">{formatDate(request.createdAt)}</div>
                </div>
                <div>
                  <Label>Last Updated</Label>
                  <div className="mt-1 text-sm">{formatDate(request.updatedAt)}</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Button>
                  <FileText className="h-4 w-4 mr-2" />
                  Create Invoice
                </Button>
                <Button variant="outline">Update Status</Button>
                <Button variant="outline">Add Notes</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
