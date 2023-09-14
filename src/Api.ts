import a, { Axios } from 'axios'
import { getCroppedImage } from './utils/auxs/getCroppedImage'
import { isAndroid } from './utils/auxs/getDeviceType'
import { SendPhotoType } from './utils/types/api/SendPhoto'
import { GetUserInfoRes, UserInfo } from './utils/types/api/UserInfo'
import { ErrorTypes } from './utils/types/error'


type Props = {
  token?: string;
};

const useApi = ({ token }: Props) => {
  const baseUrl = 'https://dev-internal-api.skedway.com';
  const onfidoUrl = 'https://api.eu.onfido.com'
  const onfidoToken = 'api_sandbox.TAcssgLVHxU.ee1hfC3QGqOYRAjPis7I43Yv24sGr-h4'
  const joeDoeId = 'a53da584-97e9-4f3a-9551-1bbb6cd57d9f'

  const skedway = a.create({
    baseURL: baseUrl,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true"
    },
  });

  const onfido = a.create({
    baseURL: onfidoUrl,
    headers: {
      Authorization: `Token token=${onfidoToken}`,
      "Content-Type": 'application/json',
      Accept: 'application/json'
    },
    maxBodyLength: Infinity,
    data: JSON.stringify({
      "applicant_id": "a53da584-97e9-4f3a-9551-1bbb6cd57d9f",
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
      const { blob } = await getCroppedImage(photoBlob);

      const formData = new FormData();
      if (isAndroid()) {
        formData.append('face', photoBlob);
      } else {
        formData.append('face', blob);
      }

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

      return new Promise(async (resolve) => {

        try {

          const req = await onfido.post('/sdk_token', {
            applicant_id: joeDoeId,
            application_id: '*'
          })

          resolve(req.data.token)

        } catch (error) {
          console.log(error)
        }
      })
    },
    runWorkFlow: async () => {

      try {
        const req = await onfido.post(`/v3.5/workflow_runs`, {
          "workflow_id": "0acad9af-dc28-4d50-ada9-8003cee218b3",
          "applicant_id": joeDoeId,
          "links": {
            "completed_redirect_url": document.location.href,
            "expired_redirect_url": document.location.href,
            "expires_at": "2023-09-13T18:10:00Z",
            "language": "en_US"
          }
        });
        alert('tudo certo')
        return { success: true, ...req };
      } catch (error: any) {
        const errorStatus = error.response.status;
        return errorStatus === 400
          ? { success: false, error: 'generic' as ErrorTypes }
          : { success: false, error: 'accessDenied' as ErrorTypes };
      }
    },
    getWorkflowRunId: async () => {
      const req = await onfido.post('/v3.6/workflow_runs/', {
        "applicant_id": "a53da584-97e9-4f3a-9551-1bbb6cd57d9f",
        "workflow_id": "0acad9af-dc28-4d50-ada9-8003cee218b3"
      })
      const id = req.data.id
      return id
    },
    getMotionCaptureId: async () => {
      const applicantCaptures = await onfido.get(`/v3.6/motion_captures?applicant_id=${joeDoeId}`)
      return applicantCaptures.data.motion_captures[applicantCaptures.data.motion_captures.length]
    },
    getVideoFrame: async (motionId: string) => {
      const req = await onfido.get(`/motion_captures/${motionId}/frame`)
      console.log('onAPi -> ', req.data)
    }
  };
};

export default useApi;
