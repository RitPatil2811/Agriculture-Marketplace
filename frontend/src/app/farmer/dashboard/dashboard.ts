import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Sidebar } from '../../shared/sidebar/sidebar';
import { OrderService } from '../../services/order';
import { ProductService } from '../../services/product.service';
import { UserService } from '../../services/user';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [RouterLink, Sidebar],
    templateUrl: './dashboard.html',
    styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
    farmerId = Number(localStorage.getItem('userId'));
    farmerName = '';
    totalProducts = 0;
    totalOrders = 0;
    totalRevenue = 0;
    lowStock = 0;
    recentOrders: any[] = [];
    monthlySales: any[] = [];
    lowStockProducts: any[] = [];
    topSellingProducts: any[] = [];
    farmer: any = null;
    constructor(private orderService: OrderService, private productService: ProductService, private userService: UserService, private cdr: ChangeDetectorRef) { }
    ngOnInit(): void {
        this.loadDashboardData();
    }
    loadDashboardData(): void {
        this.productService.getFarmerProducts(this.farmerId).subscribe({
            next: (products: any[]) => {
                this.totalProducts = products.length;
                this.lowStockProducts = products.filter(product => Number(product.quantity) <= 10);
                this.lowStock = this.lowStockProducts.length;
                this.cdr.detectChanges();
            },
            error: (error) => {
                console.error('PRODUCT ERROR:', error);
            }
        });
        this.orderService.getFarmerOrders(this.farmerId).subscribe({
            next: (orders: any[]) => {
                this.totalOrders = orders.length;
                this.recentOrders = orders.slice(0, 5);
                this.totalRevenue = orders.filter(order => order.status === 'Delivered').reduce((sum, order) => sum + (Number(order.total) || 0), 0);
                this.calculateMonthlySales(orders);
                this.calculateTopSellingProducts(orders);
                this.cdr.detectChanges();
            },
            error: (error) => {
                console.error('ORDER ERROR:', error);
            }
        });
        this.userService.getProfile(this.farmerId).subscribe({
            next: (user: any) => {
                this.farmer = user;
                this.farmerName = user.name;
                this.cdr.detectChanges();
            },
            error: (error) => {
                console.error('USER ERROR:', error);
            }
        });
    }
    calculateMonthlySales(orders: any[]): void {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const sales: number[] = Array(12).fill(0);
        orders.filter(order => order.status === 'Delivered').forEach(order => {
            const date = new Date(order.orderDate);
            sales[date.getMonth()] += Number(order.total) || 0;
        });
        this.monthlySales = months.map((month, index) => ({
            month: month,
            amount: sales[index]
        }));
    }
    calculateTopSellingProducts(orders: any[]): void {
        const productMap: any = {};
        orders.filter(order => order.status === 'Delivered').forEach(order => {
            const product = order.product;
            const quantity = Number(order.quantity) || 0;
            if (!productMap[product]) {
                productMap[product] = 0;
            }
            productMap[product] += quantity;
        });
        this.topSellingProducts = Object.keys(productMap).map(product => ({
            product: product,
            quantity: productMap[product]
        })).sort((a, b) => b.quantity - a.quantity).slice(0, 5);
    }
    getBarHeight(amount: number): number {
        const max = Math.max(...this.monthlySales.map(item => item.amount), 1);
        return amount === 0 ? 5 : (amount / max) * 250;
    }
}