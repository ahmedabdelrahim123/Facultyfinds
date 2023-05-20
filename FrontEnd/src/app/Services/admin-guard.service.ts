import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }
  canActivate(): boolean {
    if (this.authService.isAuthenticated() && this.authService.isAdmin()) {
      // User is authenticated and an admin
      return true;
    } else {
      alert('you must be logged in as a administrator to access this page');
      this.router.navigate(['/']);
      return false;
    }
  }
}
