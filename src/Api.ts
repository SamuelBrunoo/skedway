import a from "axios"
import { ErrorTypes } from "./types/error"
import { SendPhotoType } from "./types/api/SendPhoto"
import { GetUserInfoRes, UserInfo } from "./types/api/UserInfo"
import { getCroppedImage } from "./consts/auxs/getCroppedImage"


type Props = {
  token: string;
}

const useApi = ({ token }: Props) => {

  const baseUrl = process.env.NODE_ENV == "development" ?
    process.env.REACT_APP_API_BASE_URL :
    process.env.REACT_APP_PROD_API

  const axios = a.create({
    baseURL: baseUrl,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json"
    }
  })

  return ({
    getUserInfo: async (): Promise<GetUserInfoRes> => {
      try {
        const cmp = await axios.get(`/users/me/summary`,)
        return ({ success: true, info: cmp.data as UserInfo })
      } catch (error: any) {
        const errorStatus = error.response.status

        return (errorStatus === 400 || errorStatus === 500) ?
          { success: false, error: 'generic' as ErrorTypes } :
          { success: false, error: 'accessDenied' as ErrorTypes }
      }
    },
    sendPhoto: async (userId: number, photoBlob: Blob): Promise<SendPhotoType> => {

      const cropped = await getCroppedImage(photoBlob)

      const formData = new FormData()
      formData.append('face', cropped.blob)

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