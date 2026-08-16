import {
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';

import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { AdminSidebar } from '../admin-sidebar/admin-sidebar';
import { OrderService } from '../../services/order';

@Component({
  selector: 'app-manage-orders',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    AdminSidebar
  ],
  templateUrl: './manage-order.html',
  styleUrl: './manage-order.css'
})
export class ManageOrder implements OnInit {

  searchText = '';
  status = 'All';

  orders: any[] = [];

  loading = true;

  constructor(
    private orderService: OrderService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  // ==========================================
  // LOAD ALL ORDERS
  // ==========================================

  loadOrders(): void {

    this.loading = true;

    this.orderService.getAllOrders().subscribe({

      next: (data: any[]) => {

        console.log('ADMIN ALL ORDERS:', data);

        this.orders = data;

        this.loading = false;

        this.cdr.detectChanges();
      },

      error: (error) => {

        console.error(
          'Failed to load admin orders:',
          error
        );

        this.orders = [];

        this.loading = false;

        alert('Failed to load orders.');

        this.cdr.detectChanges();
      }

    });
  }

  // ==========================================
  // FILTER ORDERS
  // ==========================================

  get filteredOrders(): any[] {

    return this.orders.filter((order: any) => {

      const search =
        this.searchText.toLowerCase().trim();

      const matchesSearch =
        !search ||
        String(order.orderId)
          .toLowerCase()
          .includes(search) ||

        String(order.buyerId)
          .toLowerCase()
          .includes(search) ||

        String(order.farmerId)
          .toLowerCase()
          .includes(search) ||

        String(order.product)
          .toLowerCase()
          .includes(search);

      const matchesStatus =
        this.status === 'All' ||
        order.status === this.status;

      return matchesSearch && matchesStatus;
    });
  }

  // ==========================================
  // UPDATE STATUS
  // ==========================================

  updateStatus(
    order: any,
    newStatus: string
  ): void {

    if (order.status === newStatus) {
      return;
    }

    this.orderService
      .updateOrderStatus(
        order.orderId,
        newStatus
      )
      .subscribe({

        next: (updatedOrder: any) => {

          console.log(
            'Order status updated:',
            updatedOrder
          );

          order.status = updatedOrder.status;

          alert(
            `Order #${order.orderId} status updated to ${newStatus}.`
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

  // ==========================================
  // DELETE ORDER
  // ==========================================

  deleteOrder(orderId: number): void {

    const confirmDelete = confirm(
      `Are you sure you want to delete order #${orderId}?`
    );

    if (!confirmDelete) {
      return;
    }

    this.orderService
      .deleteOrder(orderId)
      .subscribe({

        next: (response) => {

          console.log(
            'Order deleted:',
            response
          );

          alert(
            'Order deleted successfully.'
          );

          this.loadOrders();
        },

        error: (error) => {

          console.error(
            'Failed to delete order:',
            error
          );

          alert(
            'Failed to delete order.'
          );
        }

      });
  }
}