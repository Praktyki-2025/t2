import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Transaction } from '../transaction';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../user.service';
import { User } from '../user';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-edit-account',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './edit-account.component.html',
  styleUrl: './edit-account.component.scss'
})
export class EditAccountComponent implements OnInit {
  router: Router;

  email: string;

  token: string;

  emailInput: FormControl = new FormControl('');
  passwordInput: FormControl = new FormControl('');

  message: string = '';

  userService: UserService;

  updated: boolean = false;

  constructor(router: Router, userService: UserService) {
    this.router = router;
    this.userService = userService;

    if(localStorage.getItem("user") === null) {
      this.router.navigate(['/login']);
    }

    const user = JSON.parse(localStorage.getItem("user") || '{}');
    this.email = user.email || '';
    this.token = user.token || '';
  }

  ngOnInit(): void {
    // Initialization logic here
  }

  logout() {
    localStorage.removeItem("user");
    this.router.navigate(['/login']);
  }

  async editAccountPassPress() {
    await this.editAccount(null, this.passwordInput.value);
  }

  async editAccountEmailPress() {
    if(this.emailInput.valid)
      await this.editAccount(this.emailInput.value, null);
  }

  async editAccount(email: string | null, pass: string | null){
    const response = await this.userService.updateUser(this.token, email, pass);

    if(response === 200){
      localStorage.removeItem("user");
      this.updated = true;
    }else {
      this.message = 'Failed to update account. Please try again.';
      console.error('Failed to update account:', response);
    }
  }
}
