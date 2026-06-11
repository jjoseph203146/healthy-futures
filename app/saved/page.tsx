import BottomNav from "@/components/BottomNav";
import { SavedList } from "@/components/SavedList";

export default function SavedPage() {
  return (
    <div className="min-h-screen bg-brand-cream pb-24">
      <div className="max-w-[390px] mx-auto px-5">
        <div className="pt-14">
          <h1 className="font-serif text-[27px] font-semibold text-brand-dark">Saved</h1>
        </div>
        <SavedList />
      </div>
      <BottomNav />
    </div>
  );
}
