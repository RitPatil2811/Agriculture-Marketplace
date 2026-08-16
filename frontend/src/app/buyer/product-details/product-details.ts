import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BuyerSidebar } from '../buyer-sidebar/buyer-sidebar';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
@Component({
  selector: 'app-buyer-product-details',
  standalone: true,
  imports: [CommonModule, RouterLink, BuyerSidebar],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css'
})
export class ProductDetails implements OnInit {
  product: any = null;
  loading = true;
  error = false;
  userId = 2;
  constructor(private route: ActivatedRoute, private productService: ProductService, private cartService: CartService, private router: Router, private cdr: ChangeDetectorRef) { }
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) {
      this.loading = false;
      this.error = true;
      return;
    }
    this.loadProduct(id);
  }
  loadProduct(id: number): void {
    this.loading = true;
    this.productService.getProductById(id).subscribe({
      next: (data) => {
        console.log('PRODUCT DETAILS:', data);
        this.product = data;
        this.loading = false;
        this.error = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Failed to load product:', err);
        this.product = null;
        this.loading = false;
        this.error = true;
        this.cdr.detectChanges();
      }
    });
  }
  get productStatus(): string {
    if (!this.product) {
      return 'Out Of Stock';
    }
    if (this.product.quantity <= 0) {
      return 'Out Of Stock';
    }
    if (this.product.quantity <= 10) {
      return 'Low Stock';
    }
    return 'In Stock';
  }
  addToCart(): void {
    if (!this.product) {
      return;
    }
    if (this.product.quantity <= 0) {
      alert('This product is out of stock.');
      return;
    }
    this.cartService.addToCart(this.userId, this.product.id, 1).subscribe({
      next: (response) => {
        console.log('CART ADD RESPONSE:', response);
        alert(`${this.product.name} added to cart successfully.`);
      },
      error: (error) => {
        console.error('Failed to add product to cart:', error);
        alert(error?.error?.message || 'Failed to add product to cart.');
      }
    });
  }
  buyNow(): void {
    if (!this.product) {
      return;
    }
    if (this.product.quantity <= 0) {
      alert('This product is out of stock.');
      return;
    }
    this.cartService.addToCart(this.userId, this.product.id, 1).subscribe({
      next: (response) => {
        console.log('BUY NOW CART RESPONSE:', response);
        this.router.navigate(['/buyer/checkout']);
      },
      error: (error) => {
        console.error('Failed to add product to cart:', error);
        alert(error?.error?.message || 'Failed to add product to cart.');
      }
    });
  }
}