import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Transaction } from '../transaction';
import { NgFor, NgIf } from '@angular/common';
import { Text } from '@angular/compiler';
import { TransactionService } from '../transaction.service';

@Component({
  selector: 'app-home',
  imports: [NgFor, NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  router: Router;

  email: string;

  token: string;

  transactions: Transaction[] = [];

  transactionService: TransactionService;

  constructor(router: Router, transactionService: TransactionService) {
    this.router = router;

    this.transactionService = transactionService;

    if(localStorage.getItem("user") === null) {
      this.router.navigate(['/login']);
    }

    const user = JSON.parse(localStorage.getItem("user") || '{}');
    this.email = user.email || '';
    this.token = user.token || '';

    this.refreshTransactions().then(() => {
      console.log("Transactions refreshed successfully.");
    });
  }

  ngOnInit(): void {
    // Initialization logic here
  }

  logout() {
    localStorage.removeItem("user");
    this.router.navigate(['/login']);
  }

  editAccount() {
    this.router.navigate(['/edit-account']);
  }

  newTransaction() {
    this.router.navigate(['/new-transaction']);
  }

  async refreshTransactions() {
    this.transactions = await this.transactionService.getTransactions();
  }
}
