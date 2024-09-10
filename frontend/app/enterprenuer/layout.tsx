"use client";
import { Toaster } from "@/components/ui/toaster";
import DeskTopNavigation from "@/components/web/navigation/desktop_navigation";
import { enterprenuerroutes } from "@/constants";
import { useAuthContext } from "@/context/AuthContext";
import StartupDataProvider, {
    StartupContext,
    useStartupContext,
} from "@/context/StartupContext";
import { useState } from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    const [sidebarExpanded, setSidebarExpanded] = useState<boolean>(false);

    const { user: data } = useAuthContext();

    return (
        <StartupDataProvider>
            <div className="flex min-h-screen w-full bg-background ">
                <DeskTopNavigation
                    routes={enterprenuerroutes}
                    expand={sidebarExpanded}
                    setexpand={setSidebarExpanded}
                    disabledIndexes={data === null ? [2, 3, 4] : []}
                />
                <div
                    className={`${
                        sidebarExpanded ? "ml-64" : "ml-20"
                    } transition-all w-full flex min-h-screen`}
                >
                    {children}
                    <div className="absolute bottom-8 left-1/2 ">
                        <Toaster />
                    </div>
                </div>
            </div>
        </StartupDataProvider>
    );
};
export default MainLayout;
