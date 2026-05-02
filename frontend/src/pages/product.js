import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import { useWishlist } from "../context/WishlistContext";
import {
  fetchClothingProducts,
  getFallbackProducts,
} from "../data/clothingProducts";

const categoryOptions = ["All", "Men", "Women", "Kids"];

function Products() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const selectedBrand = query.get("brand");
  const selectedCategory = query.get("category");
  const navigate = useNavigate();

  const { wishlist, toggleWishlist } = useWishlist();

  const [allProducts, setAllProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("default");
  const [page, setPage] = useState(1);
  const [popup, setPopup] = useState("");
  const [loading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState("api");

  const itemsPerPage = 8;

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const products = await fetchClothingProducts();
        setAllProducts(products.length ? products : getFallbackProducts());
      } catch (error) {
        setDataSource("fallback");
        setAllProducts(getFallbackProducts());
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  useEffect(() => {
    setCategory(
      selectedCategory && categoryOptions.includes(selectedCategory)
        ? selectedCategory
        : "All"
    );
    setPage(1);
  }, [selectedCategory]);

  const showPopup = (message) => {
    setPopup(message);
    setTimeout(() => setPopup(""), 1800);
  };

  const handleWishlist = (product) => {
    toggleWishlist(product);
    const exists = wishlist.find((item) => (item.id || item._id) === product.id);
    showPopup(exists ? "Removed from wishlist" : "Added to wishlist");
  };

  const filtered = allProducts
    .filter(
      (product) =>
        (category === "All" || product.category === category) &&
        (!selectedBrand || product.brand === selectedBrand) &&
        product.name.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sort === "low") return a.price - b.price;
      if (sort === "high") return b.price - a.price;
      return 0;
    });

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const display = filtered.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <div className="bg-gray-50 min-h-screen relative">
      {popup && (
        <div className="fixed top-24 right-5 z-50 bg-black text-white px-6 py-3 rounded-xl shadow-xl">
          {popup}
        </div>
      )}

      <section className="bg-yellow-800 text-white text-center py-10 md:py-16 px-4">
        <h1 className="text-2xl md:text-4xl font-bold">
          {selectedBrand
            ? `${selectedBrand} Collection`
            : selectedCategory
            ? `${selectedCategory} Collection`
            : "Clothing Collection"}
        </h1>
        <p className="text-gray-200 mt-2 text-sm md:text-base">
          {selectedBrand
            ? `Best ${selectedBrand} products`
            : selectedCategory
            ? `Best ${selectedCategory} products`
            : "Men - Women - Kids"}
        </p>
        {dataSource === "fallback" && (
          <p className="text-yellow-100 mt-2 text-xs md:text-sm">
            Showing backup products because the dummy API is unavailable.
          </p>
        )}
      </section>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">
        <div className="flex flex-col gap-3 md:gap-4 md:flex-wrap md:flex-row">
          <input
            placeholder="Search clothing..."
            className="px-3 md:px-4 py-2 border rounded-lg w-full md:w-72 outline-none text-sm md:text-base"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />

          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setPage(1);
            }}
            className="px-3 md:px-4 py-2 border rounded-lg outline-none text-sm md:text-base w-full md:w-auto"
          >
            {categoryOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="px-3 md:px-4 py-2 border rounded-lg outline-none text-sm md:text-base w-full md:w-auto"
          >
            <option value="default">Sort</option>
            <option value="low">Price Low to High</option>
            <option value="high">Price High to Low</option>
          </select>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 pb-10">
        {loading && (
          <p className="text-gray-500 col-span-full text-center">
            Loading clothing products...
          </p>
        )}

        {!loading &&
          display.map((product) => {
            const isWishlisted = wishlist.find(
              (item) => (item.id || item._id) === product.id
            );

            return (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow hover:shadow-xl transition overflow-hidden relative h-full flex flex-col"
              >
                <button
                  onClick={() => handleWishlist(product)}
                  className="absolute top-3 right-3 z-10 bg-white w-9 md:w-10 h-9 md:h-10 rounded-full shadow flex items-center justify-center hover:scale-110 transition"
                  aria-label="Toggle wishlist"
                >
                  <Heart
                    size={18}
                    className={`transition duration-300 ${
                      isWishlisted
                        ? "fill-red-500 text-red-500 scale-110"
                        : "text-gray-500 hover:text-red-400"
                    }`}
                  />
                </button>

                <img
                  src={product.img}
                  alt={product.name}
                  className="h-52 xs:h-56 md:h-60 w-full object-cover"
                />

                <div className="p-3 md:p-4 flex-1 flex flex-col">
                  <h3 className="font-semibold text-sm md:text-base line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-500 text-xs md:text-sm mt-1">
                    {product.category} - {product.brand}
                  </p>

                  <p className="text-indigo-600 font-bold mt-2 text-sm md:text-base">
                    Rs. {product.price}
                  </p>

                  <button
                    onClick={() =>
                      navigate(`/products/${product.id}`, { state: { product } })
                    }
                    className="mt-auto w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition text-sm md:text-base"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            );
          })}

        {!loading && display.length === 0 && (
          <p className="text-gray-500 col-span-full text-center">
            No products found.
          </p>
        )}
      </div>

      <div className="flex justify-center items-center gap-3 sm:gap-4 px-4 pb-10">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>

        <span>
          {page} / {totalPages || 1}
        </span>

        <button
          disabled={page === totalPages || totalPages === 0}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Products;
