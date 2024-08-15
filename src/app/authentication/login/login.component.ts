import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import   
 { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;

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
            // Store the JWT token (you might want to use local storage or a state management solution)
            localStorage.setItem('token', response.token);

            // Navigate to the dashboard
            this.router.navigate(['/dashboard']); 
          },
          error: (error) => {
            // Handle login errors (e.g., display an error message)
            console.error('Login failed:', error);
          }
        });
    }
  }
}
