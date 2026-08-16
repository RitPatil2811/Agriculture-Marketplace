import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';
import { AdminSidebar } from '../admin-sidebar/admin-sidebar';
import {
  UserService,
  User,
  DashboardData
} from '../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [AdminSidebar],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css'
})
export class AdminDashboard implements OnInit {
  // ==========================================
  // DASHBOARD VALUES
  // ==========================================
  totalFarmers: number = 0;
  totalBuyers: number = 0;
  totalProducts: number = 0;
  totalOrders: number = 0;
  totalRevenue: number = 0;
  pendingApprovals: number = 0;
  // ==========================================
  // RECENT FARMERS
  // ==========================================
  recentFarmers: User[] = [];
  // ==========================================
  // LOADING
  // ==========================================
  loading: boolean = true;
  // ==========================================
  // ERROR
  // ==========================================
  errorMessage: string = '';
  // ==========================================
  // CONSTRUCTOR
  // ==========================================
  constructor(
    private userService: UserService,
    private cdr: ChangeDetectorRef
  ) { }
  // ==========================================
  // PAGE LOAD
  // ==========================================
  ngOnInit(): void {
    console.log('Admin Dashboard loaded');
    this.loadDashboardData();
    this.loadRecentFarmers();
  }
  loadDashboardData(): void {
    this.loading = true;
    console.log(
        'Calling dashboard API...'
    );
    this.userService
        .getDashboardData()
        .subscribe({
            next: (data: DashboardData) => {
                console.log(
                    'Admin Dashboard API response:',
                    data
                );
                // ==================================
                // FARMERS
                // ==================================
                this.totalFarmers =
                    Number(data.totalFarmers);
                // ==================================
                // BUYERS
                // ==================================
                this.totalBuyers =
                    Number(data.totalBuyers);
                // ==================================
                // PRODUCTS
                // ==================================
                this.totalProducts =
                    Number(data.totalProducts);
                // ==================================
                // ORDERS
                // ==================================
                this.totalOrders =
                    Number(data.totalOrders);
                // ==================================
                // REVENUE
                // ==================================
                this.totalRevenue =
                    Number(data.totalRevenue);
                // ==================================
                // PENDING APPROVALS
                // ==================================
                this.pendingApprovals =
                    Number(data.pendingApprovals);
                // ==================================
                // LOADING COMPLETE
                // ==================================
                this.loading = false;
                this.errorMessage = '';
                this.cdr.detectChanges();
                console.log(
                    'Dashboard values:',
                    {
                        totalFarmers:
                            this.totalFarmers,
                        totalBuyers:
                            this.totalBuyers,
                        totalProducts:
                            this.totalProducts,
                        totalOrders:
                            this.totalOrders,
                        totalRevenue:
                            this.totalRevenue,
                        pendingApprovals:
                            this.pendingApprovals
                    }
                );
            },
            error: (error: HttpErrorResponse) => {
                console.error(
                    'Admin Dashboard API error:',
                    error
                );
                this.loading = false;
                this.errorMessage =
                    'Failed to load dashboard data.';
                this.cdr.detectChanges();
            }
        });
}
  // ==========================================
  // LOAD RECENT FARMERS
  // ==========================================
  loadRecentFarmers(): void {
    console.log(
      'Loading recent farmers...'
    );
    this.userService
      .getAllFarmers()
      .subscribe({
        next: (farmers: User[]) => {
          console.log(
            'Farmers from database:',
            farmers
          );
          // ==================================
          // RECENT FARMERS
          // ==================================
          this.recentFarmers =
            [...farmers]
              .sort(
                (a, b) => b.id - a.id
              )
              .slice(0, 3);
          console.log(
            'Recent Farmers:',
            this.recentFarmers
          );
          this.cdr.detectChanges();
        },
        error: (error: HttpErrorResponse) => {
          console.error(
            'Farmer API error:',
            error
          );
          this.recentFarmers = [];
          this.cdr.detectChanges();
        }
      });
  }
}