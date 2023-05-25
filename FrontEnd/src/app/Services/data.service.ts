import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private readonly http: HttpClient) {}
  private readonly Base_URL = 'http://localhost:3000';

  ///////////////////////////////
  //// product
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

  addNewProduct(newProduct: any) {
    return this.http.post(`${this.Base_URL}/api/product/create`, newProduct);
  }

  updateProduct(productId: string, product: any) {
    return this.http.put(
      `${this.Base_URL}/api/product/product/${productId}`,
      product
    );
  }

  deleteProduct(productId: string) {
    return this.http.delete(`${this.Base_URL}/api/product/delete/${productId}`);
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


  deleteUser(userId: any) {
    return this.http.delete(`${this.Base_URL}/api/user/delete/${userId}`);
  }

  getUserbyid(id: any) {
    return this.http.get(`${this.Base_URL}/api/user/${id}`);
  }
  //////////////////////////////////
  // order
  createorder(order: any) {
    return this.http.post(`${this.Base_URL}/api/order/create`, order);
  }


  updateOrder(order: any,id: any) {
    return this.http.put(`${this.Base_URL}/api/order/order/${id}`, order);
  }

  deleteOrder(id: any) {
    return this.http.delete(`${this.Base_URL}/api/order/delete/${id}`);
  }

  getOrderbyid(order: any,id: any) {
    return this.http.get(`${this.Base_URL}/api/order/${id}`, order);
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
