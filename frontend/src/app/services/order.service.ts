//for the buyer order page


import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    private baseUrl = 'http://localhost:8080/api/orders';

    constructor(private http: HttpClient) { }

    createOrder(data: any): Observable<any> {
        return this.http.post(`${this.baseUrl}/create`, data);
    }

    getBuyerOrders(buyerId: number): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}/buyer/${buyerId}`);
    }

    getOrderById(orderId: number): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/getById/${orderId}`);
    }
    updateOrderStatus(orderId: number, status: string): Observable<any> {
        const params = new HttpParams().set('status', status);
        return this.http.put<any>(
            `${this.baseUrl}/status/${orderId}`,
            null,
            { params }
        );
    }
}