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
import { getStartupByToken, getStartupMetrics } from "@/actions/startup";
import { IStartupMetrics } from "@/types";
import { ThreeDots } from "react-loader-spinner";
import { useParams } from "next/navigation";
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

export default function Page() {
    const [startup, setStartup] = useState<IStartupMetrics | null>(null);

    const params = useParams<{ startupId: string }>();

    useEffect(() => {
        async function fetchRequiredData() {
            const data = await getStartupMetrics(parseInt(params.startupId));

            console.log(data);

            setStartup(data);
        }

        fetchRequiredData();
    }, [params.startupId]);

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

    if (startup === null) {
        return (
            <div className="w-full h-full flex justify-center items-center">
                <ThreeDots color="#93c5fd" />
            </div>
        );
    }

    if (startup === undefined) {
        return (
            <div className="w-full h-full flex justify-center items-center">
                <p>Metrics does not exist for this startup</p>
            </div>
        );
    }

    return (
        <div className="p-8 h-full w-full  m-6 ">
            <h1 className="text-4xl font-bold mb-8">Entrepreneur Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Startup Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <div>
                            <h3 className="text-lg font-semibold">
                                {"STARTUP NAME"}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                {"STARTUP DESCRIPTION"}
                            </p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <CalendarIcon className="h-5 w-5 text-muted-foreground" />
                            <div>
                                <p className="text-sm font-medium">Founded</p>
                                <p className="text-sm text-muted-foreground">
                                    {"STARTUP FOUNDED AT"}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <UsersIcon className="h-5 w-5 text-muted-foreground" />
                            <div>
                                <p className="text-sm font-medium">Team Size</p>
                                <p className="text-sm text-muted-foreground">
                                    {"STARTUP TEAM SIZE"} members
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
                                    {"STARTUP LOCATION"}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <GraduationCapIcon className="h-5 w-5 text-muted-foreground" />
                            <div>
                                <p className="text-sm font-medium">Industry</p>
                                <p className="text-sm text-muted-foreground capitalize">
                                    {"STARTUP INDUSTRY"}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <GlobeIcon className="h-5 w-5 text-muted-foreground" />
                            <div>
                                <p className="text-sm font-medium">Website</p>
                                <a
                                    href="#"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-blue-600 hover:underline"
                                >
                                    {"startup.website"}
                                </a>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <DollarSignIcon className="h-5 w-5 text-muted-foreground" />
                            <div>
                                <p className="text-sm font-medium">Funding</p>
                                <p className="text-sm text-muted-foreground">
                                    ${"startup.funding.toLocaleString()"}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="flex flex-col">
                    <CardHeader className="items-center pb-0">
                        <CardTitle>Equity Distribution</CardTitle>
                        <CardDescription>
                            Company Equity Breakdown
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 pb-0">
                        <PieChartReusable
                            chartConfig={chartConfig}
                            data={equityData}
                        />
                    </CardContent>
                    <CardFooter className="flex-col gap-2 text-sm">
                        <div className="flex items-center gap-2 font-medium leading-none">
                            Equity distribution as of 2024{" "}
                            <TrendingUp className="h-4 w-4" />
                        </div>
                        <div className="leading-none text-muted-foreground">
                            Showing current equity distribution among
                            stakeholders
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
                            <span className="text-sm text-gray-500">
                                /month
                            </span>
                        </div>
                        <Progress
                            value={
                                200
                                // ((startup.burnRate * startup.runway) /
                                //     startup.funding) *
                                // 100
                            }
                            className="w-full"
                        />
                        <p className="text-sm text-gray-500 mt-2">
                            20
                            {/* {Math.round(
                                ((startup.burnRate * startup.runway) /
                                    startup.funding) *
                                    100
                            )} */}
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
                                <p className="text-2xl font-bold">
                                    ${startup?.revenue}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">
                                    Net Profit
                                </p>
                                <p className="text-2xl font-bold">
                                    ${startup?.net_profit}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">
                                    Gross Margin
                                </p>
                                <p className="text-2xl font-bold">
                                    {startup?.gross_margin}%
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">
                                    Expenses
                                </p>
                                <p className="text-2xl font-bold">
                                    ${startup?.expenses}
                                </p>
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
                                    content={
                                        <ChartTooltipContent indicator="dashed" />
                                    }
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
                                <span className="text-sm text-gray-500">
                                    months left
                                </span>
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

                {/* Key Performance Indicators (KPIs) */}
                <Card>
                    <CardHeader>
                        <CardTitle>Key Performance Indicators</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-gray-500">
                                    MRR Growth
                                </p>
                                <p className="text-2xl font-bold">
                                    {startup?.mrr_growth}%{" "}
                                    <ArrowUp className="inline w-4 h-4 text-green-500" />
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">
                                    LTV:CAC Ratio
                                </p>
                                <p className="text-2xl font-bold">
                                    {startup?.itv_cac_ratio}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">
                                    NPS Score
                                </p>
                                <p className="text-2xl font-bold">
                                    {startup?.nps_score}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">
                                    Conversion Rate
                                </p>
                                <p className="text-2xl font-bold">
                                    {startup?.conversion_rate}%
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
