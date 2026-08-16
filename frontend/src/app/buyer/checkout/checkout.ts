import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BuyerSidebar } from '../buyer-sidebar/buyer-sidebar';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { OrderService } from '../../services/order.service';
@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [BuyerSidebar, RouterLink, FormsModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css'
})
export class Checkout implements OnInit {
  cartItems: any[] = [];
  customer: string = '';
  mobile: string = '';
  address: string = '';
  city: string = '';
  state: string = '';
  pincode: string = '';
  placingOrder: boolean = false;
  cartEmpty: boolean = true;
  deliveryCharge: number = 50;
  totalItems: number = 0;
  subtotal: number = 0;
  grandTotal: number = 0;
  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private orderService: OrderService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }
  ngOnInit(): void {
    this.loadCart();
  }
  loadCart(): void {
    const userId = Number(localStorage.getItem('userId'));
    if (!userId) {
      alert('Please login first.');
      this.router.navigate(['/login']);
      return;
    }
    this.cartService.getUserCart(userId).subscribe({
      next: (items: any[]) => {
        console.log('CART FROM BACKEND:', items);
        if (!items || items.length === 0) {
          this.cartItems = [];
          this.cartEmpty = true;
          this.totalItems = 0;
          this.subtotal = 0;
          this.grandTotal = 0;
          this.cdr.detectChanges();
          return;
        }
        this.cartItems = items;
        this.cartEmpty = false;
        this.loadProductDetails();
      },
      error: (error) => {
        console.error('Failed to load cart:', error);
        this.cartItems = [];
        this.cartEmpty = true;
        this.totalItems = 0;
        this.subtotal = 0;
        this.grandTotal = 0;
        this.cdr.detectChanges();
      }
    });
  }
  loadProductDetails(): void {
    let completed = 0;
    this.cartItems.forEach((item) => {
      this.productService.getProductById(Number(item.productId)).subscribe({
        next: (product: any) => {
          console.log('PRODUCT:', product);
          item.name = product.name;
          item.price = Number(product.price);
          item.unit = product.unit;
          item.image = product.image;
          item.category = product.category;
          item.farmerId = product.farmerId;
          completed++;
          if (completed === this.cartItems.length) {
            console.log('FINAL CART:', this.cartItems);
            this.calculateSummary();
            this.cdr.detectChanges();
          }
        },
        error: (error) => {
          console.error(
            'Failed to load product:',
            item.productId,
            error
          );
          completed++;
          if (completed === this.cartItems.length) {
            this.calculateSummary();
            this.cdr.detectChanges();
          }
        }
      });
    });
  }
  calculateSummary(): void {
    let items = 0;
    let amount = 0;
    this.cartItems.forEach((item) => {
      const quantity = Number(item.quantity || 0);
      const price = Number(item.price || 0);
      items = items + quantity;
      amount = amount + (price * quantity);
    });
    this.totalItems = items;
    this.subtotal = amount;
    this.grandTotal = this.subtotal + this.deliveryCharge;
    console.log('TOTAL ITEMS:', this.totalItems);
    console.log('SUBTOTAL:', this.subtotal);
    console.log('DELIVERY:', this.deliveryCharge);
    console.log('GRAND TOTAL:', this.grandTotal);
  }
  placeOrder(): void {
    if (this.cartEmpty || this.cartItems.length === 0) {
      alert('Your cart is empty.');
      return;
    }
    if (
      !this.customer ||
      !this.mobile ||
      !this.address ||
      !this.city ||
      !this.state ||
      !this.pincode
    ) {
      alert('Please fill all delivery details.');
      return;
    }
    const userId = Number(localStorage.getItem('userId'));
    if (!userId) {
      alert('Please login first.');
      return;
    }
    this.placingOrder = true;
    let completed = 0;
    let failed = false;
    this.cartItems.forEach((item) => {
      const order = {
        buyerId: userId,
        farmerId: item.farmerId,
        productId: item.productId,
        customer: this.customer,
        quantity: Number(item.quantity)
      };
      console.log('Creating order:', order);
      this.orderService.createOrder(order).subscribe({
        next: () => {
          completed++;
          if (
            completed === this.cartItems.length &&
            !failed
          ) {
            this.cartService.clearCart(userId).subscribe({
              next: () => {
                this.placingOrder = false;
                alert('Order placed successfully!');
                this.router.navigate(['/buyer/orders']);
              },
              error: (error) => {
                console.error('Cart clear failed:', error);
                this.placingOrder = false;
                alert(
                  'Order placed, but cart could not be cleared.'
                );
              }
            });
          }
        },
        error: (error) => {
          failed = true;
          this.placingOrder = false;
          console.error('Order failed:', error);
          alert('Failed to place order.');
        }
      });
    });
  }
}