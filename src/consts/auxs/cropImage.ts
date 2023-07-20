import Cropper from "cropperjs"
import { getDeviceType, isOnWeb } from "./getDeviceType";


export const cropImage = (): Promise<{ url: string; blob: Blob; }> => {


  return new Promise((resolve, reject) => {
    let newUrl = ''
    let newBlob: null | Blob = null
    const os = getDeviceType()

    const baseSize = os === 'Web' ? 512 : 640

    const el = document.getElementById("previewImage") as HTMLImageElement

    const c = new Cropper(el,
      {
        aspectRatio: os === 'Web' ? 1 : 3 / 4,
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
      const url = c.getCroppedCanvas(canvasProps).toDataURL("image/jpg")
      c.getCroppedCanvas(canvasProps).toBlob(blob => {

        const anchor = window.document.createElement('a');
        anchor.href = window.URL.createObjectURL(blob as Blob);
        anchor.download = 'cropped.jpg';
        anchor.click();
        window.URL.revokeObjectURL(anchor.href);

        // resolve({ url, blob: blob as Blob })
      }, "image/jpeg", 1)

    }
  })
}