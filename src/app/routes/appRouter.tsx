import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from 'react-router-dom'
import { Suspense, lazy } from "react";
import {Fallback} from "@shared/ui/fallback";
import {AppLayout, AuthLayout} from "@app/layout";
import {ProtectedRoute} from "@app/routes";

const AuthPage      = lazy(() => import("@pages/auth").then(m => ({ default: m.AuthPage })));
const HomePage      = lazy(() => import("@pages/home").then(m => ({ default: m.HomePage })));
const PlacesPage    = lazy(() => import("@pages/places").then(m => ({ default: m.PlacesPage })));
const CreatePlacePage = lazy(() => import("@pages/places/createPlace").then(m => ({ default: m.CreatePlacePage })));
const EditPlacePage   = lazy(() => import("@pages/places/editPlace").then(m => ({ default: m.EditPlacePage })));
const ClientsPage   = lazy(() => import("@pages/clients").then(m => ({ default: m.ClientsPage })));
const NotFoundPage  = lazy(() => import("@pages/notFound").then(m => ({ default: m.NotFoundPage })));
export const AppRouter = () => {

  const routers = createRoutesFromElements(
    <>
      <Route
        path="/"
        element={<Navigate to="/home" replace />}
        errorElement={<Fallback />}
      />
      <Route element={<AuthLayout />} errorElement={<Fallback />}>
        <Route path="/auth" element={<AuthPage />} />
      </Route>
      <Route element={<ProtectedRoute />} errorElement={<Fallback />}>
        <Route element={<AppLayout />} errorElement={<Fallback />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/places" element={<PlacesPage />} />
          <Route path="/create-place" element={<CreatePlacePage />} />
          <Route path='/place/:id' element={<EditPlacePage />} />
          <Route path='/clients' element={<ClientsPage />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </>

  )

  const router = createBrowserRouter(routers, {})

  return (
    <Suspense>
      <RouterProvider router={router} />
    </Suspense>
  )
}
