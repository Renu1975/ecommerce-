import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { Heart, ShoppingCart, Star } from "lucide-react";
import {
  fetchClothingProducts,
  getFallbackProducts,
} from "../data/clothingProducts";
import { useWishlist } from "../context/WishlistContext";

const defaultSizes = ["S", "M", "L", "XL"];
const defaultColors = ["Black", "White", "Yellow"];

const colorClass = {
  Black: "bg-black",
  White: "bg-white",
  Yellow: "bg-yellow-400",
  Navy: "bg-blue-900",
  Gray: "bg-gray-400",
  Red: "bg-red-500",
  Pink: "bg-pink-400",
  Blue: "bg-blue-500",
  Cream: "bg-yellow-100",
  Green: "bg-green-600",
  Brown: "bg-amber-800",
};

function ProductDetail() {
  const { id } = useParams();
  const location = useLocation();
  const { wishlist, toggleWishlist } = useWishlist();

  const [product, setProduct] = useState(location.state?.product || null);
  const [loading, setLoading] = useState(!location.state?.product);
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [popup, setPopup] = useState("");

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes?.[1] || product.sizes?.[0] || "M");
      setSelectedColor(product.colors?.[0] || defaultColors[0]);
      setSelectedImage(product.images?.[0] || product.img);
      return;
    }

    const loadProduct = async () => {
      try {
        const products = await fetchClothingProducts();
        const productList = products.length ? products : getFallbackProducts();
        setProduct(
          productList.find((item) => String(item.id) === String(id)) || null
        );
      } catch (error) {
        setProduct(
          getFallbackProducts().find((item) => String(item.id) === String(id)) ||
            null
        );
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id, product]);

  const showPopup = (message) => {
    setPopup(message);
    setTimeout(() => setPopup(""), 1800);
  };

  const addToCart = () => {
    if (!product || product.stock === 0) return;

    const cartKey = `${product.id}-${selectedSize}-${selectedColor}`;
    const cartProduct = {
      ...product,
      cartKey,
      selectedSize,
      selectedColor,
    };
    const oldCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = oldCart.find((item) => (item.cartKey || item.id) === cartKey);

    const updatedCart = existing
      ? oldCart.map((item) =>
          (item.cartKey || item.id) === cartKey
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      : [...oldCart, { ...cartProduct, quantity: 1 }];

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
    showPopup("Product added to cart");
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 py-16 text-center text-gray-500">
        Loading product...
      </main>
    );
  }

  if (!product) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-gray-900">Product not found</h1>
        <Link
          to="/products"
          className="mt-6 inline-flex rounded-lg bg-black px-5 py-3 font-semibold text-white"
        >
          Back to Products
        </Link>
      </main>
    );
  }

  const sizes = product.sizes || defaultSizes;
  const colors = product.colors || defaultColors;
  const productImages =
    product.images && product.images.length ? product.images : [product.img];
  const isWishlisted = wishlist.some(
    (item) => (item.id || item._id) === product.id
  );
  const inStock = product.stock > 0;

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 md:py-16">
      {popup && (
        <div className="fixed right-5 top-24 z-50 rounded-xl bg-black px-6 py-3 text-white shadow-xl">
          {popup}
        </div>
      )}

      <section className="mx-auto grid max-w-7xl gap-6 md:gap-8 rounded-2xl bg-white p-4 shadow-sm md:grid-cols-2 md:p-8">
        <div>
          <div className="overflow-hidden rounded-2xl bg-gray-100">
            <img
              src={selectedImage || product.img}
              alt={product.name}
              className="h-[320px] w-full object-cover sm:h-[420px] md:h-[560px]"
            />
          </div>

          {productImages.length > 1 && (
            <div className="mt-4 grid grid-cols-4 gap-2 sm:gap-3">
              {productImages.slice(0, 4).map((image) => (
                <button
                  key={image}
                  onClick={() => setSelectedImage(image)}
                  className={`overflow-hidden rounded-xl border-2 bg-gray-100 transition ${
                    (selectedImage || product.img) === image
                      ? "border-black"
                      : "border-transparent hover:border-gray-400"
                  }`}
                >
                  <img
                    src={image}
                    alt={product.name}
                    className="h-20 w-full object-cover md:h-24"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col justify-center">
          <div className="flex items-start justify-between gap-3 sm:gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-yellow-700">
                {product.category} - {product.brand}
              </p>
              <h1 className="mt-3 text-3xl font-bold text-gray-950 sm:text-4xl md:text-5xl">
                {product.name}
              </h1>
            </div>

            <button
              onClick={() => toggleWishlist(product)}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gray-100 shadow-sm transition hover:scale-105"
              aria-label="Toggle wishlist"
            >
              <Heart
                size={22}
                className={
                  isWishlisted ? "fill-red-500 text-red-500" : "text-gray-600"
                }
              />
            </button>
          </div>

          <p className="mt-5 text-gray-600 leading-7">
            {product.description ||
              "A stylish wardrobe essential designed for comfort, confidence, and everyday wear."}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <p className="text-3xl font-bold text-indigo-600">
              Rs. {product.price}
            </p>
            <span className="flex items-center gap-1 rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold text-yellow-800">
              <Star size={16} className="fill-yellow-500 text-yellow-500" />
              {product.rating || 4.5}
            </span>
            <span
              className={`rounded-full px-3 py-1 text-sm font-semibold ${
                inStock
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {inStock ? `In Stock (${product.stock})` : "Out of Stock"}
            </span>
          </div>

          <div className="mt-8">
            <h2 className="font-semibold text-gray-950">Select Size</h2>
            <div className="mt-3 flex flex-wrap gap-3">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`h-11 w-14 rounded-lg border font-semibold transition ${
                    selectedSize === size
                      ? "border-black bg-black text-white"
                      : "border-gray-300 bg-white text-gray-800 hover:border-black"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <h2 className="font-semibold text-gray-950">Select Color</h2>
            <div className="mt-3 flex flex-wrap gap-3">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition ${
                    selectedColor === color
                      ? "border-black bg-gray-100"
                      : "border-gray-300 bg-white hover:border-black"
                  }`}
                >
                  <span
                    className={`h-5 w-5 rounded-full border border-gray-300 ${
                      colorClass[color] || "bg-gray-300"
                    }`}
                  />
                  {color}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={addToCart}
            disabled={!inStock}
            className="mt-9 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-black px-6 py-4 font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-400 md:w-fit"
          >
            <ShoppingCart size={20} />
            Add to Cart
          </button>
        </div>
      </section>
    </main>
  );
}

export default ProductDetail;
