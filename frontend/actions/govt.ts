const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

import { formatDateToYYYYMMDD } from "@/lib/utils";
import { createGrantSchema } from "@/schemas";
import { IGrantApplication, govtGrantData } from "@/types";
import * as z from "zod";

export async function getGrantsByToken(): Promise<Array<govtGrantData> | null> {
    const token = localStorage.getItem("token");
    console.log(token);

    const headers = {
        Authorization: `Bearer ${token}`,
    };

    try {
        const response = await fetch(`${BASE_URL}/grants`, {
            method: "POST",
            headers: headers,
            redirect: "follow",
        });

        if (response.status !== 200) {
            return null;
        }
        return (await response.json()).grants as Array<govtGrantData>;
    } catch (_) {
        return null;
    }
}

export async function createGrant(
    data: z.infer<typeof createGrantSchema>
): Promise<boolean> {
    const token = localStorage.getItem("token");

    console.log(token);

    const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };

    try {
        const raw = JSON.stringify({
            title: data.Title,
            description: data.Description,
            amount: data.Amount,
            requirements: data.Requirements,
            deadline: formatDateToYYYYMMDD(data.Deadline),
        });
        const request = fetch(`${BASE_URL}/grants/create`, {
            method: "POST",
            headers: headers,
            redirect: "follow",
            body: raw,
        }).then((res) => res.json());

        const reqData = await request;

        console.log(reqData);

        if (reqData.msg == "Created Successfully") {
            return true;
        }

        return false;
    } catch (_) {
        return false;
    }
}

export async function getGrantApplications({
    grantId,
}: {
    grantId: string;
}): Promise<Array<IGrantApplication> | null> {
    const token = localStorage.getItem("token");

    console.log(token);
    console.log(grantId);

    const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };

    try {
        const raw = JSON.stringify({
            grantId: parseInt(grantId),
        });
        const request = fetch(`${BASE_URL}/grants/getApplications`, {
            method: "POST",
            headers: headers,
            redirect: "follow",
            body: raw,
        }).then((res) => res.json());

        const reqData = await request;

        if (reqData.msg !== undefined) {
            return null;
        }

        return reqData.applications as Array<IGrantApplication>;
    } catch (_) {
        return null;
    }
}
