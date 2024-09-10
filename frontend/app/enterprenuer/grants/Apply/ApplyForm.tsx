"use client";

import React, { use, useState } from "react";

import { LineWave } from "react-loader-spinner";
import { Input } from "@/components/ui/input";
import { PiCalendarThin } from "react-icons/pi";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn, formatDateWithOrdinal } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "util";
import { PopoverContentDialog } from "@/components/ui/popoverDialog";

import { ApplyForGrantSchema } from "@/schemas";
import { createGrant } from "@/actions/govt";
import { useToast } from "@/hooks/use-toast";
import { MdCancel, MdCheck } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { applyForGrant } from "@/actions/startup";
import { useStartupContext } from "@/context/StartupContext";
import { Textarea } from "@/components/ui/textarea";

export default function ApplyGrantForm({ grantId }: { grantId: number }) {
    const { toast } = useToast();

    const { data: startup } = useStartupContext();

    const form = useForm<z.infer<typeof ApplyForGrantSchema>>({
        resolver: zodResolver(ApplyForGrantSchema),
    });

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    async function onSubmit(data: z.infer<typeof ApplyForGrantSchema>) {
        setIsSubmitting(() => true);

        console.log(startup);

        if (startup === null) {
            toast({
                className:
                    "bg-onBackground outline-none border-none text-background",
                description: (
                    <div className="flex flex-row justify-start items-center gap-2 text-lg">
                        <div
                            className={`flex place-items-center bg-red-600 rounded-full p-1`}
                        >
                            <RxCross2 size={24} />
                        </div>
                        {
                            "Failed to apply for grant, please fill your startup data."
                        }
                    </div>
                ),
            });
            setIsSubmitting(() => false);
            return;
        }

        const success: boolean = await applyForGrant({
            startupId: startup.id,
            grantId: grantId,
            pitch: data.pitch,
        });

        toast({
            className:
                "bg-onBackground outline-none border-none text-background",
            description: (
                <div className="flex flex-row justify-start items-center gap-2 text-lg">
                    <div
                        className={`flex place-items-center  ${
                            success ? "bg-green-700" : "bg-red-600"
                        } rounded-full p-1`}
                    >
                        {success ? (
                            <MdCheck size={24} />
                        ) : (
                            <RxCross2 size={24} />
                        )}
                    </div>
                    {success
                        ? "Applied successfully!"
                        : "Failed to apply for grant"}
                </div>
            ),
        });

        setIsSubmitting(() => false);
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full space-y-4 flex flex-col"
            >
                <FormField
                    control={form.control}
                    name="pitch"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{"Pitch"}</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Your pitch" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button
                    className="h-full w-full flex justify-center items-center"
                    type="submit"
                >
                    {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
            </form>
        </Form>
    );
}
