import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent {
  constructor(public router:Router){}
  delayedNavigation() {
    setTimeout(() => {
      this.router.navigate(['/msgsend']);
    }, 1000);
  }


}
