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

import { createGrantSchema } from "@/schemas";
import { createGrant } from "@/actions/govt";
import { useToast } from "@/hooks/use-toast";
import { MdCancel, MdCheck } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

export default function AddGrantForm() {
    const { toast } = useToast();

    const form = useForm<z.infer<typeof createGrantSchema>>({
        resolver: zodResolver(createGrantSchema),
    });

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    async function onSubmit(data: z.infer<typeof createGrantSchema>) {
        setIsSubmitting(() => true);

        const success: boolean = await createGrant(data);

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
                        ? "Grant added successfully!"
                        : "Failed to add grant"}
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
                    name="Title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{field.name}</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Title of grant"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="Description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{field.name}</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Description of grant"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="Amount"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{field.name}</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="Amount in Rs."
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="Requirements"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{field.name}</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Requirements for submitting application"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="Deadline"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>{field.name}</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-[240px] pl-3 text-left font-normal",
                                                !field.value &&
                                                    "text-muted-foreground"
                                            )}
                                        >
                                            {field.value ? (
                                                format(
                                                    formatDateWithOrdinal(
                                                        field.value
                                                    )
                                                )
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                            <PiCalendarThin className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContentDialog
                                    className="w-auto p-0"
                                    align="start"
                                >
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) =>
                                            date > new Date() ||
                                            date < new Date("1900-01-01")
                                        }
                                        initialFocus
                                    />
                                </PopoverContentDialog>
                            </Popover>
                            <FormDescription>
                                Your date of birth is used to calculate your
                                age.
                            </FormDescription>
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
