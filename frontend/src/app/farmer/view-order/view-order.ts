import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { OrderService } from '../../services/order';

@Component({
  selector: 'app-view-order',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-order.html',
  styleUrl: './view-order.css'
})
export class ViewOrder implements OnInit {
  order: any = null;
  loading = true;
  updatingStatus = false;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private orderService: OrderService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    if (!id || id <= 0) {
      console.error('Invalid order ID');
      this.loading = false;
      this.cdr.detectChanges();
      return;
    }

    this.loadOrder(id);
  }

  loadOrder(id: number): void {
    this.loading = true;

    this.orderService.getOrderById(id).subscribe({
      next: (response: any) => {
        console.log('VIEW ORDER RESPONSE:', response);

        this.order = response;
        this.loading = false;

        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('VIEW ORDER ERROR:', error);

        this.order = null;
        this.loading = false;

        this.cdr.detectChanges();
      }
    });
  }

  updateStatus(status: string): void {
    if (!this.order) {
      return;
    }

    const orderId = this.order.orderId;

    console.log(
      'Updating order:',
      orderId,
      'New status:',
      status
    );

    this.updatingStatus = true;

    this.orderService
      .updateOrderStatus(orderId, status)
      .subscribe({
        next: (response: any) => {
          console.log(
            'STATUS UPDATED:',
            response
          );

          this.order.status =
            response.status || status;

          this.updatingStatus = false;

          this.cdr.detectChanges();

          alert(
            `Order status updated to ${this.order.status}`
          );
        },

        error: (error) => {
          console.error(
            'STATUS UPDATE ERROR:',
            error
          );

          this.updatingStatus = false;

          this.cdr.detectChanges();

          alert(
            'Failed to update order status.'
          );
        }
      });
  }

  goBack(): void {
    this.location.back();
  }
}