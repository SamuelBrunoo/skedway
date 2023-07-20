import Cropper from "cropperjs"
import { getDeviceType, isOnWeb } from "./getDeviceType";


export const cropImage = (): Promise<{ url: string; blob: Blob; }> => {


  return new Promise((resolve, reject) => {
    let newUrl = ''
    let newBlob: null | Blob = null
    const os = getDeviceType()

    const baseSize = isOnWeb() ? 512 : 640

    const el = document.getElementById("previewImage") as HTMLImageElement

    const c = new Cropper(el,
      {
        aspectRatio: os === 'iOS' ? 3 / 4 : 1,
        viewMode: 3,
        data: { y: 0 },
        minCropBoxWidth: os === 'iOS' ? (baseSize / 4) * 3 : baseSize,
        minCropBoxHeight: baseSize,
        ready() { fn() },
        cropBoxResizable: false,
        cropBoxMovable: false,
        autoCropArea: 1,
        movable: false,
        zoomable: false,
      }
    )

    const canvasProps = os === 'iOS' ? {
      maxHeight: baseSize,
      minHeight: baseSize,
      maxWidth: (baseSize / 4) * 3,
      minWidth: (baseSize / 4) * 3
    } : {
      maxHeight: baseSize,
      maxWidth: baseSize,
      minHeight: baseSize,
      minWidth: baseSize
    }

    const fn = () => {
      const url = c.getCroppedCanvas(canvasProps).toDataURL("image/jpg")

      c.getCroppedCanvas(canvasProps).toBlob(blob => {

        newUrl = url
        newBlob = blob

        resolve({
          url: newUrl,
          blob: newBlob as Blob
        })
      })

    }
  })
}