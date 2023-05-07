import { Component } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  
  public totalItem : number = 0;
  constructor(private cartService : CartService) { }

  isAuthenticated() {
    return true;
 }
 logout(){
 
 }
 
 ngOnInit(): void {
  this.cartService.getProducts()
  .subscribe(res=>{
    this.totalItem = res.length;
  })
}
 }