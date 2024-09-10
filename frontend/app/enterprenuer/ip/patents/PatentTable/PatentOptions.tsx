import React from "react";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuGroup,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubTrigger,
    DropdownMenuPortal,
    DropdownMenuSubContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { FaCheck } from "react-icons/fa";

export default function PatentOptions() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="rounded-full border-none outline-none active:border-none hover:border-none active:outline-none hover:outline-non w-8 h-8 flex flex-row justify-center items-center hover:bg-onBackground/15 active:bg-onBackground/15">
                    <PiDotsThreeOutlineVerticalFill />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Options</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        Edit & Resubmit
                        <DropdownMenuShortcut></DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        Chat with IPR Expert
                        <DropdownMenuShortcut></DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        Deleted
                        <DropdownMenuShortcut></DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
