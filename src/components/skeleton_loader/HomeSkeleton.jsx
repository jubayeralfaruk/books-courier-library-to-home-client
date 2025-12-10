export function HomeSkeleton() {
  return (
    <div className="p-6 space-y-6">
      <div className="animate-pulse bg-gray-300 h-64 rounded-2xl w-full"></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="animate-pulse bg-gray-300 h-48 rounded-xl"></div>
        ))}
      </div>
    </div>
  );
}
