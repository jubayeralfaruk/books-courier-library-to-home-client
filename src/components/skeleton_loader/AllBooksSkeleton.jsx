import React from "react";

// Skeleton Loader for AllBooks Page
export function AllBooksSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse bg-gray-300 h-64 rounded-xl shadow-md"></div>
      ))}
    </div>
  );
}
