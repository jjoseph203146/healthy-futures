export default function HomeLoading() {
  return (
    <div className="min-h-screen bg-brand-cream pb-24">
      <div className="max-w-[390px] mx-auto px-5">
        {/* Header */}
        <div className="pt-14">
          <div className="flex items-center justify-between animate-pulse">
            <div className="space-y-2.5">
              <div className="h-7 bg-brand-card rounded-full w-44" />
              <div className="h-3.5 bg-brand-card rounded-full w-32" />
            </div>
            <div className="w-10 h-10 rounded-full bg-brand-card" />
          </div>
        </div>
        {/* Search bar */}
        <div className="mt-4 h-[52px] bg-white border border-brand-card rounded-2xl animate-pulse" />
        {/* Filter chips */}
        <div className="flex gap-2 mt-3.5 animate-pulse">
          <div className="h-8 bg-brand-gold/30 rounded-full w-20" />
          <div className="h-8 bg-brand-card rounded-full w-20" />
          <div className="h-8 bg-brand-card rounded-full w-20" />
        </div>
        {/* Section header */}
        <div className="flex items-center justify-between mt-6 mb-3 animate-pulse">
          <div className="h-4 bg-brand-card rounded-full w-36" />
          <div className="h-3 bg-brand-card rounded-full w-12" />
        </div>
      </div>

      {/* Trending scroll */}
      <div className="flex gap-3.5 px-5 pb-4 overflow-hidden">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="w-[188px] flex-none rounded-[18px] overflow-hidden bg-white border border-brand-card animate-pulse"
          >
            <div className="h-[104px] bg-brand-card" />
            <div className="p-3 space-y-2">
              <div className="h-3.5 bg-brand-card rounded-full w-3/4" />
              <div className="h-3 bg-brand-card rounded-full w-1/2" />
              <div className="h-3 bg-brand-card rounded-full w-1/4" />
            </div>
          </div>
        ))}
      </div>

      <div className="max-w-[390px] mx-auto px-5">
        {/* Category grid header */}
        <div className="h-4 bg-brand-card rounded-full w-40 mb-3 mt-2 animate-pulse" />
        {/* Category grid placeholder */}
        <div className="grid grid-cols-4 gap-2 animate-pulse">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-[72px] bg-brand-card rounded-2xl" />
          ))}
        </div>
        {/* Featured header */}
        <div className="flex items-center justify-between mt-6 mb-3 animate-pulse">
          <div className="h-4 bg-brand-card rounded-full w-40" />
          <div className="h-3 bg-brand-card rounded-full w-12" />
        </div>
        {/* Featured cards */}
        <div className="flex flex-col gap-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex gap-3 bg-white border border-brand-card rounded-[18px] p-3 animate-pulse"
            >
              <div className="w-[78px] h-[78px] rounded-[14px] bg-brand-card flex-none" />
              <div className="flex-1 space-y-2 pt-1">
                <div className="h-4 bg-brand-card rounded-full w-3/4" />
                <div className="h-3 bg-brand-card rounded-full w-1/2" />
                <div className="h-3 bg-brand-card rounded-full w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
