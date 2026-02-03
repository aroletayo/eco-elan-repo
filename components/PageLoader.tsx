"use client";

import React from "react";
import Lottie from "lottie-react";
import loaderAnimation from "@/public/lottie/ScrubBrush.json";

const PageLoader = () => {
  return (
    <div className="min-h-screen md:min-h-[70vh] bg-background flex items-center justify-center">
      <div className="flex flex-col items-center gap-4 text-center">
        {/* Lottie Animation */}
        <div className="w-40 h-40">
          <Lottie animationData={loaderAnimation} loop autoplay />
        </div>

        {/* Text */}
        <div className="space-y-1">
          <p className="text-lg font-medium text-foreground">Loading...</p>
          <p className="text-sm text-muted-foreground">
            Please wait while we prepare everything
          </p>
        </div>
      </div>
    </div>
  );
};

export default PageLoader;
