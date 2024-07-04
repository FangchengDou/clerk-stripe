"use client";

import { useState } from "react";

type LineItem = {
  price: string;
  quantity: number;
};

type CheckoutButtonProps = {
  lineItems: LineItem[];
};

const CheckoutButton: React.FC<CheckoutButtonProps> = ({ lineItems }) => {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ lineItems }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Failed to create Stripe session:", errorData.error);
        setLoading(false);
        return;
      }

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error("Failed to create Stripe session:", data.error);
      }
    } catch (error) {
      console.error("Error creating Stripe session:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleCheckout} disabled={loading}>
      {loading ? "Processing..." : "Checkout"}
    </button>
  );
};

export default CheckoutButton;
