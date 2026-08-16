import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AdminSidebar } from '../admin-sidebar/admin-sidebar';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import {
  UserService,
  Farmer
} from '../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-manage-farmers',
  standalone: true,
 imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    AdminSidebar
],
  templateUrl: './manage-farmer.html',
  styleUrl: './manage-farmer.css'
})
export class ManageFarmer implements OnInit {

  searchText = '';
  selectedStatus = 'All';

  farmers: Farmer[] = [];

 constructor(
  private userService: UserService,
  private cdr: ChangeDetectorRef
) {}

  ngOnInit(): void {
    console.log('Manage Farmer component loaded');
    this.loadFarmers();
  }

 loadFarmers(): void {

  console.log('Calling farmer API...');

  this.userService.getAllFarmers().subscribe({

    next: (data: Farmer[]) => {

      console.log('API response:', data);

      this.farmers = data;

      console.log('Farmers stored:', this.farmers);
      console.log('Number of farmers:', this.farmers.length);

      this.cdr.detectChanges();

    },

    error: (error: HttpErrorResponse) => {

      console.error('API ERROR:', error);

    }

  });
}
  get filteredFarmers(): Farmer[] {

    const search = this.searchText
      .toLowerCase()
      .trim();

    return this.farmers.filter((farmer: Farmer) => {

      const matchesSearch =
        !search ||
        (farmer.name || '')
          .toLowerCase()
          .includes(search) ||
        (farmer.email || '')
          .toLowerCase()
          .includes(search) ||
        (farmer.mobile || '')
          .includes(search);

      const matchesStatus =
        this.selectedStatus === 'All' ||
        (farmer.status || 'Pending') === this.selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }

  approveFarmer(farmer: Farmer): void {

    this.userService
      .updateStatus(farmer.id, 'Active')
      .subscribe({

        next: (updatedFarmer: Farmer) => {

          farmer.status = updatedFarmer.status;

        },

        error: (error: HttpErrorResponse) => {

          console.error('Approve error:', error);

        }

      });
  }

  blockFarmer(farmer: Farmer): void {

    this.userService
      .updateStatus(farmer.id, 'Blocked')
      .subscribe({

        next: (updatedFarmer: Farmer) => {

          farmer.status = updatedFarmer.status;

        },

        error: (error: HttpErrorResponse) => {

          console.error('Block error:', error);

        }

      });
  }

  deleteFarmer(id: number): void {

    if (!confirm('Are you sure you want to delete this farmer?')) {
      return;
    }

    this.userService
      .deleteFarmer(id)
      .subscribe({

        next: () => {

          this.farmers =
            this.farmers.filter(
              (farmer: Farmer) => farmer.id !== id
            );

        },

        error: (error: HttpErrorResponse) => {

          console.error('Delete error:', error);

        }

      });
  }
}