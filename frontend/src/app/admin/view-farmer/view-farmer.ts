import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import {
  ActivatedRoute,
  Router
} from '@angular/router';

import { CommonModule } from '@angular/common';

import { AdminSidebar } from '../admin-sidebar/admin-sidebar';

import {
  UserService,
  Farmer
} from '../../services/user.service';

import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-view-farmer',

  standalone: true,

  imports: [
    CommonModule,
    AdminSidebar
  ],

  templateUrl: './view-farmer.html',

  styleUrl: './view-farmer.css'
})


export class ViewFarmer implements OnInit {

  farmer: Farmer | null = null;

  loading = true;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private cdr: ChangeDetectorRef
  ) {}


  ngOnInit(): void {

    console.log('View Farmer component loaded');

    const id = this.route.snapshot.paramMap.get('id');

    console.log('Farmer ID:', id);


    if (id) {

      this.loadFarmer(Number(id));

    } else {

      console.error('Farmer ID not found');

      this.loading = false;

      this.cdr.detectChanges();

    }

  }


  loadFarmer(id: number): void {

    console.log('Calling API for farmer ID:', id);


    this.userService
      .getFarmerById(id)
      .subscribe({

        next: (data: Farmer) => {

          console.log('Farmer details:', data);

          this.farmer = data;

          this.loading = false;

          console.log('Farmer stored:', this.farmer);

          console.log('Loading:', this.loading);

          this.cdr.detectChanges();

        },


        error: (error: HttpErrorResponse) => {

          console.error(
            'Error loading farmer:',
            error
          );

          this.loading = false;

          this.cdr.detectChanges();

        }

      });

  }


  approveFarmer(): void {

    if (!this.farmer) {
      return;
    }


    this.userService
      .updateStatus(
        this.farmer.id,
        'Active'
      )
      .subscribe({

        next: (updatedFarmer: Farmer) => {

          console.log(
            'Farmer approved:',
            updatedFarmer
          );

          this.farmer = updatedFarmer;

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


  blockFarmer(): void {

    if (!this.farmer) {
      return;
    }


    this.userService
      .updateStatus(
        this.farmer.id,
        'Blocked'
      )
      .subscribe({

        next: (updatedFarmer: Farmer) => {

          console.log(
            'Farmer blocked:',
            updatedFarmer
          );

          this.farmer = updatedFarmer;

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


  goBack(): void {

    this.router.navigate([
      '/admin/manage-farmer'
    ]);

  }

}