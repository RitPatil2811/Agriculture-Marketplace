import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Navbar } from '../../shared/navbar/navbar';
import { Footer } from '../../shared/footer/footer';
@Component({
  selector: 'app-public-products',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    Navbar,
    Footer
  ],
  templateUrl: './public-products.html',
  styleUrl: './public-products.css'
})
export class PublicProducts {
  searchText = '';
  category = 'All Categories';
  products = [
    {
      id: 1,
      name: 'Tomato',
      category: 'Vegetables',
      price: 30,
      unit: 'Kg',
      status: 'In Stock',
      image: 'images/tomato.jpg'
    },
    {
      id: 2,
      name: 'Potato',
      category: 'Vegetables',
      price: 25,
      unit: 'Kg',
      status: 'In Stock',
      image: 'images/potato.jpg'
    },
    {
      id: 3,
      name: 'Onion',
      category: 'Vegetables',
      price: 28,
      unit: 'Kg',
      status: 'Low Stock',
      image: 'images/onion.jpg'
    },
    {
      id: 4,
      name: 'Apple',
      category: 'Fruits',
      price: 120,
      unit: 'Kg',
      status: 'In Stock',
      image: 'images/apple.jpg'
    },
    {
      id: 5,
      name: 'Banana',
      category: 'Fruits',
      price: 45,
      unit: 'Dozen',
      status: 'In Stock',
      image: 'images/banana.jpg'
    },
    {
      id: 6,
      name: 'Rice',
      category: 'Grains',
      price: 70,
      unit: 'Kg',
      status: 'In Stock',
      image: 'images/rice.jpg'
    },
    {
      id: 7,
      name: 'Mango',
      category: 'Fruits',
      price: 150,
      unit: 'Kg',
      status: 'In Stock',
      image: 'images/mango.jpg'
    },
    {
      id: 8,
      name: 'Turmeric',
      category: 'Spices',
      price: 250,
      unit: 'Kg',
      status: 'In Stock',
      image: 'images/turmeric.jpg'
    }
  ];
  get filteredProducts() {
    return this.products.filter(product => {
      const matchesSearch =
        product.name.toLowerCase().includes(this.searchText.toLowerCase());
      const matchesCategory =
        this.category == 'All Categories' ||
        product.category == this.category;
      return matchesSearch && matchesCategory;
    });
  }
}