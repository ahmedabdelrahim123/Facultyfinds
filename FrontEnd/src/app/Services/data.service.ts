import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private readonly http: HttpClient) {}
  private readonly Base_URL = 'http://localhost:3000';


 // product
  getProductById(_id: Number): Observable<any> {
    return this.http.get(`${this.Base_URL}/api/product/${_id}`);
  }
  getMyProducts(college?: string): Observable<any> {
    let url = `${this.Base_URL}/api/product/products`;

    if (college) {
      url = `${url}?college=${college}`;
    }
    return this.http.get(url);
  }
  ////////////////////////////////
  // user
  getMyUsers(): Observable<any> {
    return this.http.get(`${this.Base_URL}/api/user/users`);
  }

  addNewUser(newUser: any) {
    return this.http.post(`${this.Base_URL}/api/user/create`, newUser);
  }


  updateUser(userId: string, user: any) {
    return this.http.put(`${this.Base_URL}/api/user/user/${userId}`, user);
  }

  deleteUser(user: any) {
    return this.http.delete(`${this.Base_URL}/api/user/delete/:id`, user);
  }
  getUserbyid(id: any) {
    return this.http.get(`${this.Base_URL}/api/user/${id}`);
  }
  //////////////////////////////////
  // order
  createorder(user: any) {
    return this.http.post(`${this.Base_URL}/api/order/create`, user);
  }

  updateOrder(user: any) {
    return this.http.put(`${this.Base_URL}/api/order/order/:id`, user);
  }

  deleteOrder(user: any) {
    return this.http.delete(`${this.Base_URL}/api/order/delete/:id`, user);
  }

  getOrderbyid(user: any) {
    return this.http.get(`${this.Base_URL}/api/order/:id`, user);
  }
  getMyOrders(): Observable<any> {
    return this.http.get(`${this.Base_URL}/api/order/orders`);
  }

  makePayment(stripeToken: any): Observable<any> {
    return this.http.post<any>(`${this.Base_URL}/api/payment/checkout`, {
      token: stripeToken,
    });
  }
}
