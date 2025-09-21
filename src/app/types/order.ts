export type OrderStatus = "In Progress" | "Complete" | "Pending" | "Approved" | "Rejected";

export type Order = {
  id: string;
  user: string;
  avatar: string;
  project: string;
  address: string;
  dateIso: string;
  status: OrderStatus;
};