import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

function getOrdinalSuffix(day: number) {
    if (day > 3 && day < 21) return "th"; // Special case for 11-19
    switch (day % 10) {
        case 1:
            return "st";
        case 2:
            return "nd";
        case 3:
            return "rd";
        default:
            return "th";
    }
}

export function formatDateWithOrdinal(date: Date) {
    const day = date.getDate();
    const month = new Intl.DateTimeFormat("en-GB", { month: "long" }).format(
        date
    );
    const year = date.getFullYear();

    return `${day}${getOrdinalSuffix(day)} ${month}, ${year}`;
}

export function formatDateToYYYYMMDD(date: Date) {
    return date.toISOString().split("T")[0];
}
