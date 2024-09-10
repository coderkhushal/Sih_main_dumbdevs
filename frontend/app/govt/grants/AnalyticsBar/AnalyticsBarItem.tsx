import { Separator } from "@/components/ui/separator";
import React from "react";

export default function AnalyticsBarItem({
    name,
    value,
    icon,
    color,
}: {
    name: string;
    value: string;
    icon: React.ReactNode;
    color: string;
}) {
    return (
        <div className="flex flex-row gap-4 justify-start items-center h-full">
            <div
                className={`rounded-xl h-20 w-20 p-2 ${color} flex justify-center items-center`}
            >
                {icon}
            </div>

            <div className="flex flex-col">
                <p className="text-onBackground/85 text-xl">{name}</p>
                <p className="text-onBackground/85 text-xl">{value}</p>
            </div>
        </div>
    );
}
