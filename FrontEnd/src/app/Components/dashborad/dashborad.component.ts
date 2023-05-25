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
  rejectedOrders: any
  constructor(private api : DataService) { }
  ngOnInit(): void {
    this.api.getMyOrders().subscribe(
      {
        next:(data)=>{
          this.orders = data.data;
          this.totalOrdersCount = data.totalOrdersCount;
          this.pendingOrders = data.pendingOrders;
          this.rejectedOrders = data.rejectedOrders;
          // console.log(this.orders);
          // console.log(this.totalOrdersCount);
          // console.log(this.pendingOrders);
        },
        error:(err)=>{console.log(err)}
      }
    )
  }

}
