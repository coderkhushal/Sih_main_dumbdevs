import React from "react";
import {
    DialogFooter,
    DialogHeader,
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IoMdAdd } from "react-icons/io";
import { Button } from "@/components/ui/button";
import AddGrantForm from "./AddGrantForm";
export default function AddGrantDialogContent() {
    return (
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Add Grant</DialogTitle>
                <DialogDescription>Add new grant to system</DialogDescription>
            </DialogHeader>
            <AddGrantForm />
        </DialogContent>
    );
}
