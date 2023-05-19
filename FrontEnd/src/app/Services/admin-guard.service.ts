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
      // User is not authenticated or not an admin, redirect to login page
      this.router.navigate(['/']);
      return false;
    }
  }
}
