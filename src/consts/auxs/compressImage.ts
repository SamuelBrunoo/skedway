export const compressImage = (blob: Blob): Promise<{ url: string; blob: Blob; }> => {

  return new Promise((resolve, reject) => {
    const finalW = 640

    const reader = new FileReader
    reader.readAsDataURL(blob)

    reader.onload = e => {
      let imgUrl = e.target?.result
      let image = document.createElement("img")
      image.src = imgUrl as string

      image.onload = async (l: any) => {
        const naturalW = l.target.width
        const naturalH = l.target.height

        const ratio = finalW / l.target.width

        if (!HTMLCanvasElement.prototype.toBlob) {
          Object.defineProperty(HTMLCanvasElement,
            "toBlob",
            {
              value: function (callback: any, type: string, quality: number) {
                let canvas = this;
                setTimeout(function () {

                  let binStr = atob(canvas.toDataURL(type, quality).split(',')[1]),
                    len = binStr.length,
                    arr = new Uint8Array(len);

                  for (let i = 0; i < len; i++) {
                    arr[i] = binStr.charCodeAt(i);
                  }

                  callback(new Blob([arr], { type: type || 'image/png' }));
                })
              }
            }
          )
        }


        var canvas = document.createElement("canvas")
        canvas.width = finalW
        canvas.height = (naturalH * ratio) * .8

        const context = canvas.getContext("2d")
        context?.drawImage(image,
          0, 0,
          naturalW, naturalH * .8,
          0, 0,
          canvas.width, canvas.height
        )

        const newImgUrl = context?.canvas.toDataURL("image/webp", .7) as string
        context?.canvas.toBlob(blob => {
          resolve({ url: newImgUrl, blob: blob as Blob })
        }, "image/webp", .7)

      }
    }
  })
}