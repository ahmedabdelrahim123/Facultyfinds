import { Component ,OnInit} from '@angular/core';
import { AuthService } from './Services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'FrontEnd';
  userROLE: any;
  constructor(private authService: AuthService){}
ngOnInit(): void {
  if(this.authService.isAdmin()){
      this.userROLE = "admin"
  }
  else{
      this.userROLE = "user"
  }
}
}
