import { Skeleton } from "@/components/ui/skeleton";

const DashboardCardSkeleton = () => {
  return (
    <div className="bg-white rounded-sm border border-slate-200 p-4">
      <div className="flex flex-col gap-2">
        <Skeleton className="w-24 h-4" />
        <Skeleton className="w-32 h-3" />
      </div>
      <div className="mt-4">
        <Skeleton className="w-full h-30" />
        <Skeleton className="w-full h-30 mt-2" />
      </div>
    </div>
  );
};

export default DashboardCardSkeleton;
