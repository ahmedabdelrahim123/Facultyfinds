import { Component} from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { DataService } from 'src/app/Services/data.service';
import { CartService } from 'src/app/Services/cart.service';
import {NgForm} from '@angular/forms';
import { HttpClient,HttpHeaders } from '@angular/common/http';

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
  image_name='assets';
  errormessage='';
  emailerrormessage='';
  usernameerrormessage='';
  fieldsRequired='';
  // image = 'assets/products/avatar.png';

  // selectedFile: File;
  imagePath: string='';
  constructor(
    private cartService : CartService,
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
  AddUser(username:any, email:any, password:any, genderRadio:any){
    // this.image_name=image.files[0].name;
    const gender = (genderRadio.value === 'male') ? 'male' : 'female';
    let newUser = {username, email, password, gender, type: this.type, image: this.image_name, orders: this.orders};
    this.myService.addNewUser(newUser).subscribe(() =>{
      this.modalService.dismissAll();
      this.router.navigate(['/']);
    },(err)=>{
      this.errormessage = err.error;
      if (this.errormessage.includes("Email already taken")) {
        this.emailerrormessage = err.error;
      }
      else{
        this.emailerrormessage='';
      }
      if (this.errormessage.includes("Username already taken")) {
        this.usernameerrormessage = err.error;
      }
      else{
        this.usernameerrormessage='';
      }
      if (this.errormessage.includes('is not allowed to be empty')) {
        this.fieldsRequired= "there are fields required still empty";
      }
      else{
        this.fieldsRequired="";
      }
    });
  }

  ////////////////for upload image in register

  //////////////for login
  loginUser(email: any, password: any) {
    let user = {
      email,
      password,
    };

    this.myService.loginUser(user).subscribe({
      next: (res: any) => {
        console.log(res);
        this.modalService.dismissAll();
        this.router.navigate(['/']);
        // perform any actions with the response here
      },
      error: (error: any) => {
        console.log(error);
        // handle any errors here
      },
    });
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

  isAuthenticated() {
    return false;
  }
  logout() {}

   ngOnInit(): void {
    this.cartService.getProducts()
    .subscribe(res=>{
      this.totalItem = res.length;
    })
  }
}
