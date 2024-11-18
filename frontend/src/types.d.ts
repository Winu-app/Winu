export type VisibilityT = "PUBLIC" | "PRIVATE";

export type Tournament = {
  name: string;
  streamLink: string;
  description: string;
  visibility: Visibility;
  image?: string;
  startDate?: Date;
  createdBy: string;
  endDate?: Date;
  entryFee: number;
  isActive: boolean;
  host: string;
  matches: string[];
};
