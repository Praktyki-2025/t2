import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionService } from '../transaction.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-transaction',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-transaction.component.html',
  styleUrl: './edit-transaction.component.scss'
})
export class EditTransactionComponent implements OnInit {
  email: string;

  token: string;

  amountInput: FormControl = new FormControl('');
  timestampInput: FormControl = new FormControl('');

  uuid: string = '';

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private transactionService: TransactionService) {

    if(localStorage.getItem("user") === null) {
      this.router.navigate(['/login']);
    }

    const user = JSON.parse(localStorage.getItem("user") || '{}');
    this.email = user.email || '';
    this.token = user.token || '';
  }

  ngOnInit(): void {
    this.uuid = this.activatedRoute.snapshot.paramMap.get('uuid') || '';
    
    this.transactionService.getTransactions().then((transactions) => {
      const transaction = transactions.find(t => t.uuid === this.uuid);
      if (transaction) {
        this.amountInput.setValue(transaction.amount);
        this.timestampInput.setValue(transaction.timestamp);
      } else {
        alert('Transaction not found.');
        this.router.navigate(['/']);
      }
    });
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

  editTransactionPress(){
    const amount = this.amountInput.value;
    const timestamp = this.timestampInput.value;

    if(!amount || !timestamp) {
      alert("Please fill in all fields.");
      return;
    }

    this.transactionService.updateTransaction(this.uuid, amount, timestamp).then((response) => {
      if (response === 200) {
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
