import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Sidebar } from '../../shared/sidebar/sidebar';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/user';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [Sidebar, RouterLink],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile implements OnInit {
  farmer: any = {
    name: '',
    email: '',
    mobile: '',
    address: '',
    farmName: 'Not provided',
    experience: 'Not provided',
    joined: 'Not available',
    totalProducts: 0,
    totalOrders: 0,
    totalEarnings: '₹0',
    image: 'images/profile.jpg'
  };
  constructor(
    private userService: UserService,
    private cdr: ChangeDetectorRef
  ) { }
  ngOnInit(): void {
    const userId = localStorage.getItem('userId');
    console.log('Stored User ID:', userId);
    if (!userId) {
      alert('User ID not found');
      return;
    }
    this.userService.getProfile(Number(userId)).subscribe({
      next: (response: any) => {
        console.log('Profile Response:', response);
        this.farmer.name = response.name;
        this.farmer.email = response.email;
        this.farmer.mobile = response.mobile;
        this.farmer.address = response.address || 'Not provided';
        this.farmer.farmName = response.farmName || 'Not provided';
        this.farmer.experience = response.experience || 'Not provided';
        this.farmer.joined = response.joined || 'Not available';
        this.farmer.totalProducts = response.totalProducts || 0;
        this.farmer.totalOrders = response.totalOrders || 0;
        this.farmer.totalEarnings = response.totalEarnings || '₹0';
        this.farmer.image = 'images/profile.jpg';
        console.log('Farmer Object:', this.farmer);
        // Force Angular to update the screen
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Profile Error:', error);
        alert('Unable to load profile');
      }
    });
  }
}