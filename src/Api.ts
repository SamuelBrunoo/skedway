import a from "axios"


const useApi = () => {

  const baseUrl = process.env.REACT_APP_API_BASE_URL

  const axios = a.create({
    baseURL: baseUrl,
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_AUTH_TOKEN}`,
      Accept: "application/json"
    }
  })

  return ({
    getCompanyInfo: async () => {
      const req = await axios.get(`/users`, {
        params: {
          limit: 1,
          page: 1,
        }
      })
      let data = req.data
      return data
    },
    sendPhoto: async (userId: number, photo: Blob) => {
      const formData = new FormData()
      formData.append('file', photo)

      try {
        const req = await axios.post(`/users/faces/${userId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        return req
      } catch (error) {
        return false
      }
    }
  })
}

export default useApi