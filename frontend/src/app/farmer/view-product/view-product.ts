import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CommonModule } from '@angular/common';

import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-view-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-product.html',
  styleUrl: './view-product.css'
})
export class ViewProduct implements OnInit {

  product: Product | null = null;

  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private productService: ProductService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    console.log('================================');
    console.log('VIEW PRODUCT PAGE INIT');
    console.log('================================');

    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    console.log('Product ID:', id);

    if (!id || id <= 0) {

      console.error('Invalid product ID');

      this.loading = false;

      this.cdr.detectChanges();

      return;
    }

    this.loadProduct(id);
  }

  loadProduct(id: number): void {

    console.log('Calling API for product:', id);

    this.loading = true;

    this.productService
      .getProductById(id)
      .subscribe({

        next: (response: Product) => {

          console.log(
            'VIEW PRODUCT API RESPONSE:',
            response
          );

          /*
           * Create a NEW object.
           */
          this.product = {
            id: response.id,
            name: response.name,
            category: response.category,
            description: response.description,
            price: response.price,
            quantity: response.quantity,
            unit: response.unit,
            image: response.image,
            farmerId: response.farmerId,
            status: this.getStatus(response.quantity)
          };

          this.loading = false;

          console.log(
            'PRODUCT ASSIGNED:',
            this.product
          );

          console.log(
            'LOADING:',
            this.loading
          );

          /*
           * IMPORTANT
           *
           * Force Angular to update the HTML.
           */
          this.cdr.detectChanges();

          console.log(
            'CHANGE DETECTION COMPLETED'
          );
        },

        error: (error) => {

          console.error(
            'VIEW PRODUCT API ERROR:',
            error
          );

          this.product = null;

          this.loading = false;

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

  goBack(): void {

    this.location.back();

  }

}