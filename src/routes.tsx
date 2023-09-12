import { Navigate, RouteObject, createBrowserRouter } from "react-router-dom"

import RegisterPage from "./pages/Register"
import FeedBackPage from "./pages/FeedBackPage"

const routes: RouteObject[] = [
  {
    path: '/face-wizard',
    element: <RegisterPage />
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