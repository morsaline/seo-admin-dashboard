"use client";

import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center  min-h-screen">
      <div className="relative w-16 h-16">
        {/* Outer circle */}
        <div className="absolute inset-0 rounded-full border-4 border-orange-300 border-t-orange-500 animate-spin"></div>
        {/* Middle circle */}
        <div className="absolute inset-2 rounded-full border-4 border-orange-200 border-t-orange-400 animate-spin animation-delay-200"></div>
        {/* Inner circle */}
        <div className="absolute inset-4 rounded-full border-4 border-orange-100 border-t-orange-300 animate-spin animation-delay-400"></div>
      </div>
    </div>
  );
};

export default Loader;
