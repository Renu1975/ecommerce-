import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  const quickLinks = [
    { label: "Home", to: "/" },
    { label: "Products", to: "/products" },
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" },
  ];

  const categories = [
    { label: "Men", to: "/products?category=Men" },
    { label: "Women", to: "/products?category=Women" },
    { label: "Kids", to: "/products?category=Kids" },
  ];

  const socialLinks = [
    { label: "Facebook", href: "https://www.facebook.com/" },
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "X", href: "https://x.com/" },
  ];

  return (
    <footer className="bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/" className="text-3xl font-bold text-yellow-500">
              StyLoria
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-6 text-slate-300">
              Curated fashion for everyday confidence, from clean essentials to
              statement pieces for every wardrobe.
            </p>
            <div className="mt-5 flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-sm font-semibold text-yellow-400 transition hover:bg-yellow-500 hover:text-black"
                >
                  {social.label === "Instagram"
                    ? "in"
                    : social.label[0].toLowerCase()}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-100">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-300">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="transition hover:text-yellow-400">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-100">
              Categories
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-300">
              {categories.map((category) => (
                <li key={category.to}>
                  <Link
                    to={category.to}
                    className="transition hover:text-yellow-400"
                  >
                    {category.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-100">
              Contact
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-300">
              <li>
                <a
                  href="mailto:support@styloria.com"
                  className="transition hover:text-yellow-400"
                >
                  support@styloria.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+919876543210"
                  className="transition hover:text-yellow-400"
                >
                  +91 98765 43210
                </a>
              </li>
              <li>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Ahmedabad%2C%20India"
                  target="_blank"
                  rel="noreferrer"
                  className="transition hover:text-yellow-400"
                >
                  Ahmedabad, India
                </a>
              </li>
            </ul>
            <Link
              to="/contact"
              className="mt-5 inline-flex rounded bg-yellow-500 px-4 py-2 text-sm font-semibold text-black transition hover:bg-yellow-400"
            >
              Get Support
            </Link>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-6 text-center text-sm text-slate-400 md:flex-row md:text-left">
          <p>&copy; 2026 StyLoria. All rights reserved.</p>
          <div className="flex gap-5">
            <Link to="/privacy" className="transition hover:text-yellow-400">
              Privacy Policy
            </Link>
            <Link to="/terms" className="transition hover:text-yellow-400">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
