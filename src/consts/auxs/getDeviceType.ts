export const isOnWeb = () => getDeviceType() === 'Web'

const getDeviceType = () => {
  const type = navigator.userAgent

  if (/android/i.test(type)) {
    return "Android";
  }

  if (/iPad|iPhone|iPod/.test(type)) {
    return "iOS";
  }

  return "Web";
}