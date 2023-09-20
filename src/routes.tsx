import { Navigate, RouteObject, createBrowserRouter } from "react-router-dom"

import RegisterPage from "./pages/Register"
import FeedBackPage from "./pages/FeedBackPage"
import { isOnWeb } from "./utils/auxs/getDeviceType"

const routes: RouteObject[] = [
  {
    path: '/face-wizard',
    loader: async () => {
      if (!isOnWeb()) {
        const newUA = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36 Edg/116.0.1938.75"
        Object.defineProperty(navigator, 'userAgent', {
          value: newUA,
          writable: true
        })
      }
      return null
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