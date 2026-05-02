import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Heart, LayoutDashboard, Menu, ShoppingCart, User, UserRound, X } from "lucide-react";
import { useAuth } from "../context/authcontext";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  const { token, user, logout } = useAuth();
  const isAuth = Boolean(token);

  const updateCounts = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    const totalCart = cart.reduce(
      (sum, item) => sum + (item.quantity || item.qty || 1),
      0
    );

    setCartCount(totalCart);
    setWishlistCount(wishlist.length);
  };

  useEffect(() => {
    updateCounts();

    window.addEventListener("cartUpdated", updateCounts);
    window.addEventListener("wishlistUpdated", updateCounts);
    window.addEventListener("storage", updateCounts);

    return () => {
      window.removeEventListener("cartUpdated", updateCounts);
      window.removeEventListener("wishlistUpdated", updateCounts);
      window.removeEventListener("storage", updateCounts);
    };
  }, []);

  const handleLogout = () => {
    logout();
    window.location.href = "/signin";
  };

  const linkClass = ({ isActive }) =>
    isActive ? "text-yellow-400 font-semibold" : "hover:text-yellow-400";

  return (
    <nav className="bg-slate-900 text-white px-4 sm:px-6 md:px-10 py-3 md:py-4 shadow-md sticky top-0 z-50">
      <div className="flex justify-between items-center gap-3">
        <NavLink
          to="/"
          className="shrink-0 text-xl sm:text-2xl md:text-3xl font-bold text-yellow-500"
        >
          StyLoria
        </NavLink>

        <ul className="hidden md:flex space-x-6 items-center">
          <li><NavLink to="/" className={linkClass}>Home</NavLink></li>
          <li><NavLink to="/products" className={linkClass}>Products</NavLink></li>
          <li><NavLink to="/contact" className={linkClass}>Contact</NavLink></li>
          <li><NavLink to="/about" className={linkClass}>About</NavLink></li>

          {isAuth && (
            <li><NavLink to="/dashboard" className={linkClass}>Dashboard</NavLink></li>
          )}
        </ul>

        <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
          {/* Cart */}
          <NavLink
            to="/cart"
            className="relative bg-yellow-500 text-black p-2 rounded-full hover:bg-yellow-600 transition"
          >
            <ShoppingCart size={20} />

            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </NavLink>

          {/* Wishlist */}
          <NavLink
            to="/wishlist"
            className="relative bg-pink-500 text-white p-2 rounded-full hover:bg-pink-600 transition"
          >
            <Heart size={20} />

            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </NavLink>

          {/* Profile / Login */}
          {isAuth ? (
            <>
              <NavLink
                to="/dashboard"
                title="Dashboard"
                className="hidden md:flex bg-slate-700 text-white p-2 rounded-full hover:bg-slate-600 transition"
              >
                <LayoutDashboard size={22} />
              </NavLink>

              <NavLink
                to="/profile"
                title={user?.name ? `${user.name}'s profile` : "Profile"}
                className="relative bg-yellow-500 text-black p-2 rounded-full hover:bg-yellow-600 transition"
              >
                <UserRound size={20} />
              </NavLink>

              <button
                onClick={handleLogout}
                className="hidden md:block bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <NavLink
              to="/signin"
              className="bg-yellow-500 text-black p-2 rounded-full hover:bg-yellow-600 transition"
            >
              <User size={20} />
            </NavLink>
          )}

          <button
            className="md:hidden rounded p-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden mt-4 bg-slate-800 p-4 rounded-lg flex flex-col gap-4">
          <NavLink to="/" onClick={() => setMenuOpen(false)} className={linkClass}>Home</NavLink>
          <NavLink to="/products" onClick={() => setMenuOpen(false)} className={linkClass}>Products</NavLink>
          <NavLink to="/contact" onClick={() => setMenuOpen(false)} className={linkClass}>Contact</NavLink>
          <NavLink to="/about" onClick={() => setMenuOpen(false)} className={linkClass}>About</NavLink>
          <NavLink to="/cart" onClick={() => setMenuOpen(false)} className={linkClass}>
            Cart ({cartCount})
          </NavLink>
          <NavLink to="/wishlist" onClick={() => setMenuOpen(false)} className={linkClass}>
            Wishlist ({wishlistCount})
          </NavLink>

          {isAuth ? (
            <>
              <NavLink to="/dashboard" onClick={() => setMenuOpen(false)} className={linkClass}>
                Dashboard
              </NavLink>
              <NavLink to="/profile" onClick={() => setMenuOpen(false)} className={linkClass}>
                Profile
              </NavLink>

              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <NavLink
              to="/signin"
              onClick={() => setMenuOpen(false)}
              className="bg-yellow-500 text-black px-4 py-2 rounded text-center"
            >
              Signin
            </NavLink>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
