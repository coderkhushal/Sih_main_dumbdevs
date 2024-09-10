import React from "react";
import { Input } from "../input";
import { FaSearch } from "react-icons/fa";

export default function SlTableSearch() {
    return (
        <div className="relative h-10">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 z-10" />
            <Input
                type="text"
                placeholder="Enter your comment here"
                className="pl-10 pr-3 py-2 text-md w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6E23DD] focus:border-transparent" // Add additional styling as needed
            />
        </div>
    );
}
