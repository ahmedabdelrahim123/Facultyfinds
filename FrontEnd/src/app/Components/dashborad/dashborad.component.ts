import { Component } from '@angular/core';
import { DataService } from 'src/app/Services/data.service';

@Component({
  selector: 'app-dashborad',
  templateUrl: './dashborad.component.html',
  styleUrls: ['./dashborad.component.css']
})
export class DashboradComponent {
  orders: any;
  totalOrdersCount: number=0;
  pendingOrders: any[]=[];
  constructor(private api : DataService) { }
  ngOnInit(): void {
    this.api.getMyOrders().subscribe(
      {
        next:(data)=>{
          this.orders = data;
          console.log(this.orders);
        },
        error:(err)=>{console.log(err)}
      }
    )
  }

}
