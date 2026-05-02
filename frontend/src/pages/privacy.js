import React from "react";
import { Link } from "react-router-dom";

function Privacy() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-16 text-gray-900">
      <section className="mx-auto max-w-4xl rounded-2xl bg-white p-6 shadow-sm md:p-10">
        <p className="text-sm font-semibold uppercase tracking-wider text-yellow-700">
          Privacy Policy
        </p>
        <h1 className="mt-3 text-3xl font-bold md:text-5xl">
          Your privacy matters at StyLoria.
        </h1>
        <p className="mt-5 text-gray-600">
          We collect only the details needed to process orders, support your
          account, and improve your shopping experience. Contact form messages
          are stored locally in this demo application.
        </p>

        <div className="mt-8 space-y-6 text-gray-600">
          <section>
            <h2 className="text-xl font-semibold text-gray-900">
              Information We Use
            </h2>
            <p className="mt-2">
              Your name, email, cart, wishlist, and order details may be used to
              provide store features and customer support.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">
              How We Protect It
            </h2>
            <p className="mt-2">
              We keep customer information limited to store functions and do not
              sell personal details to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">Questions</h2>
            <p className="mt-2">
              For privacy requests, email us at support@styloria.com or visit
              the contact page.
            </p>
          </section>
        </div>

        <Link
          to="/contact"
          className="mt-8 inline-flex rounded bg-yellow-500 px-5 py-3 font-semibold text-black transition hover:bg-yellow-400"
        >
          Contact Support
        </Link>
      </section>
    </main>
  );
}

export default Privacy;
