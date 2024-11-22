export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export interface Shoe {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  sizes: number[];
  colors: string[];
  description: string;
}

export interface CartItem {
  shoeId: string;
  size: number;
  color: string;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  date: string;
}