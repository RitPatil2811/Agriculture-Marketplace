import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Sidebar } from '../../shared/sidebar/sidebar';
import { OrderService } from '../../services/order';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    Sidebar
  ],
  templateUrl: './orders.html',
  styleUrl: './orders.css'
})
export class Orders implements OnInit {

  orders: any[] = [];

  loading = true;

  searchText = '';

  selectedStatus = 'All Status';

  totalOrders = 0;
  pendingOrders = 0;
  shippedOrders = 0;
  deliveredOrders = 0;

  constructor(
    private orderService: OrderService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {

    const farmerId = Number(localStorage.getItem('userId'));

    if (!farmerId) {
      console.error('Farmer ID not found in localStorage');
      this.loading = false;
      this.cdr.detectChanges();
      return;
    }

    console.log('Logged in Farmer ID:', farmerId);

    this.loading = true;

    this.orderService.getFarmerOrders(farmerId).subscribe({
      next: (response: any[]) => {

        console.log('Farmer orders received:', response);

        this.orders = response || [];

        this.loading = false;

        this.loadOrderCounts(farmerId);

        this.cdr.detectChanges();
      },

      error: (error) => {

        console.error('Failed to load farmer orders:', error);

        this.orders = [];

        this.totalOrders = 0;
        this.pendingOrders = 0;
        this.shippedOrders = 0;
        this.deliveredOrders = 0;

        this.loading = false;

        this.cdr.detectChanges();
      }
    });
  }

  loadOrderCounts(farmerId: number): void {

    this.orderService.getTotalOrders(farmerId).subscribe({
      next: (count: number) => {
        this.totalOrders = count;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Failed to load total orders:', error);
      }
    });

    this.orderService.getPendingOrders(farmerId).subscribe({
      next: (count: number) => {
        this.pendingOrders = count;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Failed to load pending orders:', error);
      }
    });

    this.orderService.getShippedOrders(farmerId).subscribe({
      next: (count: number) => {
        this.shippedOrders = count;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Failed to load shipped orders:', error);
      }
    });

    this.orderService.getDeliveredOrders(farmerId).subscribe({
      next: (count: number) => {
        this.deliveredOrders = count;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Failed to load delivered orders:', error);
      }
    });
  }

  get filteredOrders(): any[] {

    const search = this.searchText
      .toLowerCase()
      .trim();

    return this.orders.filter(order => {

      const matchesSearch =
        String(order.orderId || '')
          .toLowerCase()
          .includes(search) ||

        String(order.customer || '')
          .toLowerCase()
          .includes(search) ||

        String(order.product || '')
          .toLowerCase()
          .includes(search);

      const matchesStatus =
        this.selectedStatus === 'All Status' ||
        order.status === this.selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }
}