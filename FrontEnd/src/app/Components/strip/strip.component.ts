// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-strip',
//   templateUrl: './strip.component.html',
//   styleUrls: ['./strip.component.css'],
// })
// export class StripComponent {

//   invokeStripe() {
//     if (!window.document.getElementById('stripe-script')) {
//       const script = window.document.createElement('script');
//       script.id = 'stripe-script';
//       script.type = 'text/javascript';
//       script.src = 'https://checkout.stripe.com/checkout.js';
//       script.onload = () => {
//         this.paymentHandler = (<any>window).StripeCheckout.configure({
//           key: 'pk_test_51N9oXiBdZrRVeTEh7Cws3ejgvEa5a1zidnFHlazWgx8uYgVd1OGIMEBgJessl4PYwBPz7DAz4QXMTAfzFtLpfw5100PV58wbjE',
//           locale: 'auto',
//           token: function (stripeToken: any) {
//             console.log(stripeToken);
//           },
//         });
//       };
//       window.document.body.appendChild(script);
//     }
//   }
// }
