export function LoginSkeleton() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md p-6 space-y-4 bg-white rounded-xl shadow-md animate-pulse">
        <div className="h-10 bg-gray-300 rounded w-full"></div>
        <div className="h-10 bg-gray-300 rounded w-full"></div>
        <div className="h-10 bg-gray-300 rounded w-full"></div>
        <div className="h-10 bg-gray-300 rounded w-1/2 mx-auto"></div>
      </div>
    </div>
  );
}
