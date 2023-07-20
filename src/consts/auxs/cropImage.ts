import Cropper from "cropperjs"
import { getDeviceType, isOnWeb } from "./getDeviceType";


export const cropImage = (): Promise<{ url: string; blob: Blob; }> => {


  return new Promise((resolve, reject) => {
    const os = getDeviceType()

    const baseSize = os === 'Web' ? 512 : 640

    const el = document.getElementById("previewImage") as HTMLImageElement

    const c = new Cropper(el,
      {
        aspectRatio: os === 'Web' ? 1 : undefined,
        viewMode: 3,
        data: { y: 0 },
        minCropBoxWidth: os === 'Web' ? baseSize : (baseSize / 4) * 3,
        minCropBoxHeight: baseSize,
        ready() { fn() },
        cropBoxResizable: false,
        cropBoxMovable: false,
        autoCropArea: 1,
        movable: false,
        zoomable: false,
      }
    )

    const canvasProps = os !== 'Web' ? {
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
      const url = c.getCroppedCanvas(os === "Mobile" ? {} : canvasProps)
        .toDataURL("image/jpg")

      c.getCroppedCanvas(os === "Mobile" ? {} : canvasProps)
        .toBlob(blob => {
          resolve({ url, blob: blob as Blob })
        })

    }
  })
}