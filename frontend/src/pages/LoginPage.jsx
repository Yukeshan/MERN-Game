import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore.js';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, isLoggingIn } = useAuthStore();
  const navigate = useNavigate();

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      alert("Both fields are required.");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      alert("Invalid email address.");
      return false;
    }
    return true;
  };

  const handleGoogleSignIn = () => {
    // Placeholder for Google Sign-In action
    alert('Google Sign-In button clicked!');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await login(formData);
        alert("Login successful!");
      } catch (error) {
        console.error("Error during login:", error);
        alert("Login failed.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="card bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="text-gray-600">Email</span>
            <input
              type="email"
              className="input input-bordered w-full mt-1"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </label>
          <label className="block relative">
            <span className="text-gray-600">Password</span>
            <input
              type={showPassword ? "text" : "password"}
              className="input input-bordered w-full mt-1"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <button
              type="button"
              className="absolute right-2 top-9 text-gray-500"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </label>
          <button
            type="submit"
            disabled={isLoggingIn}
            className="btn w-full btn-primary"
          >
            {isLoggingIn ? "Logging In..." : "Log In"}
          </button>



        </form>

      

        <p className="text-center mt-4 text-gray-600">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/signup")}
            className="text-blue-500 underline"
          >
            Click here to signup
          </button>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
