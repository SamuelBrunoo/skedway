import Cropper from "cropperjs"


export const cropImage = (): Promise<{ url: string; blob: Blob; }> => {

  return new Promise((resolve, reject) => {

    const baseSize = 640

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

    const canvasProps = {
      maxHeight: baseSize,
      minHeight: baseSize,
      maxWidth: baseSize,
      minWidth: baseSize,
    }

    const fn = () => {
      const url = c.getCroppedCanvas(canvasProps).toDataURL("image/webp", .9)

      c.getCroppedCanvas(canvasProps).toBlob(blob => {
        resolve({ url, blob: blob as Blob })
      }, "image/webp", .9)
    }
  })
}