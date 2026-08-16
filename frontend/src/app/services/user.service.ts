
//for admin user service

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// =====================================================
// USER INTERFACE
// =====================================================
export interface User {
    id: number;
    name: string;
    email: string;
    mobile: string;
    city: string;
    state?: string;
    address?: string;
    pincode?: string;
    farmName?: string;
    experience?: number;
    joined?: string;
    role: string;
    status: string | null;
}
// Farmer is same User structure
export type Farmer = User;
// =====================================================
// DASHBOARD INTERFACE
// =====================================================
export interface DashboardData {
    totalFarmers: number;
    totalBuyers: number;
    totalProducts: number;
    totalOrders: number;
    totalRevenue: number;
    pendingApprovals: number;
}
// =====================================================
// USER SERVICE
// =====================================================
@Injectable({
    providedIn: 'root'
})
export class UserService {
    private apiUrl = 'http://localhost:8080/api/users';
    constructor(
        private http: HttpClient
    ) { }
    // =====================================================
    // ADMIN DASHBOARD
    // =====================================================
    getDashboardData(): Observable<DashboardData> {
        return this.http.get<DashboardData>(
            `${this.apiUrl}/dashboard`
        );
    }
    // =====================================================
    // FARMERS
    // =====================================================
    getAllFarmers(): Observable<User[]> {
        return this.http.get<User[]>(
            `${this.apiUrl}/farmers`
        );
    }
    // =====================================================
    // GET FARMER BY ID
    // =====================================================
    getFarmerById(id: number): Observable<User> {
        return this.http.get<User>(
            `${this.apiUrl}/${id}`
        );
    }
    // =====================================================
    // BUYERS
    // =====================================================
    getAllBuyers(): Observable<User[]> {
        return this.http.get<User[]>(
            `${this.apiUrl}/buyers`
        );
    }
    // =====================================================
    // GET BUYER BY ID
    // =====================================================
    getBuyerById(id: number): Observable<User> {
        return this.http.get<User>(
            `${this.apiUrl}/${id}`
        );
    }
    // =====================================================
    // UPDATE USER STATUS
    // =====================================================
    updateStatus(
        id: number,
        status: string
    ): Observable<User> {
        return this.http.put<User>(
            `${this.apiUrl}/${id}/status?status=${status}`,
            {}
        );
    }
    // =====================================================
    // DELETE USER
    // =====================================================
    deleteUser(id: number): Observable<void> {
        return this.http.delete<void>(
            `${this.apiUrl}/${id}`
        );
    }
    // =====================================================
    // DELETE FARMER
    // =====================================================
    deleteFarmer(id: number): Observable<void> {
        return this.http.delete<void>(
            `${this.apiUrl}/${id}`
        );
    }
    // =====================================================
    // DELETE BUYER
    // =====================================================
    deleteBuyer(id: number): Observable<void> {
        return this.http.delete<void>(
            `${this.apiUrl}/${id}`
        );
    }
}