import {
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';
import {
  ActivatedRoute,
  Router,
  RouterLink
} from '@angular/router';
import { DatePipe } from '@angular/common';
import { AdminSidebar } from '../admin-sidebar/admin-sidebar';
import { OrderService } from '../../services/order';
@Component({
  selector: 'app-view-order',
  standalone: true,
  imports: [
    AdminSidebar,
    RouterLink,
    DatePipe
  ],
  templateUrl: './view-order.html',
  styleUrl: './view-order.css'
})
export class ViewOrder implements OnInit {
  order: any = null;
  loading = true;
  errorMessage = '';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService,
    private cdr: ChangeDetectorRef
  ) { }
  ngOnInit(): void {
    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );
    console.log('View Order ID:', id);
    if (!id) {
      this.errorMessage =
        'Invalid order ID.';
      this.loading = false;
      return;
    }
    this.loadOrder(id);
  }
  // ==========================================
  // LOAD ORDER
  // ==========================================
  loadOrder(orderId: number): void {
    this.loading = true;
    this.errorMessage = '';
    this.orderService
      .getOrderById(orderId)
      .subscribe({
        next: (data: any) => {
          console.log(
            'ORDER DETAILS:',
            data
          );
          this.order = data;
          this.loading = false;
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error(
            'Failed to load order:',
            error
          );
          this.errorMessage =
            'Order not found.';
          this.loading = false;
          this.cdr.detectChanges();
        }
      });
  }
  // ==========================================
  // UPDATE ORDER STATUS
  // ==========================================
  updateStatus(newStatus: string): void {
    if (!this.order) {
      return;
    }
    const confirmUpdate = confirm(
      `Change order #${this.order.orderId} status to ${newStatus}?`
    );
    if (!confirmUpdate) {
      return;
    }
    this.orderService
      .updateOrderStatus(
        this.order.orderId,
        newStatus
      )
      .subscribe({
        next: (updatedOrder: any) => {
          console.log(
            'UPDATED ORDER:',
            updatedOrder
          );
          this.order = updatedOrder;
          alert(
            `Order #${this.order.orderId} status updated to ${newStatus}.`
          );
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error(
            'Failed to update order status:',
            error
          );
          alert(
            'Failed to update order status.'
          );
        }
      });
  }
}