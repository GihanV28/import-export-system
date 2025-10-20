

// ============================================
// FILE: src/app/client/track/page.tsx
// ============================================

'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Search, MapPin, Package, CheckCircle, Clock, Truck } from 'lucide-react';
import { mockTracking } from '@/lib/mockData';
import { formatDate } from '@/lib/utils';
import { TrackingStage, TrackingInfo } from '@/types';

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

export default function ClientTracking() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [trackingId, setTrackingId] = useState('');
  const [trackingInfo, setTrackingInfo] = useState<TrackingInfo | null>(null);
  const [notFound, setNotFound] = useState(false);

  const handleTrack = () => {
    const found = mockTracking.find((t) => t.trackingId === trackingId);
    if (found) {
      setTrackingInfo(found);
      setNotFound(false);
    } else {
      setTrackingInfo(null);
      setNotFound(true);
    }
  };

  const calculateProgress = () => {
    if (!trackingInfo) return 0;
    const completedStages = trackingInfo.stages.filter(
      (s) => s.status === 'completed'
    ).length;
    return (completedStages / trackingInfo.stages.length) * 100;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar userType="client" onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar userType="client" isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="md:ml-64 p-4 md:p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Track Your Shipment</h1>
            <p className="text-muted-foreground">
              Enter your tracking ID to view real-time shipment status
            </p>
          </div>

          {/* Search Card */}
          <Card>
            <CardHeader>
              <CardTitle>Enter Tracking ID</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <div className="flex-1 space-y-2">
                  <Label htmlFor="tracking">Tracking ID</Label>
                  <Input
                    id="tracking"
                    placeholder="e.g., TRK-2025-00001"
                    value={trackingId}
                    onChange={(e) => setTrackingId(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleTrack()}
                  />
                </div>
                <div className="flex items-end">
                  <Button onClick={handleTrack}>
                    <Search className="mr-2 h-4 w-4" />
                    Track
                  </Button>
                </div>
              </div>
              {notFound && (
                <div className="mt-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400 rounded-lg text-sm">
                  Tracking ID not found. Please check and try again.
                </div>
              )}
              <div className="mt-4 text-sm text-muted-foreground">
                Demo IDs: TRK-2025-00001, TRK-2025-00002
              </div>
            </CardContent>
          </Card>

          {/* Tracking Results */}
          {trackingInfo && (
            <>
              {/* Summary Card */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl">{trackingInfo.trackingId}</CardTitle>
                      <div className="text-sm text-muted-foreground mt-1">
                        Request: {trackingInfo.requestId}
                      </div>
                    </div>
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <Truck className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-muted-foreground">Item Description</div>
                      <div className="font-medium">{trackingInfo.itemDescription}</div>
                    </div>
                    {trackingInfo.estimatedDelivery && (
                      <div>
                        <div className="text-sm text-muted-foreground">Estimated Delivery</div>
                        <div className="font-medium">
                          {formatDate(trackingInfo.estimatedDelivery)}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{Math.round(calculateProgress())}%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all duration-500"
                        style={{ width: `${calculateProgress()}%` }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Timeline Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Shipment Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {trackingInfo.stages.map((stage, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className="flex flex-col items-center">
                          {stage.status === 'completed' ? (
                            <div className="bg-green-500 rounded-full p-1.5">
                              <CheckCircle className="h-5 w-5 text-white" />
                            </div>
                          ) : stage.status === 'current' ? (
                            <div className="bg-primary rounded-full p-1.5 animate-pulse">
                              <Clock className="h-5 w-5 text-white" />
                            </div>
                          ) : (
                            <div className="bg-gray-300 dark:bg-gray-700 rounded-full h-8 w-8" />
                          )}
                          {index < trackingInfo.stages.length - 1 && (
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
                          <div className="flex items-start justify-between">
                            <div className="space-y-1">
                              <div className="font-medium">
                                {stageNames[stage.stage]}
                              </div>
                              {stage.location && (
                                <div className="text-sm text-muted-foreground flex items-center gap-1">
                                  <MapPin className="h-3 w-3" />
                                  {stage.location}
                                </div>
                              )}
                              {stage.notes && (
                                <div className="text-sm text-muted-foreground">
                                  {stage.notes}
                                </div>
                              )}
                            </div>
                            {stage.date && (
                              <div className="text-sm text-muted-foreground whitespace-nowrap">
                                {formatDate(stage.date)}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </main>
    </div>
  );
}