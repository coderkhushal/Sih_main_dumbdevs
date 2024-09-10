import { Input } from "@/components/ui/input";
import React from "react";
import { FaSearch } from "react-icons/fa";
import { IconContext } from "react-icons/lib";

export default function PatentSearch() {
    return (
        <div className="relative h-10">
            {/* <FaSearch size={28} /> */}
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 z-10" />
            <Input
                type="text"
                placeholder="Enter your comment here"
                className="pl-10 pr-3 py-2 text-md w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6E23DD] focus:border-transparent" // Add additional styling as needed
            />
        </div>
        // <div className="flex flex-row gap-2 justify-center items-center">
        //     <Input></Input>
        // </div>
    );
}
