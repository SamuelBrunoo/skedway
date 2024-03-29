import a, { Axios } from 'axios'
import { SendPhotoType } from './utils/types/api/SendPhoto'
import { GetUserInfoRes, UserInfo } from './utils/types/api/UserInfo'
import { ErrorTypes } from './utils/types/error'
import { Buffer } from 'buffer'
import { parseBlob } from './utils/auxs/parseUrl'


type Props = {
  token?: string;
}


const useApi = ({ token }: Props) => {
  const skedwayUrl = "https://dev-internal-api.skedway.com"
  const backUrl = "https://skedway-back.vercel.app/api"
  const onfidoToken = "Token token=api_live._JK6bEoqInv.NWeCHBPn_8WEPsZhcQ20uT0sBPSoltyH"

  const skedway = a.create({
    baseURL: skedwayUrl,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  })

  const back = a.create({
    baseURL: backUrl,
    headers: {
      Authorization: onfidoToken,
      "Content-Type": 'application/json',
      Accept: 'application/json',
    },
    maxBodyLength: Infinity,
    data: JSON.stringify({
      "application_id": "*"
    })
  })

  return {
    getUserInfo: async (): Promise<GetUserInfoRes> => {
      try {
        const cmp = await skedway.get(`/users/me/summary`);
        return { success: true, info: cmp.data as UserInfo };
      } catch (error: any) {
        const errorStatus = error.response.status;

        return errorStatus === 400 || errorStatus === 500
          ? { success: false, error: 'generic' as ErrorTypes }
          : { success: false, error: 'accessDenied' as ErrorTypes };
      }
    },
    sendPhoto: async (
      userId: number,
      photoBlob: Blob
    ): Promise<SendPhotoType> => {

      const formData = new FormData();
      formData.append('face', photoBlob)

      try {
        const req = await skedway.post(`/users/faces/${userId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        return { success: true, ...req };
      } catch (error: any) {
        const errorStatus = error.response.status;
        return errorStatus === 400
          ? { success: false, error: 'generic' as ErrorTypes }
          : { success: false, error: 'accessDenied' as ErrorTypes };
      }
    },
    createOnfidoUser: async () => {
      const req = await back.post(
        '/createUser',
        JSON.stringify({})
      )
      const data = req.data

      return ({
        success: true,
        id: data.userId
      })
    },
    getOnfidoSDKToken: async (userId: string) => {
      try {
        const req = await back.post(
          '/getSDKToken',
          JSON.stringify({
            applicant_id: userId,
            application_id: '*'
          })
        )
        const data = req.data
        const token = data.token

        return token
      } catch (error) {
        return false
      }
    },
    getWorkflowRunId: async (userId: string) => {
      const req = await back.post(
        '/getWorkflowRunId',
        JSON.stringify({
          "applicant_id": userId,
        })
      )
      const data = req.data
      const id = data.id

      return id
    },
    getMotionFrame: async (userId: string): Promise<{ success: true; blob: Blob } | { success: false }> => {
      try {
        const req = await back.get(
          '/getMotionFrame',
          {
            params: {
              applicant_id: userId
            }
          }
        )
        const data = req.data
        const str64 = Buffer.from(data.buffer).toString('base64')
        const url = `data:image/jpeg;base64,${str64}`

        const blob = await parseBlob(url)

        return ({ success: true, blob: blob })
      } catch (error) {
        return ({ success: false })
      }
    },
    deleteOnfidoUser: async (userId: string) => {
      try {
        await back.post(
          '/deleteUser',
          JSON.stringify({
            userId: userId
          })
        )
      } catch (error) {

      }
    }
  };
};

export default useApi;
