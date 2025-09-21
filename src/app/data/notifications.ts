// data/notifications.ts
import {
  PiUserLight,
  PiRssSimpleLight,
  PiBug,
} from "react-icons/pi";
import type { NotificationItem, ActivityItem, ContactItem } from "../types/notifications";

export const notifications: NotificationItem[] = [
  {
    id: "n1",
    title: "You have a bug that needs fixing in Page X",
    subtitle: "Just now",
    icon: PiBug,
    iconBg: "bg-neutral-50",
    unread: true,
  },
  {
    id: "n2",
    title: "New user registered",
    subtitle: "59 minutes ago",
    icon: PiUserLight,
    iconBg: "bg-neutral-50",
    unread: true,
  },
  {
    id: "n3",
    title: "You have a bug that needs fixing",
    subtitle: "12 hours ago",
    icon: PiBug,
    iconBg: "bg-neutral-50",
  },
  {
    id: "n4",
    title: "Andi Lane subscribed to you",
    subtitle: "Today, 11:59 AM",
    icon: PiRssSimpleLight,
    iconBg: "bg-neutral-50",
  },
];

export const activities: ActivityItem[] = [
  {
    id: "a1",
    title: "You have a bug that needs fixing",
    time: "Just now",
    avatar: "https://i.pravatar.cc/40?img=32",
  },
  {
    id: "a2",
    title: "Released a new version",
    time: "59 minutes ago",
    avatar: "https://i.pravatar.cc/40?img=12",
  },
  {
    id: "a3",
    title: "Submitted a bug",
    time: "12 hours ago",
    avatar: "https://i.pravatar.cc/40?img=47",
  },
  {
    id: "a4",
    title: "Modified A data in Page X",
    time: "Today, 11:59 AM",
    avatar: "https://i.pravatar.cc/40?img=5",
  },
  {
    id: "a5",
    title: "Deleted a page in Project X",
    time: "Feb 2, 2023",
    avatar: "https://i.pravatar.cc/40?img=7",
  },
];

export const contacts: ContactItem[] = [
  { id: "c1", name: "Natali Craig", avatar: "https://i.pravatar.cc/40?img=6" },
  { id: "c2", name: "Drew Cano", avatar: "https://i.pravatar.cc/40?img=29" },
  { id: "c3", name: "Orlando Diggs", avatar: "https://i.pravatar.cc/40?img=18" },
  { id: "c4", name: "Andi Lane", avatar: "https://i.pravatar.cc/40?img=5" },
  { id: "c5", name: "Kate Morrison", avatar: "https://i.pravatar.cc/40?img=15" },
  { id: "c6", name: "Koray Okumus", avatar: "https://i.pravatar.cc/40?img=21" },
];
