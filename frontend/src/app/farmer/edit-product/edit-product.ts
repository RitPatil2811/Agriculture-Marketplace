import {Component,  OnInit,  ChangeDetectorRef} from '@angular/core';
import {ActivatedRoute,  Router,  RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {ProductService} from '../../services/product.service';
import {Product} from '../../models/product';
@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './edit-product.html',
  styleUrl: './edit-product.css'
})
export class EditProduct implements OnInit {
  product: Product | null = null;
  loading = true;
  saving = false;
  selectedFile: File | null = null;
  previewImage: string | null = null;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cdr: ChangeDetectorRef
  ) { }
  // =========================================
  // INITIALIZE
  // =========================================
  ngOnInit(): void {
    console.log('==============================');
    console.log('EDIT PRODUCT PAGE');
    console.log('==============================');
    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );
    console.log('Edit Product ID:', id);
    if (!id || id <= 0) {
      console.error('Invalid Product ID');
      this.loading = false;
      this.cdr.detectChanges();
      return;
    }
    this.loadProduct(id);
  }
  // =========================================
  // LOAD PRODUCT
  // =========================================
  loadProduct(id: number): void {
    console.log(
      'Calling GET product API:',
      id
    );
    this.loading = true;
    this.productService
      .getProductById(id)
      .subscribe({
        next: (response: Product) => {
          console.log(
            'EDIT PRODUCT RESPONSE:',
            response
          );
          this.product = {
            ...response
          };
          this.loading = false;
          this.cdr.detectChanges();
          console.log(
            'Product loaded:',
            this.product
          );
        },
        error: (error) => {
          console.error(
            'EDIT PRODUCT ERROR:',
            error
          );
          this.product = null;
          this.loading = false;
          this.cdr.detectChanges();
        }
      });
  }
  // =========================================
  // SELECT IMAGE
  // =========================================
  onFileSelected(event: Event): void {
    const input =
      event.target as HTMLInputElement;
    if (
      input.files &&
      input.files.length > 0
    ) {
      this.selectedFile =
        input.files[0];
      console.log(
        'Selected image:',
        this.selectedFile.name
      );
      // Preview selected image
      const reader =
        new FileReader();
      reader.onload = () => {
        this.previewImage =
          reader.result as string;
        this.cdr.detectChanges();
      };
      reader.readAsDataURL(
        this.selectedFile
      );
    }
  }
  // =========================================
  // UPDATE PRODUCT
  // =========================================
  updateProduct(): void {
    if (!this.product) {
      console.error(
        'Product not loaded'
      );
      return;
    }
    console.log(
      'Updating Product:',
      this.product
    );
    this.saving = true;
    const formData =
      new FormData();
    // Product ID
    formData.append(
      'id',
      String(this.product.id)
    );
    // Product name
    formData.append(
      'name',
      this.product.name
    );
    // Category
    formData.append(
      'category',
      this.product.category
    );
    // Description
    formData.append(
      'description',
      this.product.description || ''
    );
    // Price
    formData.append(
      'price',
      String(this.product.price)
    );
    // Quantity
    formData.append(
      'quantity',
      String(this.product.quantity)
    );
    // Unit
    formData.append(
      'unit',
      this.product.unit
    );
    // New image
    if (this.selectedFile) {
      console.log(
        'Uploading new image:',
        this.selectedFile.name
      );
      formData.append(
        'image',
        this.selectedFile
      );
    } else {
      console.log(
        'No new image selected. Old image will remain.'
      );
    }
    // =========================================
    // SEND UPDATE
    // =========================================
    this.productService
      .updateProduct(
        this.product.id,
        formData
      )
      .subscribe({
        next: (response) => {
          console.log(
            'UPDATE RESPONSE:',
            response
          );
          this.saving = false;
          this.cdr.detectChanges();
          alert(
            'Product updated successfully!'
          );
          // Go back to Products
          this.router.navigate(
            ['/farmer/products']
          );
        },
        error: (error) => {
          console.error(
            'UPDATE PRODUCT ERROR:',
            error
          );
          this.saving = false;
          this.cdr.detectChanges();
          alert(
            'Failed to update product'
          );
        }
      });
  }
  // =========================================
  // CANCEL
  // =========================================
  cancel(): void {
    this.router.navigate(
      ['/farmer/products']
    );
  }
}