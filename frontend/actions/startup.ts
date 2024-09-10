import { AddStartupSchema } from "@/schemas";
import {
    IGrants,
    IStartupMetrics,
    govtGrantData,
    StartupData,
    IPatentApplication,
    IUserGrantApplication,
} from "@/types";
import * as z from "zod";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export const getStartupByToken = async (): Promise<StartupData | null> => {
    const token = localStorage.getItem("token");
    console.log(token);

    try {
        const fetchStartup = fetch(`${BASE_URL}/startup`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
            },
        }).then((res) => res.json());

        const data = await fetchStartup;

        console.log("TTTTTTTTTTTTTTTTTTT");
        console.log(data);
        console.log("TTTTTTTTTTTTTTTTTTT");

        if (!data?.startups?.[0]) {
            return null;
        }

        const fetchMetrics = fetch(`${BASE_URL}/startup/metrics`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ startupId: data?.startups?.[0].id }),
        }).then((res) => res.json());

        console.log("TTTTTTTTTTTTTTTTTTT");
        console.log(data);
        console.log("TTTTTTTTTTTTTTTTTTT");

        const [startupData, metricsData] = await Promise.all([
            fetchStartup,
            fetchMetrics,
        ]);

        if (startupData.length === 0) {
            return null;
        }

        if (startupData && metricsData) {
            return { ...startupData.startups[0], ...metricsData.metrics[0] };
        }

        return null;
    } catch (err) {
        console.error(err);
        return null;
    }
};

