import { compressImage } from "./compressImage"
import { cropImage } from "./cropImage"
import { getDeviceType, isAndroid } from "./getDeviceType"

export const getCroppedImage = async (blob: Blob): Promise<{ url: string; blob: Blob; }> => {

  const os = getDeviceType()
  if (os === "Web") {
    return cropImage()
  } else {
    return isAndroid()
      ? ({ url: URL.createObjectURL(blob), blob })
      : compressImage(blob)
  }

}