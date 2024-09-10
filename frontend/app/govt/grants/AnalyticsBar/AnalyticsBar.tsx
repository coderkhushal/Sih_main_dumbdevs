import React from "react";
import { Separator } from "@/components/ui/separator";

export default function AnalyticsBar({
    children,
}: {
    children?: React.ReactNode;
}) {
    return (
        <div className="w-full h-1/5 bg-onbackgroundContainer rounded-xl shadow-xl shadow-lightPrimary/30 flex flex-row justify-around items-center py-4 my-4">
            {React.Children.map(children, (child, index) => {
                return (
                    <>
                        {child}
                        {index !== React.Children.count(children) - 1 && (
                            <Separator
                                orientation="vertical"
                                className="bg-onBackground/30 w-[2px]"
                            />
                        )}
                    </>
                );
            })}
        </div>
    );
}
