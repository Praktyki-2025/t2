import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Transaction } from './transaction';
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  
  baseUrl: string = '/api';

  constructor() {}

  /**
   * Fetches all transactions from the server.
   * @returns array of transactions
   */
  async getTransactions(): Promise<Transaction[]> {
    try {
      const response = await fetch(`${this.baseUrl}/payment/all`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          token: JSON.parse(localStorage.getItem('user') || '{}').token || ''
        })
      });

      if (response.status !== 200) {
        console.error('Failed to fetch transactions:', response.statusText);
        return [];
      }

      const data = await response.json();
      const transactions = data.payments.map((payment: any) => {
        return new Transaction(payment.uuid, payment.amount, payment.timestamp);
      });
      
      return transactions || [];
    } catch (error) {
      console.error('Error fetching transactions:', error);
      return [];
    }
  }
}
