import { EnumAccessType } from "../enums/EnumAccessType";

export type UserType = {
  _id?: string;
  id?: number;
  name?: string;
  email?: string;
  password?: string;
  createdAt?: string;
  createdBy?: string;
  accessType?: EnumAccessType;
  creatorId?: number;
};
