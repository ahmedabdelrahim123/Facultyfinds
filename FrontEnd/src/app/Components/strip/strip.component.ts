import { Component } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
@Component({
  selector: 'app-strip',
  templateUrl: './strip.component.html',
  styleUrls: ['./strip.component.css']
})
export class StripComponent {
  totalPrice: any;
  async handlePayment() {
    const stripe: any  = await loadStripe('YOUR_PUBLISHABLE_KEY');

    // Create a Stripe session or payment intent on your server
    const response = await fetch('/create-stripe-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ totalAmount: this.totalPrice }),
    });

    const session = await response.json();

    // Redirect the user to the Stripe Checkout page
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      // Handle error
    } else {
      // Payment success
    }
  }


}
