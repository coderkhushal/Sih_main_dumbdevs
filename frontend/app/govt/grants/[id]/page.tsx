"use client";
import SLTable from "@/components/ui/CustomTableReusableComponents/SLTable";
import SlTableRow from "@/components/ui/CustomTableReusableComponents/SlTableRow";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TableCell } from "@/components/ui/table";
import React, { useEffect, useState } from "react";
import AnalyticsBar from "../AnalyticsBar/AnalyticsBar";
import AnalyticsBarItem from "../AnalyticsBar/AnalyticsBarItem";
import { MdIncompleteCircle } from "react-icons/md";
import { IoIosPaper } from "react-icons/io";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useParams, useRouter } from "next/navigation";
import { getGrantApplications } from "@/actions/govt";
import { IGrantApplication } from "@/types";
import { ThreeDots } from "react-loader-spinner";

export default function ApplicationsPage() {
    const router = useRouter();

    const params = useParams<{ id: string }>();

    const slTableRowOptions = [
        { title: "Approve", onTap: () => {} },
        { title: "Add remark", onTap: () => {} },
        { title: "Communicate", onTap: () => {} },
    ];

    const [applications, setApplications] =
        useState<Array<IGrantApplication> | null>(null);

    useEffect(() => {
        async function fetchRequiredData() {
            const data = await getGrantApplications({
                grantId: params.id,
            });

            console.log(data);

            setApplications(data);
        }
        fetchRequiredData();
    }, [params.id]);

    return (
        <div className="w-full h-full bg-background px-4">
            <div className="flex flex-row px-4 py-2 mt-4 justify-start items-center">
                <div
                    onClick={() => router.back()}
                    className="bg-onBackground/50 rounded-full px-1 py-1 hover:bg-onBackground/40 cursor-pointer"
                >
                    <IoMdArrowRoundBack size={28} color="white" />
                </div>
            </div>

            <AnalyticsBar>
                <AnalyticsBarItem
                    name="Total Applications"
                    value="10"
                    icon={
                        <MdIncompleteCircle
                            size={48}
                            className="text-onBackground"
                        />
                    }
                    color="bg-yellow-200"
                />
                <AnalyticsBarItem
                    name="Applications Active"
                    value="3"
                    icon={
                        <IoIosPaper size={48} className="text-onBackground" />
                    }
                    color="bg-blue-200"
                />
                <AnalyticsBarItem
                    name="Application Approved"
                    value="3"
                    icon={<FaCheck size={48} className="text-onBackground" />}
                    color="bg-green-200"
                />
                <AnalyticsBarItem
                    name="Application Rejected"
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
                title="Applications"
                caption={"All submitted applications"}
                headers={[
                    "Application ID",
                    "Startup ID",
                    "Name",
                    "Pitch",
                    "Remark",
                    "",
                ]}
            >
                {applications === null ? (
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

                {applications?.map((application, index) => {
                    return (
                        <SlTableRow
                            onTap={() =>
                                router.push(
                                    `/govt/grants/${params.id}/${application.startupId}`
                                )
                            }
                            key={index}
                            slTableRowOptions={slTableRowOptions}
                        >
                            <TableCell>{application.id}</TableCell>
                            <TableCell>{application.startupId}</TableCell>
                            <TableCell>{application.startupId}</TableCell>
                            <TableCell>{application.pitch}</TableCell>
                            <TableCell>{application.projectId}</TableCell>
                            <TableCell></TableCell>
                        </SlTableRow>
                    );
                })}
            </SLTable>
        </div>
    );
}
