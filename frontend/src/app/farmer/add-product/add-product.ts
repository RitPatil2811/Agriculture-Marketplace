import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Sidebar } from '../../shared/sidebar/sidebar';
@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [FormsModule, Sidebar],
  templateUrl: './add-product.html',
  styleUrl: './add-product.css'
})
export class AddProduct {
  product = {
    name: '',
    category: '',
    description: '',
    price: 0,
    quantity: 0,
    unit: '',
    image: '',
    farmerId: 0
  };
  selectedImage: File | null = null;
  constructor(
    private productService: ProductService,
    private router: Router
  ) { }
  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;
      console.log('Selected image:', file.name);
      console.log('Image size:', file.size);
      console.log('Image type:', file.type);
    }
  }
  addProduct(): void {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('Farmer is not logged in');
      return;
    }
    if (!this.selectedImage) {
      alert('Please select a product image');
      return;
    }
    this.product.farmerId = Number(userId);
    const formData = new FormData();
    formData.append('name', this.product.name);
    formData.append('category', this.product.category);
    formData.append('description', this.product.description);
    formData.append('price', this.product.price.toString());
    formData.append('quantity', this.product.quantity.toString());
    formData.append('unit', this.product.unit);
    formData.append('farmerId', this.product.farmerId.toString());
    formData.append('image', this.selectedImage);
    console.log('Product data:');
    console.log('Name:', this.product.name);
    console.log('Category:', this.product.category);
    console.log('Price:', this.product.price);
    console.log('Quantity:', this.product.quantity);
    console.log('Unit:', this.product.unit);
    console.log('Farmer ID:', this.product.farmerId);
    console.log('Image:', this.selectedImage.name);
    this.productService.addProduct(formData).subscribe({
      next: (response) => {
        console.log('Product added:', response);
        alert('Product added successfully');
        this.router.navigate(['/farmer/products']);
      },
      error: (error) => {
        console.error('Add product error:', error);
        console.error('Status:', error.status);
        console.error('Error:', error.error);
        if (error.status === 413) {
          alert('Image is too large. Please select a smaller image.');
        } else {
          alert('Failed to add product');
        }
      }
    });
  }
}