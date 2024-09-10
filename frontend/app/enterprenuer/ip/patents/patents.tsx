import React from "react";
import PatentTable from "./PatentTable/PatentTable";
import PatentSearch from "./PatentSearch/PatentSearch";
import FilterTable from "./Filter/FilterTable";
import { IPatentApplication } from "@/types";

export default function Patents({
    patents,
}: {
    patents: Array<IPatentApplication> | null;
}) {
    return (
        <div>
            <div className="px-4 flex flex-row justify-between my-2">
                <p className="text-xl">Patents</p>
                <div className="ml-auto flex flex-row justify-center items-center gap-2">
                    <PatentSearch />
                    <FilterTable />
                </div>
            </div>
            <PatentTable patents={patents} />
        </div>
    );
}
