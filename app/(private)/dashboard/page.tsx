import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import LumaBarChartNoSSR from "@/app/components/dashboard/LumaBarChartNoSSR";
import ClientLocations from "@/app/components/dashboard/ClientLocations";

const Page: React.FC = () => {
  return (
    <section className=" px-6 xl:px-10 py-6">
      <div>
        <div>
          <Button
            variant="outline"
            className="text-xs rounded-sm shadow-none"
            size="sm"
          >
            <Filter className="w-3!" />
            Filter
          </Button>
        </div>
        <div className="grid grid-cols-3 w-full h-full gap-2 xl:gap-6 mt-2">
          <ClientLocations />
        </div>
      </div>
      <div className="mt-6">
        <LumaBarChartNoSSR />
      </div>
    </section>
  );
};

export default Page;
