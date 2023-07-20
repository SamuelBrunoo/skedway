import Cropper from "cropperjs"
import { getDeviceType } from "./getDeviceType";


export const cropImage = (): Promise<{ url: string; blob: Blob; }> => {


  return new Promise((resolve, reject) => {
    const os = getDeviceType()

    const baseSize = os === 'Mobile' ? 640 : 640

    const el = document.getElementById("previewImage") as HTMLImageElement

    const c = new Cropper(el,
      {
        aspectRatio: os === 'Mobile' ? 3 / 4 : 3 / 4,
        viewMode: 3,
        data: { y: 0 },
        minCropBoxWidth: os === 'Mobile' ? (baseSize / 4) * 3 : baseSize,
        minCropBoxHeight: os === "Mobile" ? baseSize : (baseSize / 3) * 4,
        ready() { fn() },
        cropBoxResizable: false,
        cropBoxMovable: false,
        autoCropArea: 1,
        movable: false,
        zoomable: false,
      }
    )

    const canvasProps = (os === 'Mobile') ? {
      maxHeight: baseSize,
      minHeight: baseSize,
      maxWidth: (baseSize / 4) * 3,
      minWidth: (baseSize / 4) * 3
    } : {}

    const fn = () => {
      const url = c.getCroppedCanvas(canvasProps).toDataURL("image/jpg")

      c.getCroppedCanvas(canvasProps).toBlob(blob => { resolve({ url, blob: blob as Blob }) })

    }
  })
}