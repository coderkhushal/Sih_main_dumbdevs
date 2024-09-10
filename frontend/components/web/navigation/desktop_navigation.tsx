"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import DeskTopNavigationItem from "./desktop_navigationitem";
import Image from "next/image";
import LOGO from "../../../public/logo.png";
import Link from "next/link";
import { useAuthContext } from "@/context/AuthContext";
import { RoutesType } from "@/types";
import { FaUser } from "react-icons/fa";
import UserProfilePicture from "@/components/custom/user_profile_picture";
import { Separator } from "@/components/ui/separator";

const DeskTopNavigation = ({
    routes,
    expand,
    setexpand,
    disabledIndexes = [],
}: {
    routes: RoutesType[];
    expand: boolean;
    setexpand: Dispatch<SetStateAction<boolean>>;
    disabledIndexes?: Array<number>;
}) => {
    // const [expand, setexpand] = useState<boolean>(false);
    const { showCitizenInsights } = useAuthContext();
    return (
        <aside
            onMouseEnter={() => {
                setexpand(true);
            }}
            onMouseLeave={() => {
                setexpand(false);
            }}
            className={`bg-onbackgroundContainer hidden lg:block text-onBackground ${
                expand ? "w-64" : "w-20"
            } transition-all p-4 z-10 fixed`}
        >
            <nav className="h-[85vh]">
                <Link
                    href="/"
                    className="flex space-x-2 my-3 mb-6 items-start h-14 justify-start"
                >
                    <Image
                        src={LOGO}
                        alt="logo"
                        height={50}
                        className="h-full rounded-xl"
                    />
                    {expand && (
                        <h1 className="w-full specialtext h-full py-2 text-xl font-bold">
                            StartLink
                        </h1>
                    )}
                </Link>
                <ul className="space-y-4 text-onBackground">
                    {routes.map((e, index) => {
                        if (e.name === "Citizen Insights") {
                            if (showCitizenInsights)
                                return (
                                    <DeskTopNavigationItem
                                        isExpanded={expand}
                                        name={e.name}
                                        key={index}
                                        Icon={e.Icon}
                                        href={e.href}
                                    />
                                );
                        } else {
                            return (
                                <DeskTopNavigationItem
                                    isExpanded={expand}
                                    name={e.name}
                                    key={index}
                                    Icon={e.Icon}
                                    href={e.href}
                                    disabled={disabledIndexes.includes(index)}
                                />
                            );
                        }
                    })}
                    {/* <DeskTopNavigationItem
                        isExpanded={expand}
                        name={"Settings"}
                        key={routes.length}
                        Icon={}
                        href={e.href}
                    /> */}
                </ul>
            </nav>
            <Separator className="mb-4 bg-onBackground/55" />
            <UserProfilePicture isExpanded={expand} />
        </aside>
    );
};

export default DeskTopNavigation;
