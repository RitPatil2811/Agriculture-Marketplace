import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user';
import { Sidebar } from '../../shared/sidebar/sidebar';
@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [
    FormsModule,
    Sidebar
  ],
  templateUrl: './edit-profile.html',
  styleUrl: './edit-profile.css'
})
export class EditProfile implements OnInit {
  farmer: any = {
    name: '',
    email: '',
    mobile: '',
    address: '',
    farmName: '',
    experience: null,
    joined: ''
  };
  userId: number = 0;
  constructor(
    private userService: UserService,
    private router: Router
  ) { }
  ngOnInit(): void {
    const id = localStorage.getItem('userId');
    if (!id) {
      alert('User not logged in');
      this.router.navigate(['/login']);
      return;
    }
    this.userId = Number(id);
    this.loadProfile();
  }
  loadProfile(): void {
    this.userService
      .getProfile(this.userId)
      .subscribe({
        next: (response: any) => {
          console.log('Profile:', response);
          this.farmer = {
            name: response.name || '',
            email: response.email || '',
            mobile: response.mobile || '',
            address: response.address || '',
            farmName: response.farmName || '',
            experience: response.experience ?? null,
            joined: response.joined || ''
          };
        },
        error: (error) => {
          console.error(error);
          alert('Unable to load profile');
        }
      });
  }
  updateProfile(): void {
    this.userService
      .updateProfile(this.userId, this.farmer)
      .subscribe({
        next: (response: any) => {
          console.log('Updated:', response);
          alert('Profile updated successfully!');
          this.router.navigate([
            '/farmer/profile'
          ]);
        },
        error: (error) => {
          console.error(error);
          alert(
            error.error?.message ||
            'Profile update failed'
          );
        }
      });
  }
  cancel(): void {
    this.router.navigate([
      '/farmer/profile'
    ]);
  }
}