import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { ArrowLeft, Mail, MapPin, Save, UserRound } from "lucide-react";
import { useAuth } from "../context/authcontext";
import { authAPI } from "../utlis/api";

const emptyProfile = {
  name: "",
  email: "",
  deliveryProfile: {
    address: "",
    city: "",
    pincode: "",
    preferredSlot: "Morning delivery - 8 AM to 11 AM",
  },
};

function UserProfile() {
  const { user, token, updateUser, logout } = useAuth();
  const [formData, setFormData] = useState(emptyProfile);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const nextUser = user || {};
    setFormData({
      name: nextUser.name || "",
      email: nextUser.email || "",
      deliveryProfile: {
        ...emptyProfile.deliveryProfile,
        ...(nextUser.deliveryProfile || {}),
      },
    });
  }, [user]);

  useEffect(() => {
    const loadProfile = async () => {
      if (!token) return;

      setLoading(true);
      try {
        const res = await authAPI.getProfile();
        if (res.data.success) {
          const { token: ignoredToken, success, message: ignoredMessage, ...profile } = res.data;
          updateUser(profile);
        }
      } catch (err) {
        if (err.response?.status === 401) {
          logout();
          return;
        }
        setError(err.response?.data?.message || "Unable to load profile.");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [token, updateUser, logout]);

  if (!token) {
    return <Navigate to="/signin" replace />;
  }

  const updateField = (field, value) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const updateDeliveryField = (field, value) => {
    setFormData((current) => ({
      ...current,
      deliveryProfile: {
        ...current.deliveryProfile,
        [field]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    setError("");

    try {
      const res = await authAPI.updateProfile(formData);
      if (res.data.success) {
        const { token: ignoredToken, success, message: ignoredMessage, ...profile } = res.data;
        updateUser(profile);
        setMessage(res.data.message || "Profile updated successfully");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Profile update failed.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 md:px-8 py-8">
      <div className="max-w-5xl mx-auto">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-black mb-6"
        >
          <ArrowLeft size={18} />
          Dashboard
        </Link>

        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="bg-slate-900 text-white p-6 md:p-8 flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-yellow-500 text-black flex items-center justify-center">
              <UserRound size={32} />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">User Profile</h1>
              <p className="text-slate-300 mt-1">Manage your account and delivery details.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-8">
            {loading && (
              <div className="bg-blue-50 border border-blue-200 text-blue-700 rounded-xl px-4 py-3">
                Loading latest profile details...
              </div>
            )}

            {message && (
              <div className="bg-green-50 border border-green-200 text-green-700 rounded-xl px-4 py-3">
                {message}
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3">
                {error}
              </div>
            )}

            <section>
              <h2 className="text-xl font-bold mb-5">Account Details</h2>
              <div className="grid md:grid-cols-2 gap-5">
                <label className="block">
                  <span className="block text-sm font-semibold text-gray-700 mb-2">Full Name</span>
                  <div className="relative">
                    <UserRound size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => updateField("name", e.target.value)}
                      className="w-full pl-11 pr-4 py-3 rounded-lg border border-gray-200 bg-gray-50 outline-none focus:ring-2 focus:ring-black"
                      required
                    />
                  </div>
                </label>

                <label className="block">
                  <span className="block text-sm font-semibold text-gray-700 mb-2">Email Address</span>
                  <div className="relative">
                    <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      className="w-full pl-11 pr-4 py-3 rounded-lg border border-gray-200 bg-gray-50 outline-none focus:ring-2 focus:ring-black"
                      required
                    />
                  </div>
                </label>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-5">Delivery Details</h2>
              <div className="space-y-5">
                <label className="block">
                  <span className="block text-sm font-semibold text-gray-700 mb-2">Address</span>
                  <div className="relative">
                    <MapPin size={18} className="absolute left-4 top-4 text-gray-400" />
                    <textarea
                      value={formData.deliveryProfile.address}
                      onChange={(e) => updateDeliveryField("address", e.target.value)}
                      rows="3"
                      className="w-full pl-11 pr-4 py-3 rounded-lg border border-gray-200 bg-gray-50 outline-none focus:ring-2 focus:ring-black resize-none"
                      placeholder="House number, street, area"
                    />
                  </div>
                </label>

                <div className="grid md:grid-cols-3 gap-5">
                  <label className="block">
                    <span className="block text-sm font-semibold text-gray-700 mb-2">City</span>
                    <input
                      type="text"
                      value={formData.deliveryProfile.city}
                      onChange={(e) => updateDeliveryField("city", e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 outline-none focus:ring-2 focus:ring-black"
                    />
                  </label>

                  <label className="block">
                    <span className="block text-sm font-semibold text-gray-700 mb-2">Pincode</span>
                    <input
                      type="text"
                      value={formData.deliveryProfile.pincode}
                      onChange={(e) => updateDeliveryField("pincode", e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 outline-none focus:ring-2 focus:ring-black"
                    />
                  </label>

                  <label className="block">
                    <span className="block text-sm font-semibold text-gray-700 mb-2">Preferred Slot</span>
                    <select
                      value={formData.deliveryProfile.preferredSlot}
                      onChange={(e) => updateDeliveryField("preferredSlot", e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 outline-none focus:ring-2 focus:ring-black"
                    >
                      <option>Morning delivery - 8 AM to 11 AM</option>
                      <option>Afternoon delivery - 12 PM to 3 PM</option>
                      <option>Evening delivery - 5 PM to 8 PM</option>
                    </select>
                  </label>
                </div>
              </div>
            </section>

            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 disabled:opacity-60"
            >
              <Save size={18} />
              {saving ? "Saving..." : "Save Profile"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
