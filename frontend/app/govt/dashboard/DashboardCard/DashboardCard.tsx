import React from "react";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
export default function DashboardCard({
    title,
    description,
    value,
    width = "w-64",
    onTap,
    className = "",
}: {
    title: string;
    description: string;
    value: string;
    width?: string;
    onTap?: () => void;
    className?: string;
}) {
    return (
        <Card
            className={`${className} w-64 min-w-fit h-fit rounded-2xl shadow-md bg-gradient-to-tl from-background to-lightPrimary/40 ${
                onTap ? "cursor-pointer" : "cursor-default"
            } ${onTap ? "hover:shadow-2xl" : ""} transition-all duration-300 `}
        >
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="flex text-3xl">{value}</CardContent>
        </Card>
    );
}
