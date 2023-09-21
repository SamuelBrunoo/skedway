import { Navigate, RouteObject, createBrowserRouter } from "react-router-dom"

import RegisterPage from "./pages/Register"
import FeedBackPage from "./pages/FeedBackPage"
import { isAndroid, isOnWeb } from "./utils/auxs/getDeviceType"

const routes: RouteObject[] = [
  {
    path: '/face-wizard',
    loader: async () => {
      const native = isOnWeb() ? 'web' :
        isAndroid() ? 'Android' : 'iOS'

      if (native !== 'web') {
        const newUA = (native === 'Android') ?
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36 Edg/116.0.1938.75" :
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_5) AppleWebkit/605.1.15 (KHTML, like Gecko) CriOS/117 Version/11.1.1 Safari/605.1.15"

        Object.defineProperty(navigator, 'userAgent', {
          value: newUA,
          writable: true
        })

      }
      return ({
        isNativeMobile: native !== 'web',
        native: native
      })
    },
    element: <RegisterPage />,

  },
  {
    path: '/',
    element: <Navigate to={'/face-wizard'} />
  },
  {
    path: '*',
    element: <FeedBackPage
      isError={true}
      msgType="unknown"
    />
  }
]

const router = createBrowserRouter(routes)


export default router