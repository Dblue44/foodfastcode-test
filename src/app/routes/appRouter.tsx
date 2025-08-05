import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import {Fallback} from "@shared/ui/fallback";
import {Layout} from "@app/layout";
import {AuthPage} from "@pages/auth";
import {HomePage} from "@pages/home";
import {ProtectedRoute} from "@app/routes";

export const AppRouter = () => {

  const routers = createRoutesFromElements(
    <Route
      path='/'
      element={<Layout />}
      errorElement={<Fallback />}>
      <Route path='auth' element={<AuthPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path='home' index element={<HomePage />} />
      </Route>
    </Route>
  )

  const router = createBrowserRouter(routers, {})

  return (
    <RouterProvider router={router}/>
  )
}
