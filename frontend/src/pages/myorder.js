import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(savedOrders);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 px-4 sm:px-6 py-8 md:py-10">
      <div className="max-w-7xl mx-auto">

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-3xl md:text-4xl font-bold">
            My Orders
          </h1>
          <Link
            to="/track-order"
            className="w-fit rounded-lg bg-black px-5 py-3 font-semibold text-white"
          >
            Track Order
          </Link>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white p-6 sm:p-10 rounded-2xl shadow text-center">
            <h2 className="text-xl sm:text-2xl font-semibold mb-3">
              No orders found
            </h2>

            <p className="text-gray-500 mb-6">
              Aapne abhi tak koi order nahi kiya
            </p>

            <Link
              to="/products"
              className="bg-black text-white px-6 py-3 rounded-lg"
            >
              Shop Now
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-2xl shadow p-4 sm:p-6"
              >
                {/* Order Info */}
                <div className="flex flex-col sm:flex-row sm:justify-between gap-3 mb-4">
                  <div>
                    <h2 className="font-bold text-base sm:text-lg break-all">
                      Order ID: {order.id}
                    </h2>

                    <p className="text-sm text-gray-500">
                      Date: {order.date}
                    </p>
                  </div>

                  <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full w-fit">
                    {order.status}
                  </span>
                </div>

                <Link
                  to={`/track-order?id=${encodeURIComponent(order.id)}`}
                  className="mb-4 inline-flex rounded-lg bg-yellow-500 px-4 py-2 text-sm font-semibold text-black transition hover:bg-yellow-400"
                >
                  Track this order
                </Link>

                {/* Products */}
                <div className="space-y-3">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex justify-between gap-4">
                      <div>
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-gray-500">
                          Qty: {item.quantity}
                        </p>
                      </div>

                      <p className="font-bold whitespace-nowrap">
                        ₹{item.price * item.quantity}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Total */}
                <div className="flex flex-col xs:flex-row xs:justify-between gap-2 mt-4 font-bold text-lg">
                  <span>Total</span>
                  <span>₹{order.totalAmount}</span>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default MyOrders;
