import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import {CommonModule, NgOptimizedImage} from '@angular/common';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgOptimizedImage],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [HttpClient]
})
export class LoginComponent {
  loginForm: FormGroup;
  loginError: string | null = null; // To store and display login error messages

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value)
        .subscribe({
          next: (response) => {
            if (response && response.token) {
              // Store the token in localStorage
              localStorage.setItem('token', response.token);
              this.authService.setToken(response.token);
              this.authService.isLoggedIn();
              this.authService.isLoggedInSubject.next(true);
              this.router.navigate(['/dashboard']);
            } else {
              this.loginError = 'Invalid credentials'; // Set an error message
            }
          },
          error: (error) => {
            console.error('Login failed:', error);
            this.loginError = 'An error occurred during login. Please try again later.'; // Set a generic error message
          }
        });
    }
  }
}
