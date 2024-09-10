"use client";

import React, { use, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { LineWave } from "react-loader-spinner";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useStartupContext } from "@/context/StartupContext";
import {
    createPatent,
    getUrlToWhichPdfIsToBeUploaded,
} from "@/actions/startup";
import ImageUpload from "@/components/custom/image_upload";
import { useToast } from "@/hooks/use-toast";
import { MdCheck } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

const formSchema = z.object({
    Title: z
        .string()
        .min(5, {
            message: "Title must be at least 5 characters long",
        })
        .max(255),
    Inventor: z
        .string()
        .min(3, {
            message: "Name must be at least 3 characters long",
        })
        .max(100),
});

export default function PatentForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    const { toast } = useToast();

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const uploadedFilesLinks = useRef<string[]>([]);

    const { data: startup } = useStartupContext();

    async function onSubmit(data: z.infer<typeof formSchema>) {
        setIsSubmitting(() => true);

        if (startup === null || startup === undefined) {
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
                        Failed to add patent
                    </div>
                ),
            });
            return;
        }

        const success = await createPatent({
            startupId: startup?.id,
            title: data.Title,
            inventor: data.Inventor,
            pdfPath: uploadedFilesLinks.current[0],
        });

        console.log(success);

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
                        ? "Patent added successfully!"
                        : "Failed to add patent"}
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
                                    placeholder="Title of your patent"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="Inventor"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{field.name}</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Name of the inventor"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <ImageUpload
                    startupId={startup?.id}
                    updateRef={(file: string) =>
                        (uploadedFilesLinks.current = [
                            ...uploadedFilesLinks.current,
                            file,
                        ])
                    }
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
