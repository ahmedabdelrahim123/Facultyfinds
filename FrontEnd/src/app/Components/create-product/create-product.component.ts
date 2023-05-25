import { Component } from '@angular/core';
import { DataService } from 'src/app/Services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})

export class CreateProductComponent {
  imageFile = '';
  constructor (private dataservice: DataService, private router: Router){

  }
  AddProduct(title: any, price: any, details: any, college: any, image: any) {
    if (image.files && image.files.length > 0 && title && price && details && college) {
      this.imageFile = image.files[0];
      const formData = new FormData();
      formData.append('image', image.files[0]);
      formData.append('title', title);
      formData.append('price', price);
      formData.append('details', details);
      formData.append('college', college);
      (document.getElementById("error-message") as HTMLElement).style.display = "none";

      this.dataservice.addNewProduct(formData).subscribe(
        () => {
          this.router.navigate(['/productadded']);
        },
        (err) => {
        }
      );
    }
    else{
      (document.getElementById("error-message") as HTMLElement).style.display = "block"; // show error message
    }
  }
}

