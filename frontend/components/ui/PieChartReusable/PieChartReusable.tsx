"use client";
import React from "react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../chart";
import { Pie, PieChart, Bar, BarChart, CartesianGrid, XAxis } from "recharts";

function PieChartReusable({ chartConfig, data }: any) {
    return (
        <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
        >
            <PieChart>
                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                <Pie data={data} dataKey="value" label nameKey="name" />
            </PieChart>
        </ChartContainer>
    );
}

export default PieChartReusable;
