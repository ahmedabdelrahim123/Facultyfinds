import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/Services/data.service';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  users: any;
  alertVisible=false;
  constructor(private api: DataService,    private authService: AuthService    ) {}
  ngOnInit() {
    // this.api.getMyUsers()
    // .subscribe(res=>{
    //   this.users = res;})
  }
  showAlert() {
    if(!this.isAuthenticated()){
      this.alertVisible=true;
      setTimeout(() => {
        this.alertVisible = false;
      }, 1000);
    }
  }
  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

}
