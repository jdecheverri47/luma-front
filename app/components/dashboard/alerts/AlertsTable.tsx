"use client";

import React from "react";
import {
  CircleCheck,
  Circle,
  MoreVertical,
  Timer,
  ArrowUpDown,
} from "lucide-react";
import { format } from "date-fns";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { alerts, Alert, Target } from "@/app/store/alerts";
import { Badge } from "@/components/ui/badge";

// Helpers
const toPascalCase = (str: string) =>
  str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");

const getStatusIcon = (status: string) => {
  switch (status) {
    case "Pending":
      return <Circle className="h-4 w-4 ml-2" />;
    case "In Progress":
      return <Timer className="h-4 w-4 ml-2" />;
    case "Fixed":
      return <CircleCheck className="h-4 w-4 ml-2" />;
    default:
      return null;
  }
};

const getPriorityChipClass = (priority: string) => {
  switch (priority) {
    case "High":
      return "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-500";
    case "Medium":
      return "bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-500";
    case "Low":
      return "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-500";
    default:
      return "bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-gray-400 border border gray-200 dark:border-gray-500";
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return `${format(date, "h:mm a")} | ${format(date, "MMM d, yyyy")}`;
};

// Devuelve el mapeo de prioridad según el modo
const getPriorityOrderMapByMode = (mode: number) => {
  switch (mode) {
    case 1: // Low > Medium > High
      return { High: 1, Medium: 2, Low: 3 };
    case 2: // Medium > High > Low
      return { Medium: 1, Low: 2, High: 3 };
    case 3: // High > Low > Medium
      return { Low: 1, High: 2, Medium: 3 };
    default:
      return null; // modo 0 => sin orden
  }
};

// Devuelve el mapeo de status según el modo
const getStatusOrderMapByMode = (mode: number) => {
  switch (mode) {
    case 1: // In Progress > Pending > Fixed
      return { "In Progress": 1, Pending: 2, Fixed: 3 };
    case 2: // Pending > Fixed > In Progress
      return { Pending: 1, Fixed: 2, "In Progress": 3 };
    case 3: // Fixed > In Progress > Pending
      return { Fixed: 1, "In Progress": 2, Pending: 3 };
    default:
      return null; // modo 0 => sin orden
  }
};

export default function AlertsTable() {
  const [statusSortMode, setStatusSortMode] = React.useState<number>(0);
  const [prioritySortMode, setPrioritySortMode] = React.useState<number>(0);

  const columns: ColumnDef<Alert>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-[2px] cursor-pointer"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-[2px] cursor-pointer"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "humanReadableId",
      header: "Alert",
      cell: ({ row }) => (
        <div className="font-medium text-sm">
          {row.getValue("humanReadableId")}
        </div>
      ),
      enableHiding: false,
    },
    {
      accessorKey: "target",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0 cursor-pointer"
        >
          Target
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const target = row.getValue("target") as Target;
        return (
          <div className="text-sm">
            {`${toPascalCase(target.type)} #${target.name}`}
          </div>
        );
      },
      sortingFn: (rowA, rowB) => {
        const targetA = rowA.getValue("target") as Target;
        const targetB = rowB.getValue("target") as Target;
        return `${targetA.type}${targetA.name}`.localeCompare(
          `${targetB.type}${targetB.name}`
        );
      },
    },
    {
      accessorKey: "title",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0 cursor-pointer"
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="font-medium text-sm">{row.getValue("title")}</div>
      ),
    },
    {
      accessorKey: "updatedAt",
      header: "Date",
      cell: ({ row }) => (
        <div className="text-sm hidden md:block">
          {formatDate(row.getValue("updatedAt"))}
        </div>
      ),
    },
    {
      // Columna Status
      accessorKey: "status",
      enableSorting: false, // Desactivamos la lógica automática
      header: () => (
        <Button
          variant="ghost"
          onClick={() => {
            // Cada clic avanza al siguiente modo
            setStatusSortMode((prev) => (prev + 1) % 4);
            // Opcional: Resetea el prioritySortMode cuando clican en Status
            // setPrioritySortMode(0);
          }}
          className="p-0 cursor-pointer"
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        return (
          <div className="flex items-center text-sm gap-2">
            {getStatusIcon(status)}
            {status}
          </div>
        );
      },
    },
    {
      // Columna Priority
      accessorKey: "priority",
      enableSorting: false, // Desactivamos la lógica automática
      header: () => (
        <Button
          variant="ghost"
          onClick={() => {
            // Cada clic avanza al siguiente modo
            setPrioritySortMode((prev) => (prev + 1) % 4);
            // Opcional: Resetea el statusSortMode cuando clican en Priority
            // setStatusSortMode(0);
          }}
          className="p-0 cursor-pointer"
        >
          Priority
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const priority = row.getValue("priority") as string;
        return (
          <Badge
            variant="outline"
            className={` ${getPriorityChipClass(priority)}`}
          >
            {priority}
          </Badge>
        );
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const alert = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
                <span className="sr-only">Open menu</span>
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="rounded-sm">
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => navigator.clipboard.writeText(alert.id)}
              >
                View details
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                Assign
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                Mark as fixed
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  // Un único useMemo que aplica la lógica:
  // 1) Si statusSortMode != 0, ordena por Status
  // 2) Else si prioritySortMode != 0, ordena por Priority
  // 3) Si ambos valen 0, sin orden
  const sortedData = React.useMemo<Alert[]>(() => {
    // 1) Intentamos con Status
    if (statusSortMode !== 0) {
      const statusMap = getStatusOrderMapByMode(statusSortMode);
      // Ordena según el mapeo:
      return [...alerts].sort((a, b) => {
        const va = statusMap?.[a.status as keyof typeof statusMap] ?? 0;
        const vb = statusMap?.[b.status as keyof typeof statusMap] ?? 0;
        return va - vb;
      });
    }

    // 2) De lo contrario, si prioritySortMode != 0
    if (prioritySortMode !== 0) {
      const priorityMap = getPriorityOrderMapByMode(prioritySortMode);
      // Ordena según el mapeo:
      return [...alerts].sort((a, b) => {
        const va = priorityMap?.[a.priority as "Low" | "Medium" | "High"] ?? 0;
        const vb = priorityMap?.[b.priority as "Low" | "Medium" | "High"] ?? 0;
        return va - vb;
      });
    }

    // 3) Sin orden
    return alerts;
  }, [alerts, statusSortMode, prioritySortMode]);

  return (
    <div className="container mx-auto p-6">
      <DataTable columns={columns} data={sortedData} />
    </div>
  );
}
