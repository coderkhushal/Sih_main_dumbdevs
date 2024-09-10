"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  AlertCircle,
  ArrowDown,
  ArrowUp,
  CalendarIcon,
  CheckCircle,
  Clock,
  DollarSignIcon,
  GlobeIcon,
  GraduationCapIcon,
  MapPinIcon,
  TrendingUp,
  UsersIcon,
} from "lucide-react";
import { Pie, PieChart, Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import PieChartReusable from "@/components/ui/PieChartReusable/PieChartReusable";
import { useAuthContext } from "@/context/AuthContext";
import { getStartupByToken } from "@/actions/startup";
import { StartupData } from "@/types";
import DashboardSkeleton from "./SkeletonLoading/DashboardSkeleton";
import { useStartupContext } from "@/context/StartupContext";
import { Button } from "@/components/ui/button";

const chartConfig = {
  founders: {
    label: "Founders",
    color: "#1E3A8A", // Dark blue
  },
  investors: {
    label: "Investors",
    color: "#22C55E", // Green
  },
  employees: {
    label: "Employees",
    color: "#F59E0B", // Yellow-orange
  },
} satisfies ChartConfig;

// Updated data for the financial chart
const financialData = [
  { name: "Jan", revenue: 10000, profit: 2000 },
  { name: "Feb", revenue: 12000, profit: 2500 },
  { name: "Mar", revenue: 15000, profit: 3500 },
  { name: "Apr", revenue: 14000, profit: 3000 },
  { name: "May", revenue: 18000, profit: 4500 },
  { name: "Jun", revenue: 20000, profit: 5000 },
];

// Chart configuration with colors
const finChartConfig = {
  revenue: {
    label: "Revenue",
    color: "#4F46E5", // Blue for revenue
  },
  profit: {
    label: "Profit",
    color: "#22C55E", // Green for profit
  },
} satisfies ChartConfig;

export default function Dash() {
  const { user, fetchUser, logout } = useAuthContext();
  const [score, setscore] = useState<null | number>(null);
  const { data: startup } = useStartupContext();

  const handlecalculateScore = async () => {
    let token = localStorage.getItem("token");
    if (!token) {
      console.log("token not found");
    }
    const response = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL?.toString() + "/startup/score/5",
      {
        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${token}`,
        },
        method: "GET",
      }
    );
    const data = await response.json();

    setscore(
      (
        Number.parseFloat(
          data.data.data.substring(1, data.data.data.length - 2)
        ) * 100
      ).toFixed(2)
    );
  };
  const equityData = [
    { name: "Founders", value: startup?.founders_equity, fill: "#1E3A8A" }, // Dark blue
    {
      name: "Investors",
      value: startup?.investors_equity,
      fill: "#22C55E",
    }, // Green
    {
      name: "Employees",
      value: startup?.employees_equity,
      fill: "#F59E0B",
    }, // Yellow-orange
  ];

  if (!startup) {
    return <DashboardSkeleton />;
  }
  return (
    <div className="p-8 h-full w-full  m-6 ">
      <div className="flex w-full justify-between">
        <h1 className="text-4xl font-bold mb-8">Entrepreneur Dashboard</h1>
        <div className="flex space-x-5 justify-around">
          <Button onClick={handlecalculateScore}>Calculate Score</Button>
          <div className="flex w-28 justify-center rounded-xl text-sm bg-gray-300 h-10 p-2">
            {score ? score : "score here"}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Startup Overview</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div>
              <h3 className="text-lg font-semibold">{startup.name}</h3>
              <p className="text-sm text-muted-foreground">
                {startup.description}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <CalendarIcon className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Founded</p>
                <p className="text-sm text-muted-foreground">
                  {startup.foundedAt}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <UsersIcon className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Team Size</p>
                <p className="text-sm text-muted-foreground">
                  {startup.teamSize} members
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardHeader>
            <CardTitle>Startup Details</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-center space-x-4">
              <MapPinIcon className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Location</p>
                <p className="text-sm text-muted-foreground">
                  {startup.location}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <GraduationCapIcon className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Industry</p>
                <p className="text-sm text-muted-foreground capitalize">
                  {startup.industry}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <GlobeIcon className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Website</p>
                <a
                  href={startup.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline"
                >
                  {startup.website}
                </a>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <DollarSignIcon className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Funding</p>
                <p className="text-sm text-muted-foreground">
                  ${startup.funding.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="flex flex-col">
          <CardHeader className="items-center pb-0">
            <CardTitle>Equity Distribution</CardTitle>
            <CardDescription>Company Equity Breakdown</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 pb-0">
            <PieChartReusable chartConfig={chartConfig} data={equityData} />
          </CardContent>
          <CardFooter className="flex-col gap-2 text-sm">
            <div className="flex items-center gap-2 font-medium leading-none">
              Equity distribution as of 2024 <TrendingUp className="h-4 w-4" />
            </div>
            <div className="leading-none text-muted-foreground">
              Showing current equity distribution among stakeholders
            </div>
          </CardFooter>
        </Card>

        {/* Burn Rate */}
        <Card>
          <CardHeader>
            <CardTitle>Burn Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold mb-4">
              ${startup.burnRate}{" "}
              <span className="text-sm text-gray-500">/month</span>
            </div>
            <Progress
              value={
                ((startup.burnRate * startup.runway) / startup.funding) * 100
              }
              className="w-full"
            />
            <p className="text-sm text-gray-500 mt-2">
              {Math.round(
                ((startup.burnRate * startup.runway) / startup.funding) * 100
              )}
              % of total funding used
            </p>
          </CardContent>
        </Card>

        {/* Financial Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Financial Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Revenue</p>
                <p className="text-2xl font-bold">${startup?.revenue}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Net Profit</p>
                <p className="text-2xl font-bold">${startup?.net_profit}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Gross Margin</p>
                <p className="text-2xl font-bold">{startup?.gross_margin}%</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Expenses</p>
                <p className="text-2xl font-bold">${startup?.expenses}</p>
              </div>
            </div>
            <ChartContainer config={finChartConfig}>
              <BarChart accessibilityLayer data={financialData}>
                <XAxis
                  dataKey="name"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dashed" />}
                />
                <Bar
                  dataKey="revenue"
                  fill={finChartConfig.revenue.color}
                  radius={4}
                />
                <Bar
                  dataKey="profit"
                  fill={finChartConfig.profit.color}
                  radius={4}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Runway */}
        <Card>
          <CardHeader>
            <CardTitle>Runway</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Clock className="w-8 h-8 mr-2 text-yellow-500" />
              <div className="text-4xl font-bold">
                {startup?.runway}{" "}
                <span className="text-sm text-gray-500">months left</span>
              </div>
            </div>
            <Progress
              value={
                startup.runway > 12
                  ? 25
                  : startup.runway > 6
                  ? 50
                  : startup.runway > 3
                  ? 75
                  : 90
              }
              className="w-full mt-4"
              color={
                startup.runway > 12
                  ? "green"
                  : startup.runway > 6
                  ? "yellow"
                  : "red"
              }
            />
          </CardContent>
        </Card>

        {/* Customer Acquisition Cost (CAC) */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Acquisition Cost</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold mb-4">
              ${startup?.cac}{" "}
              <ArrowDown className="inline w-6 h-6 text-green-500" />
            </div>
          </CardContent>
        </Card>

        {/* Active Users */}
        <Card>
          <CardHeader>
            <CardTitle>Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold mb-4">
              {startup?.customers}
              <ArrowUp className="inline w-6 h-6 text-green-500" />
            </div>
          </CardContent>
        </Card>

        {/* IP Status
                <Card>
                    <CardHeader>
                        <CardTitle>IP Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <span>Patent A</span>
                                <Badge
                                    variant="outline"
                                    className="bg-yellow-100 text-yellow-800"
                                >
                                    Pending
                                </Badge>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Trademark B</span>
                                <Badge
                                    variant="outline"
                                    className="bg-green-100 text-green-800"
                                >
                                    Approved
                                </Badge>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Copyright C</span>
                                <Badge
                                    variant="outline"
                                    className="bg-red-100 text-red-800"
                                >
                                    Expired
                                </Badge>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Compliance Overview */}
        {/* <Card>
                    <CardHeader>
                        <CardTitle>Compliance Tracker</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <span>Annual Report</span>
                                <Badge
                                    variant="outline"
                                    className="bg-green-100 text-green-800"
                                >
                                    Completed
                                </Badge>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Tax Filing</span>
                                <Badge
                                    variant="outline"
                                    className="bg-yellow-100 text-yellow-800"
                                >
                                    Pending
                                </Badge>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Board Meeting</span>
                                <Badge
                                    variant="outline"
                                    className="bg-red-100 text-red-800"
                                >
                                    Overdue
                                </Badge>
                            </div>
                        </div>
                    </CardContent>
                </Card> */}

        {/* Key Performance Indicators (KPIs) */}
        <Card>
          <CardHeader>
            <CardTitle>Key Performance Indicators</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">MRR Growth</p>
                <p className="text-2xl font-bold">
                  {startup?.mrr_growth}%{" "}
                  <ArrowUp className="inline w-4 h-4 text-green-500" />
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">LTV:CAC Ratio</p>
                <p className="text-2xl font-bold">{startup?.itv_cac_ratio}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">NPS Score</p>
                <p className="text-2xl font-bold">{startup?.nps_score}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Conversion Rate</p>
                <p className="text-2xl font-bold">
                  {startup?.conversion_rate}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Status of Legal Matters */}
        {/* <Card>
                    <CardHeader>
                        <CardTitle>Legal Matters Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <span>Incorporation</span>
                                <CheckCircle className="w-5 h-5 text-green-500" />
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Contracts Review</span>
                                <AlertCircle className="w-5 h-5 text-yellow-500" />
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Regulatory Compliance</span>
                                <Progress value={75} className="w-1/2" />
                            </div>
                        </div>
                    </CardContent>
                </Card> */}
      </div>
    </div>
  );
}
