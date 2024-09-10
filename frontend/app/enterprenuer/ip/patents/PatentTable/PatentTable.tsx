import React, { useEffect, useState } from "react";
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
import PatentOptions from "./PatentOptions";
import { getStartupPatents } from "@/actions/startup";
import { IPatentApplication } from "@/types";
import { ThreeDots } from "react-loader-spinner";
import { formatDateWithOrdinal } from "@/lib/utils";
import SlTableRow from "@/components/ui/CustomTableReusableComponents/SlTableRow";
import SLTableRowOptions from "@/components/ui/CustomTableReusableComponents/SlTableRowOptions";

const patentStatusToColor = {
    PENDING: "bg-yellow-100 text-yellow-800",
    APPROVED: "bg-green-100 text-green-800",
    REJECTED: "bg-red-100 text-red-800",
};

export default function PatentTable({
    patents,
}: {
    patents: Array<IPatentApplication> | null;
}) {
    return (
        <div>
            <Table className="text-onBackground">
                <TableRow>
                    <TableHead className="text-onBackground">S. No.</TableHead>
                    <TableHead className="text-onBackground">
                        Patent #
                    </TableHead>
                    <TableHead className="text-onBackground">Title</TableHead>
                    <TableHead className="text-onBackground">
                        Inventor
                    </TableHead>
                    <TableHead className="text-onBackground">
                        Application Date
                    </TableHead>
                    <TableHead className="text-onBackground">Status</TableHead>
                    <TableHead className="text-onBackground">Remark</TableHead>
                    <TableHead className="text-onBackground"></TableHead>
                </TableRow>

                <TableBody>
                    {patents == null ? (
                        <>
                            <div className="h-4"></div>
                            <div className="absolute w-full flex justify-center items-center">
                                <ThreeDots height={20} color="#93c5fd" />
                            </div>
                            <div className="h-4"></div>
                        </>
                    ) : (
                        <></>
                    )}

                    {patents?.map((patent, index) => (
                        <TableRow key={patent.id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{patent.patentNumber}</TableCell>
                            <TableCell>{patent.title}</TableCell>
                            <TableCell>{patent.description}</TableCell>
                            {
                                // DESCRIPTION IS BEING USED AS INVENTOR NAME
                            }
                            <TableCell>
                                {formatDateWithOrdinal(
                                    new Date(patent.applicationDate)
                                )}
                            </TableCell>
                            <TableCell>
                                <Badge
                                    variant="outline"
                                    className={`${
                                        patentStatusToColor[patent.status]
                                    }`}
                                >
                                    {patent.status}
                                </Badge>
                            </TableCell>
                            <TableCell></TableCell>
                            <TableCell>
                                <SLTableRowOptions
                                    title={"Options"}
                                    options={[
                                        {
                                            title: "View Document",
                                            onTap: () => {},
                                        },
                                        {
                                            title: "Edit",
                                            onTap: () => {},
                                        },
                                        {
                                            title: "Delete",
                                            onTap: () => {},
                                        },
                                    ]}
                                ></SLTableRowOptions>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
