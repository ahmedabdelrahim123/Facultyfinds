import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import jwt_decode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
user:any;
userRole:any;
  private readonly Base_URL = 'http://localhost:3000';
  private userRoleSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  constructor(private http: HttpClient,private api : DataService, private router: Router,) { }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }
  isAdmin(): boolean {
    const token = localStorage.getItem('token');
    if(token){
      const decodedToken: any = jwt_decode(token);
      this.userRole = decodedToken.userType;
      if (this.userRole === "admin"){
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
    this.userRoleSubject.next('');
    this.router.navigate(['/']);
  }

  getUserRole(): Observable<string> {
    return this.userRoleSubject.asObservable();
  }

  setUserRole(role: string) {
    this.userRoleSubject.next(role);
  }
}
