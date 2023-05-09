import dotenv from "dotenv"
import axios, { Axios } from "axios"

dotenv.config()

axios.defaults.baseURL = process.env.BASE_API_URL

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