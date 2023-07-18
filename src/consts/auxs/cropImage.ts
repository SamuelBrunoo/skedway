import Cropper from "cropperjs"


export const cropImage = (): Promise<{ url: string; blob: Blob; }> => {


  return new Promise((resolve, reject) => {
    let newUrl = ''
    let newBlob: null | Blob = null

    const el = document.getElementById("previewImage") as HTMLImageElement

    const c = new Cropper(el,
      {
        aspectRatio: .79,
        viewMode: 3,
        data: { y: 0 },
        minCropBoxWidth: 357,
        minCropBoxHeight: 450,
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
        maxHeight: 512,
        maxWidth: 512,
      })

      let url = cropped.toDataURL("image/jpg")
      c.getCroppedCanvas({
        maxHeight: 512,
        maxWidth: 512,
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