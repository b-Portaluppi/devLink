import { createBrowserRouter } from "react-router"
import { Home } from "./Pages/Home"
import { Admin } from "./Pages/Admin"
import { Login } from "./Pages/Login"
import { Networks } from "./Pages/Networks"
import { Private } from "./routes/Private"
import { NotFound } from "./Pages/NotFound"

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/Login',
    element: <Login />
  },
  {
    path: "/admin",
    element: <Private><Admin /></Private>
  },
  {
    path: '/admin/social',
    element: <Private><Networks /></Private>
  },
  {
    path: "*",
    element: <NotFound />
  }
])

export { router }
