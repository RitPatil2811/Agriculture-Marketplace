//for the farmer and admin order page


import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseUrl = 'http://localhost:8080/api/orders';

  constructor(private http: HttpClient) { }

  createOrder(order: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/create`, order);
  }

  getAllOrders(): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.baseUrl}/all`
    );
  }
  getFarmerOrders(farmerId: number): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.baseUrl}/farmer/${farmerId}`
    );
  }

  getBuyerOrders(buyerId: number): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.baseUrl}/buyer/${buyerId}`
    );
  }

  getOrderById(orderId: number): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}/getById/${orderId}`
    );
  }

  updateOrderStatus(orderId: number, status: string): Observable<any> {
    const params = new HttpParams()
      .set('status', status);

    return this.http.put(
      `${this.baseUrl}/status/${orderId}`,
      null,
      { params }
    );
  }

  deleteOrder(orderId: number): Observable<any> {
    return this.http.delete(
      `${this.baseUrl}/deleteById/${orderId}`,
      { responseType: 'text' }
    );
  }

  getFarmerEarnings(farmerId: number): Observable<number> {
    return this.http.get<number>(
      `${this.baseUrl}/earnings/${farmerId}`
    );
  }

  getTotalOrders(farmerId: number): Observable<number> {
    return this.http.get<number>(
      `${this.baseUrl}/count/${farmerId}`
    );
  }

  getPendingOrders(farmerId: number): Observable<number> {
    return this.http.get<number>(
      `${this.baseUrl}/pending/${farmerId}`
    );
  }

  getShippedOrders(farmerId: number): Observable<number> {
    return this.http.get<number>(
      `${this.baseUrl}/shipped/${farmerId}`
    );
  }

  getDeliveredOrders(farmerId: number): Observable<number> {
    return this.http.get<number>(
      `${this.baseUrl}/delivered/${farmerId}`
    );
  }
}