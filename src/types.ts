export type ProductCategory = 'All' | 'Rings' | 'Chains & Bracelets';

export interface SizingChartRow {
  size: string;
  metric: string;
  imperial: string;
  fitNote: string;
}

export interface Product {
  id: string;
  name: string;
  category: 'Rings' | 'Chains & Bracelets';
  originalPrice: number;
  salePrice: number;
  featureTag: string;
  badge: 'Sale' | 'Sold out';
  karat: string;
  stone: string;
  weight: string;
  specs: string[];
  availableSizes: string[];
  sizeChart: SizingChartRow[];
  svgType: string;
}

export interface CartItem {
  id: string; // unique item instance id (productId + selectedSize)
  productId: string;
  name: string;
  price: number;
  originalPrice: number;
  selectedSize: string;
  quantity: number;
  featureTag: string;
  karat: string;
  svgType: string;
}

export interface OwnerSettings {
  cashAppTag: string;
  zelleContact: string;
  phone: string;
  email: string;
  stripeSquareUrl: string;
  payPalHandle: string;
  shopifyDomain: string;
  customLogoDataUrl: string | null;
}

export interface CallbackTicket {
  id: string;
  customerName: string;
  contactInfo: string;
  inquiry: string;
  timestamp: string;
  status: 'New' | 'Contacted' | 'Resolved';
  productOfInterest?: string;
}

export interface CheckoutFormData {
  customerName: string;
  phone: string;
  street: string;
  cityState: string;
  zip: string;
  orderNotes?: string;
}
