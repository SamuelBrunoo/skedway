import a, { Axios } from 'axios'
import { SendPhotoType } from './utils/types/api/SendPhoto'
import { GetUserInfoRes, UserInfo } from './utils/types/api/UserInfo'
import { ErrorTypes } from './utils/types/error'


type Props = {
  token?: string;
};

const useApi = ({ token }: Props) => {
  const baseUrl = process.env.REACT_APP_API_BASE_URL
  const localUrl = process.env.REACT_APP_OWN_BACK_URL
  const onfidoToken = process.env.REACT_APP_ONFIDO_TOKEN
  const joeDoeId = process.env.REACT_APP_JOEDOE_ID

  const skedway = a.create({
    baseURL: baseUrl,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  })

  const local = new Axios({
    baseURL: localUrl,
    headers: {
      Authorization: onfidoToken,
      "Content-Type": 'application/json',
      Accept: 'application/json',
    },
    maxBodyLength: Infinity,
    data: JSON.stringify({
      "applicant_id": joeDoeId,
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
    getOnfidoSDKToken: async () => {
      try {
        const req = await local.post(
          '/getSDKToken',
          JSON.stringify({
            applicant_id: joeDoeId,
            application_id: '*'
          })
        )
        const data = JSON.parse(req.data)
        const token = data.token

        return token
      } catch (error) {
        return false
      }
    },
    getWorkflowRunId: async () => {
      const req = await local.post(
        '/getWorkflowRunId',
        JSON.stringify({
          "applicant_id": joeDoeId,
        })
      )
      const data = JSON.parse(req.data)
      const id = data.id

      return id
    },
    getMotionCaptureId: async () => {
      const applicantCaptures = await local.get(`/getMotionCaptureId?applicant_id=${joeDoeId}`)
      return applicantCaptures.data.motion_captures[applicantCaptures.data.motion_captures.length]
    },
    getVideoFrame: async (motionId: string) => {
      const req = await local.get(`/getFrame/${motionId}/frame`)
      console.log(req.data.frame)
    }
  };
};

export default useApi;
