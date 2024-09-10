import {
    getAllAvailableGrants,
    getStartupsAppliedGrants,
} from "@/actions/startup";
import SLTable from "@/components/ui/CustomTableReusableComponents/SLTable";
import SlTableRow from "@/components/ui/CustomTableReusableComponents/SlTableRow";
import { Separator } from "@/components/ui/separator";
import { TableCell, TableRow } from "@/components/ui/table";
import { formatDateWithOrdinal } from "@/lib/utils";
import { IGrants, IUserGrantApplication, govtGrantData } from "@/types";
import { Dialog } from "@radix-ui/react-dialog";
import React, { useEffect, useRef, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList } from "@radix-ui/react-tabs";
import { TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { useStartupContext } from "@/context/StartupContext";
import { Badge } from "@/components/ui/badge";

export default function UserGrants() {
    const [grants, setGrants] = useState<Array<IUserGrantApplication> | null>(
        null
    );

    const { data: startup } = useStartupContext();

    useEffect(() => {
        async function fetchRequiredData() {
            if (startup === null) {
                return;
            }

            const data = await getStartupsAppliedGrants({
                startupId: startup?.id,
            });

            if (data === null) {
                return;
            }

            setGrants(data);
        }
        fetchRequiredData();
    }, []);

    return (
        <div>
            <SLTable
                title="Your grant applications"
                caption={"Your all grant applications"}
                headers={[
                    "S.No",
                    "Title",
                    "Deadline",
                    "Funding Amount",
                    "Description",
                    "Approved",
                    "",
                ]}
            >
                <TableRow />
                {grants == null ? (
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

                {grants?.map((grant, index) => (
                    <SlTableRow
                        key={index}
                        slTableRowOptions={[
                            {
                                title: "Delete",
                                onTap: () => {},
                            },
                        ]}
                    >
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{grant.grant.title}</TableCell>
                        <TableCell>
                            {formatDateWithOrdinal(
                                new Date(grant.grant.deadline)
                            )}
                        </TableCell>
                        <TableCell>{`₹ ${grant.grant.amount}`}</TableCell>
                        <TableCell>{grant.grant.description}</TableCell>
                        <TableCell>
                            <Badge
                                variant="outline"
                                className="bg-yellow-100 text-yellow-800"
                            >
                                {grant.grant.isAssigned
                                    ? "Approved"
                                    : "Under Review"}
                            </Badge>
                        </TableCell>
                    </SlTableRow>
                ))}
            </SLTable>
        </div>
    );
}
