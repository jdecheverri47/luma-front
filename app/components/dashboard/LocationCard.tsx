import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Server, Activity } from "lucide-react";
import React from "react";
import { Location } from "@/app/store/LocationsStore";
import { useProcesses } from "@/app/hooks/useProcesses";
import { TypographySmall } from "../ui/Typography";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertDestructive } from "./AlertDestructive";

export type ProcessStatus = "Running" | "Stopped" | "Running with issues";

export interface Process {
  id: string;
  name: string;
  status: ProcessStatus | string; // puede ser un string del backend
  actions: string;
  machines: string;
  date: string;
}

// Helper para convertir el status a PascalCase
function toPascalCase(str: string) {
  return str
    .toLowerCase()
    .replace(/_/g, " ") // reemplazar guiones bajos por espacio, si existen
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

interface LocationCardProps {
  location: Location;
}

const LocationCard: React.FC<LocationCardProps> = ({ location }) => {
  const { data, isLoading, error } = useProcesses(location.id);

  return (
    <Card className="rounded-sm p-0 pb-2 gap-0 shadow-none">
      <CardHeader className="p-4">
        <CardTitle className="font-medium text-sm">
          Location {location.name}
        </CardTitle>
        <CardDescription className="text-xs text-slate-600">
          {location.geolocation.country +
            ", " +
            location.geolocation.city +
            " - " +
            location.geolocation.address}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-2 px-4 py-0 max-h-[400px] overflow-y-auto">
        {isLoading && (
          <>
            <Skeleton className="w-full h-30 rounded-sm" />
            <Skeleton className="w-full h-30 rounded-sm mt-2" />
          </>
        )}
        {error && <AlertDestructive description="Error loading processes" />}

        {/* Si no hay procesos, muestra "No Processes Available" */}
        {!isLoading &&
          !error &&
          (!data?.processes || data.processes.length === 0) && (
            <TypographySmall className="text-slate-500">
              No Processes Available
            </TypographySmall>
          )}

        {data?.processes?.map((process) => (
          <div
            key={process.id}
            className="bg-slate-100 p-2 rounded-sm border border-transparent hover:border-slate-500 cursor-pointer"
          >
            <div className="flex justify-between">
              <div>
                <h3 className="text-xs font-medium">{process.name}</h3>
                <p className="text-xs mt-1 text-slate-500">
                  {new Date(process.createdAt).toLocaleString()}
                </p>
              </div>
              <div>
                {process.status === "RUNNING" ? (
                  <Badge
                    variant="outline"
                    className="bg-green-50 text-green-700 border-green-200"
                  >
                    {toPascalCase(process.status)}
                  </Badge>
                ) : process.status === "STOPPED" ? (
                  <Badge
                    variant="outline"
                    className="bg-red-50 text-red-700 border-red-200"
                  >
                    {toPascalCase(process.status)}
                  </Badge>
                ) : (
                  <Badge
                    variant="outline"
                    className="bg-yellow-50 text-yellow-700 border-yellow-200"
                  >
                    {toPascalCase(process.status)}
                  </Badge>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-2">
              <div className="border border-slate-200 p-2 rounded-sm bg-slate-50">
                <div className="flex justify-between items-start gap-1">
                  <p className="text-xs">Machines</p>
                  <Server className="w-4 h-4 text-slate-500" />
                </div>
                <span className="text-xl font-medium">
                  {process.machineCount}
                </span>
              </div>

              <div className="border border-slate-200 p-2 rounded-sm bg-slate-50">
                <div className="flex justify-between items-start gap-1">
                  <p className="text-xs">Actions</p>
                  <Activity className="w-4 h-4 text-slate-500" />
                </div>
                <span className="text-xl font-medium">
                  {process.actionCount}
                </span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default LocationCard;
