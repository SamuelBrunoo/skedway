import axios, { Axios } from "axios"


axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL

const api = {
  ping: async () => {
    const req = await axios.get('/')
    return await req.data()
  },
  sendPhoto: async (photoUrl: Blob) => {
    const req = await axios.post(
      '/loginFace',
      {
        img: photoUrl
      }
    )
    return await req.data
  }
}

export default api