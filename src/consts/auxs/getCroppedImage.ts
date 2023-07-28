import { compressImage } from "./compressImage"
import { getDeviceType, isAndroid } from "./getDeviceType"

export const getCroppedImage = async (blob: Blob): Promise<{ url: string; blob: Blob; }> => {

  const os = getDeviceType()
  if (os === "Web") {
    return ({ url: URL.createObjectURL(blob), blob })
  } else {
    return isAndroid()
      ? ({ url: URL.createObjectURL(blob), blob })
      : compressImage(blob)
  }

}