import {PlacesList, PlacesListSkeleton} from "@widgets/placesList";
import {useAppDispatch, useAppSelector} from "@shared/lib";
import {getUserPlaces, selectPlacesBase} from "@entities/places";
import {useEffect} from "react";
import {logout, setPageName} from "@entities/user";
import type {IPlacesState} from "@shared/types";
import {toast} from "sonner";
import {AlertCircleIcon} from "lucide-react";
import {Toaster} from "@shared/ui/sonner.tsx";

export function PlacesPage() {
  const places: IPlacesState = useAppSelector(selectPlacesBase)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setPageName("Заведения"));
    (async () => {
      const result = await dispatch(getUserPlaces());
      if (getUserPlaces.rejected.match(result)) {
        toast.error("Ошибка при получении заведений", {
          icon: <AlertCircleIcon />,
          richColors: true,
          description: result.payload?.error || "Не удалось получить заведения",
        })
        if (result.payload?.isAuthError) {
          toast.info("Вы не авторизованы", {
            richColors: true,
            description: result.payload?.error || "Авторизуйтесь",
          })
          dispatch(logout())
        }
      }
    })();
  }, [dispatch])

  return (
    <div className="w-full flex items-center justify-center">
      <Toaster position="top-center" richColors />
      {places.loadingPlaces
        ? <PlacesListSkeleton />
        : <PlacesList data={places.placesList}/>}
    </div>
  )
}