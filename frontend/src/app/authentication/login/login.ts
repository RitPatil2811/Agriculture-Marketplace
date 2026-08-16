import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  role = '';
  email = '';
  password = '';
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }
  login() {
    // Check role
    if (this.role === '') {
      alert('Please select login type.');
      return;
    }
    // Check email and password
    if (this.email === '' || this.password === '') {
      alert('Please enter Email and Password.');
      return;
    }
    // Prepare login data
    const loginData = {
      email: this.email,
      password: this.password,
      role: this.role.toUpperCase()
    };
    console.log('Login Data:', loginData);
    // Call Spring Boot backend
    this.authService.login(loginData).subscribe({
      next: (response: any) => {
        console.log('Login Response:', response);
        localStorage.setItem(
          'userId',
          response.id.toString()
        );

        localStorage.setItem(
          'userRole',
          response.role
        );

        alert('Login successful!');
        // Redirect according to role
        if (response.role === 'FARMER') {
          this.router.navigate(['/farmer/dashboard']);
        } else if (response.role === 'BUYER') {
          this.router.navigate(['/buyer/dashboard']);
        } else if (response.role === 'ADMIN') {
          this.router.navigate(['/admin/dashboard']);
        } else {
          alert('Invalid user role.');
        }
      },
      error: (error) => {
        console.error('Login Error:', error);
        alert(
          error.error?.message ||
          'Invalid email, password or role.'
        );
      }
    });
  }
}