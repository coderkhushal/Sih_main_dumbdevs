"use client";

import { z } from "zod";

export const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1, {
        message: "Password cannot be empty",
    }),
});

export const RegisterSchema = z.object({
    email: z.string().email({
        message: "Invalid email address",
    }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters",
    }),
    name: z.string().min(1, {
        message: "Username cannot be empty",
    }),
    role: z.enum(
        [
            "RESEARCHER",
            "INNOVATOR",
            "ENTREPRENEUR",
            "GOVERNMENT",
            "INVESTOR",
            "IPR_PROFESSIONAL",
        ],
        {
            message: "Please select a role",
        }
    ),
});

export const createGrantSchema = z.object({
    Title: z
        .string()
        .min(5, {
            message: "Title must be at least 5 characters long",
        })
        .max(255),
    Description: z
        .string()
        .min(3, {
            message: "Description must be at least 3 characters long",
        })
        .max(100),
    Amount: z.coerce
        .number()
        .min(5000, {
            message: "Amount must be at least Rs.5000",
        })
        .max(10000000, {
            message: "Amount must be at most Rs. 1 crore",
        }),
    Requirements: z
        .string()
        .min(3, {
            message: "Requirements must be at least 3 characters long",
        })
        .max(100),
    Deadline: z.date({
        required_error: "A date of birth is required.",
    }),
});

export const ApplyForGrantSchema = z.object({
    pitch: z
        .string()
        .min(50, {
            message: "Pitch must be at least 50 characters long",
        })
        .max(500, {
            message: "Pitch must be at most 500 characters long",
        }),
});

export const ChangePassSchema = z.object({
    userName: z.string().min(1, {
        message: "UserName cannot be empty",
    }),
    existingPassword: z.string().min(1, {
        message: "Password cannot be empty",
    }),
    password: z.string().min(1, {
        message: "Password cannot be empty",
    }),
});

export interface SlTableRowOption {
    title: string;
    onTap: () => void;
}

export const AddStartupSchema = z.object({
    name: z.string().min(2),
    description: z.string().min(10),
    location: z.string().min(5),
    industry: z.string().min(1),
    funding: z.number().nonnegative().min(2),
    website: z.string().url().min(2),
    foundedAt: z.string().min(2),
    teamSize: z.number().nonnegative().min(1),
    period: z.string().min(2),
    retention_rate: z.number().min(0).max(100),
    mrr_growth: z.number().min(1),
    itv_cac_ratio: z.number().positive(),
    nps_score: z.number().min(0).max(10),
    conversion_rate: z.number().min(0).max(100),
    revenue: z.number().nonnegative(),
    expenses: z.number().nonnegative(),
    valuation: z.number().nonnegative(),
    net_profit: z.number(),
    gross_profit: z.number(),
    gross_margin: z.number(),
    founders_equity: z.number().min(0).max(100),
    investors_equity: z.number().min(0).max(100),
    employees_equity: z.number().min(0).max(100),
    customers: z.number().nonnegative(),
    employees: z.number().nonnegative(),
    churnRate: z.number().min(0).max(100),
    burnRate: z.number().nonnegative(),
    runway: z.number().positive(),
    cac: z.number().min(1),
});
