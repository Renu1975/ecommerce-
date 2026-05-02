import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";

function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const [popup, setPopup] = useState("");

  const addToCart = (product) => {
    const oldCart = JSON.parse(localStorage.getItem("cart")) || [];
    const id = product.id || product._id;

    const existing = oldCart.find((item) => (item.id || item._id) === id);

    const updatedCart = existing
      ? oldCart.map((item) =>
          (item.id || item._id) === id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        )
      : [...oldCart, { ...product, quantity: 1 }];

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));

    setPopup("Added to cart successfully ✅");
    setTimeout(() => setPopup(""), 1800);
  };

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white max-w-md w-full text-center p-6 md:p-10 rounded-2xl shadow">
          <div className="text-6xl md:text-7xl mb-5">❤️</div>

          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
            Your Wishlist is Empty
          </h2>

          <p className="text-gray-500 mb-8 text-sm md:text-base">
            Save your favorite fashion items here.
          </p>

          <Link
            to="/products"
            className="inline-block bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition text-sm md:text-base"
          >
            Explore Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen px-4 md:px-6 py-8 md:py-10">
      {popup && (
        <div className="fixed top-24 right-4 md:right-6 z-50 bg-black text-white px-4 md:px-5 py-2 md:py-3 rounded-xl shadow-lg text-sm md:text-base">
          {popup}
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-4 mb-6 md:mb-8">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-800">
            My Wishlist
            <span className="text-pink-500 text-lg md:text-2xl ml-2">
              ({wishlist.length})
            </span>
          </h1>

          <Link
            to="/products"
            className="text-center bg-black text-white px-4 md:px-5 py-2 md:py-2 rounded-lg hover:bg-gray-800 text-sm md:text-base"
          >
            Continue Shopping
          </Link>
        </div>

        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {wishlist.map((product) => {
            const id = product.id || product._id;

            return (
              <div
                key={id}
                className="bg-white rounded-2xl shadow hover:shadow-xl transition overflow-hidden"
              >
                <img
                  src={product.img || product.image}
                  alt={product.name}
                  className="h-52 xs:h-56 md:h-64 w-full object-cover"
                />

                <div className="p-4">
                  <h3 className="font-semibold text-lg text-gray-800">
                    {product.name}
                  </h3>

                  <p className="text-gray-500 text-sm mt-1">
                    {product.category}
                  </p>

                  <p className="text-indigo-600 font-bold mt-2">
                    ₹{product.price}
                  </p>

                  <div className="flex flex-col xs:flex-row gap-2 mt-4">
                    <button
                      onClick={() => addToCart(product)}
                      className="flex-1 bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
                    >
                      Add to Cart
                    </button>

                    <button
                      onClick={() => removeFromWishlist(id)}
                      className="flex-1 border border-red-500 text-red-500 py-2 rounded-lg hover:bg-red-500 hover:text-white transition"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Wishlist;
