import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminSidebar } from '../admin-sidebar/admin-sidebar';
import { UserService } from '../../services/user';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, AdminSidebar],
  templateUrl: './edit-profile.html',
  styleUrl: './edit-profile.css'
})
export class EditProfile implements OnInit {

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

  constructor(
    private userService: UserService,
    private location: Location,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    this.userService.getProfile(this.userId).subscribe({
      next: (user: any) => {

        console.log('PROFILE:', user);

        const savedImage = localStorage.getItem(
          'adminProfileImage_' + this.userId
        );

        this.admin = {
          name: user.name || '',
          email: user.email || '',
          mobile: user.mobile || '',
          city: user.city || '',
          state: user.state || '',
          address: user.address || '',
          role: user.role || 'Admin',
          image: savedImage || 'images/profile.jpg'
        };

        this.loading = false;
        this.cdr.detectChanges();
      },

      error: (error) => {

        console.error('PROFILE ERROR:', error);

        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  changePhoto(event: Event): void {

    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      return;
    }

    const file = input.files[0];

    if (file.size > 2 * 1024 * 1024) {
      alert('Image size must be less than 2 MB.');
      return;
    }

    if (
      file.type !== 'image/jpeg' &&
      file.type !== 'image/png'
    ) {
      alert('Only JPG and PNG images are allowed.');
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {

      this.admin.image = reader.result as string;

      localStorage.setItem(
        'adminProfileImage_' + this.userId,
        this.admin.image
      );

      this.cdr.detectChanges();
    };

    reader.readAsDataURL(file);
  }

  updateProfile(): void {

    this.saving = true;

    const user = {
      name: this.admin.name,
      email: this.admin.email,
      mobile: this.admin.mobile,
      city: this.admin.city,
      state: this.admin.state,
      address: this.admin.address,
      role: this.admin.role
    };

    this.userService.updateProfile(this.userId, user).subscribe({

      next: (response: any) => {

        console.log('PROFILE UPDATED:', response);

        this.saving = false;

        alert('Profile updated successfully.');

        this.location.back();
      },

      error: (error) => {

        console.error('UPDATE PROFILE ERROR:', error);

        this.saving = false;

        this.cdr.detectChanges();

        alert('Failed to update profile.');
      }
    });
  }

  cancel(): void {
    this.location.back();
  }
}
