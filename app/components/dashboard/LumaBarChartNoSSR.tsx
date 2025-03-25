"use client";
import withNoSSR from "../root/withNoSSR";
import LumaBarChart from "@/app/components/dashboard/LumaBarChart";

const LumaBarChartNoSSR = withNoSSR(LumaBarChart);
export default LumaBarChartNoSSR;
