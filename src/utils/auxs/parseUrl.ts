export const parseBlob = async (url: string): Promise<Blob> => {
  const blob = await fetch(url).then(response => response.blob())
  return blob
}