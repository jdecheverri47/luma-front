export type Target = {
  id: string;
  type: "MACHINE" | "PROCESS" | "LOCATION" | string;
  name: string;
};

export interface Alert {
  id: string;
  humanReadableId: string;
  clientId: string;
  title: string;
  target: Target;
  status: "Pending" | "In Progress" | "Fixed" | string;
  priority: "High" | "Medium" | "Low" | string;
  assignedTo: string | null;
  createdAt: string;
  updatedAt: string;
}

export const alerts: Alert[] = [
  {
    id: "10001",
    humanReadableId: "ALERT-5786",
    clientId: "client-001",
    title: "Temperature over 72º",
    target: { id: "T001", type: "MACHINE", name: "85731" },
    status: "Pending",
    priority: "High",
    assignedTo: "user-01",
    createdAt: "2025-02-10T22:00:00Z",
    updatedAt: "2025-02-11T21:59:00Z",
  },
  {
    id: "10002",
    humanReadableId: "ALERT-5823",
    clientId: "client-002",
    title: "Process stopped",
    target: { id: "T002", type: "PROCESS", name: "12983" },
    status: "In Progress",
    priority: "Medium",
    assignedTo: null,
    createdAt: "2025-02-10T22:10:00Z",
    updatedAt: "2025-02-11T22:00:00Z",
  },
  {
    id: "10003",
    humanReadableId: "ALERT-5940",
    clientId: "client-003",
    title: "Unstable Connection",
    target: { id: "T003", type: "LOCATION", name: "60423" },
    status: "Fixed",
    priority: "Low",
    assignedTo: "user-03",
    createdAt: "2025-02-10T22:20:00Z",
    updatedAt: "2025-02-11T22:10:00Z",
  },
  {
    id: "10004",
    humanReadableId: "ALERT-6001",
    clientId: "client-004",
    title: "Process stopped",
    target: { id: "T004", type: "PROCESS", name: "73210" },
    status: "Pending",
    priority: "High",
    assignedTo: "user-04",
    createdAt: "2025-02-10T22:30:00Z",
    updatedAt: "2025-02-11T22:20:00Z",
  },
  {
    id: "10005",
    humanReadableId: "ALERT-6123",
    clientId: "client-005",
    title: "Unstable Connection",
    target: { id: "T005", type: "MACHINE", name: "49103" },
    status: "In Progress",
    priority: "Medium",
    assignedTo: null,
    createdAt: "2025-02-10T22:40:00Z",
    updatedAt: "2025-02-11T22:30:00Z",
  },
  {
    id: "10006",
    humanReadableId: "ALERT-6250",
    clientId: "client-006",
    title: "Temperature over 72º",
    target: { id: "T006", type: "LOCATION", name: "38591" },
    status: "Fixed",
    priority: "Low",
    assignedTo: "user-06",
    createdAt: "2025-02-10T22:50:00Z",
    updatedAt: "2025-02-11T22:40:00Z",
  },
  {
    id: "10007",
    humanReadableId: "ALERT-6333",
    clientId: "client-007",
    title: "Process stopped",
    target: { id: "T007", type: "MACHINE", name: "54728" },
    status: "Pending",
    priority: "High",
    assignedTo: "user-07",
    createdAt: "2025-02-10T23:00:00Z",
    updatedAt: "2025-02-11T22:50:00Z",
  },
  {
    id: "10008",
    humanReadableId: "ALERT-6450",
    clientId: "client-008",
    title: "Unstable Connection",
    target: { id: "T008", type: "PROCESS", name: "92840" },
    status: "In Progress",
    priority: "Medium",
    assignedTo: null,
    createdAt: "2025-02-10T23:10:00Z",
    updatedAt: "2025-02-11T23:00:00Z",
  },
  {
    id: "10009",
    humanReadableId: "ALERT-6588",
    clientId: "client-009",
    title: "Temperature over 72º",
    target: { id: "T009", type: "LOCATION", name: "17392" },
    status: "Fixed",
    priority: "Low",
    assignedTo: "user-09",
    createdAt: "2025-02-10T23:20:00Z",
    updatedAt: "2025-02-11T23:10:00Z",
  },
  {
    id: "10010",
    humanReadableId: "ALERT-6700",
    clientId: "client-010",
    title: "Process stopped",
    target: { id: "T010", type: "MACHINE", name: "85630" },
    status: "Pending",
    priority: "High",
    assignedTo: "user-10",
    createdAt: "2025-02-10T23:30:00Z",
    updatedAt: "2025-02-11T23:20:00Z",
  },
];
