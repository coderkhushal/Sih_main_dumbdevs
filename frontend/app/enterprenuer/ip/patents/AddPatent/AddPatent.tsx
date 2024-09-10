import { Button } from "@/components/ui/button";
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
import React from "react";
import { IoMdAdd } from "react-icons/io";
import PatentForm from "./PatentForm";

export default function AddPatent() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="secondary"
                    size="icon"
                    className="absolute bottom-8 right-8 h-12 w-12 bg-primarydark rounded-full hover:bg-primary active:bg-primary"
                >
                    <IoMdAdd
                        className="h-8r>
                    <Button w-8 "
                        color="white"
                    />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Patent</DialogTitle>
                    <DialogDescription>
                        Submit request for a new patent{" "}
                    </DialogDescription>
                </DialogHeader>
                <PatentForm />
                {/* <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input
                            id="name"
                            value="Pedro Duarte"
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Username
                        </Label>
                        <Input
                            id="username"
                            value="@peduarte"
                            className="col-span-3"
                        />
                    </div>
                </div> */}
            </DialogContent>
        </Dialog>
    );
}
