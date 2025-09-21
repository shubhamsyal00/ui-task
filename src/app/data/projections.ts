// data/projections.ts
export type ProjectionDatum = {
  month: string;
  actual: number;     // in millions, e.g. 18 => 18M
  projection: number; // in millions
};

export const projectionsData: ProjectionDatum[] = [
  { month: "Jan", actual: 18, projection: 20 },
  { month: "Feb", actual: 22, projection: 26 },
  { month: "Mar", actual: 19, projection: 21 },
  { month: "Apr", actual: 25, projection: 29 },
  { month: "May", actual: 14, projection: 16 },
  { month: "Jun", actual: 21, projection: 24 },
];
