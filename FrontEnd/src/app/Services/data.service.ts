import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private readonly http:HttpClient) { }
  private readonly Base_URL = "http://localhost:3000/api/product";

  getMyData(): Observable<any> {
    return this.http.get(`${this.Base_URL}/products`);
  }
  // getMyData(): Observable<any[]> {
  //   return this.http.get<any[]>(`${this.Base_URL}/products`);
  // }
}




