import { Component , OnInit} from '@angular/core';
import { ApiService } from 'src/app/Services/api.services';
import { CartService } from 'src/app/Services/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
 
  public productList : any ;
  public filterCategory : any;
  searchKey:string ="";
  public totalItem : number = 0;
  public searchTerm !: string;
  
  constructor(private api : ApiService, private cartService : CartService) { }

  ngOnInit(): void {

    this.cartService.getProducts()
    .subscribe(res=>{
      this.totalItem = res.length;
    })
    this.api.getProduct()
    .subscribe(res=>{
      this.productList = res;
       // //and subscribes to the response data using the subscribe() method. When the response data is received, the code updates 
     // the productList variable by iterating through each product in the list and renaming the category and adding the quantity 
    // and total properties to each product object.
      this.filterCategory = res;
      this.productList.forEach((a:any) => {
        if(a.category ==="women's clothing" || a.category ==="men's clothing"){
          a.category ="fashion"
        }
        Object.assign(a,{quantity:1,total:a.price});
      });
      console.log(this.productList)
    });

    this.cartService.search.subscribe((val:any)=>{
      this.searchKey = val;
    })
  }
  // The addtocart() method takes an item as a parameter and calls a method of a shopping cart service (cartService)
//   //  to add the item to the cart.

  addtocart(item: any){
    this.cartService.addtoCart(item);
   
  }



  filter(category:string){
    this.filterCategory = this.productList
    .filter((a:any)=>{
      if(a.category == category || category==''){
        return a;
      }
    })
  }


  
  search(event:any){
    this.searchTerm = (event.target as HTMLInputElement).value;
    console.log(this.searchTerm);
    this.cartService.search.next(this.searchTerm);
  }

}