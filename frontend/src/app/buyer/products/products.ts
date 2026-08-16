import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { BuyerSidebar } from '../buyer-sidebar/buyer-sidebar';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-buyer-products',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    BuyerSidebar
  ],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products implements OnInit {
  products: any[] = [];
  loading = true;
  searchText = '';
  selectedCategory = 'All';

  constructor(
    private productService: ProductService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;

    this.productService.getAllProducts().subscribe({
      next: (data) => {
        console.log('BUYER PRODUCTS:', data);
        this.products = data || [];
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Failed to load products:', error);
        this.products = [];
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  get filteredProducts(): any[] {
    const search = this.searchText.toLowerCase().trim();

    return this.products.filter(product => {
      const matchesSearch =
        !search ||
        product.name?.toLowerCase().includes(search) ||
        product.category?.toLowerCase().includes(search);

      const matchesCategory =
        this.selectedCategory === 'All' ||
        product.category === this.selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }

  get categories(): string[] {
    return [
      'All',
      ...new Set(
        this.products
          .map(product => product.category)
          .filter(category => category)
      )
    ];
  }
}