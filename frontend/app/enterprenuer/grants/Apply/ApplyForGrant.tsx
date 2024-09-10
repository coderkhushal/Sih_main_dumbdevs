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
import AddGrantForm from "@/app/govt/grants/AddGrant/AddGrantForm";
import ApplyGrantForm from "./ApplyForm";
export default function ApplyForGrantDialog({
    setDialogOpen,
    grantId,
}: {
    setDialogOpen: (val: boolean) => void;
    grantId: number;
}) {
    return (
        <DialogContent
            onInteractOutside={(e) => {
                if (e.detail.originalEvent.type === "pointerdown") {
                    setDialogOpen(false);
                }
                console.log(e.detail.originalEvent.type);
            }}
            className="sm:max-w-[425px]"
        >
            <DialogHeader>
                <DialogTitle>Application</DialogTitle>
                <DialogDescription>Apply for grant</DialogDescription>
                <ApplyGrantForm grantId={grantId} />
            </DialogHeader>
        </DialogContent>
    );
}
