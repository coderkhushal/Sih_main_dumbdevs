import { FaHome, FaPlus, FaCopyright, FaWallet } from "react-icons/fa";
import { FaHandsHelping } from "react-icons/fa";
import { MdDashboard, MdSpaceDashboard } from "react-icons/md";
import { IoDocumentText } from "react-icons/io5";
import { RiGovernmentFill } from "react-icons/ri";
import { HiDocumentReport } from "react-icons/hi";
import { GrResources } from "react-icons/gr";

export const govroutes = [
    {
        name: "Dashboard",
        href: "/govt/dashboard",
        Icon: MdDashboard,
    },
    {
        name: "Grants",
        href: "/govt/grants",
        Icon: FaWallet,
    },
    {
        name: "Applications",
        href: "/govt/applications",
        Icon: IoDocumentText,
    },
];

export const enterprenuerroutes = [
    {
        name: "Home",
        href: "/enterprenuer/dashboard",
        Icon: FaHome,
    },
    {
        name: "Create",
        href: "/enterprenuer/create",
        Icon: FaPlus,
    },
    {
        name: "IP Manage",
        href: "/enterprenuer/ip",
        Icon: FaCopyright,
    },
    {
        name: "Grants",
        href: "/enterprenuer/grants",
        Icon: RiGovernmentFill,
    },
    {
        name: "Resources",
        href: "/enterprenuer/resources",
        Icon: GrResources,
    },
];

export const researcherroutes = [
    {
        name: "Dashboard",
        href: "/researcher/dashboard",
        Icon: MdDashboard,
    },
    {
        name: "Projects",
        href: "/researcher/projects",
        Icon: HiDocumentReport,
    },
    {
        name: "Grants",
        href: "/researcher/grants",
        Icon: RiGovernmentFill,
    },
];

export const investorRoutes = [
    {
        name: "Dashboard",
        href: "/investor/dashboard",
        Icon: MdDashboard,
    },
];
