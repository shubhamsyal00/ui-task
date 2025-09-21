// types/nav.ts
import type { IconType } from "react-icons";

export type LinkItem = {
  label: string;
  href?: string;
  icon?: IconType;      // React-icon component
  type: "link";
  active?: boolean;
};

export type SubmenuItem = {
  label: string;
  icon?: IconType;
  type: "submenu";
  children: LinkItem[];
};

export type NavItem = LinkItem | SubmenuItem;

export type NavSection = {
  title: string;
  items: NavItem[];
};

export type SidebarData = {
  user: { name: string; avatar: string };
  sections: NavSection[];
};
