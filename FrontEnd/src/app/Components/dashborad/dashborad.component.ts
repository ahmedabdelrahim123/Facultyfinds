import { Component } from '@angular/core';
import { DataService } from 'src/app/Services/data.service';

@Component({
  selector: 'app-dashborad',
  templateUrl: './dashborad.component.html',
  styleUrls: ['./dashborad.component.css']
})
export class DashboradComponent {
  orders: any;
  totalOrdersCount: any;
  pendingOrders: any ;
  rejectedOrders: any;
  totalProductsCount: any;
  totalUsersCount: any;
  soldProductsCount: number= 0;
  usersCount: number= 0;
  constructor(private api : DataService) { }
  ngOnInit(): void {
    this.api.getMyOrders().subscribe(
      {
        next:(data)=>{
          this.orders = data.data;
          this.totalOrdersCount = data.totalOrdersCount;
          this.pendingOrders = data.pendingOrders;
          this.rejectedOrders = data.rejectedOrders;
        },
        error:(err)=>{console.log(err)}
      }
    )
    this.api.getMyProducts().subscribe(
      {
        next:(data)=>{
          for( let product of data)
            {
              if(product.statue === "sold"){
                this.soldProductsCount++;
              }
            }
          this.totalProductsCount =data.length;
        },
        error:(err)=>{console.log(err)}
      }
    )
    this.api.getMyUsers().subscribe(
      {
        next:(data)=>{
          for( let user of data)
            {
              if(user.type === "user"){
                this.usersCount++;
              }
            }
        },
        error:(err)=>{console.log(err)}
      }
    )
  }

}
