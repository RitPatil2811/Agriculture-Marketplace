import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private baseUrl = 'http://localhost:8080/api/cart';
  constructor(private http: HttpClient) {}
  addToCart(userId: number, productId: number, quantity: number = 1): Observable<any> {
    const params = new HttpParams().set('userId', userId).set('productId', productId).set('quantity', quantity);
    return this.http.post(`${this.baseUrl}/add`, null, { params });
  }
  getUserCart(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/user/${userId}`);
  }
  updateQuantity(cartId: number, quantity: number): Observable<any> {
    const params = new HttpParams().set('quantity', quantity);
    return this.http.put(`${this.baseUrl}/${cartId}`, null, { params });
  }
  removeFromCart(cartId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${cartId}`);
  }
  clearCart(userId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/user/${userId}`, { responseType: 'text' });
  }
}