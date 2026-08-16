export interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  quantity: number;
  unit: string;
  image: string;
  farmerId: number;
  status?: string;
}