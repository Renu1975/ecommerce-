import React, { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle2, PackageCheck, Search, Truck } from "lucide-react";

const trackingSteps = [
  "Order Placed",
  "Payment Confirmed",
  "Packed",
  "Shipped",
  "Out for Delivery",
  "Delivered",
];

const statusStepMap = {
  Pending: 0,
  Paid: 1,
  Processing: 2,
  Packed: 2,
  Shipped: 3,
  "Out for Delivery": 4,
  Delivered: 5,
  Cancelled: 0,
};

const getOrderStatusIndex = (status) => statusStepMap[status] ?? 1;

function OrderTracking() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialId = searchParams.get("id") || "";
  const [orderId, setOrderId] = useState(initialId);
  const [submittedId, setSubmittedId] = useState(initialId);

  const orders = useMemo(
    () => JSON.parse(localStorage.getItem("orders")) || [],
    []
  );

  const trackedOrder = useMemo(() => {
    if (!submittedId.trim()) return null;
    return orders.find(
      (order) => String(order.id).toLowerCase() === submittedId.trim().toLowerCase()
    );
  }, [orders, submittedId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const nextId = orderId.trim();
    setSubmittedId(nextId);
    setSearchParams(nextId ? { id: nextId } : {});
  };

  const activeStep = trackedOrder ? getOrderStatusIndex(trackedOrder.status) : -1;
  const isCancelled = trackedOrder?.status === "Cancelled";

  return (
    <main className="min-h-screen bg-gray-100 px-4 sm:px-6 py-8 md:py-12">
      <section className="mx-auto max-w-5xl">
        <div className="mb-8 rounded-2xl bg-slate-950 p-6 text-white shadow md:p-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-yellow-400">
            Order Tracking
          </p>
          <h1 className="mt-2 text-3xl font-bold md:text-5xl">
            Track your StyLoria order
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-slate-300 md:text-base">
            Enter your order ID to see payment, shipping, and delivery progress.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl bg-white p-4 shadow sm:p-6"
        >
          <label className="block text-sm font-semibold text-gray-700">
            Order ID
          </label>
          <div className="mt-3 flex flex-col gap-3 sm:flex-row">
            <input
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="Paste your order ID"
              className="min-w-0 flex-1 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:ring-2 focus:ring-black"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-black px-5 py-3 font-semibold text-white transition hover:bg-gray-800"
            >
              <Search size={18} />
              Track
            </button>
          </div>
        </form>

        {!submittedId && (
          <div className="mt-6 rounded-2xl bg-white p-6 text-center text-gray-500 shadow">
            Your recent order IDs are available on the My Orders page.
            <div>
              <Link
                to="/myorder"
                className="mt-4 inline-flex rounded-lg bg-yellow-500 px-5 py-2 font-semibold text-black transition hover:bg-yellow-400"
              >
                View My Orders
              </Link>
            </div>
          </div>
        )}

        {submittedId && !trackedOrder && (
          <div className="mt-6 rounded-2xl bg-white p-6 text-center shadow">
            <PackageCheck size={42} className="mx-auto text-gray-300" />
            <h2 className="mt-3 text-xl font-bold text-gray-900">
              Order not found
            </h2>
            <p className="mt-2 text-gray-500">
              Check the order ID and try again, or open your saved orders.
            </p>
            <Link
              to="/myorder"
              className="mt-5 inline-flex rounded-lg bg-black px-5 py-2 font-semibold text-white"
            >
              My Orders
            </Link>
          </div>
        )}

        {trackedOrder && (
          <div className="mt-6 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
            <section className="rounded-2xl bg-white p-5 shadow sm:p-6">
              <div className="flex flex-col gap-4 border-b pb-5 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-sm text-gray-500">Order ID</p>
                  <h2 className="break-all text-lg font-bold text-gray-950">
                    {trackedOrder.id}
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Placed on {trackedOrder.date}
                  </p>
                </div>
                <span
                  className={`w-fit rounded-full px-4 py-2 text-sm font-semibold ${
                    isCancelled
                      ? "bg-red-100 text-red-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {trackedOrder.status}
                </span>
              </div>

              <div className="mt-6 space-y-5">
                {trackingSteps.map((step, index) => {
                  const complete = !isCancelled && index <= activeStep;
                  return (
                    <div key={step} className="flex gap-4">
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                          complete
                            ? "bg-green-600 text-white"
                            : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        <CheckCircle2 size={20} />
                      </div>
                      <div>
                        <p
                          className={`font-semibold ${
                            complete ? "text-gray-950" : "text-gray-500"
                          }`}
                        >
                          {step}
                        </p>
                        <p className="text-sm text-gray-500">
                          {complete
                            ? "Completed"
                            : isCancelled
                            ? "Stopped"
                            : "Waiting for update"}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            <aside className="rounded-2xl bg-white p-5 shadow sm:p-6">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-yellow-100 text-yellow-700">
                  <Truck size={22} />
                </div>
                <div>
                  <h2 className="font-bold text-gray-950">Order Summary</h2>
                  <p className="text-sm text-gray-500">
                    {trackedOrder.paymentMethod || "Payment"} order
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {trackedOrder.items.map((item) => (
                  <div
                    key={item.cartKey || item.id || item.name}
                    className="flex justify-between gap-4 border-b pb-3"
                  >
                    <div>
                      <p className="font-semibold text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="whitespace-nowrap font-bold">
                      Rs. {item.price * item.quantity}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>Rs. {trackedOrder.totalAmount}</span>
              </div>
            </aside>
          </div>
        )}
      </section>
    </main>
  );
}

export default OrderTracking;
