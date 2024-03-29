export const isOnWeb = () => getDeviceType() === "Web";

export const getDeviceType = () => {
  const type = navigator.userAgent;

  if (
    /mobile|Mobile|iPhone|iPod|iPad|Android|BlackBerry|IEMobile|Kindle|NetFront|Silk\-Accelerated|hpwOS|webOS|Fennec|Minimo|Opera Mobi|Opera Mini|Blazer|Dolfin|Dolphin|Skyfire|Zune/.test(
      type
    )
  ) {
    return "Mobile";
  }

  return "Web";
};

export const isAndroid = () => {
  const userAgent = navigator.userAgent;
  const isAndroid = /Android/i.test(userAgent);
  return isAndroid;
};
