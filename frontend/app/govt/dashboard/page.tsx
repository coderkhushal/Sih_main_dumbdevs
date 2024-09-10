"use client";
import React from "react";
import DashboardCard from "./DashboardCard/DashboardCard";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

import { Pie, PieChart } from "recharts";
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

const equityData = [
    { name: "Founders", value: 20, fill: "#1E3A8A" }, // Dark blue
    {
        name: "Investors",
        value: 60,
        fill: "#22C55E",
    }, // Green
    {
        name: "Employees",
        value: 20,
        fill: "#F59E0B",
    }, // Yellow-orange
];
export default function Page() {
    return (
        <div className="w-full h-full bg-background px-4 py-4 grid grid-cols-6 grid-rows-4">
            <DashboardCard
                title="Active Startups"
                description="Total active startups"
                value={"3"}
                // className=
                onTap={() => console.log("tapped")}
            />
            <DashboardCard
                title="Active Projects"
                description="Total active projects"
                value={"3"}
                onTap={() => console.log("tapped")}
            />
            <DashboardCard
                title="Active Projects"
                description="Total active projects"
                value={"3"}
                onTap={() => console.log("tapped")}
            />
            <DashboardCard
                title="Funding Given"
                description="Total grant money given"
                value={`₹ ${"30,000"}`}
                className="row-start-2"
                onTap={() => console.log("tapped")}
            />
            <DashboardCard
                title="Available Funds"
                description="Total avaiable funds"
                value={`₹ ${"90,000"}`}
                className="row-start-2"
                onTap={() => console.log("tapped")}
            />
            <DashboardCard
                title="Available Funds"
                description="Total avaiable funds"
                value={`₹ ${"90,000"}`}
                className="row-start-2"
                onTap={() => console.log("tapped")}
            />

            <Card className="row-span-2 col-start-4 w-full col-end-7 p-0 m-0 bg-gradient-to-tl from-background to-lightPrimary/40 shadow-lg ">
                <CardHeader>
                    <CardTitle>Funding in Industries</CardTitle>
                    <CardDescription>{}</CardDescription>
                </CardHeader>

                <CardContent className="h-full w-full flex justify-start items-center flex-row bg-red-400">
                    <ChartContainer
                        config={chartConfig}
                        className="h-96 pb-0 [&_.recharts-pie-label-text]:fill-foreground"
                    >
                        <PieChart className="p-0 m-0">
                            <ChartTooltip
                                content={<ChartTooltipContent hideLabel />}
                            />
                            <Pie
                                data={equityData}
                                dataKey="value"
                                label
                                nameKey="name"
                            />
                        </PieChart>
                    </ChartContainer>
                </CardContent>
            </Card>
        </div>
    );
}
