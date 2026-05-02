import React, { useState } from "react";

const initialProducts = [
  { id: 1, name: "Denim Jacket", price: 2499, category: "Men", img: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b" },
  { id: 2, name: "Casual Shirt", price: 999, category: "Men", img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab" },
  { id: 3, name: "Formal Blazer", price: 3999, category: "Men", img: "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7" }
];

export default function AdminPanel() {
  const [tab, setTab] = useState("dashboard");
  const [products, setProducts] = useState(initialProducts);

  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    img: ""
  });

  // ➕ ADD PRODUCT
  const addProduct = () => {
    if (!form.name || !form.price) return;

    setProducts([
      { id: Date.now(), ...form, price: Number(form.price) },
      ...products
    ]);

    setForm({ name: "", price: "", category: "", img: "" });
  };

  // ❌ DELETE
  const deleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}
      <div className="w-64 bg-black text-white p-6">

        <h1 className="text-2xl font-bold mb-8">
          🧑‍💼 Admin Panel
        </h1>

        <div className="space-y-4">

          <button onClick={() => setTab("dashboard")} className="block w-full text-left hover:text-yellow-400">
            📊 Dashboard
          </button>

          <button onClick={() => setTab("products")} className="block w-full text-left hover:text-yellow-400">
            📦 Products
          </button>

          <button onClick={() => setTab("orders")} className="block w-full text-left hover:text-yellow-400">
            🛒 Orders
          </button>

        </div>

      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-6">

        {/* 📊 DASHBOARD */}
        {tab === "dashboard" && (
          <div>

            <h2 className="text-3xl font-bold mb-6">Dashboard</h2>

            <div className="grid md:grid-cols-3 gap-6">

              <div className="bg-white p-6 rounded-xl shadow">
                <h3 className="text-xl font-bold">{products.length}</h3>
                <p>Total Products</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow">
                <h3 className="text-xl font-bold">₹{products.reduce((a,b)=>a+b.price,0)}</h3>
                <p>Total Revenue</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow">
                <h3 className="text-xl font-bold">Active</h3>
                <p>Status</p>
              </div>

            </div>

          </div>
        )}

        {/* 📦 PRODUCTS */}
        {tab === "products" && (
          <div>

            <h2 className="text-3xl font-bold mb-6">Products</h2>

            {/* FORM */}
            <div className="bg-white p-4 rounded-xl shadow mb-6 grid md:grid-cols-4 gap-2">

              <input placeholder="Name" className="border p-2"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />

              <input placeholder="Price" className="border p-2"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
              />

              <input placeholder="Category" className="border p-2"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              />

              <input placeholder="Image URL" className="border p-2"
                value={form.img}
                onChange={(e) => setForm({ ...form, img: e.target.value })}
              />

            </div>

            <button onClick={addProduct} className="bg-black text-white px-4 py-2 rounded">
              Add Product
            </button>

            {/* PRODUCT LIST */}
            <div className="grid md:grid-cols-3 gap-6 mt-6">

              {products.map((p) => (
                <div key={p.id} className="bg-white p-4 rounded-xl shadow">

                  <img src={p.img} className="h-40 w-full object-cover rounded" />

                  <h3 className="font-bold mt-2">{p.name}</h3>
                  <p>₹{p.price}</p>

                  <button
                    onClick={() => deleteProduct(p.id)}
                    className="mt-3 w-full bg-red-500 text-white py-2 rounded"
                  >
                    Delete
                  </button>

                </div>
              ))}

            </div>

          </div>
        )}

        {/* 🛒 ORDERS */}
        {tab === "orders" && (
          <div>

            <h2 className="text-3xl font-bold mb-6">Orders</h2>

            <div className="bg-white p-6 rounded-xl shadow">

              <p>🧾 Order #101 - Pending</p>
              <p>🧾 Order #102 - Delivered</p>
              <p>🧾 Order #103 - Processing</p>

            </div>

          </div>
        )}

      </div>

    </div>
  );
}