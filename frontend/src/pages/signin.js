import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, LogIn, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../context/authcontext";
import { authAPI } from "../utlis/api";

const Signin = () => {
  const [formData, setFormData] = useState({
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
      const res = await authAPI.signin(formData);

      if (res.data.success) {
        login(res.data);
        navigate(res.data.isAdmin ? "/admindashboard" : "/dashboard");
      } else {
        setError(res.data.message || "Invalid credentials");
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Signin failed. Please check backend/API URL."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-800 via-slate-500 to-gray-400 flex items-center justify-center px-4 py-8 md:py-12">
      <div className="max-w-6xl w-full grid md:grid-cols-2 bg-white rounded-2xl md:rounded-[2rem] overflow-hidden shadow-2xl">
        <div className="hidden md:flex relative overflow-hidden bg-gradient-to-br from-black via-slate-900 to-indigo-950 text-white p-8 md:p-12 flex-col justify-between">
          <div className="absolute w-80 h-80 bg-yellow-500/20 rounded-full blur-3xl top-10 left-10 animate-pulse"></div>
          <div className="absolute w-80 h-80 bg-purple-500/20 rounded-full blur-3xl bottom-10 right-10 animate-pulse"></div>

          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-wide bg-gradient-to-r from-yellow-400 to-orange-500 text-transparent bg-clip-text">
              StyLoria
            </h1>

            <p className="mt-5 text-gray-300 max-w-sm leading-relaxed text-sm md:text-base">
              Welcome back to your fashion universe. Discover styles, manage
              your cart, wishlist, and enjoy a seamless shopping experience.
            </p>
          </div>

          <div className="relative z-10 space-y-5">
            <div className="bg-white/10 backdrop-blur-lg p-4 md:p-5 rounded-2xl border border-white/10 hover:bg-white/20 transition duration-300">
              <h3 className="font-bold text-sm md:text-base">Personalized Experience</h3>
              <p className="text-xs md:text-sm text-gray-300 mt-2">
                Get recommendations tailored to your fashion taste.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg p-4 md:p-5 rounded-2xl border border-white/10 hover:bg-white/20 transition duration-300">
              <h3 className="font-bold text-sm md:text-base">Smart Shopping</h3>
              <p className="text-xs md:text-sm text-gray-300 mt-2">
                Manage cart, wishlist, and orders with ease.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg p-4 md:p-5 rounded-2xl border border-white/10 hover:bg-white/20 transition duration-300">
              <h3 className="font-bold text-sm md:text-base">Secure & Fast</h3>
              <p className="text-xs md:text-sm text-gray-300 mt-2">
                Safe login with fast and smooth performance.
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 md:p-12">
          <div className="text-center mb-6 md:mb-8">
            <div className="w-14 md:w-16 h-14 md:h-16 bg-black text-white rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4 shadow-lg">
              <LogIn size={28} className="md:w-8 md:h-8" />
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Welcome Back</h2>

            <p className="text-gray-500 mt-2 text-sm md:text-base">
              Sign in to your StyLoria account
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-3 md:px-4 py-2 md:py-3 rounded-xl mb-5 text-xs md:text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
            <div>
              <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 md:w-5 md:h-5"
                />

                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="Enter your email"
                  className="w-full pl-10 md:pl-12 pr-4 py-2 md:py-3 rounded-xl border border-gray-200 bg-gray-50 outline-none focus:ring-2 focus:ring-black focus:bg-white text-sm md:text-base"
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
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 md:w-5 md:h-5"
                />

                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  placeholder="Enter your password"
                  className="w-full pl-10 md:pl-12 pr-10 md:pr-12 py-2 md:py-3 rounded-xl border border-gray-200 bg-gray-50 outline-none focus:ring-2 focus:ring-black focus:bg-white text-sm md:text-base"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={18} className="md:w-5 md:h-5" /> : <Eye size={18} className="md:w-5 md:h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs md:text-sm">
              <label className="flex items-center gap-2 text-gray-600">
                <input type="checkbox" className="accent-black" />
                Remember me
              </label>

              <span className="text-gray-500">Forgot password?</span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-3 md:py-4 rounded-xl font-semibold hover:bg-gray-800 transition disabled:opacity-60 text-sm md:text-base"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="mt-6 md:mt-7 text-center text-xs md:text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="font-semibold text-black hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signin;
