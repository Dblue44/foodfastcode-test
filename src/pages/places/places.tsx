import {PlacesList, PlacesListSkeleton} from "@widgets/placesList";
import {useAppDispatch, useAppSelector} from "@shared/lib";
import {getUserPlaces, selectPlacesBase} from "@entities/places";
import {useEffect} from "react";
import {setPageName} from "@entities/user";
import type {IPlacesState} from "@shared/types";
import {Toaster} from "@shared/ui/sonner.tsx";

export function PlacesPage() {
  const places: IPlacesState = useAppSelector(selectPlacesBase)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setPageName("Заведения"));
    dispatch(getUserPlaces());
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