import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BuyerSidebar } from '../buyer-sidebar/buyer-sidebar';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
@Component({
  selector: 'app-buyer-cart',
  standalone: true,
  imports: [CommonModule, BuyerSidebar, RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart implements OnInit {
  cartItems: any[] = [];
  loading = true;
  userId = 2;
  constructor(private cartService: CartService, private productService: ProductService, private cdr: ChangeDetectorRef) { }
  ngOnInit(): void {
    this.loadCart();
  }
  loadCart(): void {
    this.loading = true;
    this.cartService.getUserCart(this.userId).subscribe({
      next: (data) => {
        console.log('CART RESPONSE:', data);
        this.cartItems = data || [];
        this.loadProductDetails();
      },
      error: (error) => {
        console.error('Failed to load cart:', error);
        this.cartItems = [];
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }
  loadProductDetails(): void {
    if (this.cartItems.length === 0) {
      this.loading = false;
      this.cdr.detectChanges();
      return;
    }
    let completed = 0;
    this.cartItems.forEach(item => {
      this.productService.getProductById(item.productId).subscribe({
        next: (product) => {
          console.log('CART PRODUCT:', product);
          item.product = product;
          item.name = product.name;
          item.category = product.category;
          item.price = product.price;
          item.unit = product.unit;
          item.image = product.image;
          item.qty = item.quantity;
          completed++;
          if (completed === this.cartItems.length) {
            this.loading = false;
            this.cdr.detectChanges();
          }
        },
        error: (error) => {
          console.error('Failed to load product:', error);
          completed++;
          if (completed === this.cartItems.length) {
            this.loading = false;
            this.cdr.detectChanges();
          }
        }
      });
    });
  }
  getImageUrl(image: string): string {
    if (!image) return 'assets/images/no-image.png';
    if (image.startsWith('http')) return image;
    return 'http://localhost:8080' + image;
  }
  increase(item: any): void {
    const newQuantity = item.qty + 1;
    if (item.product && newQuantity > item.product.quantity) {
      alert('Available quantity exceeded.');
      return;
    }
    this.cartService.updateQuantity(item.id, newQuantity).subscribe({
      next: (updated) => {
        item.qty = updated.quantity;
        item.quantity = updated.quantity;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Failed to update quantity:', error);
        alert(error?.error?.message || 'Unable to update quantity.');
      }
    });
  }
  decrease(item: any): void {
    const newQuantity = item.qty - 1;
    if (newQuantity <= 0) {
      this.remove(item.id);
      return;
    }
    this.cartService.updateQuantity(item.id, newQuantity).subscribe({
      next: (updated) => {
        item.qty = updated.quantity;
        item.quantity = updated.quantity;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Failed to update quantity:', error);
        alert(error?.error?.message || 'Unable to update quantity.');
      }
    });
  }
  remove(id: number): void {
    this.cartService.removeFromCart(id).subscribe({
      next: () => {
        this.cartItems = this.cartItems.filter(item => item.id !== id);
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Failed to remove item:', error);
        alert(error?.error?.message || 'Unable to remove item.');
      }
    });
  }
  clearCart(): void {
    const userId = Number(localStorage.getItem('userId'));
    console.log('CLEAR CART USER ID:', userId);
    if (!userId) {
      alert('User ID not found. Please login again.');
      return;
    }
    if (!confirm('Are you sure you want to clear the cart?')) {
      return;
    }
    this.cartService.clearCart(userId).subscribe({
      next: (response) => {
        console.log('CLEAR CART RESPONSE:', response);
        this.cartItems = [];
        this.cdr.detectChanges();
        alert('Cart cleared successfully.');
      },
      error: (error) => {
        console.error('CLEAR CART ERROR:', error);
        console.error('STATUS:', error.status);
        console.error('ERROR BODY:', error.error);
        alert('Failed to clear cart.');
      }
    });
  }
  get totalItems(): number {
    return this.cartItems.reduce((sum, item) => sum + (item.qty || 0), 0);
  }
  get grandTotal(): number {
    return this.cartItems.reduce((sum, item) => sum + ((item.price || 0) * (item.qty || 0)), 0);
  }
}