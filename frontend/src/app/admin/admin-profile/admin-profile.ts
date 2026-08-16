import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AdminSidebar } from '../admin-sidebar/admin-sidebar';
import { UserService } from '../../services/user';

@Component({
  selector: 'app-admin-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, AdminSidebar],
  templateUrl: './admin-profile.html',
  styleUrl: './admin-profile.css'
})
export class Profile implements OnInit {
  userId = Number(localStorage.getItem('userId'));
  admin: any = {
    name: '',
    email: '',
    mobile: '',
    city: '',
    state: '',
    address: '',
    role: 'Admin',
    image: 'images/profile.jpg'
  };
  loading = true;
  saving = false;
  constructor(private userService: UserService, private cdr: ChangeDetectorRef, private location: Location) { }
  ngOnInit(): void {
    this.loadadmin();
  }
  loadadmin(): void {
    if (!this.userId) {
      this.loading = false;
      return;
    }
    this.userService.getProfile(this.userId).subscribe({
      next: (response: any) => {
        console.log('Admin admin:', response);
        const savedImage = localStorage.getItem(
          'adminProfileImage_' + this.userId
        );
        this.admin = {
          ...response,
          name: response.name || '',
          email: response.email || '',
          mobile: response.mobile || '',
          city: response.city || '',
          state: response.state || '',
          address: response.address || '',
          role: response.role || 'Admin',
          image: savedImage || 'images/profile.jpg'
        };
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('admin loading error:', error);
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }
  saveChanges(): void {
    this.saving = true;
    const data = {
      name: this.admin.name,
      email: this.admin.email,
      mobile: this.admin.mobile,
      city: this.admin.city,
      state: this.admin.state,
      address: this.admin.address,
      role: this.admin.role
    };
    this.userService.updateProfile(this.userId, data).subscribe({
      next: (response: any) => {
        console.log('admin updated:', response);
        this.admin = { ...this.admin, ...response };
        this.saving = false;
        this.cdr.detectChanges();
        alert('admin updated successfully.');
      },
      error: (error) => {
        console.error('admin update error:', error);
        this.saving = false;
        this.cdr.detectChanges();
        alert('Failed to update admin.');
      }
    });
  }
  goBack(): void {
    this.location.back();
  }
}
