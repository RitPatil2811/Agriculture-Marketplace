import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { BuyerSidebar } from '../buyer-sidebar/buyer-sidebar';
import { OrderService } from '../../services/order.service';
@Component({
  selector: 'app-buyer-orders',
  standalone: true,
  imports: [BuyerSidebar, RouterLink, DatePipe],
  templateUrl: './orders.html',
  styleUrl: './orders.css'
})
export class Orders implements OnInit {
  orders: any[] = [];
  loading: boolean = true;
  error: boolean = false;
  constructor(
    private orderService: OrderService,
    private cdr: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this.loadOrders();
  }
  loadOrders(): void {
    const userId = Number(localStorage.getItem('userId'));
    if (!userId) {
      alert('Please login first.');
      this.loading = false;
      return;
    }
    console.log('Logged in Buyer ID:', userId);
    this.orderService.getBuyerOrders(userId).subscribe({
      next: (data: any[]) => {
        console.log('Orders received:', data);
        this.orders = data;
        this.loading = false;
        this.error = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Failed to load orders:', error);
        this.orders = [];
        this.loading = false;
        this.error = true;
        this.cdr.detectChanges();
      }
    });
  }
  cancelOrder(orderId: number): void {
    const order = this.orders.find(
      x => x.orderId === orderId
    );
    if (!order) {
      return;
    }
    this.orderService
      .updateOrderStatus(orderId, 'Cancelled')
      .subscribe({
        next: (updatedOrder: any) => {
          order.status = updatedOrder.status;
          this.cdr.detectChanges();
          alert('Order cancelled successfully.');
        },
        error: (error) => {
          console.error(
            'Failed to cancel order:',
            error
          );
          alert('Failed to cancel order.');
        }
      });
  }
}