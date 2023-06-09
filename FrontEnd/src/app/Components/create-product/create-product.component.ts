import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/Services/data.service';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css'],
})
export class CreateProductComponent implements OnInit {
  imageFile = '';
  user: any;
  userId: any;

  constructor(private dataservice: DataService, private router: Router) {}
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwt_decode(token);
      this.userId = decodedToken.userId;
    }
  }

  AddProduct(
    title: any,
    price: any,
    quantity: any,
    details: any,
    college: any,
    image: any
  ) {
    if (image.files && image.files.length > 0 && title && price && details && college && quantity) {
      this.imageFile = image.files[0];
      const formData = new FormData();
      formData.append('image', image.files[0]);
      formData.append('title', title);
      formData.append('price', price);
      formData.append('details', details);
      formData.append('college', college);
      formData.append('statue', "available");
      formData.append('userID', this.userId);
      formData.append('quantity', quantity);
      (document.getElementById("error-message") as HTMLElement).style.display = "none";
      console.log(formData);

      this.dataservice.addNewProduct(formData).subscribe(
        () => {
          setTimeout(() => {
            this.router.navigate(['/productadded']);
          }, 1000); 
        },
        (err) => {}
      );

    }
    else{
      (document.getElementById("error-message") as HTMLElement).style.display = "block"; // show error message
    }
  }
}

