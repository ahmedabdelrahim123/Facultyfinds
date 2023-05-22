import { Component } from '@angular/core';
import { DataService } from 'src/app/Services/data.service';
@Component({
  selector: 'app-strip',
  templateUrl: './strip.component.html',
  styleUrls: ['./strip.component.css'],
})
export class StripComponent{

  paymentHandler: any = null;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.invokeStripe();
  }

  makePayment(amount: number) {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51N9oXiBdZrRVeTEh7Cws3ejgvEa5a1zidnFHlazWgx8uYgVd1OGIMEBgJessl4PYwBPz7DAz4QXMTAfzFtLpfw5100PV58wbjE',
      locale: 'auto',
      token: function (stripeToken: any) {
        console.log(stripeToken);
        paymentStripe(stripeToken);
      },
    });

    const paymentStripe = (stripeToken: any) => {
      this.dataService.makePayment(stripeToken).subscribe((data: any) => {
        console.log(data);
      });
    };

    paymentHandler.open({
      name: 'E-commerce',
      description:
        'A website that allows you to buy used universities products',
      amount: amount * 100,
    });
  }

  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51NAZ0oLFO565T4TGVH51OiT5LT6Ek8OU3n4a2BZS9ImnzOnlnrBo9FC1OocVxi9YQ9a1c9uFu2z8lRO9EGSudMM6006vnhkdSa',
          locale: 'auto',
          token: function (stripeToken: any) {
            console.log(stripeToken);
          },
        });
      };
      window.document.body.appendChild(script);
    }
  }
}
