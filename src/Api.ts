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
      let data = req.data()
      data = {
        ...data,
        items: {
          ...data.items[0],
          pictureUrl: `${baseUrl}/${data.items[0].pictureUrl}`
        }
      }
      return data
    },
    sendPhoto: async (photo: Blob) => {
      const data = {
        photo
      }
      const req = await axios.post('/users/faces', data, {
        params: {
          userId: 123
        }
      })
      return await req.data
    }
  })
}

export default useApi