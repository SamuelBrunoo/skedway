import { AxiosResponse, AxiosResponseHeaders, InternalAxiosRequestConfig, RawAxiosResponseHeaders } from "axios";
import { ErrorTypes } from "../error";

export type SendPhotoType = {
  success: false;
  error: ErrorTypes;
} | {
  success: true;
  data: any;
  status: number;
  statusText: string;
  headers: RawAxiosResponseHeaders | AxiosResponseHeaders;
  config: InternalAxiosRequestConfig<any>;
  request?: any;
}