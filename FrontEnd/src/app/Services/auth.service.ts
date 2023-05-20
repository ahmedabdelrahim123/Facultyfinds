import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
user:any;
  private readonly Base_URL = 'http://localhost:3000';
  constructor(private http: HttpClient,private api : DataService) { }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }
  isAdmin(): boolean {
    const token = localStorage.getItem('token');
    if(token){
      const decodedToken: any = jwt_decode(token);
      const userId = decodedToken.userId;
      const userType = decodedToken.userType;
      if (userType === "admin"){
        return true;
      }
      else{
        return false;
      }
    }
    return false;
  }

  loginUser(user: any) {
    return this.http.post(`${this.Base_URL}/api/user/login`, user);
  }
  logout(): void {
    localStorage.clear();
  }
}
