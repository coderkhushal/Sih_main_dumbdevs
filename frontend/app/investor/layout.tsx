"use client";
import DeskTopNavigation from "@/components/web/navigation/desktop_navigation";

import { govroutes } from "@/constants";
import { useState } from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    const [sidebarExpanded, setSidebarExpanded] = useState<boolean>(false);
    return (
        <div className="flex h-full w-full ">
            <DeskTopNavigation
                routes={govroutes}
                expand={sidebarExpanded}
                setexpand={setSidebarExpanded}
            />
            <div
                className={`${
                    sidebarExpanded ? "ml-64" : "ml-20"
                } transition-all w-full flex min-h-screen`}
            >
                {children}
            </div>
        </div>
    );
};

export default MainLayout;
