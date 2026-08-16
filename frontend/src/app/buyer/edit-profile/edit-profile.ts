import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { BuyerSidebar } from '../buyer-sidebar/buyer-sidebar';
import { UserService } from '../../services/user';

@Component({
  selector: 'app-buyer-edit-profile',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    BuyerSidebar
  ],
  templateUrl: './edit-profile.html',
  styleUrl: './edit-profile.css'
})
export class EditProfile implements OnInit {

  buyer: any = null;
  loading = true;
  saving = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    const userId = Number(
      localStorage.getItem('userId')
    );

    console.log('EDIT BUYER USER ID:', userId);

    if (!userId || userId <= 0) {
      console.error('Invalid user ID');
      this.loading = false;
      this.cdr.detectChanges();
      return;
    }

    this.loadProfile(userId);
  }

  loadProfile(id: number): void {

    console.log('Loading buyer profile for edit:', id);

    this.loading = true;

    this.userService.getProfile(id).subscribe({

      next: (response) => {

        console.log(
          'EDIT PROFILE RESPONSE:',
          response
        );

        if (response && response.role === 'BUYER') {

          this.buyer = {
            id: response.id,
            name: response.name || '',
            email: response.email || '',
            mobile: response.mobile || '',
            address: response.address || '',
            city: response.city || '',
            state: response.state || '',
            pincode: response.pincode || ''
          };

        } else {

          console.error('User is not a buyer');
          this.buyer = null;
        }

        this.loading = false;

        console.log(
          'BUYER EDIT DATA:',
          this.buyer
        );

        this.cdr.detectChanges();
      },

      error: (error) => {

        console.error(
          'EDIT PROFILE LOAD ERROR:',
          error
        );

        this.buyer = null;
        this.loading = false;

        this.cdr.detectChanges();
      }

    });
  }

  updateProfile(): void {

    if (!this.buyer) {
      return;
    }

    if (
      !this.buyer.name ||
      !this.buyer.email ||
      !this.buyer.mobile ||
      !this.buyer.address ||
      !this.buyer.city ||
      !this.buyer.state ||
      !this.buyer.pincode
    ) {

      alert('Please fill all fields');

      return;
    }

    this.saving = true;

    const userId = Number(
      localStorage.getItem('userId')
    );

    const data = {
      name: this.buyer.name,
      email: this.buyer.email,
      mobile: this.buyer.mobile,
      address: this.buyer.address,
      city: this.buyer.city,
      state: this.buyer.state,
      pincode: this.buyer.pincode
    };

    console.log(
      'UPDATING BUYER PROFILE:',
      data
    );

    this.userService
      .updateProfile(userId, data)
      .subscribe({

        next: (response) => {

          console.log(
            'PROFILE UPDATED:',
            response
          );

          this.saving = false;

          alert('Profile updated successfully');

          this.cdr.detectChanges();

          this.router.navigate([
            '/buyer/profile'
          ]);
        },

        error: (error) => {

          console.error(
            'PROFILE UPDATE ERROR:',
            error
          );

          this.saving = false;

          alert(
            'Failed to update profile'
          );

          this.cdr.detectChanges();
        }

      });
  }

  cancel(): void {

    this.router.navigate([
      '/buyer/profile'
    ]);
  }
}