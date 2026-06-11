export default function BusinessLoading() {
  return (
    <div className="min-h-screen bg-brand-cream">
      {/* Hero placeholder */}
      <div className="relative h-56 w-full bg-brand-card animate-pulse">
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20" />
        {/* Back button skeleton */}
        <div className="absolute top-14 left-5 w-[34px] h-[34px] rounded-full bg-white/60" />
        {/* Save/map button skeletons */}
        <div className="absolute top-14 right-5 flex gap-2">
          <div className="w-[34px] h-[34px] rounded-full bg-white/60" />
          <div className="w-[34px] h-[34px] rounded-full bg-white/60" />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[390px] mx-auto px-5 pb-12">
        <div className="pt-4 space-y-2.5 animate-pulse">
          {/* Name */}
          <div className="h-7 bg-brand-card rounded-full w-3/4" />
          {/* Category + badges */}
          <div className="flex items-center gap-2">
            <div className="h-3.5 bg-brand-card rounded-full w-2/5" />
            <div className="h-4 bg-brand-card rounded-full w-20" />
          </div>
          {/* Stars */}
          <div className="flex items-center gap-2">
            <div className="h-4 bg-brand-card rounded-full w-24" />
            <div className="h-3.5 bg-brand-card rounded-full w-10" />
            <div className="h-3.5 bg-brand-card rounded-full w-16" />
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 mt-4 animate-pulse">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex-1 h-[60px] bg-brand-card rounded-[14px]" />
          ))}
        </div>

        {/* About */}
        <div className="mt-5 space-y-2 animate-pulse">
          <div className="h-3 bg-brand-card rounded-full w-16" />
          <div className="h-3.5 bg-brand-card rounded-full w-full" />
          <div className="h-3.5 bg-brand-card rounded-full w-full" />
          <div className="h-3.5 bg-brand-card rounded-full w-4/5" />
        </div>

        {/* Info rows */}
        <div className="mt-4 flex flex-col gap-3 animate-pulse">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-[18px] h-[18px] rounded-full bg-brand-card flex-none" />
              <div className="h-3.5 bg-brand-card rounded-full flex-1 max-w-xs" />
            </div>
          ))}
        </div>

        {/* Map placeholder */}
        <div className="mt-4 h-[118px] rounded-2xl bg-brand-card animate-pulse" />

        {/* Reviews header */}
        <div className="mt-5 flex items-center justify-between animate-pulse">
          <div className="h-4 bg-brand-card rounded-full w-20" />
          <div className="h-7 bg-brand-card rounded-full w-28" />
        </div>

        {/* Review cards */}
        <div className="mt-3 flex flex-col gap-3">
          {[1, 2].map((i) => (
            <div key={i} className="bg-white border border-brand-card rounded-2xl p-3.5 animate-pulse">
              <div className="flex items-center gap-2.5">
                <div className="w-[34px] h-[34px] rounded-full bg-brand-card flex-none" />
                <div className="flex-1 space-y-1.5">
                  <div className="h-3.5 bg-brand-card rounded-full w-1/3" />
                  <div className="h-3 bg-brand-card rounded-full w-1/4" />
                </div>
                <div className="h-3 bg-brand-card rounded-full w-16 flex-none" />
              </div>
              <div className="mt-2.5 space-y-1.5">
                <div className="h-3 bg-brand-card rounded-full w-full" />
                <div className="h-3 bg-brand-card rounded-full w-3/4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
