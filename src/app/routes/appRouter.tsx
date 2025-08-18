import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from 'react-router-dom'
import {Fallback} from "@shared/ui/fallback";
import {AppLayout, AuthLayout} from "@app/layout";
import {AuthPage} from "@pages/auth";
import {HomePage} from "@pages/home";
import {ProtectedRoute} from "@app/routes";
import {PlacesPage, CreatePlacePage, EditPlacePage} from "@pages/places";
import {NotFoundPage} from "@pages/notFound";
import {Suspense} from "react";
import {ClientsPage} from "@pages/clients";

export const AppRouter = () => {

  const routers = createRoutesFromElements(
    <>
      <Route
        path="/"
        element={<Navigate to="/auth" replace />}
      />
      <Route element={<AuthLayout />} >
        <Route path="/auth" element={<AuthPage />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
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
    <Suspense fallback={<Fallback />}>
      <RouterProvider router={router} />
    </Suspense>
  )
}
