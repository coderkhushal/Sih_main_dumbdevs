import React from "react";
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

export default function PatentTable() {
    return (
        <div>
            <Table className="text-onBackground">
                <TableRow>
                    <TableHead className="text-onBackground">
                        Patent #
                    </TableHead>
                    <TableHead className="text-onBackground">Title</TableHead>
                    <TableHead className="text-onBackground">
                        Inventor
                    </TableHead>
                    <TableHead className="text-onBackground">Status</TableHead>
                    <TableHead className="text-onBackground">Remark</TableHead>
                    <TableHead className="text-onBackground">Action</TableHead>
                    <TableHead className="text-onBackground"></TableHead>
                </TableRow>

                <TableBody>
                    <TableRow>
                        <TableCell>US12345678</TableCell>
                        <TableCell>Automated Packaging System</TableCell>
                        <TableCell>John Doe</TableCell>
                        <TableCell className="flex justify-start items-center ">
                            <Badge
                                variant="outline"
                                className="bg-yellow-100 text-yellow-800"
                            >
                                Pending
                            </Badge>
                        </TableCell>
                        <TableCell>
                            Too much similarity to exisiting patent
                        </TableCell>
                        <TableCell></TableCell>
                        <TableCell>
                            <PatentOptions />
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
}
