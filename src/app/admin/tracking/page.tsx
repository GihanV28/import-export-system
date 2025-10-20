'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { MapPin, Package, CheckCircle, Clock } from 'lucide-react';
import { mockTracking } from '@/lib/mockData';
import { formatDate } from '@/lib/utils';
import { TrackingStage } from '@/types';

const stageNames: Record<TrackingStage, string> = {
  order_placed: 'Order Placed',
  payment_confirmed: 'Payment Confirmed',
  documentation_progress: 'Documentation in Progress',
  ready_for_shipment: 'Ready for Shipment',
  in_transit_origin: 'In Transit to Port/Airport',
  customs_origin: 'Customs Clearance - Origin',
  international_transit: 'International Transit',
  arrived_destination: 'Arrived in Destination',
  customs_destination: 'Customs Clearance - Destination',
  out_for_delivery: 'Out for Delivery',
  delivered: 'Delivered',
};

export default function AdminTracking() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [selectedTracking, setSelectedTracking] = useState<string>('');
  const [updateForm, setUpdateForm] = useState({
    stage: '' as TrackingStage,
    location: '',
    notes: '',
  });

  const handleUpdateTracking = (trackingId: string) => {
    setSelectedTracking(trackingId);
    setUpdateDialogOpen(true);
  };

  const handleSubmitUpdate = () => {
    console.log('Update tracking:', selectedTracking, updateForm);
    setUpdateDialogOpen(false);
    setUpdateForm({ stage: '' as TrackingStage, location: '', notes: '' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar userType="admin" onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar userType="admin" isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="md:ml-64 p-4 md:p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Tracking Management</h1>
            <p className="text-muted-foreground">
              Update and monitor shipment tracking status
            </p>
          </div>

          <div className="grid gap-6">
            {mockTracking.map((tracking) => (
              <Card key={tracking.trackingId}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl">{tracking.trackingId}</CardTitle>
                      <div className="text-sm text-muted-foreground mt-1">
                        Request: {tracking.requestId} | {tracking.clientName}
                      </div>
                    </div>
                    <Button onClick={() => handleUpdateTracking(tracking.trackingId)}>
                      Update Status
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="bg-primary/10 p-3 rounded-lg">
                        <Package className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">{tracking.itemDescription}</div>
                        {tracking.estimatedDelivery && (
                          <div className="text-sm text-muted-foreground">
                            Est. Delivery: {formatDate(tracking.estimatedDelivery)}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-3">
                      {tracking.stages.map((stage, index) => (
                        <div key={index} className="flex items-start gap-4">
                          <div className="flex flex-col items-center">
                            {stage.status === 'completed' ? (
                              <div className="bg-green-500 rounded-full p-1">
                                <CheckCircle className="h-4 w-4 text-white" />
                              </div>
                            ) : stage.status === 'current' ? (
                              <div className="bg-primary rounded-full p-1">
                                <Clock className="h-4 w-4 text-white" />
                              </div>
                            ) : (
                              <div className="bg-gray-300 dark:bg-gray-700 rounded-full h-6 w-6" />
                            )}
                            {index < tracking.stages.length - 1 && (
                              <div
                                className={`w-0.5 h-12 ${
                                  stage.status === 'completed'
                                    ? 'bg-green-500'
                                    : 'bg-gray-300 dark:bg-gray-700'
                                }`}
                              />
                            )}
                          </div>
                          <div className="flex-1 pb-8">
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="font-medium">
                                  {stageNames[stage.stage]}
                                </div>
                                {stage.location && (
                                  <div className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                                    <MapPin className="h-3 w-3" />
                                    {stage.location}
                                  </div>
                                )}
                                {stage.notes && (
                                  <div className="text-sm text-muted-foreground mt-1">
                                    {stage.notes}
                                  </div>
                                )}
                              </div>
                              {stage.date && (
                                <div className="text-sm text-muted-foreground">
                                  {formatDate(stage.date)}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      {/* Update Tracking Dialog */}
      <Dialog open={updateDialogOpen} onOpenChange={setUpdateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Tracking Status</DialogTitle>
            <DialogDescription>
              Update the current status for tracking ID: {selectedTracking}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Select Stage</Label>
              <Select
                value={updateForm.stage}
                onValueChange={(value) =>
                  setUpdateForm({ ...updateForm, stage: value as TrackingStage })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose tracking stage" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(stageNames).map(([key, value]) => (
                    <SelectItem key={key} value={key}>
                      {value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Location (Optional)</Label>
              <Input
                placeholder="e.g., Los Angeles Port"
                value={updateForm.location}
                onChange={(e) =>
                  setUpdateForm({ ...updateForm, location: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Notes (Optional)</Label>
              <Textarea
                placeholder="Add any additional information..."
                value={updateForm.notes}
                onChange={(e) =>
                  setUpdateForm({ ...updateForm, notes: e.target.value })
                }
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setUpdateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmitUpdate}>Update Status</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}