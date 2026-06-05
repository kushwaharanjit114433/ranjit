export interface FoodItem {
  id: string;
  name: string;
  price: number; // in NRs. (Nepalese Rupees)
  category: 'snacks' | 'maincourse' | 'drinks';
  description: string;
  image: string;
  rating?: number;
  popular?: boolean;
}

export interface Restaurant {
  id: string;
  name: string;
  rating: number;
  deliveryTime: number; // in minutes
  foodType: string; // e.g., "Nepali, Newari, Asian", "Continental, Italian"
  priceType: '$$' | '$$$' | '$';
  image: string;
  bannerImage: string;
  description: string;
  address: string;
  menu: FoodItem[];
  featured?: boolean;
}

export interface CartItem {
  foodItem: FoodItem;
  quantity: number;
  restaurantId: string;
  restaurantName: string;
}

export type PaymentMethod = 'cod' | 'esewa' | 'khalti';
export type DeliveryStatus = 'pending' | 'preparing' | 'out_for_delivery' | 'delivered';
export type PaymentStatus = 'pending' | 'completed' | 'failed';

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerAddress: string;
  customerPhone: string;
  items: CartItem[];
  totalPrice: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  deliveryStatus: DeliveryStatus;
  date: string;
  riderId?: string; // empty if unassigned
  riderName?: string;
  notes?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'customer' | 'admin' | 'rider';
  password?: string;
}

export type AppView = 
  | 'home' 
  | 'restaurants' 
  | 'menu' 
  | 'cart' 
  | 'checkout' 
  | 'login' 
  | 'register' 
  | 'about' 
  | 'contact' 
  | 'admin' 
  | 'rider';
