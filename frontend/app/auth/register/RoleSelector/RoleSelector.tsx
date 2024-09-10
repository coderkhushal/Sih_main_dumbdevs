import React from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function RoleSelector({
    value,
    onChange,
}: {
    value: string;
    onChange: (value: string) => void;
}) {
    return (
        <Select onValueChange={onChange}>
            <SelectTrigger value={value} className="w-full">
                <SelectValue placeholder="Select Appropriate Role" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="RESEARCHER">Researcher</SelectItem>
                <SelectItem value="INNOVATOR">Innovator</SelectItem>
                <SelectItem value="ENTREPRENEUR">Entrepreneur</SelectItem>
                <SelectItem value="GOVERNMENT">Government</SelectItem>
                <SelectItem value="INVESTOR">Investor</SelectItem>
                <SelectItem value="IPR_PROFESSIONAL">
                    IPR Professional
                </SelectItem>
            </SelectContent>
        </Select>
    );
}
