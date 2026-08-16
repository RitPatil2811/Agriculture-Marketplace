import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AdminSidebar } from '../admin-sidebar/admin-sidebar';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
@Component({
  selector: 'app-manage-products',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    AdminSidebar
  ],
  templateUrl: './manage-product.html',
  styleUrl: './manage-product.css'
})
export class ManageProduct implements OnInit {
  searchText: string = '';
  category: string = 'All';
  products: Product[] = [];
  loading: boolean = false;
  errorMessage: string = '';
  constructor(
    private productService: ProductService,
    private cdr: ChangeDetectorRef
  ) { }
  // ==========================================
  // LOAD PRODUCTS WHEN PAGE OPENS
  // ==========================================
  ngOnInit(): void {
    this.loadProducts();
  }
  // ==========================================
  // GET ALL PRODUCTS FROM SPRING BOOT
  // ==========================================
  loadProducts(): void {
    this.loading = true;
    this.errorMessage = '';
    this.productService.getAllProducts().subscribe({
      next: (data: Product[]) => {
        this.products = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (error: HttpErrorResponse) => {
        console.error(
          'Error loading products:',
          error
        );
        this.loading = false;
        this.errorMessage =
          'Unable to load products. Please check the Spring Boot server.';
      }
    });
  }
  // ==========================================
  // SEARCH + CATEGORY FILTER
  // ==========================================
  get filteredProducts(): Product[] {
    return this.products.filter((product: Product) => {
      const search =
        this.searchText
          .toLowerCase()
          .trim();
      const productName =
        product.name
          ? product.name.toLowerCase()
          : '';
      const farmerId =
        product.farmerId
          ? String(product.farmerId)
          : '';
      const matchesSearch =
        productName.includes(search) ||
        farmerId.includes(search);
      const matchesCategory =
        this.category === 'All' ||
        product.category === this.category;
      return matchesSearch && matchesCategory;
    });
  }
}