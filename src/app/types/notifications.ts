// types/notifications.ts
import type { IconType } from "react-icons";

export type NotificationItem = {
  id: string;
  title: string;
  subtitle?: string; // e.g. "Just now", "12 hours ago"
  icon?: IconType; // small icon inside colored circle
  iconBg?: string; // tailwind color for icon bg like "bg-neutral-50" or "bg-neutral-400"
  unread?: boolean;
};

export type ActivityItem = {
  id: string;
  title: string;
  time?: string;
  avatar?: string; // image URL
};

export type ContactItem = {
  id: string;
  name: string;
  avatar?: string;
};
