export default function ProfileSkeleton() {
  return (
    <div className="max-w-3xl mx-auto p-6 animate-pulse">
      
      {/* Top section: Avatar + Name */}
      <div className="flex items-center gap-6">
        <div className="w-24 h-24 bg-gray-300 rounded-full"></div>

        <div className="space-y-3">
          <div className="h-6 w-48 bg-gray-300 rounded"></div>
          <div className="h-4 w-36 bg-gray-300 rounded"></div>
        </div>
      </div>

      {/* Divider */}
      <div className="h-[1px] bg-gray-200 my-6"></div>

      {/* Info section */}
      <div className="space-y-5">
        <div className="h-5 w-40 bg-gray-300 rounded"></div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

          <div className="space-y-2">
            <div className="h-4 w-20 bg-gray-300 rounded"></div>
            <div className="h-10 w-full bg-gray-300 rounded"></div>
          </div>

          <div className="space-y-2">
            <div className="h-4 w-24 bg-gray-300 rounded"></div>
            <div className="h-10 w-full bg-gray-300 rounded"></div>
          </div>

          <div className="space-y-2">
            <div className="h-4 w-28 bg-gray-300 rounded"></div>
            <div className="h-10 w-full bg-gray-300 rounded"></div>
          </div>

          <div className="space-y-2">
            <div className="h-4 w-20 bg-gray-300 rounded"></div>
            <div className="h-10 w-full bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 mt-8">
        <div className="h-10 w-32 bg-gray-300 rounded-lg"></div>
        <div className="h-10 w-32 bg-gray-200 rounded-lg"></div>
      </div>
    </div>
  );
}
