import React, { useState } from "react";
import { Mail, MapPin, Phone, Send } from "lucide-react";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [success, setSuccess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const oldMessages =
      JSON.parse(localStorage.getItem("contactMessages")) || [];

    const newMessage = {
      id: Date.now(),
      name: form.name,
      email: form.email,
      message: form.message,
      date: new Date().toLocaleString(),
    };

    localStorage.setItem(
      "contactMessages",
      JSON.stringify([...oldMessages, newMessage])
    );

    setSuccess("Message sent successfully!");
    setForm({ name: "", email: "", message: "" });

    setTimeout(() => setSuccess(""), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff7ed] via-[#c0b177] to-[#806c1e] px-4 py-10 md:py-16">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-14">
          <span className="inline-block bg-black text-yellow-400 px-5 py-2 rounded-full text-sm font-semibold">
            Contact Styloria
          </span>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mt-6 text-gray-900">
            We are here to help you
          </h1>

          <p className="text-gray-600 max-w-2xl mx-auto mt-4">
            Have questions about products, orders, delivery or returns?
            Send us a message and we’ll get back to you shortly.
          </p>
        </div>

        {/* MAIN CONTACT BOX */}
        <div className="grid lg:grid-cols-2 bg-white rounded-2xl md:rounded-[2rem] shadow-2xl overflow-hidden">

          {/* LEFT SIDE */}
          <div className="relative bg-gray-950 text-white p-8 md:p-12 flex flex-col justify-between">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-700 via-black to-yellow-900 opacity-95"></div>

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-yellow-400">
                StyLoria Support
              </h2>

              <p className="text-gray-300 mt-4 leading-relaxed">
                Premium fashion deserves premium support. Our team is ready
                to help with your shopping experience.
              </p>

              <div className="mt-10 space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="bg-yellow-500 text-black p-3 rounded-xl">
                    <Phone size={22} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Call Us</h3>
                    <p className="text-gray-300">+91 9876543210</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="bg-yellow-500 text-black p-3 rounded-xl">
                    <Mail size={22} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Email</h3>
                    <p className="text-gray-300">support@styloria.com</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="bg-yellow-500 text-black p-3 rounded-xl">
                    <MapPin size={22} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Location</h3>
                    <p className="text-gray-300">Haryana, India</p>
                  </div>
                </div>
              </div>
            </div>

            <p className="relative z-10 text-sm text-gray-400 mt-10">
              Working Hours: Monday to Saturday, 9:00 AM - 7:00 PM
            </p>
          </div>

          {/* RIGHT SIDE FORM */}
          <div className="p-5 sm:p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Send Message
            </h2>

            <p className="text-gray-500 mt-2 mb-8">
              Fill the form below. Your message will be saved safely.
            </p>

            {success && (
              <div className="mb-5 bg-green-100 text-green-700 px-4 py-3 rounded-xl">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                placeholder="Your Name"
                className="w-full px-5 py-4 rounded-xl bg-gray-100 border border-gray-200 outline-none focus:ring-2 focus:ring-yellow-500"
              />

              <input
                type="email"
                required
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
                placeholder="Your Email"
                className="w-full px-5 py-4 rounded-xl bg-gray-100 border border-gray-200 outline-none focus:ring-2 focus:ring-yellow-500"
              />

              <textarea
                rows="6"
                required
                value={form.message}
                onChange={(e) =>
                  setForm({ ...form, message: e.target.value })
                }
                placeholder="Your Message"
                className="w-full px-5 py-4 rounded-xl bg-gray-100 border border-gray-200 outline-none focus:ring-2 focus:ring-yellow-500 resize-none"
              ></textarea>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-black text-white py-4 rounded-xl font-semibold hover:bg-yellow-600 hover:text-black transition"
              >
                <Send size={18} />
                Send Message
              </button>
            </form>

            <p className="text-xs text-gray-400 mt-4">
              Message store key: contactMessages
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
