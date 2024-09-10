"use client";

import React, { useEffect, useState } from "react";
import SLTable from "@/components/ui/CustomTableReusableComponents/SLTable";
import { TableCell, TableRow } from "@/components/ui/table";
import SlTableRow from "@/components/ui/CustomTableReusableComponents/SlTableRow";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import AnalyticsBar from "./AnalyticsBar/AnalyticsBar";
import { useRouter } from "next/navigation";
import AnalyticsBarItem from "./AnalyticsBar/AnalyticsBarItem";
import { MdIncompleteCircle } from "react-icons/md";
import { IoIosPaper } from "react-icons/io";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import AddGrantDialogContent from "./AddGrant/AddGrantDialog";
import { getGrantsByToken } from "@/actions/govt";
import { govtGrantData } from "@/types";
import { LineWave, ThreeDots } from "react-loader-spinner";
import { formatDateWithOrdinal } from "@/lib/utils";

const SingleMotion = ({ params }: { params: { id: string } }) => {
    const router = useRouter();

    const slTableRowOptions = [
        { title: "Edit", onTap: () => {} },
        { title: "Delete", onTap: () => {} },
    ];

    const [grants, setGrants] = useState<Array<govtGrantData> | null>(null);

    useEffect(() => {
        async function fetchRequiredData() {
            const data = await getGrantsByToken();

            setGrants(data);

            console.log(data);
        }
        fetchRequiredData();
    }, []);

    return (
        <div className="w-full h-full bg-background px-4">
            <div className="flex flex-row px-4 py-2 mt-4">
                <p className="text-2xl">Dashboard</p>
            </div>

            <AnalyticsBar>
                <AnalyticsBarItem
                    name="Total Grants"
                    value={grants?.length.toString() ?? "0"}
                    icon={
                        <MdIncompleteCircle
                            size={48}
                            className="text-onBackground"
                        />
                    }
                    color="bg-yellow-200"
                />
                <AnalyticsBarItem
                    name="Grants Active"
                    value="3"
                    icon={
                        <IoIosPaper size={48} className="text-onBackground" />
                    }
                    color="bg-blue-200"
                />
                <AnalyticsBarItem
                    name="Grants Approved"
                    value="3"
                    icon={<FaCheck size={48} className="text-onBackground" />}
                    color="bg-green-200"
                />
                <AnalyticsBarItem
                    name="Grants Removed"
                    value="3"
                    icon={<RxCross2 size={48} className="text-onBackground" />}
                    color="bg-red-200"
                />
            </AnalyticsBar>

            <Separator
                orientation="horizontal"
                className="bg-onBackground/30 w-full my-6"
            />

            <SLTable
                title="Grants"
                dialog={<AddGrantDialogContent />}
                caption={"All published grants"}
                headers={[
                    "ID",
                    "Title",
                    "For",
                    "Deadline",
                    "Funding Amount",
                    "Description",
                    "Eligibility Criteria",
                    "",
                ]}
            >
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
                        onTap={() => router.push(`/govt/grants/${grant.id}`)}
                        slTableRowOptions={slTableRowOptions}
                    >
                        <TableCell>{grant.id}</TableCell>
                        <TableCell>{grant.title}</TableCell>
                        <TableCell>{grant.fundingBodyId}</TableCell>
                        <TableCell>
                            {formatDateWithOrdinal(new Date(grant.deadline))}
                        </TableCell>
                        <TableCell>{`₹ ${grant.amount}`}</TableCell>
                        <TableCell>{grant.description}</TableCell>
                        <TableCell>{grant.requirements}</TableCell>
                    </SlTableRow>
                ))}

                {/* <Badge
                    variant="outline"
                    className="bg-yellow-100 text-yellow-800"
                >
                    Pending
                </Badge> */}
            </SLTable>
        </div>
    );
};

export default SingleMotion;
