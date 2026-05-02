import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserPlus, Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { authAPI } from "../utlis/api";
import { useAuth } from "../context/authcontext";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const res = await authAPI.signup(formData);

      if (res.data.success) {
        login(res.data);
        navigate("/dashboard");
      } else {
        setError(res.data.message || "Signup failed");
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Server error. Please check backend/API URL."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-800 via-slate-500 to-gray-400 flex items-center justify-center px-4 py-8 md:py-12">
      <div className="max-w-6xl w-full grid md:grid-cols-2 bg-white rounded-2xl md:rounded-[2rem] overflow-hidden shadow-2xl">
        <div className="hidden md:flex relative bg-black text-white p-12 flex-col justify-between">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-slate-900 to-indigo-950"></div>
          <div className="absolute w-72 h-72 bg-yellow-500/20 rounded-full blur-3xl top-10 left-10"></div>
          <div className="absolute w-72 h-72 bg-purple-500/20 rounded-full blur-3xl bottom-10 right-10"></div>

          <div className="relative">
            <h1 className="text-4xl md:text-5xl font-extrabold text-yellow-400">
              Welcome <br />
              to Styloria
            </h1>

            <p className="mt-4 text-gray-300 max-w-sm">
              Discover premium fashion crafted for every occasion.
            </p>
          </div>

          <div className="relative space-y-4">
            <div className="bg-white/10 p-5 rounded-2xl backdrop-blur border border-white/10">
              <h3 className="font-bold">Premium Fashion</h3>
              <p className="text-sm text-gray-300 mt-1">
                Discover latest styles for men, women and kids.
              </p>
            </div>

            <div className="bg-white/10 p-5 rounded-2xl backdrop-blur border border-white/10">
              <h3 className="font-bold">Secure Shopping</h3>
              <p className="text-sm text-gray-300 mt-1">
                Your profile and shopping data stay safe.
              </p>
            </div>
            <div className="bg-white/10 p-5 rounded-2xl backdrop-blur border border-white/10">
              <h3 className="font-bold">Secure Shopping</h3>
              <p className="text-sm text-gray-300 mt-1">
                Your profile and shopping data stay safe.
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8 md:p-12">
          <div className="text-center mb-6 md:mb-8">
            <div className="w-14 md:w-16 h-14 md:h-16 bg-black text-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <UserPlus size={30} className="md:w-[34px] md:h-[34px]" />
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Create Account
            </h2>

            <p className="text-sm md:text-base text-gray-500 mt-2">
              Join StyLoria and start shopping
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-5 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
            <div>
              <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-2">
                Full Name
              </label>

              <div className="relative">
                <User
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Enter your name"
                  className="w-full pl-11 md:pl-12 pr-4 py-2.5 md:py-3 rounded-xl border border-gray-200 bg-gray-50 outline-none focus:ring-2 focus:ring-black focus:bg-white text-sm md:text-base"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>

              <div className="relative">
                <Mail
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="Enter your email"
                  className="w-full pl-11 md:pl-12 pr-4 py-2.5 md:py-3 rounded-xl border border-gray-200 bg-gray-50 outline-none focus:ring-2 focus:ring-black focus:bg-white text-sm md:text-base"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>

              <div className="relative">
                <Lock
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  placeholder="Create password"
                  className="w-full pl-11 md:pl-12 pr-11 md:pr-12 py-2.5 md:py-3 rounded-xl border border-gray-200 bg-gray-50 outline-none focus:ring-2 focus:ring-black focus:bg-white text-sm md:text-base"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-3 md:py-4 rounded-xl font-semibold hover:bg-gray-800 transition disabled:opacity-60 text-sm md:text-base"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <p className="mt-6 md:mt-7 text-center text-xs md:text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/signin" className="font-semibold text-black hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
