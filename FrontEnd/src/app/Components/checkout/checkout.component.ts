import { Component } from '@angular/core';
import { CartService } from 'src/app/Services/cart.service';
import { Validators } from '@angular/forms';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  myForm: FormGroup;
  zip: string = '';
  public products : any = [];
  public grandTotal !: number;
  public Total !: number;
  public totalItem : number = 0;
  // item: any;

constructor(private cartService : CartService,private formBuilder: FormBuilder, private router: Router) {
  this.myForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    address: ['', Validators.required],
    apartment: ['', Validators.required],
    city: ['', Validators.required],
    zip: ['', Validators.required],
    phone: ['', Validators.required]
  });
}

ngOnInit(): void {
this.cartService.getProducts()
.subscribe(res=>{
  this.products = res;
  this.grandTotal = this.cartService.getTotalPrice();
  this.Total = this.cartService.getTotalPrice()+40;
    this.totalItem = res.length;
  
})
}

Pay() {
  const formValues = this.myForm.value;
  if (!formValues.firstName || !formValues.email || !formValues.lastName || !formValues.phone 
    
    || !formValues.zip || !formValues.city || !formValues.apartment ) {
    alert("Please fill in all fields");
  }
  else if ("this.myForm.valid" ) {
    this.router.navigate(['/strip']);
  }
  else {
    alert("Invalid data");
  }
}


}
