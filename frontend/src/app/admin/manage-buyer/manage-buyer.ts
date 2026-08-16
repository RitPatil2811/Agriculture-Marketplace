import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

import { AdminSidebar } from '../admin-sidebar/admin-sidebar';

import {
  UserService,
  User
} from '../../services/user.service';

@Component({
  selector: 'app-manage-buyers',
  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    AdminSidebar
  ],

  templateUrl: './manage-buyer.html',
  styleUrl: './manage-buyer.css'
})
export class ManageBuyer implements OnInit {

  searchText = '';

  selectedStatus = 'All';

  // Database buyers
  buyers: User[] = [];


  constructor(
    private userService: UserService,
    private cdr: ChangeDetectorRef
  ) {}


  // =========================
  // COMPONENT LOAD
  // =========================

  ngOnInit(): void {

    console.log('Manage Buyer component loaded');

    this.loadBuyers();

  }


  // =========================
  // LOAD BUYERS FROM DATABASE
  // =========================

  loadBuyers(): void {

    console.log('Calling buyer API...');

    this.userService.getAllBuyers().subscribe({

      next: (data: User[]) => {

        console.log('API response:', data);

        this.buyers = data;

        console.log(
          'Buyers stored:',
          this.buyers
        );

        console.log(
          'Number of buyers:',
          this.buyers.length
        );

        this.cdr.detectChanges();

      },

      error: (error: HttpErrorResponse) => {

        console.error(
          'Buyer API ERROR:',
          error
        );

      }

    });

  }


  // =========================
  // SEARCH + STATUS FILTER
  // =========================

  get filteredBuyers(): User[] {

    const search =
      this.searchText
        .toLowerCase()
        .trim();


    return this.buyers.filter(
      (buyer: User) => {

        const matchesSearch =
          !search ||

          (buyer.name || '')
            .toLowerCase()
            .includes(search) ||

          (buyer.email || '')
            .toLowerCase()
            .includes(search) ||

          (buyer.mobile || '')
            .includes(search);


        const matchesStatus =
          this.selectedStatus === 'All' ||

          (buyer.status || 'Pending') ===
          this.selectedStatus;


        return matchesSearch &&
               matchesStatus;

      }
    );

  }


  // =========================
  // APPROVE BUYER
  // =========================

  approveBuyer(buyer: User): void {

    console.log(
      'Approving buyer:',
      buyer.id
    );


    this.userService
      .updateStatus(
        buyer.id,
        'Active'
      )
      .subscribe({

        next: (updatedBuyer: User) => {

          console.log(
            'Buyer approved:',
            updatedBuyer
          );

          buyer.status =
            updatedBuyer.status;

          this.cdr.detectChanges();

        },

        error: (error: HttpErrorResponse) => {

          console.error(
            'Approve error:',
            error
          );

        }

      });

  }


  // =========================
  // BLOCK BUYER
  // =========================

  blockBuyer(buyer: User): void {

    console.log(
      'Blocking buyer:',
      buyer.id
    );


    this.userService
      .updateStatus(
        buyer.id,
        'Blocked'
      )
      .subscribe({

        next: (updatedBuyer: User) => {

          console.log(
            'Buyer blocked:',
            updatedBuyer
          );

          buyer.status =
            updatedBuyer.status;

          this.cdr.detectChanges();

        },

        error: (error: HttpErrorResponse) => {

          console.error(
            'Block error:',
            error
          );

        }

      });

  }


  // =========================
  // DELETE BUYER
  // =========================

  deleteBuyer(id: number): void {

    if (
      !confirm(
        'Are you sure you want to delete this buyer?'
      )
    ) {
      return;
    }


    console.log(
      'Deleting buyer:',
      id
    );


    this.userService
      .deleteBuyer(id)
      .subscribe({

        next: () => {

          console.log(
            'Buyer deleted successfully'
          );


          this.buyers =
            this.buyers.filter(
              (buyer: User) =>
                buyer.id !== id
            );


          this.cdr.detectChanges();

        },

        error: (error: HttpErrorResponse) => {

          console.error(
            'Delete error:',
            error
          );

        }

      });

  }

}