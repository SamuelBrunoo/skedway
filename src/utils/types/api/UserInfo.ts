import { ErrorTypes } from "../error";

export type GetUserInfoRes = {
  success: true;
  info: UserInfo;
} | {
  success: false;
  error: ErrorTypes;
}

export type UserInfo = {
  id: number;
  name: string;
  email: string;
  company: {
    name: string;
    logo: string | undefined;
  }
}