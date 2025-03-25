"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { format, subDays } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function LumaBarChart() {
  const [selectedDay, setSelectedDay] = React.useState("all");
  const [activeView, setActiveView] = React.useState<
    "all" | "running" | "issues" | "stopped"
  >("all");

  // Generate dates for the last 7 days
  const today = new Date();
  const days = Array.from({ length: 7 }, (_, i) => {
    const date = subDays(today, 6 - i);
    return {
      date: format(date, "MMM dd"),
      fullDate: date,
      id: format(date, "yyyy-MM-dd"),
    };
  });

  // Generate 3-hour interval data for each day
  const timeIntervals = [
    "00:00",
    "03:00",
    "06:00",
    "09:00",
    "12:00",
    "15:00",
    "18:00",
    "21:00",
  ];

  const allDaysData = days.flatMap((day) => {
    return timeIntervals.map((time) => {
      return {
        day: day.date,
        dayId: day.id,
        time,
        label: `${day.date} ${time}`,
        running: Math.floor(Math.random() * 50) + 30, // Random data between 30-80
        issues: Math.floor(Math.random() * 30) + 10, // Random data between 10-40
        stopped: Math.floor(Math.random() * 20) + 5, // Random data between 5-25
      };
    });
  });

  // Filter data based on selected day
  const chartData =
    selectedDay === "all"
      ? allDaysData
      : allDaysData.filter((item) => item.dayId === selectedDay);

  // Calculate totals
  const totals = React.useMemo(() => {
    return {
      running: allDaysData.reduce((acc, curr) => acc + curr.running, 0),
      issues: allDaysData.reduce((acc, curr) => acc + curr.issues, 0),
      stopped: allDaysData.reduce((acc, curr) => acc + curr.stopped, 0),
    };
  }, [allDaysData]);

  const chartConfig = {
    all: {
      label: "All",
    },
    stopped: {
      label: "Stopped",
      color: "hsl(357.18 100% 45%)", // Red
    },
    issues: {
      label: "Issues",
      color: "hsl(47.61 100% 49%)", // Yellow
    },
    running: {
      label: "Running",
      color: "hsl(142.31 100% 33%)", // Green
    },
  } satisfies ChartConfig;

  return (
    <Card className="w-full rounded-sm shadow-none pt-0">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b !p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle className="text-sm font-medium">
            System Status (3-Hour Intervals)
          </CardTitle>
          <CardDescription className="text-xs">
            Monitoring system status over the past week
          </CardDescription>
        </div>
        <div className="flex flex-wrap">
          {["all", "running", "issues", "stopped"].map((key) => {
            const view = key as keyof typeof chartConfig | "all";
            return (
              <button
                key={view}
                data-active={activeView === view}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-slate-100 sm:border-l sm:border-t-0 sm:px-8 sm:py-6 cursor-pointer hover:bg-slate-50"
                onClick={() => setActiveView(view)}
              >
                <span className="text-xs text-muted-foreground">
                  {view === "all"
                    ? "All Statuses"
                    : chartConfig[view as keyof typeof chartConfig].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {view === "all"
                    ? (
                        totals.running +
                        totals.issues +
                        totals.stopped
                      ).toLocaleString()
                    : totals[view as keyof typeof totals].toLocaleString()}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="">
        <div className="mb-4 flex justify-end">
          <Select value={selectedDay} onValueChange={setSelectedDay}>
            <SelectTrigger className="w-full sm:w-[180px] rounded-sm shadow-none">
              <SelectValue placeholder="Select day" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Days</SelectItem>
              {days.map((day) => (
                <SelectItem key={day.id} value={day.id}>
                  {day.date}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[300px] w-full  [&_.recharts-legend-wrapper]:inset-x-0"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              angle={-45}
              textAnchor="end"
              height={80}
              interval={selectedDay === "all" ? 5 : 0}
              scale="band"
            />
            <YAxis tickLine={false} axisLine={false} tickMargin={10} />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[180px]"
                  formatter={(value, name) => [
                    value,
                    ` ${
                      chartConfig[name as keyof typeof chartConfig]?.label ||
                      name
                    }`,
                  ]}
                  labelFormatter={(value) => value}
                />
              }
            />

            <ChartLegend content={<ChartLegendContent />} />
            {(activeView === "all" || activeView === "stopped") && (
              <Bar
                dataKey="stopped"
                fill="var(--color-stopped)"
                stackId="a"
                barSize={selectedDay === "all" ? 12 : 30}
              />
            )}
            {(activeView === "all" || activeView === "issues") && (
              <Bar
                dataKey="issues"
                fill="var(--color-issues)"
                stackId="a"
                barSize={selectedDay === "all" ? 12 : 30}
              />
            )}
            {(activeView === "all" || activeView === "running") && (
              <Bar
                dataKey="running"
                fill="var(--color-running)"
                stackId="a"
                barSize={selectedDay === "all" ? 12 : 30}
              />
            )}
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
