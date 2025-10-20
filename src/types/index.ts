export type RequestStatus = 
  | 'pending'
  | 'under_review'
  | 'invoice_sent'
  | 'payment_pending'
  | 'payment_confirmed'
  | 'in_transit'
  | 'delivered'
  | 'cancelled';

export type TrackingStage = 
  | 'order_placed'
  | 'payment_confirmed'
  | 'documentation_progress'
  | 'ready_for_shipment'
  | 'in_transit_origin'
  | 'customs_origin'
  | 'international_transit'
  | 'arrived_destination'
  | 'customs_destination'
  | 'out_for_delivery'
  | 'delivered';

export interface Request {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  itemName: string;
  itemDescription: string;
  quantity: number;
  weight: number;
  originCountry: string;
  destinationCountry: string;
  purpose: 'import' | 'export';
  status: RequestStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface Invoice {
  id: string;
  requestId: string;
  invoiceNumber: string;
  clientName: string;
  clientEmail: string;
  itemDescription: string;
  shippingCost: number;
  customsDuties: number;
  handlingFee: number;
  insurance: number;
  documentationFee: number;
  serviceFee: number;
  subtotal: number;
  tax: number;
  total: number;
  currency: string;
  createdAt: Date;
  status: 'draft' | 'sent' | 'paid' | 'cancelled';
}

export interface TrackingInfo {
  trackingId: string;
  requestId: string;
  currentStage: TrackingStage;
  stages: {
    stage: TrackingStage;
    status: 'completed' | 'current' | 'pending';
    date?: Date;
    location?: string;
    notes?: string;
  }[];
  estimatedDelivery?: Date;
  clientName: string;
  itemDescription: string;
}

export interface DashboardStats {
  totalRequests: number;
  pendingRequests: number;
  activeShipments: number;
  completedDeliveries: number;
  totalRevenue: number;
  monthlyRevenue: number;
}