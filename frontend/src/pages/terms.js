import React from "react";
import { Link } from "react-router-dom";

function Terms() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-16 text-gray-900">
      <section className="mx-auto max-w-4xl rounded-2xl bg-white p-6 shadow-sm md:p-10">
        <p className="text-sm font-semibold uppercase tracking-wider text-yellow-700">
          Terms
        </p>
        <h1 className="mt-3 text-3xl font-bold md:text-5xl">
          Shopping terms for StyLoria customers.
        </h1>
        <p className="mt-5 text-gray-600">
          These terms explain the basic rules for using StyLoria, placing
          orders, and contacting support.
        </p>

        <div className="mt-8 space-y-6 text-gray-600">
          <section>
            <h2 className="text-xl font-semibold text-gray-900">Orders</h2>
            <p className="mt-2">
              Product prices, availability, and delivery details may change
              before checkout is completed.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">
              Returns And Support
            </h2>
            <p className="mt-2">
              Please contact support for help with returns, exchanges, order
              issues, or payment questions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">
              Account Use
            </h2>
            <p className="mt-2">
              Customers are responsible for keeping account details accurate and
              using the store in a lawful, respectful way.
            </p>
          </section>
        </div>

        <Link
          to="/products"
          className="mt-8 inline-flex rounded bg-yellow-500 px-5 py-3 font-semibold text-black transition hover:bg-yellow-400"
        >
          Continue Shopping
        </Link>
      </section>
    </main>
  );
}

export default Terms;
