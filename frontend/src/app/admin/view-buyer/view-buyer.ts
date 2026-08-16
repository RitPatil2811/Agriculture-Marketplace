import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

import { AdminSidebar } from '../admin-sidebar/admin-sidebar';

import {
  UserService,
  User
} from '../../services/user.service';


@Component({
  selector: 'app-view-buyer',
  standalone: true,

  imports: [
    CommonModule,
    AdminSidebar
  ],

  templateUrl: './view-buyer.html',
  styleUrl: './view-buyer.css'
})
export class ViewBuyer implements OnInit {

  buyer: User | null = null;

  loading = true;

  errorMessage = '';


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private changeDetector: ChangeDetectorRef
  ) {}


  // =====================================================
  // COMPONENT INITIALIZATION
  // =====================================================

  ngOnInit(): void {

    console.log('================================');
    console.log('VIEW BUYER COMPONENT LOADED');
    console.log('================================');

    const id = this.route.snapshot.paramMap.get('id');

    console.log('Buyer ID from URL:', id);


    if (!id) {

      console.error('Buyer ID not found in URL');

      this.errorMessage = 'Buyer ID not found.';

      this.loading = false;

      this.changeDetector.detectChanges();

      return;
    }


    const buyerId = Number(id);


    if (isNaN(buyerId)) {

      console.error('Invalid Buyer ID:', id);

      this.errorMessage = 'Invalid Buyer ID.';

      this.loading = false;

      this.changeDetector.detectChanges();

      return;
    }


    this.loadBuyer(buyerId);
  }


  // =====================================================
  // LOAD BUYER
  // =====================================================

  loadBuyer(id: number): void {

    console.log('================================');
    console.log('CALLING BUYER API');
    console.log('Buyer ID:', id);
    console.log(
      'API URL:',
      `http://localhost:8080/api/users/${id}`
    );
    console.log('================================');


    this.loading = true;

    this.errorMessage = '';


    this.userService.getBuyerById(id).subscribe({

      // =================================================
      // SUCCESS
      // =================================================

      next: (data: User) => {

        console.log('================================');
        console.log('BUYER API SUCCESS');
        console.log('Buyer details:', data);
        console.log(
          'Buyer JSON:',
          JSON.stringify(data, null, 2)
        );
        console.log('================================');


        // Store API response
        this.buyer = data;

        // Stop loading
        this.loading = false;


        if (data.role !== 'BUYER') {

          console.warn(
            'Warning: User role is:',
            data.role
          );

        }


        console.log(
          'buyer variable after assignment:',
          this.buyer
        );

        console.log(
          'loading after assignment:',
          this.loading
        );


        // Force Angular to update the HTML
        this.changeDetector.detectChanges();

      },


      // =================================================
      // ERROR
      // =================================================

      error: (error: HttpErrorResponse) => {

        console.error('================================');
        console.error('BUYER API ERROR');
        console.error('Status:', error.status);
        console.error('Message:', error.message);
        console.error('Error:', error.error);
        console.error('================================');


        this.buyer = null;

        this.loading = false;


        if (error.status === 404) {

          this.errorMessage =
            'Buyer not found.';

        }

        else if (error.status === 0) {

          this.errorMessage =
            'Cannot connect to the backend server.';

        }

        else {

          this.errorMessage =
            'Unable to load buyer details.';

        }


        // Force Angular to update the HTML
        this.changeDetector.detectChanges();

      },


      // =================================================
      // COMPLETE
      // =================================================

      complete: () => {

        console.log(
          'Buyer API request completed.'
        );

      }

    });

  }


  // =====================================================
  // APPROVE BUYER
  // =====================================================

  approveBuyer(): void {

    if (!this.buyer) {

      console.error(
        'Cannot approve: buyer not loaded'
      );

      return;
    }


    console.log(
      'Approving buyer:',
      this.buyer.id
    );


    this.userService
      .updateStatus(
        this.buyer.id,
        'Active'
      )
      .subscribe({

        next: (updatedBuyer: User) => {

          console.log(
            'Buyer approved successfully:',
            updatedBuyer
          );


          this.buyer = updatedBuyer;

          this.changeDetector.detectChanges();

        },


        error: (error: HttpErrorResponse) => {

          console.error(
            'Approve buyer error:',
            error
          );

        }

      });

  }


  // =====================================================
  // BLOCK BUYER
  // =====================================================

  blockBuyer(): void {

    if (!this.buyer) {

      console.error(
        'Cannot block: buyer not loaded'
      );

      return;
    }


    console.log(
      'Blocking buyer:',
      this.buyer.id
    );


    this.userService
      .updateStatus(
        this.buyer.id,
        'Blocked'
      )
      .subscribe({

        next: (updatedBuyer: User) => {

          console.log(
            'Buyer blocked successfully:',
            updatedBuyer
          );


          this.buyer = updatedBuyer;

          this.changeDetector.detectChanges();

        },


        error: (error: HttpErrorResponse) => {

          console.error(
            'Block buyer error:',
            error
          );

        }

      });

  }


  // =====================================================
  // BACK
  // =====================================================

  goBack(): void {

    console.log(
      'Going back to Manage Buyers'
    );


    this.router.navigate([
      '/admin/manage-buyer'
    ]);

  }

}