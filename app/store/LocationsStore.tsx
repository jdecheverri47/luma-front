import { create } from "zustand";

export interface Geolocation {
  address: string;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
}

export interface Location {
  id: string;
  clientId: string;
  name: string;
  shortDescription: string;
  createdAt: string;
  geolocation: Geolocation;
}

export interface ProcessDetails {
  description: string;
  type: string;
  activeWarnings: number;
}

export interface Process {
  id: string;
  name: string;
  status: "RUNNING" | "STOPPED" | "ISSUES";
  machineCount: number;
  actionCount: number;
  details: ProcessDetails;
  createdAt: string;
}

interface StoreState {
  locations: Location[];
  setLocations: (locations: Location[]) => void;
  processes: Record<string, Process[]>;
  setProcesses: (locationId: string, processes: Process[]) => void;
}

export const useStore = create<StoreState>((set) => ({
  locations: [],
  setLocations: (locations: Location[]) => set({ locations }),
  processes: {},
  setProcesses: (locationId: string, processes: Process[]) =>
    set((state) => ({
      processes: { ...state.processes, [locationId]: processes },
    })),
}));
