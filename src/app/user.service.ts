import { Injectable } from '@angular/core';
import { User } from './user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl: string = '/api';

  http: HttpClient;

  constructor(http: HttpClient) { 
    this.http = http;
  }

  /**
   * Logs in a user with the given email and password.
   * @param email email address of the user
   * @param password password of the user
   * @returns user object if login is successful, otherwise returns http status code.
   * 200 for success, 400 for bad request, 401 for unauthorized, 500 for server error
   */
  async login(email: string, password: string): Promise<User | number> {
    const response = await fetch(`${this.baseUrl}/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    if (response.status === 200) {
      const data = await response.json();
      return new User(email, password, data.token);
    } else {
      console.error('Login failed:', response.statusText);
      return response.status;
    }
  }

  /**
   * Registers a new user with the given email and password.
   * @param email email address of the user
   * @param password password of the user
   * @returns http status code. 201 for success, 400 for bad request, 409 for conflict (user already exists)
   */
  async register(email: string, password: string): Promise<number> {
    try {
      const response = await this.http.post(`${this.baseUrl}/user/`, { email, password }, { observe: 'response' }).toPromise();
      if(response){
        console.log(response.body);
        return response.status;
      }
      return 418; // Bad request if response is null
    } catch (error: any) {
      console.error(error.message);
      return error.status;
    }
  }

  /**
   * Updates the user information with the given email and password.
   * @param user user object to be updated
   * @param email new email address of the user
   * @param password new password of the user
   * @returns http status code. 200 for success, 400 for bad request, 401 for unauthorized
   */
  async updateUser(token: string, email: string | null, password: string | null): Promise<number> {
    const response = await fetch(`${this.baseUrl}/user/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, password: password, token: token })
    });

    return response.status;
  }

  /**
   * Deletes the user with the given email and password.
   * @param user user object to be deleted
   * @returns http status code. 200 for success, 400 for bad request, 401 for unauthorized
   */
  async deleteUser(token: string): Promise<number> {
    const response = await fetch(`${this.baseUrl}/user/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token: token })
    });

    return response.status;
  }
}
