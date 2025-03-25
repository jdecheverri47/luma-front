"use client";

import { useLocations } from "@/app/hooks/useLocations";
import LocationCard from "@/app/components/dashboard/LocationCard";
import DashboardCardSkeleton from "./DashboardCardSkeleton";
import { AlertDestructive } from "./AlertDestructive";
const ClientLocations: React.FC = () => {
  const { data, isLoading, error } = useLocations();

  if (isLoading) return <DashboardCardSkeleton />;
  if (error) return <AlertDestructive description={error.message} />;

  return (
    <>
      {data?.locations.map((location) => (
        <LocationCard key={location.id} location={location} />
      ))}
    </>
  );
};

export default ClientLocations;
