import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private readonly http: HttpClient) {}
  private readonly Base_URL = 'http://localhost:3000';

  // getMyProducts(): Observable<any> {
  //   return this.http.get(`${this.Base_URL}/api/product/products`);
  // }
  getMyProducts(college?: string): Observable<any> {
    let url = `${this.Base_URL}/api/product/products`;

    if (college) {
      url = `${url}?college=${college}`;
    }

    return this.http.get(url);
  }

  getProductById(_id: Number): Observable<any> {
    return this.http.get(`${this.Base_URL}/api/product/${_id}`);
  }

  getMyOrders(): Observable<any> {
    return this.http.get(`${this.Base_URL}/api/order/orders`);
  }
  getMyUsers(): Observable<any> {
    return this.http.get(`${this.Base_URL}/api/user/users`);
  }

  addNewUser(newUser: any) {
    return this.http.post(`${this.Base_URL}/api/user/create`, newUser);
  }

  loginUser(user: any) {
    return this.http.post(`${this.Base_URL}/api/user/login`, user);
  }

  updateUser(user: any) {
    return this.http.put(`${this.Base_URL}/api/user/user/:id`, user);
  }
  deleteUser(user: any) {
    return this.http.delete(`${this.Base_URL}/api/user/delete/:id`, user);
  }
  getUserbyid(user: any) {
    return this.http.get(`${this.Base_URL}/api/user/:id`, user);
  }
}
