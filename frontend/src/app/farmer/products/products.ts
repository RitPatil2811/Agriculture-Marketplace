import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Sidebar } from '../../shared/sidebar/sidebar';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-farmer-products',
  standalone: true,
  imports: [
    CommonModule,
    Sidebar,
    RouterLink
  ],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products implements OnInit {

  products: Product[] = [];
  filteredProducts: Product[] = [];
  paginatedProducts: Product[] = [];

  farmerId: number = 0;

  searchText: string = '';
  selectedCategory: string = 'All Categories';
  selectedStock: string = 'All Stock';

  currentPage: number = 1;
  pageSize: number = 5;
  totalPages: number = 1;

  constructor(
    private productService: ProductService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    console.log('===== PRODUCTS PAGE INIT =====');

    const userId = localStorage.getItem('userId');

    console.log('localStorage userId:', userId);

    if (!userId) {
      console.error('userId is missing from localStorage');
      alert('User not logged in');
      return;
    }

    this.farmerId = Number(userId);

    console.log('farmerId:', this.farmerId);

    if (isNaN(this.farmerId) || this.farmerId <= 0) {
      console.error('Invalid farmerId:', this.farmerId);
      return;
    }

    this.loadProducts();
  }

  loadProducts(): void {

    console.log(
      'Calling API for farmerId:',
      this.farmerId
    );

    this.productService
      .getFarmerProducts(this.farmerId)
      .subscribe({

        next: (response: Product[]) => {

          console.log('API RESPONSE:', response);
          console.log(
            'RESPONSE LENGTH:',
            response.length
          );

          /*
           * Store products returned by backend
           */
          this.products = response.map(product => ({
            ...product,
            status: this.getStatus(product.quantity)
          }));

          /*
           * Initially all products are visible
           */
          this.filteredProducts = [
            ...this.products
          ];

          /*
           * Start from first page
           */
          this.currentPage = 1;

          /*
           * Calculate pagination
           */
          this.updatePagination();

          console.log(
            'FINAL PRODUCTS:',
            this.products
          );

          console.log(
            'FINAL PRODUCTS LENGTH:',
            this.products.length
          );

          console.log(
            'FINAL FILTERED:',
            this.filteredProducts
          );

          console.log(
            'FINAL FILTERED LENGTH:',
            this.filteredProducts.length
          );

          console.log(
            'FINAL PAGINATED:',
            this.paginatedProducts
          );

          console.log(
            'FINAL PAGINATED LENGTH:',
            this.paginatedProducts.length
          );

          /*
           * Force Angular to update the view
           */
          this.cdr.detectChanges();

          console.log(
            'CHANGE DETECTION COMPLETED'
          );
        },

        error: (error) => {

          console.error(
            'Products API error:',
            error
          );

          this.products = [];
          this.filteredProducts = [];
          this.paginatedProducts = [];

          this.cdr.detectChanges();
        }

      });
  }

  getStatus(quantity: number): string {

    if (quantity <= 0) {
      return 'Out Of Stock';
    }

    if (quantity <= 10) {
      return 'Low Stock';
    }

    return 'In Stock';
  }

  searchProduct(event: Event): void {

    const input =
      event.target as HTMLInputElement;

    this.searchText =
      input.value.toLowerCase();

    this.applyFilters();
  }

  filterCategory(event: Event): void {

    const select =
      event.target as HTMLSelectElement;

    this.selectedCategory =
      select.value;

    this.applyFilters();
  }

  filterStock(event: Event): void {

    const select =
      event.target as HTMLSelectElement;

    this.selectedStock =
      select.value;

    this.applyFilters();
  }

  applyFilters(): void {

    this.filteredProducts =
      this.products.filter(product => {

        const searchMatch =
          !this.searchText ||
          product.name
            .toLowerCase()
            .includes(
              this.searchText.toLowerCase()
            );

        const categoryMatch =
          this.selectedCategory ===
            'All Categories' ||
          product.category ===
            this.selectedCategory;

        const stockMatch =
          this.selectedStock ===
            'All Stock' ||
          product.status ===
            this.selectedStock;

        return (
          searchMatch &&
          categoryMatch &&
          stockMatch
        );
      });

    this.currentPage = 1;

    this.updatePagination();

    this.cdr.detectChanges();

    console.log(
      'Original products:',
      this.products
    );

    console.log(
      'Filtered products:',
      this.filteredProducts
    );

    console.log(
      'Paginated products:',
      this.paginatedProducts
    );
  }

  updatePagination(): void {

    this.totalPages = Math.ceil(
      this.filteredProducts.length /
      this.pageSize
    );

    if (this.totalPages < 1) {
      this.totalPages = 1;
    }

    const startIndex =
      (this.currentPage - 1) *
      this.pageSize;

    const endIndex =
      startIndex + this.pageSize;

    this.paginatedProducts =
      this.filteredProducts.slice(
        startIndex,
        endIndex
      );

    console.log(
      'Paginated products:',
      this.paginatedProducts
    );
  }

  goToPage(page: number): void {

    if (
      page < 1 ||
      page > this.totalPages
    ) {
      return;
    }

    this.currentPage = page;

    this.updatePagination();

    this.cdr.detectChanges();
  }

  nextPage(): void {

    if (
      this.currentPage <
      this.totalPages
    ) {

      this.currentPage++;

      this.updatePagination();

      this.cdr.detectChanges();
    }
  }

  previousPage(): void {

    if (this.currentPage > 1) {

      this.currentPage--;

      this.updatePagination();

      this.cdr.detectChanges();
    }
  }

  deleteProduct(id: number): void {

  if (!confirm('Are you sure you want to delete this product?')) {
    return;
  }

  console.log('Deleting product ID:', id);

  this.productService.deleteProduct(id).subscribe({

    next: (response) => {

      console.log('DELETE RESPONSE:', response);

      alert('Product deleted successfully');

      // Reload products from backend
      this.loadProducts();
    },

    error: (error) => {

      console.error('DELETE ERROR:', error);

      alert('Failed to delete product');
    }

  });
}
}