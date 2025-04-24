import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TransactionService } from '../transaction.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-transaction',
  imports: [ReactiveFormsModule],
  templateUrl: './new-transaction.component.html',
  styleUrl: './new-transaction.component.scss'
})
export class NewTransactionComponent implements OnInit {
  router: Router;

  email: string;

  token: string;

  transactionService: TransactionService;

  amountInput: FormControl = new FormControl('');
  timestampInput: FormControl = new FormControl('');

  constructor(router: Router, transactionService: TransactionService) {
    this.router = router;

    this.transactionService = transactionService;

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

  cancel(){
    this.router.navigate(['/']);
  }

  logout() {
    localStorage.removeItem("user");
    this.router.navigate(['/login']);
  }

  editAccount() {
    this.router.navigate(['/edit-account']);
  }

  newTransactionPress(){
    const amount = this.amountInput.value;
    const timestamp = this.timestampInput.value;

    if(!amount || !timestamp) {
      alert("Please fill in all fields.");
      return;
    }

    this.transactionService.newTransaction(amount, timestamp).then((response) => {
      if (response === 201) {
        console.log('Transaction created successfully:', response);
        alert('Transaction created successfully!');
        this.router.navigate(['/']);
      } else {
        alert('Transaction creation failed. Please check your credentials.');
        console.error('Transaction creation failed:', response);
      }
    });
  }
}
