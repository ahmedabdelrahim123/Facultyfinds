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
  // zip: string = '';
  public products : any = [];
  public grandTotal !: number;
  public Total !: number;
  public totalItem : number = 0;
  public totalQuantity: number = 0;



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
get firstName() {
  return this.myForm.get('firstName');
}

get lastName() {
  return this.myForm.get('lastName');
}

get address() {
  return this.myForm.get('address');
}
get email() {
  return this.myForm.get('email');
}

get phone() {
  return this.myForm.get('phone');
}

get zip() {
  return this.myForm.get('zip');
}
get apartment() {
  return this.myForm.get('apartment');
}

get city() {
  return this.myForm.get('city');
}








ngOnInit(): void {
this.cartService.getProducts()
.subscribe(res=>{
  this.products = res;
  this.grandTotal = this.cartService.getTotalPrice();
  this.Total = this.cartService.getTotalPrice()+40;

    this.totalQuantity = this.getTotalQuantity();
    this.totalItem = this.products.length + this.totalQuantity;
  
})
}
getTotalQuantity(): number {
  let totalQuantity = 0;
  for (const item of this.products) {
    totalQuantity += item.quantity;
  }
  return totalQuantity;
}
Pay() {
  const formValues = this.myForm.value;
  if (!formValues.firstName || !formValues.email || !formValues.lastName || !formValues.phone || !formValues.zip || !formValues.city || !formValues.apartment) {
    let errorMsg = "Please fill in all required fields:";
    if (!formValues.firstName) {
      this.firstName?.markAsTouched();
      if (this.firstName && this.firstName.invalid) {
        errorMsg += " First Name";
      }
    }
    if (!formValues.email) {
      this.email?.markAsTouched();
      if (this.email &&this.email.invalid) {
        errorMsg += " Email";
      }
    }
    if (!formValues.lastName) {
      this.lastName?.markAsTouched();
      if (this.lastName&&this.lastName.invalid) {
        errorMsg += " Last Name";
      }
    }
    if (!formValues.address) {
      this.address?.markAsTouched();
      if (this.address && this.address.invalid) {
        errorMsg += " address";
      }
    }
    if (!formValues.phone) {
      this.phone?.markAsTouched();
      if (this.phone &&this.phone.invalid) {
        errorMsg += " Phone";
      }
    }
    if (!formValues.zip) {
      this.zip?.markAsTouched();
      if (this.zip && this.zip.invalid) {
        errorMsg += " Zip";
      }
    }
    if (!formValues.city) {
      this.city?.markAsTouched();
      if (this.city &&this.city.invalid) {
        errorMsg += " City";
      }
    }
    if (!formValues.apartment) {
      this.apartment?.markAsTouched();
      if (this.apartment &&this.apartment.invalid) {
        errorMsg += " Apartment";
      }
    }
    // alert(errorMsg);
  }
  else if (this.myForm.valid) {
    this.router.navigate(['/strip']);
  }
  else {
    alert("Invalid data");
  }
}

}
