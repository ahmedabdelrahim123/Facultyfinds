import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private readonly http:HttpClient) { }
  private readonly Base_URL = "http://localhost:3000";

  // getMyData(): Observable<any> {
  //   return this.http.get(`${this.Base_URL}/api/product/products`);
  // }
  getMyProducts(): Observable<any> {
    return this.http.get(`${this.Base_URL}/api/product/products`);
  }
  getMyOrders(): Observable<any> {
    return this.http.get(`${this.Base_URL}/api/order/orders`);
  }
  getMyUsers(): Observable<any> {
    return this.http.get(`${this.Base_URL}/api/user/users`);
  }
}




