export interface FarmerOrder {
  orderId: number;
  buyerId: number;
  farmerId: number;
  customer: string;
  product: string;
  productId: number;
  quantity: number;
  total: number;
  status: string;
  orderDate: string;
}