export const createStartup = async (data: z.infer<typeof AddStartupSchema>) => {
    console.log("all fields", {
        name: data.name,
        description: data.description,
        location: data.location,
        industry: data.industry,
        funding: data.funding,
        website: data.website,
        foundedAt: data.foundedAt,
        teamSize: data.teamSize,
    });
    const token = localStorage.getItem("token");
    try {
        const resOfStartupCreation = await fetch(`${BASE_URL}/startup/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                name: data.name,
                description: data.description,
                location: data.location,
                industry: data.industry,
                funding: data.funding,
                website: data.website,
                foundedAt: data.foundedAt,
                teamSize: data.teamSize,
            }),
        });
        const startupCreationData = await resOfStartupCreation.json();

        console.log(startupCreationData);

        if (resOfStartupCreation.status !== 200) {
            return {
                error: startupCreationData.message,
            };
        }

        const resOfStartupMetrics = await fetch(
            `${BASE_URL}/startup/metrics/create`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    startupId: startupCreationData.startupId,
                    period: data.period,
                    retention_rate: data.retention_rate,
                    mrr_growth: data.mrr_growth,
                    itv_cac_ratio: data.itv_cac_ratio,
                    nps_score: data.nps_score,
                    conversion_rate: data.conversion_rate,
                    revenue: data.revenue,
                    expenses: data.expenses,
                    valuation: data.valuation,
                    net_profit: data.net_profit,
                    gross_profit: data.gross_profit,
                    gross_margin: data.gross_margin,
                    founders_equity: data.founders_equity,
                    investors_equity: data.investors_equity,
                    employees_equity: data.employees_equity,
                    customers: data.customers,
                    employees: data.employees,
                    churnRate: data.churnRate,
                    burnRate: data.burnRate,
                    runway: data.runway,
                }),
            }
        );
        const startupMetricsData = await resOfStartupMetrics.json();
        console.log(startupMetricsData, "metric");
        if (resOfStartupMetrics.status === 200) {
            console.log("data", data);
            return { success: "success" };
        }
        return { error: startupMetricsData.message };
    } catch (err) {
        return { error: "server error" };
    }
};

export const updateStartup = async (data: StartupData) => {
    console.log(
        {
            name: data.name,
            description: data.description,
            location: data.location,
            industry: data.industry,
            funding: data.funding,
            website: data.website,
            foundedAt: data.foundedAt,
            teamSize: data.teamSize,
        },
        "update"
    );
    const token = localStorage.getItem("token");
    try {
        const res = await fetch(`${BASE_URL}/startup/update`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                startupId: 1,
                name: data.name,
                description: data.description,
                location: data.location,
                industry: data.industry,
                funding: data.funding,
                website: data.website,
                foundedAt: data.foundedAt,
                teamSize: data.teamSize,
            }),
        });
        const data2 = await res.json();
        console.log("whak", data2);
        const res1 = await fetch(`${BASE_URL}/startup/metrics/update`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                startupId: 1,
                metricsId: 1,
                period: data.period,
                retention_rate: data.retention_rate,
                mrr_growth: data.mrr_growth,
                itv_cac_ratio: data.itv_cac_ratio,
                nps_score: data.nps_score,
                conversion_rate: data.conversion_rate,
                revenue: data.revenue,
                expenses: data.expenses,
                valuation: data.valuation,
                net_profit: data.net_profit,
                gross_profit: data.gross_profit,
                gross_margin: data.gross_margin,
                founders_equity: data.founders_equity,
                investors_equity: data.investors_equity,
                employees_equity: data.employees_equity,
                customers: data.customers,
                employees: data.employees,
                churnRate: data.churnRate,
                burnRate: data.burnRate,
                runway: data.runway,
            }),
        });
        const data1 = await res1.json();
        console.log(data1, "heyojjj");
        if (res.status === 200 && res1.status === 200) {
            console.log("data", data);
            return { ...data2.startups[0], ...data1 };
        }
        return null;
    } catch (err) {
        return null;
    }
};

export const getStartupDetailsById = async (startupId: number) => {};

export const getStartupMetrics = async (
    startupId: number
): Promise<IStartupMetrics | null> => {
    const token = localStorage.getItem("token");

    const req = await fetch(`${BASE_URL}/startup/metrics`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ startupId: startupId }),
    });

    const data = await req.json();

    console.log(data);

    if (req.status !== 200) {
        return null;
    }

    return data.metrics[0] as IStartupMetrics;
};

export async function getUrlToWhichPdfIsToBeUploaded({
    startupId,
}: {
    startupId: number;
}): Promise<{
    pdfPath: string;
    url: string;
} | null> {
    const token = localStorage.getItem("token");

    console.log(token);

    const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };

    const body = JSON.stringify({
        startupId: startupId,
    });

    try {
        const response = await fetch(`${BASE_URL}/patent/getUploadingUrl`, {
            method: "POST",
            headers: headers,
            body: body,
            redirect: "follow",
        });

        if (response.status !== 200) {
            return null;
        }

        const data = await response.json();

        console.log(data);

        return data;
    } catch (_) {
        return null;
    }
}

export async function uploadFileToS3Link({
    link,
    file,
}: {
    link: string;
    file: File;
}) {
    try {
        const res = await fetch(link, {
            method: "PUT",
            body: file,
        });

        const data = await res.json();

        if (res.status !== 200) {
            return false;
        }

        return true;
    } catch {
        return false;
    }
}

export async function createPatent({
    startupId,
    title,
    inventor,
    pdfPath,
}: {
    startupId: number;
    title: string;
    inventor: string;
    pdfPath: string;
}): Promise<boolean> {
    const token = localStorage.getItem("token");

    console.log(token);

    const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };

    const body = JSON.stringify({
        startupId: startupId,
        title: title,
        description: inventor,
        pdfPath: pdfPath,
    });

    try {
        const response = await fetch(`${BASE_URL}/patent/create`, {
            method: "POST",
            headers: headers,
            body: body,
            redirect: "follow",
        });

        if (response.status !== 200) {
            return false;
        }

        return true;
    } catch (_) {
        return false;
    }
}

export async function getAllAvailableGrants(): Promise<Array<IGrants> | null> {
    const token = localStorage.getItem("token");

    console.log(token);

    const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };

    try {
        const response = await fetch(`${BASE_URL}/startup/grants`, {
            method: "GET",
            headers: headers,
            redirect: "follow",
        });

        const data = await response.json();

        console.log(data);

        if (response.status !== 200) {
            return null;
        }

        return data as Array<IGrants>;
    } catch (_) {
        return null;
    }
}

export async function applyForGrant({
    grantId,
    startupId,
    pitch,
}: {
    grantId: number;
    startupId: number;
    pitch: string;
}): Promise<boolean> {
    const token = localStorage.getItem("token");

    console.log(token);

    const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };

    const body = JSON.stringify({
        grantId: grantId,
        startupId: startupId,
        pitch: pitch,
    });

    try {
        const response = await fetch(`${BASE_URL}/grants/submitApplication`, {
            method: "post",
            headers: headers,
            body: body,
            redirect: "follow",
        });

        const aa = await response.json();

        if (response.status !== 200) {
            return false;
        }

        return true;
    } catch (_) {
        return false;
    }
}

export async function getStartupPatents({
    startupId,
}: {
    startupId: number;
}): Promise<Array<IPatentApplication> | null> {
    const headers = {
        "Content-Type": "application/json",
    };

    const raw = JSON.stringify({
        startupId: startupId,
    });

    try {
        const response = await fetch(`${BASE_URL}/patent`, {
            method: "post",
            headers: headers,
            body: raw,
            redirect: "follow",
        });

        if (response.status !== 200) {
            return null;
        }

        const data = await response.json();

        return data.patents;
    } catch {
        return null;
    }
}

export async function getStartupsAppliedGrants({
    startupId,
}: {
    startupId: number;
}): Promise<Array<IUserGrantApplication> | null> {
    const token = localStorage.getItem("token");
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    };

    const raw = JSON.stringify({
        startupId: startupId,
    });

    try {
        const response = await fetch(`${BASE_URL}/startup/grantsApplied`, {
            method: "post",
            headers: headers,
            body: raw,
            redirect: "follow",
        });

        if (response.status !== 200) {
            return null;
        }

        const data = await response.json();

        const mappedData: Array<IUserGrantApplication> = data.data.map(
            (e: any) => {
                return {
                    application: {
                        id: e.id,
                        grantId: e.grantId,
                        pitch: e.pitch,
                        startupId: e.startupId,
                        projectId: e.projectId,
                    },
                    grant: e.grant,
                };
            }
        );

        return mappedData;
    } catch {
        return null;
    }
}
