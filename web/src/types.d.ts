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
  clans: string[];
};

export type User = {
  name: string;
  email: string;
  socialLink?: string;
  location?: string;
  username: string;
  password?: string;
  isVerified: boolean;
  profileImage?: string;
  coverImage?: string;
  numberOfTournamentsPlayed?: string;
  rank?: string;
  clan?: string;
  wallets?: string[];
  depositAmount?: number;
  winningAmount?: number;
};

export type Clan = {
  name: string;
  uniqueName: string;
  description?: string;
  imageUrl: string;
  members?: string[];
  coLeaders?: string[];
  leader: string[];
};
