import a from "axios"
import { ErrorTypes } from "./types/error"
import { SendPhotoType } from "./types/api/SendPhoto"
import { useState } from "react";
import { GetUserInfo } from "./types/api/UserInfo";
import { CompanyUserInfo } from "./types/api/Company";


type Props = {
  token: string;
}


const useApi = ({ token }: Props) => {

  const baseUrl = process.env.REACT_APP_API_BASE_URL

  const axios = a.create({
    baseURL: baseUrl,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json"
    }
  })

  return ({
    getUserInfo: async () => {
      try {
        const req = await axios.get(`/users`, {
          params: {
            limit: 1,
            page: 1,
          }
        })
        return req.data
      } catch (error) {
        return false
      }
    },
    getCompanyUserInfo: async () => {
      try {
        const req = await axios.get(`/users/me/summary`)
        return req.data
      } catch (error) {
        return false
      }
    },
    getUserAndCompanyInfo: async () => {
      try {
        const user = await axios.get(`/users`, {
          params: {
            limit: 1,
            page: 1,
          }
        })

        const cmp = await axios.get(`/users/me/summary`, )

        return ({
          success: true,
          all: {
            user: user.data as GetUserInfo,
            company: cmp.data as CompanyUserInfo
          }
        })
      } catch (error: any) {
        const errorStatus = error.response.status
        return (errorStatus === 400 || errorStatus === 500) ?
          { success: false, error: 'generic' as ErrorTypes } :
          { success: false, error: 'accessDenied' as ErrorTypes, details: error.response }
      }
    },
    sendPhoto: async (userId: number, photo: Blob): Promise<SendPhotoType> => {
      const formData = new FormData()
      formData.append('face', photo)

      try {
        const req = await axios.post(`/users/faces/${userId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          }
        })
        return { success: true, ...req }
      } catch (error: any) {
        const errorStatus = error.response.status
        return (errorStatus === 400) ?
          { success: false, error: 'generic' as ErrorTypes } :
          { success: false, error: 'accessDenied' as ErrorTypes }
      }
    }
  })
}

export default useApi