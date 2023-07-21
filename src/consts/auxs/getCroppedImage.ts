import { compressImage } from "./compressImage"
import { cropImage } from "./cropImage"
import { getDeviceType } from "./getDeviceType"

export const getCroppedImage = async (blob: Blob): Promise<{ url: string; blob: Blob; }> => {

  const os = getDeviceType()
  return os === "Web" ? cropImage() : compressImage(blob)

}