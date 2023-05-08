import { Navigate, RouteObject, createBrowserRouter } from "react-router-dom"

import RegisterPage from "./pages/Register"
import ErrorPage from "./pages/ErrorPage"

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
    path:'*',
    element:<ErrorPage />
  }
]

const router = createBrowserRouter(routes)


export default router