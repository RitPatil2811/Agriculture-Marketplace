import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';

export type Farmer=User;
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8080/api/users';
  constructor(private http: HttpClient) { }
  getProfile(id: number) {
    return this.http.get<any>(
      `${this.baseUrl}/${id}`
    );
  }
  updateProfile(id: number, data: any) {
    return this.http.put<any>(
      `${this.baseUrl}/${id}`,
      data
    );
  }
  getFarmerById(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }
  getBuyerById(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }
  getAllFarmers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/farmers`);
  }
  getAllBuyers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/buyers`);
  }
  updateStatus(id: number, status: string): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/${id}/status?status=${status}`, {});
  }
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  deleteFarmer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  deleteBuyer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}