import OptimizationTabs from "@/app/components/dashboard/optimizations/OptimizationTabs";
const page: React.FC = () => {
  return (
    <section className="w-full h-full p-5">
      <div className="w-full flex justify-center">
        <OptimizationTabs />
      </div>
    </section>
  );
};

export default page;
