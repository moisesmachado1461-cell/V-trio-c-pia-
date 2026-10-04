export type SegmentType = 'all' | 'fashion' | 'services' | 'beauty' | 'decor' | 'gastronomy' | 'tech';

export type ItemType = 'product' | 'service';

export interface Segment {
  id: SegmentType;
  name: string;
  icon: string;
  description: string;
  badgeColor: string;
  badgeBg: string;
  itemCount?: number;
}

export interface ProductService {
  id: string;
  title: string;
  type: ItemType;
  segmentId: SegmentType;
  price: number;
  originalPrice?: number;
  description: string;
  shortDescription: string;
  images: string[];
  stock: number;
  duration?: string; // e.g., '50 min', '1h30' para serviços
  serviceLocation?: 'presencial' | 'online' | 'domicilio';
  rating: number;
  reviewCount: number;
  features: string[];
  sku: string;
  isFeatured?: boolean;
  inStock: boolean;
}

export interface Review {
  id: string;
  productId: string;
  customerName: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export interface CartItem {
  product: ProductService;
  quantity: number;
  selectedDate?: string;
  selectedTime?: string;
  selectedVariant?: string;
  notes?: string;
}

export type OrderStatus = 'pending' | 'paid' | 'processing' | 'shipped' | 'completed' | 'cancelled';
export type PaymentMethodType = 'pix' | 'credit_card' | 'boleto';

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerDocument?: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  status: OrderStatus;
  paymentMethod: PaymentMethodType;
  paymentStatus: 'pending' | 'approved' | 'failed';
  pixCode?: string;
  installments?: number;
  shippingAddress: {
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };
  createdAt: string;
  trackingCode?: string;
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'fixed';
  value: number;
  minPurchase: number;
  expiresAt: string;
  active: boolean;
  description: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  ordersCount: number;
  totalSpent: number;
  avatar?: string;
}

export interface StoreTheme {
  storeName: string;
  tagline: string;
  announcementBar: string;
  showAnnouncement: boolean;
  primaryColor: string; // hex
  secondaryColor: string; // hex
  accentColor: string; // hex
  fontFamily: 'Plus Jakarta Sans' | 'Space Grotesk' | 'Playfair Display' | 'Inter';
  borderRadius: 'none' | 'sm' | 'md' | 'lg' | 'full';
  heroHeadline: string;
  heroSubheadline: string;
  heroImage: string;
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
  contactInstagram: string;
  pixKey: string;
  currency: string;
}

export type ActiveAppView = 'store' | 'admin' | 'tech-spec';
