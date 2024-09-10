"use client";

import { getAllAvailableGrants } from "@/actions/startup";
import SLTable from "@/components/ui/CustomTableReusableComponents/SLTable";
import SlTableRow from "@/components/ui/CustomTableReusableComponents/SlTableRow";
import { Separator } from "@/components/ui/separator";
import { TableCell, TableRow } from "@/components/ui/table";
import { formatDateWithOrdinal } from "@/lib/utils";
import { IGrants, govtGrantData } from "@/types";
import { Dialog } from "@radix-ui/react-dialog";
import React, { useEffect, useRef, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import ApplyForGrantDialog from "./Apply/ApplyForGrant";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList } from "@radix-ui/react-tabs";
import { TabsContent, TabsTrigger } from "@/components/ui/tabs";
import UserGrants from "./UserGrants/UserGrants";

export default function Page() {
    const [grants, setGrants] = useState<Array<IGrants> | null>(null);

    const [dialogOpen, setDialogOpen] = useState(false);
    const grantIdToApply = useRef<number>(0);

    useEffect(() => {
        async function fetchRequiredData() {
            console.log("SDSDSDSDSSD");

            const data = await getAllAvailableGrants();

            if (data === null) {
                return;
            }

            setGrants(data!.filter((grant) => grant.isAssigned === false));
        }
        fetchRequiredData();
    }, []);

    return (
        <div className="flex flex-col px-4 py-4 h-full w-full">
            <Dialog open={dialogOpen}>
                <ApplyForGrantDialog
                    setDialogOpen={setDialogOpen}
                    grantId={grantIdToApply.current}
                />
            </Dialog>

            <div className="flex flex-row px-4 py-2 mt-4">
                <p className="text-2xl">Grants</p>
            </div>

            <Separator
                orientation="horizontal"
                className="bg-onBackground/30 w-full my-6"
            />

            <Tabs defaultValue="all_grants" className="w-full h-full">
                <TabsList className="bg-onBackground text-white w-full justify-start mb-4 py-2 px-2 rounded-lg">
                    <TabsTrigger value="all_grants">
                        Available Grants
                    </TabsTrigger>
                    <TabsTrigger value="your_grants">Your Grants</TabsTrigger>
                </TabsList>
                <TabsContent value="all_grants">
                    <SLTable
                        title="Available grants to apply"
                        caption={"All available published grants"}
                        headers={[
                            "S.No",
                            "Title",
                            "Deadline",
                            "Funding Amount",
                            "Description",
                            "Requirements",
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
                                        title: "Apply",
                                        onTap: () => {
                                            setDialogOpen((prev) => !prev);
                                            grantIdToApply.current = grant.id;
                                        },
                                    },
                                ]}
                            >
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{grant.title}</TableCell>
                                <TableCell>
                                    {formatDateWithOrdinal(
                                        new Date(grant.deadline)
                                    )}
                                </TableCell>
                                <TableCell>{`₹ ${grant.amount}`}</TableCell>
                                <TableCell>{grant.description}</TableCell>
                                <TableCell>{grant.requirements}</TableCell>
                            </SlTableRow>
                        ))}
                    </SLTable>
                </TabsContent>
                <TabsContent value="your_grants">
                    <UserGrants />
                </TabsContent>
            </Tabs>
        </div>
    );
}
