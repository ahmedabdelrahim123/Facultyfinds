import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/Services/data.service';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user:any;
  constructor() { }

  ngOnInit(): void {
    const userData= localStorage.getItem('user')
    if(userData){
    const user = JSON.parse(userData);
       this.user = user;
      console.log(this.user);
  }
}}

