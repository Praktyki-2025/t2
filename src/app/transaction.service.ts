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

  /**
   * Creates a new transaction with the given amount and timestamp.
   * @param amount amount of the transaction
   * @param timestamp timestamp of the transaction
   * @returns http status code. 201 for success, 400 for bad request, 404 for unauthorized, 500 for server error
   */
  async newTransaction(amount: number, timestamp: string): Promise<number> {
    const response = await fetch(`${this.baseUrl}/payment/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token: JSON.parse(localStorage.getItem('user') || '{}').token || '',
        amount: amount,
        timestamp: timestamp
      })
    });

    return response.status;
  }
}
