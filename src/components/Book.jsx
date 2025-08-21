import React from "react";
import { loadStripe } from "@stripe/stripe-js";

// Load Stripe outside the component to avoid recreating it on every render
const stripePromise = loadStripe("pk_test_YOUR_PUBLISHABLE_KEY_HERE");
const BASE_URL = import.meta.env.VITE_BASE_URL;

const Payment = () => {
  const handleCheckout = async () => {
    const stripe = await stripePromise;
    const response = await fetch(`${BASE_URL}/api/bookings/create-checkout-session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: [{ id: 1, name: "Sample Product", price: 1000 }], // $10.00 in cents
      }),
    });
    const { clientSecret } = await response.json();

    await stripe.redirectToCheckout({
      clientSecret,
      successUrl: `${window.location.origin}/success`,
      cancelUrl: `${window.location.origin}/cancel`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Checkout</h2>
        <p className="text-gray-600 mb-6">Price: $10.00</p>
        <button
          onClick={handleCheckout}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default Payment;