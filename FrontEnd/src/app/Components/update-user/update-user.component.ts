import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/Services/data.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
// const bcrypt = require("bcrypt");
//import * as bcrypt from 'bcryptjs';


@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent {
  imageFile = '';
  user: any;
  ID: any;
  constructor(
    private dataservice: DataService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.ID = route.snapshot.params['id'];
    console.log('in component', this.ID);
  }
  ngOnInit(): void {
    this.dataservice.getUserbyid(this.ID).subscribe({
      next: (data) => {
        console.log('in component', data);
        this.user = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  UpdateUser(
    email: any,
    username: any,
    password: any,
    gender: any,
    image: any
  ) {
    let formData = new FormData();
    formData.append('email', email);
    formData.append('username', username);
    formData.append('password', password);
    formData.append('gender', gender);
    //console.log(formData.get('image'));
    if (image && image.files && image.files.length > 0) {
      // If a new image was selected, add it to the form data
      formData.append('image', image.files[0]);
    }
    else {
      formData.append('image', this.user.image);
    }

      this.dataservice.updateUser(this.ID, formData).subscribe((res) => {
      });

      this.router.navigate(['/profile']);


    }


  }


