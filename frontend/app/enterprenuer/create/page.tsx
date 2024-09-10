"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormSection } from "./FormSection/FormSection";
import { InputField } from "./InputField/InputField";
import SelectField from "./SelectField/SelectField";
import {
    createStartup,
    getStartupByToken,
    updateStartup,
} from "@/actions/startup";
import { useAuthContext } from "@/context/AuthContext";
import { StartupData } from "@/types";
import FormSuccess from "@/components/web/auth/form_success";
import FormError from "@/components/web/auth/form_error";
import { useStartupContext } from "@/context/StartupContext";
import { LineWave } from "react-loader-spinner";
import { AddStartupSchema } from "@/schemas";

export default function DashboardInput() {
    const { data: startup, gettingData } = useStartupContext();

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<StartupData>({
        resolver: zodResolver(AddStartupSchema),
        defaultValues: startup || {
            name: "",
            description: "",
            location: "",
            industry: "",
            funding: 0,
            website: "",
            foundedAt: "",
            teamSize: 0,
            period: "",
            retention_rate: 0,
            mrr_growth: 0,
            itv_cac_ratio: 0,
            nps_score: 0,
            conversion_rate: 0,
            revenue: 0,
            expenses: 0,
            valuation: 0,
            net_profit: 0,
            gross_profit: 0,
            gross_margin: 0,
            founders_equity: 0,
            investors_equity: 0,
            employees_equity: 0,
            customers: 0,
            employees: 0,
            churnRate: 0,
            burnRate: 0,
            runway: 12,
            cac: 0,
        },
    });

    async function onSubmit(values: z.infer<typeof AddStartupSchema>) {
        setError("");
        setSuccess("");
        if (startup !== null && startup !== undefined) {
            console.log("UPDATING STARTUP DATA");

            await updateStartup({
                ...values,
                id: startup.id,
            });
            setSuccess("updation success");
            return;
        }
        console.log(values);
        console.log("CREATING STARTUP DATA");
        const message = await createStartup(values);
        if (message.success) {
            setSuccess("success");
            localStorage.setItem("startup", JSON.stringify(values));
        } else {
            setError("Some error occured");
        }
        console.log(message, "message");
    }

    if (gettingData === null) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <LineWave color="#93c5fd" width={128} height={128} />
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Startup Data</h1>

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                >
                    <FormSection
                        title="Basic Information"
                        description="Enter basic startup information."
                    >
                        <InputField
                            control={form.control}
                            name="name"
                            label="Startup Name"
                            type="text"
                        />
                        <InputField
                            control={form.control}
                            name="description"
                            label="Description"
                            type="text"
                        />
                        <InputField
                            control={form.control}
                            name="location"
                            label="Location"
                            type="text"
                        />
                        <SelectField
                            control={form.control}
                            name="industry"
                            label="Industry"
                            options={[
                                "IT",
                                "HEALTH",
                                "FINANCE",
                                "AGRICULTURE",
                                "EDUCATION",
                                "ENERGY",
                                "TRANSPORT",
                                "MANUFACTURING",
                                "RETAIL",
                                "OTHER",
                                "REAL_ESTATE",
                                "TOURISM",
                                "ENTERTAINMENT",
                            ]}
                        />
                        <InputField
                            control={form.control}
                            name="funding"
                            label="Funding ($)"
                        />
                        <InputField
                            control={form.control}
                            name="website"
                            label="Website"
                            type="text"
                        />
                        <InputField
                            control={form.control}
                            name="foundedAt"
                            label="Founded At"
                            type="date"
                        />
                        <InputField
                            control={form.control}
                            name="teamSize"
                            label="Team Size"
                        />
                    </FormSection>

                    <FormSection
                        title="Performance Period"
                        description="Enter the period for this data."
                    >
                        <InputField
                            control={form.control}
                            name="period"
                            label="Period"
                            type="date"
                        />
                    </FormSection>

                    <FormSection
                        title="Key Metrics"
                        description="Enter key performance metrics."
                    >
                        <InputField
                            control={form.control}
                            name="retention_rate"
                            label="Retention Rate (%)"
                        />
                        <InputField
                            control={form.control}
                            name="mrr_growth"
                            label="MRR Growth (%)"
                        />
                        <InputField
                            control={form.control}
                            name="itv_cac_ratio"
                            label="LTV:CAC Ratio"
                        />
                        <InputField
                            control={form.control}
                            name="nps_score"
                            label="NPS Score"
                        />
                        <InputField
                            control={form.control}
                            name="conversion_rate"
                            label="Conversion Rate (%)"
                        />
                    </FormSection>

                    <FormSection
                        title="Financial Information"
                        description="Enter financial details."
                    >
                        <InputField
                            control={form.control}
                            name="revenue"
                            label="Revenue ($)"
                        />
                        <InputField
                            control={form.control}
                            name="expenses"
                            label="Expenses ($)"
                        />
                        <InputField
                            control={form.control}
                            name="valuation"
                            label="Valuation ($)"
                        />
                        <InputField
                            control={form.control}
                            name="net_profit"
                            label="Net Profit ($)"
                        />
                        <InputField
                            control={form.control}
                            name="cac"
                            label="Customer Acquisition Cost ($)"
                        />
                        <InputField
                            control={form.control}
                            name="gross_profit"
                            label="Gross Profit ($)"
                        />
                        <InputField
                            control={form.control}
                            name="gross_margin"
                            label="Gross Margin ($)"
                        />
                    </FormSection>

                    <FormSection
                        title="Equity Distribution"
                        description="Enter equity percentages."
                    >
                        <InputField
                            control={form.control}
                            name="founders_equity"
                            label="Founders Equity (%)"
                        />
                        <InputField
                            control={form.control}
                            name="investors_equity"
                            label="Investors Equity (%)"
                        />
                        <InputField
                            control={form.control}
                            name="employees_equity"
                            label="Employees Equity (%)"
                        />
                    </FormSection>

                    <FormSection
                        title="Other Metrics"
                        description="Enter additional startup metrics."
                    >
                        <InputField
                            control={form.control}
                            name="customers"
                            label="Number of Customers"
                        />
                        <InputField
                            control={form.control}
                            name="employees"
                            label="Number of Employees"
                        />
                        <InputField
                            control={form.control}
                            name="churnRate"
                            label="Churn Rate (%)"
                        />
                        <InputField
                            control={form.control}
                            name="burnRate"
                            label="Burn Rate ($)"
                        />
                        <InputField
                            control={form.control}
                            name="runway"
                            label="Runway (months)"
                        />
                    </FormSection>
                    <FormSuccess message={success} />
                    <FormError message={error} />
                    <Button type="submit" variant={"secondary"}>
                        Submit Data
                    </Button>
                </form>
            </Form>
        </div>
    );
}
