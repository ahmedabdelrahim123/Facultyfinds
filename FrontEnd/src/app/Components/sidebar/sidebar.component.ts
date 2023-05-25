import { Component } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { Router } from '@angular/router';
import { DataService } from 'src/app/Services/data.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  username: any;
  user:any;
  id:any;
constructor(private authService: AuthService , private router:Router, private api:DataService){
  this.username= localStorage.getItem('username');
}
ngOnInit(): void {
  const token= localStorage.getItem('token')
  if(token){
  const decodedToken: any = jwt_decode(token);
  const userId = decodedToken.userId;
  const userType = decodedToken.userType;
  console.log('User ID:', userId);
  this.api.getUserbyid(userId).subscribe((response)=>{
    this.user = response;
  })
}}
logout(): void {
  let logout= confirm('Are you sure you want to logout');
  if( logout){
  this.authService.logout();
  this.router.navigate(['/']);
  };
}

}
