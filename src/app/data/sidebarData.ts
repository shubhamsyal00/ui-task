// data/sidebarData.ts
import type { SidebarData } from "../types/nav";
import { PiChartPieSliceLight } from "react-icons/pi";
import { PiShoppingCartLight } from "react-icons/pi";
import { PiFolderOpenLight } from "react-icons/pi";
import { PiBookOpenLight } from "react-icons/pi";
import { PiUserLight } from "react-icons/pi";
import { PiCardholderLight } from "react-icons/pi";
import { PiUsersThreeLight } from "react-icons/pi";
import { PiNewspaperLight } from "react-icons/pi";
import { PiChatCenteredDotsLight } from "react-icons/pi";

export const sidebarData: SidebarData = {
    user: {
        name: "ByeWind",
        avatar: "https://i.pravatar.cc/100?img=5",
    },
    sections: [
        {
            title: "Favorites",
            items: [
                { label: "Overview", href: "#", type: "link" },
                { label: "Projects", href: "#", type: "link" },
            ],
        },
        {
            title: "Dashboards",
            items: [
                { label: "Default", href: "#", icon: PiChartPieSliceLight, type: "link", active: true },
                {
                    label: "eCommerce", icon: PiShoppingCartLight, type: "submenu",
                    children: [
                        { label: "demo", href: "#", type: "link" },
                    ]
                },
                {
                    label: "Projects", icon: PiFolderOpenLight, type: "submenu",
                    children: [
                        { label: "demo", href: "#", type: "link" },
                    ]
                },
                {
                    label: "Online Courses", icon: PiBookOpenLight, type: "submenu",
                    children: [
                        { label: "demo", href: "#", type: "link" },
                    ]
                },
            ],
        },
        {
            title: "Pages",
            items: [
                {
                    label: "User Profile",
                    icon: PiUserLight,
                    type: "submenu",
                    children: [
                        { label: "Overview", href: "#", type: "link" },
                        { label: "Projects", href: "#", type: "link" },
                        { label: "Campaigns", href: "#", type: "link" },
                        { label: "Documents", href: "#", type: "link" },
                        { label: "Followers", href: "#", type: "link" },
                    ],
                },
                {
                    label: "Account", icon: PiCardholderLight, type: "submenu",
                    children: [
                        { label: "demo", href: "#", type: "link" },
                    ]
                },
                {
                    label: "Corporate", icon: PiUsersThreeLight, type: "submenu",
                    children: [
                        { label: "demo", href: "#", type: "link" },
                    ]
                },
                {
                    label: "Blog", icon: PiNewspaperLight, type: "submenu",
                    children: [
                        { label: "demo", href: "#", type: "link" },
                    ]
                },
                {
                    label: "Social", icon: PiChatCenteredDotsLight, type: "submenu",
                    children: [
                        { label: "demo", href: "#", type: "link" },
                    ]
                },
            ],
        },
    ],
};
