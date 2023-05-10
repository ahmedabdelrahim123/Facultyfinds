import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private readonly http:HttpClient) { }
  private readonly Base_URL = "http://localhost:3000";

  getMyProducts(): Observable<any> {
    return this.http.get(`${this.Base_URL}/api/product/products`);
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

  addNewUser(newUser:any){
    return this.http.post(`${this.Base_URL}/api/user/create`, newUser);
  }
  // AddNewStudent(newStudent:any){
  //   return this.myClient.post(this.Base_URL, newStudent);
  // }
}




