import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* MOBILE MENU BUTTON */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="md:hidden fixed top-4 left-4 z-50 bg-slate-900 text-white p-2 rounded-lg"
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* SIDEBAR */}
      <div
        className={`fixed md:relative md:w-64 w-64 bg-slate-900 text-white p-6 min-h-screen transition-transform duration-300 z-40 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <h2 className="text-2xl font-bold mb-8 mt-12 md:mt-0">Admin Panel</h2>

        <div className="space-y-4">
          <Link
            to="/admin/dashboard"
            onClick={() => setSidebarOpen(false)}
            className="block hover:text-yellow-400 transition py-2"
          >
            Dashboard
          </Link>

          <Link
            to="/admin/products"
            onClick={() => setSidebarOpen(false)}
            className="block hover:text-yellow-400 transition py-2"
          >
            Products
          </Link>

          <Link
            to="/admin/orders"
            onClick={() => setSidebarOpen(false)}
            className="block hover:text-yellow-400 transition py-2"
          >
            Orders
          </Link>

          <Link
            to="/admin/users"
            onClick={() => setSidebarOpen(false)}
            className="block hover:text-yellow-400 transition py-2"
          >
            Users
          </Link>
        </div>
      </div>

      {/* BACKDROP FOR MOBILE */}
      {sidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* MAIN CONTENT */}
      <div className="flex-1 p-4 md:p-8 w-full overflow-x-hidden">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Admin Dashboard</h1>

        {/* STATS CARDS */}
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">

          <div className="bg-white p-4 md:p-6 rounded-xl shadow">
            <h3 className="text-gray-500 text-sm md:text-base">Total Users</h3>
            <p className="text-2xl md:text-3xl font-bold mt-2">120</p>
          </div>

          <div className="bg-white p-4 md:p-6 rounded-xl shadow">
            <h3 className="text-gray-500 text-sm md:text-base">Products</h3>
            <p className="text-2xl md:text-3xl font-bold mt-2">50</p>
          </div>

          <div className="bg-white p-4 md:p-6 rounded-xl shadow">
            <h3 className="text-gray-500 text-sm md:text-base">Orders</h3>
            <p className="text-2xl md:text-3xl font-bold mt-2">30</p>
          </div>

          <div className="bg-white p-4 md:p-6 rounded-xl shadow">
            <h3 className="text-gray-500 text-sm md:text-base">Revenue</h3>
            <p className="text-2xl md:text-3xl font-bold mt-2">₹45,000</p>
          </div>

        </div>

        {/* RECENT ACTIVITY */}
        <div className="mt-8 md:mt-10 bg-white p-4 md:p-6 rounded-xl shadow overflow-x-auto">
          <h2 className="text-lg md:text-xl font-bold mb-4">Recent Orders</h2>

          <div className="min-w-full">
            <table className="w-full text-left text-sm md:text-base">
              <thead>
                <tr className="text-gray-600 border-b">
                  <th className="py-2 px-2">User</th>
                  <th className="py-2 px-2">Product</th>
                  <th className="py-2 px-2">Status</th>
                  <th className="py-2 px-2">Amount</th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-b">
                  <td className="py-2 px-2">Renu</td>
                  <td className="py-2 px-2">T-Shirt</td>
                  <td className="py-2 px-2 text-green-600">Delivered</td>
                  <td className="py-2 px-2">₹999</td>
                </tr>

                <tr className="border-b">
                  <td className="py-2 px-2">Amit</td>
                  <td className="py-2 px-2">Shoes</td>
                  <td className="py-2 px-2 text-yellow-600">Pending</td>
                  <td className="py-2 px-2">₹1999</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;