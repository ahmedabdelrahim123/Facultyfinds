const stripe = require("stripe")(
  "sk_test_51N9oXiBdZrRVeTEh9NtjlOnxC82MXrwgTkUy9xK0GAf1e5KWjA8R9Mc96OqB9KpvGDWDhWfg1uneD9VXbShBlUIx00T8Sbf4l6"
);

const createCheckoutSession = async (req, res) => {
  try {
    const { token } = req.body;

    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Product Name",
              // Additional product details
            },
            unit_amount: 1000,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://example.com/success",
      cancel_url: "http://example.com/cancel",
      customer: customer.id,
    });

    // Return the session ID to the client
    res.json({ data: "success", sessionId: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
};

module.exports = {
  createCheckoutSession,
};
