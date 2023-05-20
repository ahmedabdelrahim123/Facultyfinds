import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/Services/data.service';
import jwt_decode from 'jwt-decode';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user:any;
  id:any;
  constructor( private api : DataService) { }

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
}}}

