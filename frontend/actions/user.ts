import { getGetAuthHeaders } from "@/hooks/getGetAuthHeaders";
import { UserType } from "@/types";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export const getUserByToken = async ({
    token,
}: {
    token: string;
}): Promise<UserType | null> => {
    try {
        const res = await fetch(`${BASE_URL}/auth/user/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
            },
        });
        const data = await res.json();

        if (res.status === 200) {
            return {
                id: data.user.id,
                email: data.user.email,
                name: data.user.name,
                password: data.user.password,
                role: data.user.role[0],
            };
        }
        return null;
    } catch (err) {
        return null;
    }
};
