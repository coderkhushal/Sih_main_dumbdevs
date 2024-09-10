import React, { useState } from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import SLTableRowOptions from "./SlTableRowOptions";
import { SlTableRowOption } from "@/schemas";
import SlTableSearch from "./SlTableSearch";
import { Button } from "../button";
import { MdAdd } from "react-icons/md";
import { Dialog, DialogTrigger } from "../dialog";

export default function SLTable({
    title,
    headers,
    children,
    caption,
    dialog,
}: {
    title: string;
    headers: Array<String>;
    children: React.ReactNode;
    caption: string | null;
    dialog?: React.ReactNode;
}) {
    return (
        <div>
            <div className="px-4 flex flex-row justify-between my-2">
                <p className="text-xl">{title}</p>
                <div className="ml-auto flex flex-row justify-center items-center gap-2">
                    <SlTableSearch />

                    {
                        // If there is no dialog, do not show the Add button
                        dialog ? (
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button className="flex flex-row gap-2 justify-center items-center bg-onBackground hover:bg-onBackground/85 active:bg-onBackground/85">
                                        Add
                                        <MdAdd size={16} />
                                    </Button>
                                </DialogTrigger>

                                {dialog}
                            </Dialog>
                        ) : null
                    }
                </div>
            </div>

            <Table className="text-onBackground">
                <TableCaption>{caption}</TableCaption>
                <TableBody>
                    <TableRow>
                        {headers.map((header, index) => {
                            return (
                                <TableHead
                                    key={index}
                                    className="text-onBackground"
                                >
                                    {header}
                                </TableHead>
                            );
                        })}
                    </TableRow>

                    {children}
                </TableBody>
            </Table>
        </div>
    );
}
