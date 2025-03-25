"use client";
import { useQuery } from "@tanstack/react-query";
import { useStore, Location } from "../store/LocationsStore";
import { useEffect } from "react";

interface LocationsResponse {
  locations: Location[];
}

//fetch
const fetchLocations = async (): Promise<LocationsResponse> => {
  const res = await fetch(
    // "https://dev.remote.api.lumasystems.ai/v1/locations",
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/locations`,
    {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!res.ok) throw new Error("Error obtaining locations");
  return res.json();
};

export const useLocations = () => {
  const query = useQuery({
    queryKey: ["locations"],
    queryFn: fetchLocations,
  });

  useEffect(() => {
    if (query.data) {
      useStore.getState().setLocations(query.data.locations);
    }
  }, [query.data]);

  return query;
};
