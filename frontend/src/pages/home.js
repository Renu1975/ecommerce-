import React, { useState } from "react";
import { Link,useNavigate} from "react-router-dom";
import { Heart } from "lucide-react";
import { useWishlist } from "../context/WishlistContext";

function Home() {
  const [email, setEmail] = useState("");
  const [subscribeMsg, setSubscribeMsg] = useState("");
  const { wishlist, toggleWishlist } = useWishlist();
  const navigate = useNavigate(); 
  const categories = [
    { name: "Men", image: "https://images.unsplash.com/photo-1520975916090-3105956dac38" },
    { name: "Women", image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d" },
    { name: "Kids", image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9" }
  ];

  const products = [
    {
      id: "featured-denim-jacket",
      name: "Denim Jacket",
      price: 2499,
      category: "Men",
      brand: "StyLoria",
      description:
        "A durable denim layer with a clean fit, soft lining, and everyday styling for casual outfits.",
      rating: 4.7,
      stock: 14,
      sizes: ["S", "M", "L", "XL"],
      colors: ["Blue", "Black", "Gray"],
      img: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRnNtmRC5b2KQtBsalPszCVbHa-JkY9iE2hqmjzUtRanEzcnRVZojJ_cGtvsn_QrJ0BrIoQx06cECOowWOtevl0SxYc-6Ed",
      images: [
        "https://images.unsplash.com/photo-1523381210434-271e8be1f52b",
        "https://images.unsplash.com/photo-1543076447-215ad9ba6923",
        "https://images.unsplash.com/photo-1516257984-b1b4d707412e",
      ],
    },
    {
      id: "featured-casual-shirt",
      name: "Casual t-Shirt",
      price: 999,
      category: "Men",
      brand: "StyLoria",
      description:
        "A breathable casual shirt made for easy comfort, polished looks, and all-day movement.",
      rating: 4.5,
      stock: 18,
      sizes: ["S", "M", "L", "XL"],
      colors: ["White", "Blue", "Black"],
      img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
      images: [
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
        "https://images.unsplash.com/photo-1603252109303-2751441dd157",
        "https://images.unsplash.com/photo-1598032895397-b9472444bf93",
      ],
    },
    {
      id: "featured-stylish-hoodie",
      name: "Stylish jacket",
      price: 1799,
      category: "Women",
      brand: "StyLoria",
      description:
        "A soft hoodie with a relaxed silhouette, warm fabric, and street-ready everyday comfort.",
      rating: 4.6,
      stock: 11,
      sizes: ["S", "M", "L", "XL"],
      colors: ["Gray", "Black", "Pink"],
      img: "https://images.unsplash.com/photo-1548883354-94bcfe321cbb",
      images: [
        "https://images.unsplash.com/photo-1548883354-94bcfe321cbb",
        "https://images.unsplash.com/photo-1556821840-3a63f95609a7",
        "https://images.unsplash.com/photo-1578587018452-892bacefd3f2",
      ],
    },
    {
      id: "featured-summer-dress",
      name: "Summer Dress",
      price: 1999,
      category: "Women",
      brand: "StyLoria",
      description:
        "A lightweight summer dress with a graceful drape, fresh color choices, and easy styling.",
      rating: 4.8,
      stock: 9,
      sizes: ["S", "M", "L", "XL"],
      colors: ["Pink", "Cream", "Yellow"],
      img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d",
      images: [
        "https://images.unsplash.com/photo-1490481651871-ab68de25d43d",
        "https://images.unsplash.com/photo-1539008835657-9e8e9680c956",
        "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b",
      ],
    },
  ];
   const handleSubscribe = () => {
  if (!email) {
    setSubscribeMsg("Please enter your email");
    return;
  }

  const subscribers = JSON.parse(localStorage.getItem("subscribers")) || [];
  localStorage.setItem("subscribers", JSON.stringify([...subscribers, email]));

  setSubscribeMsg("Subscribed successfully ✅");
  setEmail("");

  setTimeout(() => setSubscribeMsg(""), 2000);
};
const [discountEmail, setDiscountEmail] = useState("");
const [discountMsg, setDiscountMsg] = useState("");

const handleDiscount = () => {
  if (!discountEmail) {
    setDiscountMsg("Please enter your email");
    return;
  }

  const users = JSON.parse(localStorage.getItem("discountUsers")) || [];
  localStorage.setItem(
    "discountUsers",
    JSON.stringify([...users, discountEmail])
  );

  setDiscountMsg("Coupon unlocked: STYLORIA20 🎁");
  setDiscountEmail("");

  setTimeout(() => setDiscountMsg(""), 3000);
};
  return (
    <div className="bg-gray-50">
      {/* HERO */}
      <section className="relative bg-gradient-to-r from-slate-800 via-slate-500 to-gray-400 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20 grid md:grid-cols-2 gap-8 md:gap-10 items-center min-h-[calc(100vh-72px)]">
          <div className="text-white">
            <span className="inline-block bg-yellow-500 text-black px-4 py-1 rounded-full text-sm font-semibold mb-5">
              New Collection 2026
            </span>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
              Discover Your <br />
              <span className="text-yellow-400">Perfect Style</span>
            </h1>

            <p className="mt-5 text-gray-300 text-base sm:text-lg max-w-md">
              Explore premium fashion clothing for men, women and kids.
              Stylish outfits with modern design and affordable prices.
            </p>

            <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 mt-8">
              <Link
                to="/products"
                className="text-center bg-yellow-500 text-black px-7 py-3 rounded-full font-semibold hover:bg-yellow-400 transition"
              >
                Shop Now
              </Link>

              <Link
                to="/about"
                className="text-center border border-white px-7 py-3 rounded-full font-semibold hover:bg-white hover:text-black transition"
              >
                Explore
              </Link>
            </div>
          </div>

          <div className="relative mt-4 md:mt-0">
            <div className="absolute inset-0 bg-yellow-500 rounded-full blur-3xl opacity-30"></div>

            <img
              src="https://images.unsplash.com/photo-1520975916090-3105956dac38"
              alt="Fashion Banner"
              className="relative w-full h-[320px] sm:h-[420px] md:h-[500px] object-cover rounded-3xl shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="bg-gradient-to-r from-gray-50 to-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              { icon: "🚚", title: "Free Delivery", desc: "On all orders above ₹999" },
              { icon: "💳", title: "Secure Payment", desc: "100% safe & encrypted checkout" },
              { icon: "↩️", title: "Easy Returns", desc: "7 days hassle-free returns" },
              { icon: "⭐", title: "Top Rated", desc: "Rated 4.8 by 10,000+ users" }
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-xl transition duration-300 border border-gray-100"
              >
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-semibold text-lg text-gray-800">{item.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14 md:py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Shop by Category</h2>
          <p className="text-gray-500 mt-2">Discover styles curated just for you</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
          {categories.map((cat, i) => (
            <div
              key={i}
              className="relative group rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition duration-500"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-64 sm:h-72 md:h-80 object-cover transform group-hover:scale-110 transition duration-700"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

              <div className="absolute bottom-0 p-6 text-white w-full">
                <h3 className="text-2xl font-bold">{cat.name}</h3>
                <p className="text-sm text-gray-200 mt-1">Explore latest trends</p>

                <Link
                  to="/products"
                  className="inline-block mt-4 bg-white text-black px-5 py-2 rounded-full text-sm font-semibold opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition duration-300"
                >
                  Shop Now →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUCTS */}

    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16 bg-white shadow sm:rounded-xl">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-10">
        Featured Products
      </h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
        {products.map((p) => {
          const productId = p.id || p.name;

          const isWishlisted = wishlist.some(
            (item) => (item.id || item.name) === productId
          );

          return (
            <div
              key={productId}
              className="relative group bg-white rounded-xl p-3 hover:shadow-xl transition"
            >
              <button
                onClick={() => toggleWishlist(p)}
                className="absolute top-4 right-4 z-10 bg-white p-2 rounded-full shadow hover:scale-110 transition"
              >
                <Heart
                  size={22}
                  className={`transition duration-300 ${
                    isWishlisted
                      ? "fill-red-500 text-red-500 scale-110"
                      : "text-gray-500 hover:text-red-400"
                  }`}
                />
              </button>

              <div className="overflow-hidden rounded-lg">
                <img
                  src={p.img}
                  alt={p.name}
                  className="h-56 sm:h-60 w-full object-cover rounded-lg group-hover:scale-110 transition duration-500"
                />
              </div>

              <h3 className="mt-3 font-semibold">{p.name}</h3>

              <p className="text-indigo-600 font-bold">
                Rs. {p.price}
              </p>

              <button
                onClick={() =>
                  navigate(`/products/${p.id}`, { state: { product: p } })
                }
                className="mt-3 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800"
              >
                Add to Cart
              </button>
            </div>
          );
        })}
      </div>
    </section>
      {/* OFFER */}
      <section className="relative mt-14 md:mt-20">
        <div className="absolute inset-0 bg-gradient-to-r from-[#111827] via-[#1F2937] to-[#374151] rounded-3xl blur-2xl opacity-40"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-5 sm:p-8 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-10 border border-white/20">
            <div className="text-white max-w-lg">
              <span className="bg-white text-black px-4 py-1 rounded-full text-sm font-medium">
                🔥 Limited Time Offer
              </span>

              <h2 className="text-3xl md:text-5xl font-bold mt-4 leading-tight">
                Get <span className="text-black">20% OFF</span> on Your First Order
              </h2>

              <p className="mt-4 text-gray-300">
                Upgrade your wardrobe with premium fashion collection.
                Stylish, modern and affordable outfits delivered to your door.
              </p>

              <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 mt-6">
                <Link
                  to="/products"
                  className="text-center bg-[#F59E0B] text-black px-6 py-3 rounded-full font-semibold hover:bg-orange-400 transition"
                >
                  Shop Now →
                </Link>

                <Link
                  to="/about"
                  className="text-center border border-white/30 text-white px-6 py-3 rounded-full hover:bg-white/10 transition"
                >
                  Explore
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 w-full md:w-[360px] shadow-xl">
              <h3 className="text-lg font-semibold text-gray-800">
                Unlock Your Discount 🎁
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                Enter email to receive coupon instantly
              </p>

             <div className="mt-4 flex flex-col xs:flex-row">
  <input
    type="email"
    value={discountEmail}
    onChange={(e) => setDiscountEmail(e.target.value)}
    placeholder="Enter your email"
    className="min-w-0 flex-1 px-4 py-2 border rounded-t-lg xs:rounded-l-lg xs:rounded-tr-none outline-none focus:ring-2 focus:ring-[#F59E0B]"
  />

  <button
    onClick={handleDiscount}
    className="bg-[#F59E0B] text-black px-4 py-2 rounded-b-lg xs:rounded-r-lg xs:rounded-bl-none hover:bg-orange-400 transition"
  >
    Get
  </button>
</div>

{discountMsg && (
  <p className="text-sm text-green-600 mt-3 font-semibold">
    {discountMsg}
  </p>
)}
          

              <p className="text-xs text-gray-400 mt-3">
                *No spam. Only fashion updates & deals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BRAND */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14 md:py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Shop by Brand</h2>
          <p className="text-gray-500 mt-2">Choose from top fashion brands</p>
        </div>

       <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
  {[
    {
      name: "Nike",
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg",
    },
    {
      name: "Adidas",
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg",
    },
    {
      name: "Puma",
      logo: "https://upload.wikimedia.org/wikipedia/commons/f/fd/Puma_Logo.svg",
    },
    {
      name: "Zara",
      logo: "https://upload.wikimedia.org/wikipedia/commons/f/fd/Zara_Logo.svg",
    },
    {
      name: "H&M",
      logo: "https://upload.wikimedia.org/wikipedia/commons/5/53/H%26M-Logo.svg",
    },
    {
      name: "Levi's",
      logo: "https://upload.wikimedia.org/wikipedia/commons/0/0b/Levi%27s_logo.svg",
    },
          ].map((brand, i) => (
            <div
              key={i}
              onClick={() => navigate(`/products?brand=${brand.name}`)}
              className="bg-white rounded-2xl p-6 flex flex-col items-center justify-center shadow hover:shadow-2xl hover:-translate-y-2 transition duration-300 cursor-pointer group"
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="h-10 object-contain mb-3 group-hover:scale-110 transition duration-300"
              />

              <p className="text-sm font-semibold text-gray-700 group-hover:text-black">
                {brand.name}
              </p>
            </div>
          ))}
        </div>
      </section>
      {/* REVIEWS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-10">
          Customer Reviews
        </h2>

        <div className="grid md:grid-cols-3 gap-5 md:gap-8">
          {[
            {
              name: "Rahul Sharma",
              img: "https://randomuser.me/api/portraits/men/32.jpg",
              rating: 5,
              review: "Amazing quality! The fabric feels premium and delivery was super fast. Highly recommended."
            },
            {
              name: "Priya Verma",
              img: "https://randomuser.me/api/portraits/women/44.jpg",
              rating: 4,
              review: "Loved the collection. Stylish and comfortable outfits. Will definitely shop again!"
            },
            {
              name: "Aman Singh",
              img: "https://randomuser.me/api/portraits/men/65.jpg",
              rating: 5,
              review: "Best fashion store online. Prices are reasonable and quality is top-notch."
            }
          ].map((user, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
              <div className="flex items-center gap-4">
                <img
                  src={user.img}
                  alt={user.name}
                  className="w-14 h-14 rounded-full object-cover"
                />

                <div>
                  <h3 className="font-semibold">{user.name}</h3>

                  <div className="flex text-yellow-400">
                    {[...Array(user.rating)].map((_, index) => (
                      <span key={index}>★</span>
                    ))}
                  </div>
                </div>
              </div>

              <p className="mt-4 text-gray-600 text-sm leading-relaxed">
                "{user.review}"
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="bg-black text-white text-center px-4 py-12 md:py-16 relative">
  {subscribeMsg && (
    <div className="absolute top-5 right-5 bg-white text-black px-4 py-2 rounded-lg shadow">
      {subscribeMsg}
    </div>
  )}

  <h2 className="text-2xl md:text-3xl font-bold">Join Our Newsletter</h2>

  <div className="mt-6 mx-auto flex w-full max-w-md flex-col xs:flex-row justify-center">
    <input
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="min-w-0 px-4 py-2 w-full text-black rounded-t-lg xs:rounded-l-lg xs:rounded-tr-none outline-none"
      placeholder="Email"
      type="email"
    />

    <button
      onClick={handleSubscribe}
      className="bg-indigo-600 px-6 py-2 rounded-b-lg xs:rounded-r-lg xs:rounded-bl-none active:scale-95"
    >
      <span className="hover:text-yellow-300 transition">
        Subscribe
      </span>
    </button>
  </div>
</section>
    </div>
  );
}

export default Home;
