import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const getCartItemKey = (item) => item.cartKey || item.id || item.name;

const getPriceAmount = (price) => {
  if (typeof price === "number") return price;
  const amount = Number(String(price).replace(/[^0-9.]/g, ""));
  return Number.isFinite(amount) ? amount : 0;
};

const formatPrice = (price) => `Rs. ${getPriceAmount(price)}`;

function Cart() {
  const [cart, setCart] = useState([]);
  const [activeTab, setActiveTab] = useState("cart");
  const [orders, setOrders] = useState([]);

  const loadCart = () => {
    setCart(JSON.parse(localStorage.getItem("cart")) || []);
    setOrders(JSON.parse(localStorage.getItem("orders")) || []);
  };

  useEffect(() => {
    loadCart();
  }, []);

  const updateCart = (updatedCart) => {
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const increaseQty = (id) => {
    updateCart(
      cart.map((item) =>
        getCartItemKey(item) === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQty = (id) => {
    updateCart(
      cart
        .map((item) =>
          getCartItemKey(item) === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id) => {
    updateCart(cart.filter((item) => getCartItemKey(item) !== id));
  };

  const clearCart = () => {
    updateCart([]);
  };

  const totalPrice = cart.reduce(
    (total, item) => total + getPriceAmount(item.price) * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-100 px-4 sm:px-6 py-8 md:py-10">
      <div className="max-w-7xl mx-auto">

        <div className="flex gap-3 sm:gap-4 mb-8 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveTab("cart")}
            className={`shrink-0 px-5 sm:px-6 py-3 rounded-lg font-semibold ${
              activeTab === "cart"
                ? "bg-black text-white"
                : "bg-white text-black shadow"
            }`}
          >
            My Cart
          </button>

          <button
            onClick={() => {
              setActiveTab("orders");
              loadCart();
            }}
            className={`shrink-0 px-5 sm:px-6 py-3 rounded-lg font-semibold ${
              activeTab === "orders"
                ? "bg-black text-white"
                : "bg-white text-black shadow"
            }`}
          >
            My Orders
          </button>
        </div>

        {activeTab === "cart" && (
          <>
            <h1 className="text-3xl md:text-4xl font-bold mb-8">
              My Cart
            </h1>

            {cart.length === 0 ? (
              <div className="bg-white p-10 rounded-2xl shadow text-center">
                <h2 className="text-2xl font-semibold mb-3">
                  Your cart is empty
                </h2>

                <p className="text-gray-500 mb-6">
                  Add some products to your cart.
                </p>

                <Link
                  to="/products"
                  className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800"
                >
                  Shop Now
                </Link>
              </div>
            ) : (
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-5">
                  {cart.map((item) => (
                    <div
                      key={getCartItemKey(item)}
                      className="bg-white rounded-2xl shadow p-4 flex flex-col sm:flex-row gap-4 md:gap-5"
                    >
                      <img
                        src={item.img}
                        alt={item.name}
                        className="w-full sm:w-36 md:w-40 h-48 sm:h-40 object-cover rounded-xl"
                      />

                      <div className="flex-1">
                        <h2 className="text-xl font-bold">{item.name}</h2>

                        <p className="text-gray-500 mt-1">
                          {item.category} • {item.brand}
                        </p>

                        {(item.selectedSize || item.selectedColor) && (
                          <p className="mt-1 text-sm text-gray-500">
                            {item.selectedSize && `Size: ${item.selectedSize}`}
                            {item.selectedSize && item.selectedColor && " | "}
                            {item.selectedColor && `Color: ${item.selectedColor}`}
                          </p>
                        )}

                        <p className="text-indigo-600 font-bold mt-2">
                          {formatPrice(item.price)}
                        </p>

                        <div className="flex items-center gap-3 mt-4">
                          <button
                            onClick={() => decreaseQty(getCartItemKey(item))}
                            className="w-9 h-9 bg-gray-200 rounded-full text-xl"
                          >
                            -
                          </button>

                          <span className="font-semibold">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() => increaseQty(getCartItemKey(item))}
                            className="w-9 h-9 bg-gray-200 rounded-full text-xl"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="flex sm:flex-col justify-between items-end gap-4">
                        <p className="font-bold text-lg">
                          {formatPrice(getPriceAmount(item.price) * item.quantity)}
                        </p>

                        <button
                          onClick={() => removeItem(getCartItemKey(item))}
                          className="text-red-500 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-white rounded-2xl shadow p-6 h-fit">
                  <h2 className="text-2xl font-bold mb-5">
                    Order Summary
                  </h2>

                  <div className="flex justify-between mb-3">
                    <span>Total Items</span>
                    <span>
                      {cart.reduce((sum, item) => sum + item.quantity, 0)}
                    </span>
                  </div>

                  <div className="flex justify-between mb-3">
                    <span>Subtotal</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>

                  <div className="flex justify-between mb-3">
                    <span>Delivery</span>
                    <span className="text-green-600">Free</span>
                  </div>

                  <hr className="my-4" />

                  <div className="flex justify-between text-xl font-bold mb-6">
                    <span>Total</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>

                  <Link
                    to="/payment"
                    className="block text-center w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
                  >
                    Checkout
                  </Link>

                  <button
                    onClick={clearCart}
                    className="mt-3 w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {activeTab === "orders" && (
          <>
            <h1 className="text-3xl md:text-4xl font-bold mb-8">
              My Orders
            </h1>

            {orders.length === 0 ? (
              <div className="bg-white p-10 rounded-2xl shadow text-center">
                <h2 className="text-2xl font-semibold mb-3">
                  No orders found
                </h2>

                <p className="text-gray-500 mb-6">
                  Payment complete karne ke baad order yahan show hoga.
                </p>

                <Link
                  to="/products"
                  className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800"
                >
                  Shop Now
                </Link>
              </div>
            ) : (
              <div className="space-y-5">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-white rounded-2xl shadow p-6"
                  >
                    <div className="flex flex-col md:flex-row justify-between gap-4 mb-5">
                      <div>
                        <h2 className="text-xl font-bold">
                          Order ID: {order.id}
                        </h2>
                        <p className="text-gray-500 text-sm">
                          Date: {order.date}
                        </p>
                        <p className="text-gray-500 text-sm">
                          Payment: {order.paymentMethod}
                        </p>
                      </div>

                      <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full h-fit font-semibold">
                        {order.status}
                      </span>
                    </div>

                    <div className="space-y-4">
                      {order.items.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-3 sm:gap-4 border-b pb-4"
                        >
                          <img
                            src={item.img}
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded-xl"
                          />

                          <div className="flex-1">
                            <h3 className="font-semibold">{item.name}</h3>
                            <p className="text-sm text-gray-500">
                              {item.category} • {item.brand}
                            </p>
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

                    <div className="flex flex-col xs:flex-row xs:justify-between gap-2 text-lg sm:text-xl font-bold mt-5">
                      <span>Total Amount</span>
                      <span>₹{order.totalAmount}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
}

export default Cart;
