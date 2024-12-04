import React from "react";
import { useAuthStore } from "../store/useAuthStore"; // Assuming you're using Zustand for state management

function ProfilePage() {
  const { authUser } = useAuthStore(); // Get user data from the store
  const { fullName, email, totalScore } = authUser || {}; // Destructure data from authUser

  return (
    <div className="min-h-screen bg-purple-200 flex flex-col items-center justify-center py-8">
      <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Profile</h2>
        <div className="space-y-6">
          <div className="flex justify-between">
            <p className="font-medium text-lg text-gray-600">Full Name:</p>
            <p className="text-lg text-gray-700">{fullName || "Loading..."}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-medium text-lg text-gray-600">Email:</p>
            <p className="text-lg text-gray-700">{email || "Loading..."}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-medium text-lg text-gray-600">Total Score:</p>
            <p className="text-lg text-gray-700">{totalScore || 0}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
