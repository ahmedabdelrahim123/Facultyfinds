import { Component } from '@angular/core';
import {
  NgbModal,
  ModalDismissReasons,
  NgbDropdown,
  NgbModule,
} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { DataService } from 'src/app/Services/data.service';
import { CartService } from 'src/app/Services/cart.service';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import jwt_decode from 'jwt-decode';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  title = 'appBootstrap';
  closeResult: string = '';
  panel1: boolean = true; // add boolean flag for Panel 1
  panel2: boolean = false; // add boolean flag for Panel 2
  activePanel = 'panel1';
  public showModal = false;
  type = 'user';
  orders = [];
  errormessage = '';
  emailerrormessage = '';
  usernameerrormessage = '';
  fieldsRequired = '';
  loginerror = '';
  username = '';
  repassworderror = '';
  imageFile = '';

  imagePath: string = '';
  constructor(
    private cartService: CartService,
    private modalService: NgbModal,
    private myService: DataService,
    private router: Router,
    private http: HttpClient
  ) {
    this.type = 'user';
    this.orders = [];
    this.panel1 = true;
    this.panel2 = false;
  }

  //////for register user
  AddUser(
    username: any,
    email: any,
    password: any,
    repassword: any,
    image: any,
    gender: any
  ) {
    if (image.files && image.files.length > 0) {
      this.imageFile = image.files[0];
      const formData = new FormData();
      formData.append('image', image.files[0]);
      formData.append('username', username);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('gender', gender);
      formData.append('type', this.type);
      formData.append('orders', JSON.stringify(this.orders));
      console.log(formData.get('image'));

      if (password !== repassword) {
        this.repassworderror = "your password doesn't match the previous one";
        return;
      } else {
        this.repassworderror = '';
      }
      this.myService.addNewUser(formData).subscribe(
        () => {
          this.modalService.dismissAll();
          this.router.navigate(['/']);
        },
        (err) => {
          this.errormessage = err.error;
          if (this.errormessage.includes('Email already taken')) {
            this.emailerrormessage = err.error;
          } else {
            this.emailerrormessage = '';
          }
          if (this.errormessage.includes('Username already taken')) {
            this.usernameerrormessage = err.error;
          } else {
            this.usernameerrormessage = '';
          }
          if (this.errormessage.includes('is not allowed to be empty')) {
            this.fieldsRequired = 'there are fields required still empty';
          } else {
            this.fieldsRequired = '';
          }
        }
      );
    }
  }
  //////////////for login
  isAuthenticated() {
    const token = localStorage.getItem('token');
    if (token) {
      // user is logged in
      return true;
    } else {
      // user is not logged in
      return false;
    }
  }
  loginUser(email: any, password: any) {
    let user = { email, password };
    this.myService.loginUser(user).subscribe(
      (response: { [key: string]: any }) => {
        this.username = response['user']['username'];
        localStorage.setItem('token', response['token']);
        const decodedToken: any = jwt_decode(response['token']);
        const userId = decodedToken.userId;
        const userType = decodedToken.userType;
        console.log('User ID:', userId);
        console.log('User Type:', userType);
        // localStorage.setItem('username', response['user']['username']);
        this.modalService.dismissAll();
        this.router.navigate(['/']);

        // console.log(response['user']['username']);
        // console.log(response['token']);
        // const token = response['headers'].get("x-auth-token");
        // console.log(token);
      },
      (err) => {
        console.log(err);
        this.loginerror = err.error;
      }
    );
  }

  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  // add function to show Panel 1
  showPanel1() {
    this.panel1 = true;
    this.panel2 = false;
    this.activePanel = 'panel1';
  }

  // add function to show Panel 2
  showPanel2() {
    this.panel1 = false;
    this.panel2 = true;
    this.activePanel = 'panel2';
  }

  public totalItem: number = 0;

  logout() {
    localStorage.setItem('token', '');
  }

  ngOnInit(): void {
    this.cartService.getProducts().subscribe((res) => {
      this.totalItem = res.length;
    });
  }
}
