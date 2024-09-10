"use client";
import React from "react";
import { TableCell, TableRow } from "../table";
import SLTableRowOptions from "./SlTableRowOptions";
import { SlTableRowOption } from "@/schemas";

export default function SlTableRow({
    children,
    slTableRowOptions,
    onTap,
}: {
    children: React.ReactNode;
    slTableRowOptions: Array<SlTableRowOption>;
    onTap?: () => void;
}) {
    const hoverColor =
        onTap != undefined
            ? "hover:bg-lightPrimary/30"
            : "hover:bg-onBackground/10";
    const activeColor =
        onTap != undefined
            ? "active:bg-lightPrimary/30"
            : "active:bg-background/10";

    return (
        <TableRow onClick={onTap} className={`${hoverColor} ${activeColor}`}>
            {children}

            <TableCell>
                <SLTableRowOptions
                    title={"Options"}
                    options={slTableRowOptions}
                ></SLTableRowOptions>
            </TableCell>
        </TableRow>
    );
}
