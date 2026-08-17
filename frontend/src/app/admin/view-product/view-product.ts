import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AdminSidebar } from '../admin-sidebar/admin-sidebar';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-view-product',
  standalone: true,
  imports: [
    AdminSidebar,
    RouterLink
  ],
  templateUrl: './view-product.html',
  styleUrl: './view-product.css'
})
export class ViewProduct implements OnInit {
  product: Product | null = null;
  loading: boolean = true;
  errorMessage: string = '';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cdr: ChangeDetectorRef
  ) { }
  ngOnInit(): void {
    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );
    if (!id) {
      this.errorMessage = 'Invalid product ID.';
      this.loading = false;
      this.cdr.detectChanges();
      return;
    }
    this.loadProduct(id);
  }
  // ==========================================
  // LOAD PRODUCT
  // ==========================================
  loadProduct(id: number): void {
    this.loading = true;
    this.errorMessage = '';
    this.productService.getProductById(id).subscribe({
      next: (data: Product) => {
        console.log('Product details:', data);
        this.product = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (error: HttpErrorResponse) => {
        console.error(
          'Error loading product:',
          error
        );
        this.errorMessage =
          'Unable to load product details.';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }
  // ==========================================
  // APPROVE PRODUCT
  // ==========================================
  approveProduct(): void {
    if (!this.product) {
      return;
    }
    this.productService
      .updateProductStatus(
        this.product.id,
        'Approved'
      )
      .subscribe({
        next: (updatedProduct: Product) => {
          if (this.product) {
            this.product.status =
              updatedProduct.status;
          }
          alert(
            'Product approved successfully.'
          );
        },
        error: (error: HttpErrorResponse) => {
          console.error(
            'Error approving product:',
            error
          );
          alert(
            'Failed to approve product.'
          );
        }
      });
  }
  // ==========================================
  // DELETE PRODUCT
  // ==========================================
  deleteProduct(): void {
    // Make sure product exists
    if (!this.product) {
      return;
    }
    const productId = this.product.id;
    // Confirmation
    const confirmDelete = confirm(
      'Are you sure you want to delete this product?'
    );
    if (!confirmDelete) {
      return;
    }
    console.log(
      'Deleting product ID:',
      productId
    );
    this.productService
      .deleteProduct(productId)
      .subscribe({
        next: (response: string) => {
          console.log(
            'DELETE RESPONSE:',
            response
          );
          alert(
            'Product deleted successfully.'
          );
          // Go back to Manage Products
          this.router.navigate(
            ['/admin/products']
          );
        },
        error: (error: HttpErrorResponse) => {
          console.error(
            'DELETE ERROR:',
            error
          );
          alert(
            'Failed to delete product.'
          );
        }
      });
  }
  // ==========================================
  // BACK TO PRODUCTS
  // ==========================================
  goBack(): void {
    this.router.navigate(
      ['/admin/products']
    );
  }
}