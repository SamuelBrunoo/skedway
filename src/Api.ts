import a from 'axios'
import { SendPhotoType } from './utils/types/api/SendPhoto'
import { GetUserInfoRes, UserInfo } from './utils/types/api/UserInfo'
import { ErrorTypes } from './utils/types/error'
import { Buffer } from 'buffer'
import { parseBlob } from './utils/auxs/parseUrl'
import useOnfidoApi from './OnfidoApi'


type Props = {
  token?: string;
}


const useApi = ({ token }: Props) => {
  const skedwayUrl = process.env.REACT_APP_API_BASE_URL

  const skedway = a.create({
    baseURL: skedwayUrl,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  })

  const _o = useOnfidoApi()


  const getUserInfo = async (): Promise<GetUserInfoRes> => {
    try {
      const cmp = await skedway.get(`/users/me/summary`);
      return { success: true, info: cmp.data as UserInfo };
    } catch (error: any) {
      const errorStatus = error.response.status;

      return errorStatus === 400 || errorStatus === 500
        ? { success: false, error: 'generic' as ErrorTypes }
        : { success: false, error: 'accessDenied' as ErrorTypes };
    }
  }

  const sendPhoto = async (
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
  }

  const createOnfidoUser = async () => {
    const creation = await _o.createUser()

    return creation.success ? ({
      success: true,
      id: creation.userId
    }) : ({
      success: false
    })
  }

  const getOnfidoSDKToken = async (userId: string) => {
    const req = await _o.getSDKToken(userId)

    return req.success ? ({
      success: true,
      token: req.token
    }) : ({
      success: false
    })
  }

  const getWorkflowRunId = async (userId: string) => {
    const req = await _o.getWorkflowRunId(userId)

    return req.success ? ({
      success: true,
      id: req.id
    }) : ({
      success: false
    })
  }

  const getMotionFrame = async (userId: string): Promise<{ success: true; blob: Blob } | { success: false }> => {
    try {
      const req = await _o.getMotionFrame(userId)

      if (req.success) {
        const buffer = req.buffer
        const str64 = Buffer.from(buffer).toString('base64')
        const url = `data:image/jpeg;base64,${str64}`

        const blob = await parseBlob(url)

        return ({ success: true, blob: blob })
      } else {
        return ({ success: false })
      }
    } catch (error) {
      return ({ success: false })
    }
  }

  const deleteOnfidoUser = async (userId: string) => {
    const deletion = await _o.deleteUser(userId)
    return deletion.success
  }

  return {
    getUserInfo,
    sendPhoto,
    createOnfidoUser,
    getOnfidoSDKToken,
    getWorkflowRunId,
    getMotionFrame,
    deleteOnfidoUser,
  };
};

export default useApi;
