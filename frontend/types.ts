import { Roles } from "./lib/enums";

export type UserType = {
    id: string;
    email: string;
    name: string;
    password: string;
    role: Roles;
};

export type StartupData = {
    id: number;
    name: string; // Name of the company
    cac: number;
    description: string; // Description of the company
    location: string; // Location of the company
    industry: string; // Industry sector
    funding: number; // Total funding received
    website: string; // Website URL
    foundedAt: string; // Date founded
    teamSize: number; // Number of team members
    period: string; // Operational period
    retention_rate: number; // Retention rate of customers
    mrr_growth: number; // Monthly Recurring Revenue growth rate
    itv_cac_ratio: number; // ITV to CAC ratio
    nps_score: number; // Net Promoter Score
    conversion_rate: number; // Conversion rate
    revenue: number; // Total revenue
    expenses: number; // Total expenses
    valuation: number; // Current company valuation
    net_profit: number; // Net profit
    gross_profit: number; // Gross profit
    gross_margin: number; // Gross margin percentage
    founders_equity: number; // Founders' equity percentage
    investors_equity: number; // Investors' equity percentage
    employees_equity: number; // Employees' equity percentage
    customers: number; // Number of customers
    employees: number; // Number of employees
    churnRate: number; // Customer churn rate
    burnRate: number; // Monthly burn rate
    runway: number; // Runway in months
};

export type MotionType = {
    id: string;
    userId: number;
    triggerId: string;
    actions: ActionType[];
    trigger: TriggerType;
};
export type TriggerType = {
    id: string;
    motionId: string;
    availableId: string;
    triggerMetadata: any;
    type: {
        name: string;
        id: string;
    };
};

export type ActionType = {
    id: string;
    name: string;
    motionId: string;
    actionId: string;
    sortingOrder: number;
    actionmetadata: any;
    type: AvaialbleAction;
};
export type AvaialbleAction = {
    id: string;
    name: string;
    requiredfields: any;
};

export type MotionCreateType = {
    availableTriggerId: string;
    triggerMetadata: any;
    actions: {
        name: string;
        availableActionId: string;
        actionmetadata: any;
    }[];
};
export type RoutesType = {
    name: string;
    href: string;
    Icon: any;
};

export interface IStartupMetrics {
    id: number;
    startupId: number;
    period: string;
    retention_rate: number;
    mrr_growth: number;
    itv_cac_ratio: number;
    nps_score: number;
    conversion_rate: number;
    revenue: number;
    expenses: number;
    valuation: number;
    net_profit: number;
    gross_profit: number;
    gross_margin: number;
    founders_equity: number;
    investors_equity: number;
    employees_equity: number;
    customers: number;
    employees: number;
    churnRate: number;
    burnRate: number;
    cac: number | null;
    equity: number | null;
    runway: number;
    createdAt: string;
    updatedAt: string;
}

export interface govtGrantData {
    amount: number;
    createdAt: string;
    deadline: string;
    description: string;
    fundingBodyId: number;
    id: number;
    isAssigned: boolean;
    projectId: string | null;
    remark: string;
    requirements: string;
    startupId: null;
    status: string;
    title: string;
    updatedAt: string;
}

export interface IGrants {
    amount: number;
    createdAt: string;
    deadline: string;
    description: string;
    fundingBodyId: number;
    id: number;
    isAssigned: boolean;
    projectId: string | null;
    remark: string;
    requirements: string;
    startupId: null;
    status: string;
    title: string;
    updatedAt: string;
}

export interface IGrantApplication {
    id: string;
    grantId: string;
    pitch: string;
    startupId: string | null;
    projectId: string | null;
}

export type Company = {
    id: number;
    name: string;
    description: string;
    founderId: number;
    foundedAt: string; // ISO date string
    teamSize: number;
    location: string;
    industry: string;
    website: string;
    funding: number;
    progress: number;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
};

export type Investment = {
    id: number;
    investorId: number;
    startupId: number;
    startupName: string;
    amount: number;
    equity: number;
    createdAt: string;
    updatedAt: string;
};

export type IPatentApplication = {
    id: number; // 3
    patentNumber: string; // "f5404647-c2d0-47d9-9ca0-bbdc2f20fb83"
    status: "PENDING" | "APPROVED" | "REJECTED"; // current status
    title: string; // "asdsad"
    description: string; // "asdsad"
    pdfPath: string; // URL to the patent PDF
    startupId: number; // 9
    approvalDate: string | null; // Could be null if not approved yet
    applicationDate: string; // "2024-09-09T13:52:02.657Z"
    createdAt: string; // "2024-09-09T13:52:02.657Z"
    updatedAt: string; // "2024-09-09T13:52:02.657Z"
};

export interface IUserGrantApplication {
    application: IGrantApplication;
    grant: IGrants;
}
