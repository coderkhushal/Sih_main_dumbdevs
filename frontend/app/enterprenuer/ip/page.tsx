"use client";
import React, { useEffect, useState } from "react";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { IoMdAdd } from "react-icons/io";
import { IconContext } from "react-icons/lib";
import PatentTable from "./patents/PatentTable/PatentTable";
import FilterTable from "./patents/Filter/FilterTable";
import AddPatent from "./patents/AddPatent/AddPatent";
import PatentSearch from "./patents/PatentSearch/PatentSearch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Patents from "./patents/patents";
import { getStartupPatents } from "@/actions/startup";
import { IPatentApplication } from "@/types";

export default function PatentsPage() {
    const [patents, setPatents] = useState<Array<IPatentApplication> | null>(
        null
    );

    useEffect(() => {
        async function getRequiredData() {
            const data = await getStartupPatents({
                startupId: 9,
            });

            setPatents(data);
        }

        getRequiredData();
    }, []);
    return (
        <div className="flex flex-col px-4 py-4 h-full w-full">
            <AddPatent />

            <div className="flex flex-row px-2 py-2">
                <p className="text-2xl">IP Manangement</p>
            </div>
            <Separator
                orientation="horizontal"
                className="bg-onBackground/30 w-full my-6"
            />

            <Tabs defaultValue="patents" className="w-full h-full">
                <TabsList className="bg-onBackground text-white w-full justify-start mb-4">
                    <TabsTrigger value="patents">Patents</TabsTrigger>
                    <TabsTrigger value="trademarks">Trademarks</TabsTrigger>
                </TabsList>
                <TabsContent value="patents">
                    <Patents patents={patents} />
                </TabsContent>
                <TabsContent value="trademarks">
                    Change your password here.
                </TabsContent>
            </Tabs>
        </div>
    );
}
