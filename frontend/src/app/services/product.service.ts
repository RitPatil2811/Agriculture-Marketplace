import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:8080/api/products';

  constructor(private http: HttpClient) {}

  addProduct(data: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/add`, data);
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/all`);
  }

  getFarmerProducts(farmerId: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/farmer/${farmerId}`);
  }

  getProductById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getById/${id}`);
  }

  updateProduct(id: number, data: FormData): Observable<any> {
    return this.http.put(`${this.baseUrl}/update/${id}`, data);
  }

  deleteProduct(id: number): Observable<string> {
  return this.http.delete(
    `${this.baseUrl}/deleteById/${id}`,
    { responseType: 'text' }
  );
}

  updateProductStatus(id: number,status: string): Observable<Product> {
        return this.http.put<Product>(`${this.baseUrl}/${id}/status?status=${status}`,{}
        );
    }
}