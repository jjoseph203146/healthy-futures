export default function SearchLoading() {
  return (
    <div className="min-h-screen bg-brand-cream pb-24">
      <div className="max-w-[390px] mx-auto px-5">
        <div className="pt-14">
          {/* Search bar */}
          <div className="h-[46px] bg-white border-[1.5px] border-brand-gold/30 rounded-2xl animate-pulse" />
          {/* Filter tabs */}
          <div className="flex gap-1.5 mt-3 animate-pulse">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-7 w-[72px] bg-brand-card rounded-full" />
            ))}
          </div>
          {/* Results count */}
          <div className="mt-3 h-3.5 w-28 bg-brand-card rounded-full animate-pulse" />
        </div>

        {/* Business card skeletons */}
        <div className="mt-3 flex flex-col gap-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="flex gap-3 bg-white border border-brand-card rounded-[18px] p-3 animate-pulse"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="w-[78px] h-[78px] rounded-[14px] bg-brand-card flex-none" />
              <div className="flex-1 space-y-2.5 pt-1">
                <div className="flex justify-between">
                  <div className="h-4 bg-brand-card rounded-full w-3/5" />
                  <div className="h-4 bg-brand-card rounded-full w-10" />
                </div>
                <div className="h-3 bg-brand-card rounded-full w-2/5" />
                <div className="h-3 bg-brand-card rounded-full w-full" />
                <div className="h-3 bg-brand-card rounded-full w-4/5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
