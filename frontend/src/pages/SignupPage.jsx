import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore.js';
import { useNavigate } from 'react-router-dom';

function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();
  const navigate = useNavigate();

  const validateForm = () => {
    const nameRegex = /^[a-zA-Z\s]{2,}$/; // At least 2 characters, letters and spaces only.
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/; // 6 chars, uppercase, lowercase, digit, special.

    if (!formData.fullName || !formData.email || !formData.password) {
      alert("All fields are required.");
      return false;
    }

    if (!nameRegex.test(formData.fullName)) {
      alert("Full Name must contain only letters and spaces, and be at least 2 characters long.");
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      alert("Invalid email address.");
      return false;
    }

    if (!passwordRegex.test(formData.password)) {
      alert(
        "Password must be at least 6 characters long, contain an uppercase letter, a lowercase letter, a digit, and a special character."
      );
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await signup(formData);
        alert("Signup successful!");
      } catch (error) {
        console.error("Error during signup:", error);
        alert("Signup failed.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="card bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="text-gray-600">Full Name</span>
            <input
              type="text"
              className="input input-bordered w-full mt-1"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
            />
          </label>
          <label className="block">
            <span className="text-gray-600">Email Address</span>
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
            disabled={isSigningUp}
            className="btn w-full btn-primary"
          >
            {isSigningUp ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
        <p className="text-center mt-4 text-gray-600">
          have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-blue-500 underline"
          >
            Click here to login
          </button>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;
