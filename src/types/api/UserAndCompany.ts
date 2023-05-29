import { ErrorTypes } from "../error";
import { CompanyUserInfo } from "./Company";
import { GetUserInfo } from "./UserInfo";

export type UserAndCompany = {
  success: true;
  user: GetUserInfo;
  company: CompanyUserInfo;
} | {
  success: false;
  error: ErrorTypes;
}