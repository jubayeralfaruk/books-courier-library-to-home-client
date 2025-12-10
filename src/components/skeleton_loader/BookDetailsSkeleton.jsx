export function BookDetailsSkeleton() {
  return (
    <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-2 gap-6">
      <div className="animate-pulse bg-gray-300 h-80 rounded-2xl"></div>
      <div className="space-y-4 animate-pulse">
        <div className="h-8 bg-gray-300 rounded w-3/4"></div>
        <div className="h-6 bg-gray-300 rounded w-1/2"></div>
        <div className="h-6 bg-gray-300 rounded w-full"></div>
        <div className="h-40 bg-gray-300 rounded"></div>
        <div className="h-10 bg-gray-300 rounded w-32"></div>
      </div>
    </div>
  );
}
