export function BookDetailsSkeleton() {
  return (
    <>
    {/* <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-2 gap-6">
      <div className="animate-pulse bg-gray-300 h-80 rounded-2xl"></div>
      <div className="space-y-4 animate-pulse">
        <div className="h-8 bg-gray-300 rounded w-3/4"></div>
        <div className="h-6 bg-gray-300 rounded w-1/2"></div>
        <div className="h-6 bg-gray-300 rounded w-full"></div>
        <div className="h-40 bg-gray-300 rounded"></div>
        <div className="h-10 bg-gray-300 rounded w-32"></div>
      </div>
    </div> */}
    <div className="max-w-6xl mx-auto rounded-3xl p-4 shadow-gray-900 shadow-2xl overflow-hidden border border-gray-900 animate-pulse">
      <div className="grid md:grid-cols-2 gap-2">
        {/* Left Image Skeleton */}
        <div className="relative border border-gray-800 p-2 rounded-3xl">
          <div className="w-full h-[320px] md:h-[520px] bg-gray-800 rounded-3xl"></div>

          {/* Status badge skeleton */}
          <div className="absolute top-4 left-4 w-20 h-6 bg-gray-700 rounded-full"></div>
        </div>

        {/* Right Content Skeleton */}
        <div className="p-10 flex flex-col justify-center space-y-4">
          {/* Title */}
          <div className="h-10 w-3/4 bg-gray-700 rounded"></div>

          {/* Author */}
          <div className="h-4 w-1/2 bg-gray-700 rounded"></div>

          {/* Short Description */}
          <div className="space-y-2">
            <div className="h-4 w-full bg-gray-700 rounded"></div>
            <div className="h-4 w-5/6 bg-gray-700 rounded"></div>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 bg-gray-700 rounded-full"></div>
            <div className="h-5 w-24 bg-gray-700 rounded"></div>
          </div>

          {/* Price */}
          <div className="h-10 w-32 bg-gray-700 rounded"></div>

          {/* Buttons */}
          <div className="flex gap-4 mt-4">
            <div className="h-12 w-36 bg-gray-700 rounded-2xl"></div>
            <div className="h-12 w-44 bg-gray-700 rounded-2xl"></div>
          </div>
        </div>
      </div>

      {/* Description Skeleton */}
      <div className="mt-6 md:mt-10 space-y-3">
        <div className="h-5 w-40 bg-gray-700 rounded"></div>
        <div className="h-4 w-full bg-gray-700 rounded"></div>
        <div className="h-4 w-full bg-gray-700 rounded"></div>
        <div className="h-4 w-11/12 bg-gray-700 rounded"></div>
      </div>
    </div>
    </>
  );
}
