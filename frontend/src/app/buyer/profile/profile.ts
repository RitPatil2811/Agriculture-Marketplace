import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BuyerSidebar } from '../buyer-sidebar/buyer-sidebar';
import { UserService } from '../../services/user';

@Component({
  selector: 'app-buyer-profile',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    BuyerSidebar
  ],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile implements OnInit {

  buyer: any = null;
  loading = true;

  constructor(
    private userService: UserService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const userId = Number(localStorage.getItem('userId'));

    console.log('BUYER PROFILE USER ID:', userId);

    if (!userId || userId <= 0) {
      console.error('Invalid user ID');
      this.loading = false;
      this.cdr.detectChanges();
      return;
    }

    this.loadProfile(userId);
  }

  loadProfile(id: number): void {

    console.log('Loading buyer profile:', id);

    this.loading = true;

    this.userService.getProfile(id).subscribe({
      next: (response) => {

        console.log('BUYER PROFILE RESPONSE:', response);

        if (response && response.role === 'BUYER') {

          this.buyer = {
            ...response,
            totalOrders: 0,
            totalSpent: 0,
            memberSince: response.joined
              ? new Date(response.joined).getFullYear()
              : new Date().getFullYear()
          };

        } else {

          console.error('User is not a buyer');
          this.buyer = null;
        }

        this.loading = false;

        console.log('BUYER AFTER ASSIGN:', this.buyer);
        console.log('LOADING:', this.loading);

        this.cdr.detectChanges();
      },

      error: (error) => {

        console.error('BUYER PROFILE ERROR:', error);

        this.buyer = null;
        this.loading = false;

        this.cdr.detectChanges();
      }
    });
  }
}