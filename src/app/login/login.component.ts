import { NgIf } from '@angular/common';
import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../user.service';
import { User } from '../user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit, OnDestroy, AfterViewInit {
  errorMessage: string = '';

  email: FormControl = new FormControl('');
  password: FormControl = new FormControl('');

  userService: UserService;

  router: Router;

  constructor(userService: UserService, router: Router) { 
    this.userService = userService;
    this.router = router;
  }

  ngOnInit(): void {
    // Initialization logic here
  }

  ngAfterViewInit(): void {
    // Logic to be executed after the view is initialized
  }

  ngOnDestroy(): void {
    // Cleanup logic here
  }

  clearErrorMessage(): void {
    this.errorMessage = '';
  }

  async loginPress() {
    console.log(`Login button pressed ${this.email.value} ${this.password.value}`);

    const data = {
      email: this.email.value,
      password: this.password.value
    };

    this.userService.login(data.email, data.password).then((response) => {
      if (response instanceof User) {
        console.log('Login successful:', response);
        localStorage.setItem('user', JSON.stringify({email: response.email, token: response.token}));
        this.router.navigate(['/']); // Redirect to home page after successful login
      } else {
        this.errorMessage = 'Login failed. Please check your credentials.';
        console.error('Login failed:', response);
      }
    }).catch((error) => {
      this.errorMessage = 'An error occurred during login. Please try again later.';
      console.error('Error during login:', error);
    }); 
  }
}
