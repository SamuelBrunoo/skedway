import a from "axios"
import { ErrorTypes } from "./types/error"
import { SendPhotoType } from "./types/api/SendPhoto"


const useApi = () => {

  const baseUrl = process.env.REACT_APP_API_BASE_URL
  const devToken = `Bearer ${process.env.REACT_APP_REQ_TOKEN}`

  const axios = a.create({
    baseURL: baseUrl,
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_AUTH_TOKEN}`,
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
        const req = await axios.get(`/users/me/summary`, {
          headers: {
            "Authorization": devToken
          }
        })
        return req.data
      } catch (error) {
        return false
      }
    },
    sendPhoto: async (userId: number, photo: Blob): Promise<SendPhotoType> => {
      const formData = new FormData()
      formData.append('face', photo)

      try {
        const req = await axios.post(`/users/faces/${userId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": devToken
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


/*
      const formData = new FormData()
      formData.append('face', photo)

      let response: SendPhotoType = { success: false, error: 'generic' as ErrorTypes }

      axios.post(`/users/faces/${userId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": devToken
        }
      }).then(res => {
        response = { success: true, ...res }

        return response
      }).catch(error => {
        const errorStatus = error.response.status

        response = (errorStatus === 400) ?
          { success: false, error: 'generic' as ErrorTypes } :
          { success: false, error: 'accessDenied' as ErrorTypes }

        return response
      })
    }
*/