export default function Loading() {
  return (
    <div className="min-h-[calc(100dvh-96px)] bg-background">
      <div className="max-w-6xl mx-auto px-5 md:px-10 py-6 md:py-8 space-y-8">
        <div className="h-8 w-24 bg-border-color/30 rounded animate-pulse" />
        <div className="flex gap-3 overflow-hidden">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex-none w-[260px] md:w-[300px] h-[180px] bg-border-color/20 rounded-xl animate-pulse"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
