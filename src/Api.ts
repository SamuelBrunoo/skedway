import a from 'axios'
import { getCroppedImage } from './utils/auxs/getCroppedImage'
import { isAndroid } from './utils/auxs/getDeviceType'
import { SendPhotoType } from './utils/types/api/SendPhoto'
import { GetUserInfoRes, UserInfo } from './utils/types/api/UserInfo'
import { ErrorTypes } from './utils/types/error'

type Props = {
  token: string;
};

const useApi = ({ token }: Props) => {
  const baseUrl = 'https://dev-internal-api.skedway.com';

  const axios = a.create({
    baseURL: baseUrl,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });

  return {
    getUserInfo: async (): Promise<GetUserInfoRes> => {
      try {
        const cmp = await axios.get(`/users/me/summary`);
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
        const req = await axios.post(`/users/faces/${userId}`, formData, {
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
  };
};

export default useApi;
