'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Search, Eye, FileText, Package } from 'lucide-react';
import { mockRequests } from '@/lib/mockData';
import { formatDate, formatStatus, getStatusColor } from '@/lib/utils';
import { Request } from '@/types';

export default function AdminRequests() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredRequests = mockRequests.filter((request) => {
    const matchesSearch =
      request.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.itemName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleViewDetails = (request: Request) => {
    setSelectedRequest(request);
    setDetailsOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar userType="admin" onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar userType="admin" isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="md:ml-64 p-4 md:p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Requests Management</h1>
            <p className="text-muted-foreground">
              View and manage all import/export requests
            </p>
          </div>

          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle>Filter Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by ID, client name, or item..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full md:w-[200px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="under_review">Under Review</SelectItem>
                    <SelectItem value="invoice_sent">Invoice Sent</SelectItem>
                    <SelectItem value="payment_pending">Payment Pending</SelectItem>
                    <SelectItem value="payment_confirmed">Payment Confirmed</SelectItem>
                    <SelectItem value="in_transit">In Transit</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Requests Table */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>All Requests ({filteredRequests.length})</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Request ID</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Item</TableHead>
                      <TableHead>Route</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell className="font-medium">{request.id}</TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{request.clientName}</div>
                            <div className="text-xs text-muted-foreground">
                              {request.clientEmail}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="max-w-[200px]">
                            <div className="font-medium truncate">{request.itemName}</div>
                            <div className="text-xs text-muted-foreground">
                              Qty: {request.quantity} | {request.weight}kg
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {request.originCountry} → {request.destinationCountry}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {request.purpose === 'import' ? 'Import' : 'Export'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(request.status)}>
                            {formatStatus(request.status)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {formatDate(request.createdAt)}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewDetails(request)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Request Details Dialog */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Request Details</DialogTitle>
            <DialogDescription>
              Complete information about request {selectedRequest?.id}
            </DialogDescription>
          </DialogHeader>

          {selectedRequest && (
            <div className="space-y-6">
              {/* Status */}
              <div>
                <Label>Current Status</Label>
                <div className="mt-2">
                  <Badge className={getStatusColor(selectedRequest.status)}>
                    {formatStatus(selectedRequest.status)}
                  </Badge>
                </div>
              </div>

              {/* Client Information */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Client Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Name</Label>
                    <div className="mt-1 text-sm">{selectedRequest.clientName}</div>
                  </div>
                  <div>
                    <Label>Email</Label>
                    <div className="mt-1 text-sm">{selectedRequest.clientEmail}</div>
                  </div>
                  <div>
                    <Label>Phone</Label>
                    <div className="mt-1 text-sm">{selectedRequest.clientPhone}</div>
                  </div>
                </div>
              </div>

              {/* Item Information */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Item Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <Label>Item Name</Label>
                    <div className="mt-1 text-sm font-medium">{selectedRequest.itemName}</div>
                  </div>
                  <div className="col-span-2">
                    <Label>Description</Label>
                    <div className="mt-1 text-sm">{selectedRequest.itemDescription}</div>
                  </div>
                  <div>
                    <Label>Quantity</Label>
                    <div className="mt-1 text-sm">{selectedRequest.quantity} units</div>
                  </div>
                  <div>
                    <Label>Weight</Label>
                    <div className="mt-1 text-sm">{selectedRequest.weight} kg</div>
                  </div>
                </div>
              </div>

              {/* Shipping Information */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Shipping Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Origin Country</Label>
                    <div className="mt-1 text-sm">{selectedRequest.originCountry}</div>
                  </div>
                  <div>
                    <Label>Destination Country</Label>
                    <div className="mt-1 text-sm">{selectedRequest.destinationCountry}</div>
                  </div>
                  <div>
                    <Label>Purpose</Label>
                    <div className="mt-1 text-sm capitalize">{selectedRequest.purpose}</div>
                  </div>
                </div>
              </div>

              {/* Dates */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Timeline</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Created At</Label>
                    <div className="mt-1 text-sm">{formatDate(selectedRequest.createdAt)}</div>
                  </div>
                  <div>
                    <Label>Last Updated</Label>
                    <div className="mt-1 text-sm">{formatDate(selectedRequest.updatedAt)}</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="flex gap-2">
            <Button variant="outline" onClick={() => setDetailsOpen(false)}>
              Close
            </Button>
            <Button>
              <FileText className="h-4 w-4 mr-2" />
              Create Invoice
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}