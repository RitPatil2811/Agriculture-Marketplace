import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  user = {
    name: '',
    email: '',
    mobile: '',
    password: '',
    role: ''
  };
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }
  register() {
    console.log('Register Data:', this.user);
    this.authService.register(this.user).subscribe({
      next: (response) => {
        console.log('Registration Response:', response);
        alert('Registration successful!');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Registration Error:', error);
        alert(
          error.error?.message ||
          'Registration failed'
        );
      }
    });
  }
}