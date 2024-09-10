"use client";
import CardWrapper from "@/components/web/auth/card_wrapper";
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { RegisterSchema } from "@/schemas/index";
import { set, z } from "zod";
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

import FormSuccess from "@/components/web/auth/form_success";
import FormError from "@/components/web/auth/form_error";

import { register } from "@/actions/register";

import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";
import { getSetToken } from "@/hooks/getSetToken";
import Social from "@/components/web/auth/social";
import RoleSelector from "./RoleSelector/RoleSelector";
const RegisterPage = () => {
    const [error, seterror] = useState<string | undefined>(undefined);
    const [success, setsuccess] = useState<string | undefined>(undefined);
    const [Pending, setPending] = useState(false);
    const router = useRouter();
    const { user, fetchUser } = useAuthContext();

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            name: "",
            password: "",
            email: "",
        },
    });

    async function onSubmit(values: z.infer<typeof RegisterSchema>) {
        console.log(values);
        setsuccess("");
        seterror("");
        setPending(true);

        try {
            let result = await register({
                name: values.name,
                email: values.email,
                password: values.password,
                role: values.role,
            });
            seterror(result.error);
            setsuccess(result.success);
            setPending(false);
            if (result.success) {
                getSetToken(result.token);
                await fetchUser();

                switch (values.role) {
                    case "RESEARCHER":
                        router.push("/");
                        break;

                    case "ENTREPRENEUR":
                        router.push("/enterprenuer/dashboard");
                        break;

                    case "GOVERNMENT":
                        router.push("/govt/grants");
                        break;

                    case "INNOVATOR":
                        router.push("/");
                        break;
                    case "INVESTOR":
                        router.push("/investor/dashboard");
                        break;
                    case "IPR_PROFESSIONAL":
                        router.push("/");
                        break;
                    default:
                        router.push("/");
                        break;
                }
            }
        } catch (err) {
            console.log(err);
            seterror(`Invalid Credentails`);
            setPending(false);
        }
    }
    return (
        <div className="h-full w-full bg-gradient-to-tl from-blue-400 to-yellow-300 flex justify-center items-center">
            <CardWrapper
                heading="Welcome back !"
                backbuttonhref="/auth/login"
                backbuttonlabel={`Have an account?`}
            >
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        <FormField
                            disabled={Pending}
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="John Doe"
                                            disabled={Pending}
                                            {...field}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="JohnDoe@gmail.com"
                                            type="email"
                                            disabled={Pending}
                                            {...field}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="*****"
                                            type="password"
                                            disabled={Pending}
                                            {...field}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="role"
                            render={({ field }) => {
                                return <RoleSelector {...field} />;
                            }}
                        ></FormField>

                        <FormError message={error} />
                        <FormSuccess message={success} />

                        <Button
                            type="submit"
                            className="w-full bg-primary text-white font-bold"
                            variant={"secondary"}
                            disabled={Pending}
                        >
                            Submit
                        </Button>
                    </form>
                </Form>
            </CardWrapper>
        </div>
    );
};

export default RegisterPage;
