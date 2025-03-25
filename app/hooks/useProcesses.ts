"use client";
import { useQuery } from "@tanstack/react-query";
import { useStore, Process } from "../store/LocationsStore";
import { useEffect } from "react";

interface ProcessesResponse {
  processes: Process[];
}

const fetchProcesses = async (
  locationId: string
): Promise<ProcessesResponse> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/locations/${locationId}/processes`,
    {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!res.ok) throw new Error("Error obtaining processes");
  return res.json();
};

export const useProcesses = (locationId: string) => {
  const query = useQuery({
    queryKey: ["processes", locationId],
    queryFn: () => fetchProcesses(locationId),
  });

  useEffect(() => {
    if (query.data) {
      useStore.getState().setProcesses(locationId, query.data.processes);
    }
  }, [query.data, locationId]);

  return query;
};
