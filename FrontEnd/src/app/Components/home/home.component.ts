import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/Services/data.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  users: any;
  constructor(private api: DataService) {}
  ngOnInit() {
    // this.api.getMyUsers()
    // .subscribe(res=>{
    //   this.users = res;})
  }
}
