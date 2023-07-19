import Cropper from "cropperjs"
import { isOnWeb } from "./getDeviceType";


export const cropImage = (): Promise<{ url: string; blob: Blob; }> => {


  return new Promise((resolve, reject) => {
    let newUrl = ''
    let newBlob: null | Blob = null

    const baseSize = isOnWeb() ? 512 : 640

    const el = document.getElementById("previewImage") as HTMLImageElement

    const c = new Cropper(el,
      {
        aspectRatio: 1,
        viewMode: 3,
        data: { y: 0 },
        minCropBoxWidth: baseSize,
        minCropBoxHeight: baseSize,
        ready() { fn() },
        cropBoxResizable: false,
        cropBoxMovable: false,
        autoCropArea: 1,
        movable: false,
        zoomable: false,
      }
    )

    const fn = () => {
      const cropped = c.getCroppedCanvas({
        maxHeight: baseSize,
        maxWidth: baseSize,
        minHeight: baseSize,
        minWidth: baseSize
      })

      let url = cropped.toDataURL("image/jpg")
      c.getCroppedCanvas({
        maxHeight: baseSize,
        maxWidth: baseSize,
        minHeight: baseSize,
        minWidth: baseSize
      }).toBlob(blob => {

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