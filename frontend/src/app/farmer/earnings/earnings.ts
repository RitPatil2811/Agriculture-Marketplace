import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Sidebar } from '../../shared/sidebar/sidebar';
import { OrderService } from '../../services/order';

@Component({
  selector: 'app-earnings',
  standalone: true,
  imports: [Sidebar, FormsModule],
  templateUrl: './earnings.html',
  styleUrl: './earnings.css'
})
export class Earnings implements OnInit {

  searchText = '';
  selectedMonth = 'All';

  earnings: any[] = [];

  constructor(
    private orderService: OrderService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadEarnings();
  }

  loadEarnings(): void {
    this.orderService.getFarmerOrders(1).subscribe({
      next: (response: any[]) => {
        console.log('EARNINGS API RESPONSE:', response);

        this.earnings = response.map(order => ({
          id: order.orderId,
          date: this.formatDate(order.orderDate),
          rawDate: order.orderDate,
          product: order.product,
          quantity: order.quantity + ' ' + order.unit,
          amount: order.total,
          status: order.status === 'Delivered'
            ? 'Paid'
            : order.status === 'Cancelled'
              ? 'Cancelled'
              : 'Pending'
        }));

        console.log('EARNINGS AFTER ASSIGN:', this.earnings);

        this.cdr.detectChanges();

        console.log('EARNINGS CHANGE DETECTION COMPLETED');
      },
      error: (error) => {
        console.error('EARNINGS API ERROR:', error);

        this.earnings = [];

        this.cdr.detectChanges();
      }
    });
  }

  formatDate(date: string): string {
    if (!date) {
      return '';
    }

    return new Date(date).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  }

  get filteredEarnings(): any[] {
    const search = this.searchText.toLowerCase().trim();

    return this.earnings.filter(item => {
      const matchesSearch =
        item.product.toLowerCase().includes(search) ||
        item.id.toString().includes(search);

      const matchesMonth =
        this.selectedMonth === 'All' ||
        item.date.toLowerCase().includes(
          this.selectedMonth.toLowerCase().substring(0, 3)
        );

      return matchesSearch && matchesMonth;
    });
  }

  get totalEarnings(): number {
    return this.earnings
      .filter(item => item.status === 'Paid')
      .reduce((sum, item) => sum + Number(item.amount), 0);
  }

  get thisMonthEarnings(): number {
    const currentMonth = new Date().getMonth();

    return this.earnings
      .filter(item => {
        if (item.status !== 'Paid') {
          return false;
        }

        const originalOrder = this.earnings.find(
          earning => earning.id === item.id
        );

        if (!originalOrder) {
          return false;
        }

        return new Date(originalOrder.rawDate).getMonth() === currentMonth;
      })
      .reduce((sum, item) => sum + Number(item.amount), 0);
  }

  get totalOrders(): number {
    return this.earnings.length;
  }

  get pendingPayment(): number {
    return this.earnings
      .filter(item => item.status === 'Pending')
      .reduce((sum, item) => sum + Number(item.amount), 0);
  }
}