import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  getProduct(){//use httpclient to make get req to this link to get data
    return this.http.get<any>("https://fakestoreapi.com/products")
    .pipe(map((res:any)=>{
      return res;
    }))
  }
}
// The pipe() method is then used to apply one or more RxJS operators to the Observable
// The map operator is used to transform the response data to a new format.
// here the map operator is passed a function that takes the response data (res) as an argument and returns it as is.
//  This means that the response data is not transformed in any way,  and the method returns an // Observable that emits the
// response data as an any type.
