import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { paymentAPI } from "../utlis/api";

const loadRazorpayScript = () =>
  new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

function Payment() {
  const navigate = useNavigate();
  const [isPaying, setIsPaying] = useState(false);
  const [error, setError] = useState("");

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const saveOrder = (paymentResponse) => {
    const oldOrders = JSON.parse(localStorage.getItem("orders")) || [];

    const newOrder = {
      id: paymentResponse.razorpay_order_id,
      items: cart,
      totalAmount: totalPrice,
      status: "Paid",
      paymentMethod: "Razorpay",
      paymentId: paymentResponse.razorpay_payment_id,
      date: new Date().toLocaleString(),
    };

    localStorage.setItem("orders", JSON.stringify([...oldOrders, newOrder]));
    localStorage.removeItem("cart");
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const startPayment = async () => {
    setError("");

    if (cart.length === 0) {
      alert("Cart empty hai");
      navigate("/products");
      return;
    }

    setIsPaying(true);

    try {
      const scriptLoaded = await loadRazorpayScript();

      if (!scriptLoaded) {
        setError("Razorpay checkout could not load. Check your internet connection and try again.");
        setIsPaying(false);
        return;
      }

      const [keyResponse, orderResponse] = await Promise.all([
        paymentAPI.getKey(),
        paymentAPI.createOrder(totalPrice),
      ]);

      const key = keyResponse.data.key;
      const order = orderResponse.data.order;

      if (!key || !order?.id || !order?.amount || !order?.currency) {
        throw new Error("Razorpay order response is incomplete.");
      }

      const options = {
        key,
        amount: order.amount,
        currency: order.currency,
        name: "Styloria",
        description: "Order payment",
        order_id: order.id,
        handler: async (response) => {
          try {
            const verifyResponse = await paymentAPI.verifyPayment(response);

            if (verifyResponse.data.success) {
              saveOrder(response);
              alert("Payment successful! Order placed.");
              navigate("/myorder");
            } else {
              setError(verifyResponse.data.message || "Payment verification failed.");
            }
          } catch (error) {
            setError(
              error.response?.data?.message ||
                "Payment verification failed. Please contact support."
            );
          } finally {
            setIsPaying(false);
          }
        },
        prefill: {
          name: user.name || "",
          email: user.email || "",
        },
        theme: {
          color: "#16a34a",
        },
        modal: {
          ondismiss: () => setIsPaying(false),
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.on("payment.failed", (response) => {
        setError(response?.error?.description || "Payment failed. Please try again.");
        setIsPaying(false);
      });
      razorpay.open();
    } catch (error) {
      setError(
        error.response?.data?.message ||
          error.message ||
          "Payment start nahi ho paya."
      );
      setIsPaying(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 md:px-6 py-8 md:py-10">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6 md:gap-8">
        <div className="bg-white rounded-2xl shadow p-6 md:p-8 flex flex-col justify-center">
          <h1 className="text-2xl md:text-3xl font-bold mb-4">
            Razorpay Payment
          </h1>

          <p className="text-gray-500 mb-6 text-sm md:text-base">
            Secure payment using UPI, card, netbanking, or wallet.
          </p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-5 text-sm">
              {error}
            </div>
          )}

          <div className="rounded-xl border border-green-100 bg-green-50 p-5 mb-6">
            <p className="text-sm text-gray-600">Amount to pay</p>
            <p className="text-3xl font-bold text-green-700 mt-1">
              Rs. {totalPrice}
            </p>
          </div>

          <button
            onClick={startPayment}
            disabled={isPaying || cart.length === 0}
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-sm md:text-base"
          >
            {isPaying ? "Opening Razorpay..." : "Pay Now"}
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-bold mb-5">Order Summary</h2>

          <div className="space-y-3 max-h-64 md:max-h-96 overflow-y-auto">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between border-b pb-3 text-sm md:text-base"
              >
                <div>
                  <p className="font-semibold line-clamp-2">{item.name}</p>
                  <p className="text-xs md:text-sm text-gray-500">
                    Qty: {item.quantity}
                  </p>
                </div>

                <p className="font-bold whitespace-nowrap ml-2">
                  Rs. {item.price * item.quantity}
                </p>
              </div>
            ))}
          </div>

          <div className="flex justify-between text-lg md:text-xl font-bold mt-6 pt-4 border-t">
            <span>Total</span>
            <span>Rs. {totalPrice}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
