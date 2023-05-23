export type CompanyUserInfo = {
  id: number;
  name: string;
  email: string;
  company: {
    name: string;
    logo: string;
  }
}