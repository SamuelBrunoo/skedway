import { compressImage } from "./compressImage"
import { cropImage } from "./cropImage"
import { getDeviceType } from "./getDeviceType"

export const getCroppedImage = async (blob: Blob): Promise<{ url: string; blob: Blob; }> => {

  return new Promise(async (resolve, reject) => {
    const os = getDeviceType()

    const newImage = os === "Web" ?
      await cropImage() :
      await compressImage(blob)

    resolve(newImage)
  })

}