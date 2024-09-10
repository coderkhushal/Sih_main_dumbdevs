"use client";
import { getStartupByToken } from "@/actions/startup";
import { StartupData } from "@/types";
import { useContext, useEffect, useState, createContext } from "react";

type StartupContextType = {
    getStartupDetails: () => Promise<void>;
    data: StartupData | null;
    gettingData: boolean;
};

export const StartupContext = createContext<StartupContextType>({
    getStartupDetails: async () => {},
    data: null,
    gettingData: false,
});

const StartupDataProvider = ({ children }: { children: React.ReactNode }) => {
    const [data, setData] = useState<StartupData | null>(null);
    const [gettingData, setGettingData] = useState<boolean>(false);

    async function getStartupData() {
        setGettingData(() => true);
        const startupData = await getStartupByToken();

        console.log("Startup Data FETCHING IN CONTEXT", startupData);

        if (startupData !== null) {
            setData(startupData);
        }

        setGettingData(() => false);
    }

    useEffect(() => {
        getStartupData();
    }, []);
    return (
        <StartupContext.Provider
            value={{
                data,
                getStartupDetails: getStartupData,
                gettingData,
            }}
        >
            {children}
        </StartupContext.Provider>
    );
};

export default StartupDataProvider;
export const useStartupContext = () => useContext(StartupContext);
