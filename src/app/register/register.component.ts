import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  errorMessage: string = '';

  email: FormControl = new FormControl('');
  password: FormControl = new FormControl('');
  password_confirm: FormControl = new FormControl('');

  userService: UserService;

  router: Router;

  constructor(userService: UserService, router: Router) {
    this.userService = userService;
    this.router = router;
  }

  clearErrorMessage(): void {
    this.errorMessage = '';
  }

  async registerPress() {
    if (this.password.value !== this.password_confirm.value) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    const data = {
      email: this.email.value,
      password: this.password.value
    }

    this.userService.register(data.email, data.password).then((response) => {
      if (response === 201) {
        console.log('Registration successful:', response);
        // move to login page
        this.router.navigate(['/login']);
      } else {
        this.errorMessage = `Registration failed. Please check your credentials. Error code: ${response}`;
        console.error('Registration failed:', response);
      }
    }).catch((error) => {
      this.errorMessage = 'An error occurred during registration. Please try again later.';
      console.error('Error during registration:', error);
    });
  }
}
