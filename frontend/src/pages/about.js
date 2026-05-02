import React from "react";
import { Link } from "react-router-dom";
import { Sparkles, ShieldCheck, Heart, Truck } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-indigo-50 text-gray-900 min-h-screen">

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14 md:py-24 grid md:grid-cols-2 gap-8 md:gap-14 items-center">
        <div>
          <span className="inline-block bg-yellow-100 text-yellow-700 px-4 py-1 rounded-full text-sm font-semibold mb-5">
            About Styloria
          </span>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
            We Build <span className="text-yellow-600">Confidence</span> Through Fashion
          </h1>

          <p className="mt-6 text-gray-600 max-w-xl leading-relaxed">
            Styloria is a modern fashion destination created for people who love
            comfort, elegance, and individuality. We bring premium styles for men,
            women, and kids at affordable prices.
          </p>

          <div className="mt-8 flex flex-col xs:flex-row gap-3 sm:gap-4">
            <Link
              to="/products"
              className="text-center px-7 py-3 bg-yellow-600 text-white rounded-full font-semibold hover:bg-yellow-700 transition"
            >
              Explore Collection
            </Link>

            <Link
              to="/contact"
              className="text-center px-7 py-3 border border-gray-300 rounded-full font-semibold hover:bg-white transition"
            >
              Contact Us
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 bg-yellow-400/20 rounded-3xl blur-2xl"></div>
          <img
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b"
            alt="Styloria fashion"
            className="relative rounded-3xl w-full h-[320px] sm:h-[420px] md:h-[520px] object-cover hover:scale-[1.02] transition duration-500"
          />
        </div>
      </section>

      {/* MISSION */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold">Our Mission</h2>
          <p className="mt-5 text-gray-600 leading-relaxed">
            Our mission is to make premium fashion accessible, comfortable, and
            expressive. Every product is designed to help you feel confident,
            stylish, and ready for every moment.
          </p>
        </div>
      </section>

      {/* VALUES */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Why Choose Styloria?</h2>
          <p className="text-gray-500 mt-2">
            Fashion built with quality, trust, and care.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: <Sparkles />,
              title: "Modern Designs",
              desc: "Trendy collections inspired by global fashion."
            },
            {
              icon: <ShieldCheck />,
              title: "Premium Quality",
              desc: "Durable fabrics and carefully selected materials."
            },
            {
              icon: <Heart />,
              title: "Customer First",
              desc: "A smooth shopping experience from start to finish."
            },
            {
              icon: <Truck />,
              title: "Fast Delivery",
              desc: "Quick, reliable, and secure delivery support."
            }
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white p-7 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition duration-300 border border-gray-100"
            >
              <div className="w-12 h-12 bg-yellow-100 text-yellow-700 rounded-xl flex items-center justify-center mb-5">
                {item.icon}
              </div>

              <h3 className="text-lg font-bold">{item.title}</h3>
              <p className="text-gray-600 mt-3 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className="bg-gray-950 text-white py-20 px-6">
        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            ["50K+", "Happy Customers"],
            ["120+", "Fashion Designs"],
            ["15+", "Countries Served"],
            ["5+", "Years Experience"]
          ].map(([num, label], index) => (
            <div key={index}>
              <h2 className="text-4xl font-extrabold text-yellow-400">
                {num}
              </h2>
              <p className="mt-2 text-gray-300">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* STORY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14 md:py-20 grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        <img
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d"
          alt="fashion story"
          className="rounded-3xl h-[300px] sm:h-[360px] md:h-[420px] w-full object-cover"
        />

        <div>
          <h2 className="text-3xl font-bold">Our Story</h2>
          <p className="mt-5 text-gray-600 leading-relaxed">
            Styloria started with a simple idea: fashion should be stylish,
            comfortable, and accessible for everyone. From everyday outfits to
            special occasion looks, we create collections that fit modern lifestyles.
          </p>
          <p className="mt-4 text-gray-600 leading-relaxed">
            We believe clothing is more than fabric — it is personality,
            confidence, and self-expression.
          </p>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl font-bold">What Our Customers Say</h2>

        <div className="grid md:grid-cols-3 gap-6 mt-10">
          {[
            ["Amazing quality and perfect fit!", "Rahul Sharma"],
            ["Styloria changed my fashion style completely.", "Priya Verma"],
            ["Very comfortable and premium clothing.", "Aman Singh"]
          ].map(([text, name], index) => (
            <div
              key={index}
              className="bg-white p-7 rounded-2xl shadow-sm hover:shadow-xl transition"
            >
              <p className="text-gray-600">“{text}”</p>
              <h4 className="mt-5 font-semibold text-yellow-600">{name}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-yellow-600 text-white py-20 text-center px-6">
        <h2 className="text-3xl md:text-4xl font-bold">
          Ready to Upgrade Your Style?
        </h2>
        <p className="mt-3 text-yellow-50">
          Discover premium fashion that matches your personality.
        </p>

        <Link
          to="/products"
          className="inline-block mt-7 px-8 py-3 bg-black text-white rounded-full font-semibold hover:bg-gray-900 transition"
        >
          Shop Now
        </Link>
      </section>
    </div>
  );
}
