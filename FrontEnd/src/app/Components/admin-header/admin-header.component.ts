import { Component } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { Router } from '@angular/router';
import { ThemeService } from 'src/app/Services/theme.service';
@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent {
username: any;
  constructor(private authService: AuthService, private router:Router, private theme:ThemeService){
    this.username= localStorage.getItem('username');
  }

isAuthenticated(): boolean {
  return this.authService.isAuthenticated();
}
logout(): void {
  this.authService.logout();
  this.router.navigate(['/']);
}

toggleTheme() {
  this.theme.toggleTheme();
}
}
