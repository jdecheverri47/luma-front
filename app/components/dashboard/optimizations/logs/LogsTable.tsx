"use client";

import { useState } from "react";
import { format } from "date-fns";
import {
  MoreHorizontal,
  ArrowUpDown,
  CheckCircle2,
  Clock,
  XCircle,
  ThumbsUp,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

// Define the types for our data
type OptimizationType = "AUTOMATION" | "SUGGESTION";
type OptimizationStatus =
  | "IN_PROGRESS"
  | "COMPLETED"
  | "DISMISSED"
  | "ACCEPTED";

interface OptimizationAction {
  id: string;
  name: string;
  details: string;
}

interface OptimizationMetadata {
  id?: string;
  clientId: string;
  title?: string;
  status?: OptimizationStatus;
  impactEstimate: string | null;
  impactValue: number;
  description: string | null;
  strategy?: string;
  actions: OptimizationAction[];
  createdAt: string;
  updatedAt: string;
}

interface Optimization {
  id: string;
  type: OptimizationType;
  title: string;
  status: OptimizationStatus;
  date: string;
  metadata: OptimizationMetadata;
}

interface OptimizationsData {
  optimizations: Optimization[];
  pageInfo: {
    currentPage: number;
    pageSize: number;
    totalPages: number;
    totalItems: number;
  };
}

// Sample data
const data: OptimizationsData = {
  optimizations: [
    {
      id: "OP-0921",
      type: "AUTOMATION",
      title: "Local Energy Savings",
      status: "IN_PROGRESS",
      date: "2025-02-11T22:15:00",
      metadata: {
        id: "auto-1",
        clientId: "client-abc",
        title: "Local Energy Savings",
        status: "IN_PROGRESS",
        impactEstimate: null,
        impactValue: 5,
        description: null,
        actions: [],
        createdAt: "2025-02-11T21:59:00",
        updatedAt: "2025-02-11T22:15:00",
      },
    },
    {
      id: "OP-0922",
      type: "SUGGESTION",
      title: "Improvement Connection",
      status: "DISMISSED",
      date: "2025-02-11T21:59:00Z",
      metadata: {
        clientId: "client123",
        impactEstimate: "Enhanced performance",
        impactValue: 50,
        description:
          "Suggestion to switch some machines to a wired connection...",
        strategy: "Wired vs. wireless shift",
        actions: [
          {
            id: "act-201",
            name: "Use Wired Network",
            details: "Requires additional cabling in building #2",
          },
        ],
        createdAt: "2025-02-11T20:00:00Z",
        updatedAt: "2025-02-11T21:55:00Z",
      },
    },
    {
      id: "OP-0923",
      type: "AUTOMATION",
      title: "Server Optimization",
      status: "COMPLETED",
      date: "2025-02-10T14:30:00Z",
      metadata: {
        id: "auto-2",
        clientId: "client-def",
        title: "Server Optimization",
        status: "COMPLETED",
        impactEstimate: "Reduced server load",
        impactValue: 25,
        description:
          "Automated server resource allocation based on usage patterns",
        actions: [
          {
            id: "act-101",
            name: "Resource Reallocation",
            details: "Dynamically adjusted CPU and memory allocation",
          },
        ],
        createdAt: "2025-02-09T10:15:00Z",
        updatedAt: "2025-02-10T14:30:00Z",
      },
    },
    {
      id: "OP-0924",
      type: "SUGGESTION",
      title: "Cloud Migration Strategy",
      status: "ACCEPTED",
      date: "2025-02-08T09:45:00Z",
      metadata: {
        clientId: "client-xyz",
        impactEstimate: "Cost reduction and scalability",
        impactValue: 75,
        description:
          "Suggestion to migrate on-premise infrastructure to cloud services",
        strategy: "Phased migration approach",
        actions: [
          {
            id: "act-301",
            name: "Assessment Phase",
            details: "Evaluate current infrastructure and cloud options",
          },
          {
            id: "act-302",
            name: "Migration Planning",
            details: "Develop timeline and resource allocation",
          },
        ],
        createdAt: "2025-02-05T16:20:00Z",
        updatedAt: "2025-02-08T09:45:00Z",
      },
    },
    {
      id: "OP-0925",
      type: "AUTOMATION",
      title: "Backup Schedule Optimization",
      status: "IN_PROGRESS",
      date: "2025-02-12T08:00:00Z",
      metadata: {
        id: "auto-3",
        clientId: "client-ghi",
        title: "Backup Schedule Optimization",
        status: "IN_PROGRESS",
        impactEstimate: "Improved data protection",
        impactValue: 40,
        description:
          "Automated adjustment of backup schedules based on data change frequency",
        actions: [
          {
            id: "act-401",
            name: "Schedule Analysis",
            details: "Analyzing data change patterns",
          },
        ],
        createdAt: "2025-02-12T07:30:00Z",
        updatedAt: "2025-02-12T08:00:00Z",
      },
    },
    {
      id: "OP-0926",
      type: "SUGGESTION",
      title: "Security Protocol Update",
      status: "COMPLETED",
      date: "2025-02-07T11:20:00Z",
      metadata: {
        clientId: "client-456",
        impactEstimate: "Enhanced security posture",
        impactValue: 90,
        description:
          "Suggestion to implement latest security protocols across all systems",
        strategy: "Systematic security update rollout",
        actions: [
          {
            id: "act-501",
            name: "Protocol Selection",
            details: "Identify and select appropriate security protocols",
          },
          {
            id: "act-502",
            name: "Implementation",
            details: "Deploy updates across all systems",
          },
          {
            id: "act-503",
            name: "Verification",
            details: "Verify successful implementation",
          },
        ],
        createdAt: "2025-02-01T09:00:00Z",
        updatedAt: "2025-02-07T11:20:00Z",
      },
    },
  ],
  pageInfo: {
    currentPage: 1,
    pageSize: 10,
    totalPages: 1,
    totalItems: 6,
  },
};

export default function LogsTable() {
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [statusSortCycle, setStatusSortCycle] = useState<number>(0);

  // Define status priority orders for each cycle
  const statusPriorityOrders = [
    {}, // Cycle 0: Default order (no custom sorting)
    { IN_PROGRESS: 0, ACCEPTED: 1, DISMISSED: 2, COMPLETED: 3 }, // Cycle 1
    { ACCEPTED: 0, DISMISSED: 1, COMPLETED: 2, IN_PROGRESS: 3 }, // Cycle 2
    { DISMISSED: 0, COMPLETED: 1, IN_PROGRESS: 2, ACCEPTED: 3 }, // Cycle 3
    { COMPLETED: 0, IN_PROGRESS: 1, ACCEPTED: 2, DISMISSED: 3 }, // Cycle 4
  ];

  const handleSort = (column: string) => {
    if (column === "status") {
      // For status column, cycle through the custom sort orders
      setStatusSortCycle((prev) => (prev + 1) % 5);
      setSortColumn("status");
    } else {
      // For other columns, use the standard asc/desc sorting
      if (sortColumn === column) {
        setSortDirection(sortDirection === "asc" ? "desc" : "asc");
      } else {
        setSortColumn(column);
        setSortDirection("asc");
      }
      // Reset status sort cycle when sorting by other columns
      setStatusSortCycle(0);
    }
  };

  const handleSelectRow = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedRows((prev) => [...prev, id]);
    } else {
      setSelectedRows((prev) => prev.filter((rowId) => rowId !== id));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(sortedData.map((row) => row.id));
    } else {
      setSelectedRows([]);
    }
  };

  const sortedData = [...data.optimizations].sort((a, b) => {
    if (!sortColumn) return 0;

    let valueA, valueB;

    if (sortColumn === "status" && statusSortCycle > 0) {
      // Use custom status sorting based on the current cycle
      const priorityOrder = statusPriorityOrders[statusSortCycle];
      return (
        (priorityOrder[a.status] ?? Infinity) -
        (priorityOrder[b.status] ?? Infinity)
      );
    } else {
      // Standard sorting for other columns or when status cycle is 0
      switch (sortColumn) {
        case "id":
          valueA = a.id;
          valueB = b.id;
          break;
        case "title":
          valueA = a.title;
          valueB = b.title;
          break;
        case "date":
          valueA = new Date(a.date).getTime();
          valueB = new Date(b.date).getTime();
          break;
        case "status":
          valueA = a.status;
          valueB = b.status;
          break;
        default:
          return 0;
      }

      if (valueA < valueB) return sortDirection === "asc" ? -1 : 1;
      if (valueA > valueB) return sortDirection === "asc" ? 1 : -1;
      return 0;
    }
  });

  // Helper function to render status badge
  const renderStatusBadge = (status: OptimizationStatus) => {
    switch (status) {
      case "IN_PROGRESS":
        return (
          <Badge
            variant="outline"
            className="bg-blue-50 text-blue-700 border-blue-200"
          >
            <Clock className="w-3 h-3 mr-1" /> In Progress
          </Badge>
        );
      case "COMPLETED":
        return (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200"
          >
            <CheckCircle2 className="w-3 h-3 mr-1" /> Completed
          </Badge>
        );
      case "DISMISSED":
        return (
          <Badge
            variant="outline"
            className="bg-red-50 text-red-700 border-red-200"
          >
            <XCircle className="w-3 h-3 mr-1" /> Dismissed
          </Badge>
        );
      case "ACCEPTED":
        return (
          <Badge
            variant="outline"
            className="bg-purple-50 text-purple-700 border-purple-200"
          >
            <ThumbsUp className="w-3 h-3 mr-1" /> Accepted
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Get the current status cycle label
  const getStatusSortLabel = () => {
    switch (statusSortCycle) {
      case 1:
        return "In Progress → Accepted → Dismissed → Completed";
      case 2:
        return "Accepted → Dismissed → Completed → In Progress";
      case 3:
        return "Dismissed → Completed → In Progress → Accepted";
      case 4:
        return "Completed → In Progress → Accepted → Dismissed";
      default:
        return "Status";
    }
  };

  return (
    <div className="rounded-sm border">
      <Table className="bg-white rounded-sm">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">
              <Checkbox
                checked={
                  selectedRows.length === sortedData.length &&
                  sortedData.length > 0
                }
                onCheckedChange={handleSelectAll}
                aria-label="Select all"
              />
            </TableHead>
            <TableHead className="w-[100px]">
              <Button
                variant="ghost"
                onClick={() => handleSort("id")}
                className="flex items-center p-0 hover:bg-transparent"
              >
                ID
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => handleSort("title")}
                className="flex items-center p-0 hover:bg-transparent"
              >
                Title
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => handleSort("date")}
                className="flex items-center p-0 hover:bg-transparent"
              >
                Date
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => handleSort("status")}
                className="flex items-center p-0 hover:bg-transparent"
                title={
                  statusSortCycle > 0
                    ? `Current sort: ${getStatusSortLabel()}`
                    : "Click to sort by status"
                }
              >
                {statusSortCycle > 0
                  ? `Status (Sort ${statusSortCycle})`
                  : "Status"}
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead className="w-[70px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedData.map((optimization) => (
            <TableRow key={optimization.id}>
              <TableCell>
                <Checkbox
                  checked={selectedRows.includes(optimization.id)}
                  onCheckedChange={(checked) =>
                    handleSelectRow(optimization.id, checked as boolean)
                  }
                  aria-label={`Select row ${optimization.id}`}
                />
              </TableCell>
              <TableCell className="font-medium">{optimization.id}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-md border border-gray-200 bg-gray-50">
                    {optimization.type === "AUTOMATION"
                      ? "Automation"
                      : "Suggestion"}
                  </span>
                  <span className="font-normal">{optimization.title}</span>
                </div>
              </TableCell>
              <TableCell className="font-normal">
                {format(new Date(optimization.date), "MMM d, yyyy 'at' h:mm a")}
              </TableCell>
              <TableCell>{renderStatusBadge(optimization.status)}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>View details</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {optimization.status === "IN_PROGRESS" && (
                      <DropdownMenuItem>Mark as completed</DropdownMenuItem>
                    )}
                    {optimization.type === "SUGGESTION" &&
                      optimization.status !== "ACCEPTED" &&
                      optimization.status !== "DISMISSED" && (
                        <>
                          <DropdownMenuItem>Accept suggestion</DropdownMenuItem>
                          <DropdownMenuItem>
                            Dismiss suggestion
                          </DropdownMenuItem>
                        </>
                      )}
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
