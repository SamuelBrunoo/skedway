import { RouteObject, createBrowserRouter } from "react-router-dom"

import RegisterPage from "./pages/Register"
import ErrorPage from "./pages/ErrorPage"

const routes: RouteObject[] = [
  {
    path: '/',
    element: <RegisterPage />
  },
  {
    path: '*',
    element: <ErrorPage error={'generic'} />
  }
]

const router = createBrowserRouter(routes)


export default router