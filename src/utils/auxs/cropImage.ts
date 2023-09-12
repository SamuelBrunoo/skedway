export const cropImage = (blob: Blob): Promise<{ url: string; blob: Blob; }> => {

  return new Promise((resolve, reject) => {
    const finalSize = 640

    const reader = new FileReader
    reader.readAsDataURL(blob)

    reader.onload = e => {
      let imgUrl = e.target?.result
      let image = document.createElement("img")
      image.src = imgUrl as string

      image.onload = async () => {
        const naturalW = image.naturalWidth
        const naturalH = image.naturalHeight
        const ratio = naturalH / finalSize

        let canvas = document.createElement("canvas")
        canvas.width = finalSize
        canvas.height = finalSize

        const context = canvas.getContext("2d")
        context?.drawImage(image,
          ((naturalW / ratio) - finalSize), 0,
          canvas.width * ratio, canvas.height * ratio,
          0, 0,
          canvas.width, canvas.height
        )

        const newImgUrl = context?.canvas.toDataURL("image/webp", .9) as string
        const blob = await fetch(newImgUrl).then(res => res.blob())
        alert(URL.createObjectURL(blob))

        resolve({ url: newImgUrl, blob })

      }
    }
  })
}