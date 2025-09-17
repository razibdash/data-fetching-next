// components/UserSkeleton.tsx
import React from "react";

const UserSkeleton = () => {
  return (
    <div className="animate-pulse bg-white shadow-md rounded-xl p-6 border border-gray-200">
      <div className="h-5 w-32 bg-gray-300 rounded mb-3"></div>
      <div className="h-4 w-20 bg-gray-300 rounded mb-2"></div>
      <div className="h-4 w-40 bg-gray-300 rounded mb-2"></div>
      <div className="h-4 w-24 bg-gray-300 rounded"></div>
    </div>
  );
};

export default UserSkeleton;
