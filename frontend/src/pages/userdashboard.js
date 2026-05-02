import React, { useEffect, useMemo, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import {
  Heart,
  MapPin,
  PackageCheck,
  ShoppingBag,
  ShoppingCart,
  UserRound,
} from "lucide-react";
import { useAuth } from "../context/authcontext";
import { authAPI } from "../utlis/api";

function UserDashboard() {
  const { user, token, updateUser, logout } = useAuth();
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [orders, setOrders] = useState([]);
  const [profileStatus, setProfileStatus] = useState("loading");

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart")) || []);
    setWishlist(JSON.parse(localStorage.getItem("wishlist")) || []);
    setOrders(JSON.parse(localStorage.getItem("orders")) || []);
  }, []);

  useEffect(() => {
    const loadProfile = async () => {
      if (!token) return;

      try {
        const res = await authAPI.getProfile();
        if (res.data.success) {
          const { token: ignoredToken, success, message, ...profile } = res.data;
          updateUser(profile);
          setProfileStatus("ready");
        }
      } catch (error) {
        setProfileStatus("failed");
        if (error.response?.status === 401) {
          logout();
        }
      }
    };

    loadProfile();
  }, [token, updateUser, logout]);

  const stats = useMemo(
    () => [
      {
        label: "Cart Items",
        value: cart.reduce((sum, item) => sum + (item.quantity || 1), 0),
        icon: ShoppingCart,
        tone: "bg-amber-50 text-amber-700",
      },
      {
        label: "Wishlist",
        value: wishlist.length,
        icon: Heart,
        tone: "bg-rose-50 text-rose-700",
      },
      {
        label: "Orders",
        value: orders.length,
        icon: PackageCheck,
        tone: "bg-emerald-50 text-emerald-700",
      },
    ],
    [cart, wishlist, orders]
  );

  if (!token) {
    return <Navigate to="/signin" replace />;
  }

  const latestOrder = orders[orders.length - 1];
  const deliveryProfile = user?.deliveryProfile || {};
  const hasAddress = Boolean(deliveryProfile.address || deliveryProfile.city);

  return (
    <div className="min-h-screen bg-gray-100 px-4 md:px-8 py-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <section className="bg-white rounded-xl shadow p-6 md:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-slate-900 text-yellow-400 flex items-center justify-center">
              <UserRound size={32} />
            </div>

            <div>
              <p className="text-sm text-gray-500">Welcome back</p>
              <h1 className="text-2xl md:text-4xl font-bold text-gray-900">
                {user?.name || "Styloria Customer"}
              </h1>
              <p className="text-gray-500 mt-1 break-all">{user?.email}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/profile"
              className="inline-flex items-center gap-2 bg-black text-white px-5 py-3 rounded-lg hover:bg-gray-800"
            >
              <UserRound size={18} />
              Profile
            </Link>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-yellow-500 text-black px-5 py-3 rounded-lg hover:bg-yellow-600"
            >
              <ShoppingBag size={18} />
              Shop
            </Link>
            <Link
              to="/track-order"
              className="inline-flex items-center gap-2 bg-slate-800 text-white px-5 py-3 rounded-lg hover:bg-slate-700"
            >
              <PackageCheck size={18} />
              Track
            </Link>
          </div>
        </section>

        {profileStatus === "failed" && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3">
            Profile could not refresh from the server. Your saved local details are still shown.
          </div>
        )}

        <section className="grid md:grid-cols-3 gap-5">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-white rounded-xl shadow p-6">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.tone}`}>
                  <Icon size={24} />
                </div>
                <p className="text-gray-500 mt-5">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
            );
          })}
        </section>

        <section className="grid lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold">Recent Order</h2>
              <Link to="/myorder" className="text-sm font-semibold text-black hover:underline">
                View orders
              </Link>
            </div>

            {latestOrder ? (
              <div className="space-y-4">
                <div className="flex justify-between gap-4">
                  <div>
                    <p className="font-semibold break-all">{latestOrder.id}</p>
                    <p className="text-sm text-gray-500">{latestOrder.date}</p>
                  </div>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full h-fit text-sm font-semibold">
                    {latestOrder.status}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t pt-4">
                  <span>Total</span>
                  <span>Rs. {latestOrder.totalAmount}</span>
                </div>
                <Link
                  to={`/track-order?id=${encodeURIComponent(latestOrder.id)}`}
                  className="inline-flex rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white"
                >
                  Track latest order
                </Link>
              </div>
            ) : (
              <div className="text-center py-8">
                <PackageCheck size={40} className="mx-auto text-gray-300" />
                <p className="text-gray-500 mt-3">No orders yet.</p>
                <Link to="/products" className="inline-block mt-4 bg-black text-white px-5 py-2 rounded-lg">
                  Start shopping
                </Link>
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold">Delivery Profile</h2>
              <Link to="/profile" className="text-sm font-semibold text-black hover:underline">
                Edit
              </Link>
            </div>

            {hasAddress ? (
              <div className="flex gap-4">
                <div className="w-11 h-11 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                  <MapPin size={22} />
                </div>
                <div className="text-gray-700">
                  <p>{deliveryProfile.address}</p>
                  <p>
                    {deliveryProfile.city} {deliveryProfile.pincode}
                  </p>
                  <p className="text-sm text-gray-500 mt-2">{deliveryProfile.preferredSlot}</p>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <MapPin size={40} className="mx-auto text-gray-300" />
                <p className="text-gray-500 mt-3">Add your address for faster checkout.</p>
                <Link to="/profile" className="inline-block mt-4 bg-black text-white px-5 py-2 rounded-lg">
                  Add address
                </Link>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default UserDashboard;
