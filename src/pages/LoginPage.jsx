import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../supabase/supabaseClient.js";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState({
    google: false,
    facebook: false,
    email: false,
  });

  const from = location.state?.from?.pathname || "/";
  const searchParams = new URLSearchParams(location.search);
  const redirect = searchParams.get("redirect") || from;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Handle social login
  const handleSocialLogin = async (provider) => {
    try {
      setLoading((prev) => ({ ...prev, [provider]: true }));

      const { error } = await supabase.auth.signInWithOAuth({
        provider: provider.toLowerCase(),
        options: {
          redirectTo: `${window.location.origin}/auth/callback?redirect=${redirect}`,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });

      if (error) throw error;
    } catch (error) {
      setErrors({ form: error.message });
    } finally {
      setLoading((prev) => ({ ...prev, [provider]: false }));
    }
  };

  const handleEmailChange = (e) => {
    const val = e.target.value;
    setEmail(val);
    setErrors((prev) => ({ ...prev, email: undefined }));
  };

  const handlePasswordChange = (e) => {
    const val = e.target.value;
    setPassword(val);
    setErrors((prev) => ({ ...prev, password: undefined }));
  };

  const validateOnSubmit = () => {
    const newErrors = {};

    if (!email) newErrors.email = "Email is required";
    else if (!emailRegex.test(email)) newErrors.email = "Enter a valid email";

    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (validateOnSubmit()) {
      try {
        setLoading((prev) => ({ ...prev, email: true }));
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;
        navigate(redirect, { replace: true });
      } catch (error) {
        setErrors({ form: error.message });
      } finally {
        setLoading((prev) => ({ ...prev, email: false }));
      }
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url('/images/SignupOptionsimage.jpg')` }}
    >
      <div className="bg-white bg-opacity-90 p-8 rounded-2xl shadow-xl w-full max-w-md">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-gray-300" />
          <h2 className="text-2xl font-semibold">Log in</h2>

          {/* Google Login Button */}
          <button
            onClick={() => handleSocialLogin("google")}
            disabled={loading.google}
            className="flex items-center justify-center gap-2 w-full py-2 px-4 border border-gray-300 rounded-full shadow-sm hover:bg-gray-100 transition disabled:opacity-70"
          >
            <img src="/images/search.png" alt="Google" className="w-5 h-5" />
            {loading.google ? "Signing in..." : "Continue with Google"}
          </button>

          {/* Facebook Login Button */}
          <button
            onClick={() => handleSocialLogin("facebook")}
            disabled={loading.facebook}
            className="flex items-center justify-center gap-2 w-full py-2 px-4 border border-gray-300 rounded-full shadow-sm hover:bg-gray-100 transition disabled:opacity-70"
          >
            <img
              src="/images/facebook.png"
              alt="Facebook"
              className="w-5 h-5"
            />
            {loading.facebook ? "Signing in..." : "Continue with Facebook"}
          </button>

          <div className="w-full flex items-center gap-2 py-2">
            <hr className="flex-grow border-gray-300" />
            <span className="text-gray-500 text-sm">OR</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {errors.form && (
            <div className="w-full p-2 bg-red-100 text-red-700 rounded-md text-sm">
              {errors.form}
            </div>
          )}

          <form onSubmit={handleLogin} className="w-full space-y-2">
            <div className="w-full">
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={handleEmailChange}
                className={`w-full p-2 border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 ${
                  errors.email ? "focus:ring-red-400" : "focus:ring-blue-400"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div className="w-full relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                className={`w-full p-2 border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 ${
                  errors.password ? "focus:ring-red-400" : "focus:ring-blue-400"
                }`}
              />
              <span
                className="absolute right-3 top-2.5 text-xl text-gray-500 cursor-pointer select-none"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <div className="w-full flex items-center justify-between text-sm text-gray-600">
              <a href="/forgotpassword" className="hover:underline">
                Forgot your password
              </a>
              <label className="flex items-center gap-1">
                <input type="checkbox" className="accent-blue-500" />
                Remember me
              </label>
            </div>

            <button
              type="submit"
              disabled={loading.email}
              className="w-full mt-2 py-2 bg-blue-400 text-white font-semibold rounded-full hover:bg-blue-700 transition disabled:opacity-70"
            >
              {loading.email ? "Signing in..." : "Log in"}
            </button>
          </form>

          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/signup")}
              className="text-blue-600 hover:underline focus:outline-none"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
