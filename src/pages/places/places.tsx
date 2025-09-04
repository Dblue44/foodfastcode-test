import {PlaceList, PlaceListSkeleton} from "@features/place";
import {useAppDispatch, useAppSelector} from "@shared/lib";
import {fetchUserPlaces, clearPlaces, selectPlacesBase} from "@entities/place";
import {useEffect} from "react";
import { usePageCrumbs } from "@features/usePageCrumbs";
import type {PlacesState} from "@shared/types";
import {Toaster} from "@shared/ui/sonner.tsx";

export function PlacesPage() {
  const places: PlacesState = useAppSelector(selectPlacesBase)
  const dispatch = useAppDispatch()

  usePageCrumbs("Заведения");

  useEffect(() => {
    dispatch(clearPlaces());
    dispatch(fetchUserPlaces());
  }, [dispatch])

  return (
    <div className="w-full flex items-center justify-center">
      <Toaster position="top-center" richColors />
      {places.loadingPlaces
        ? <PlaceListSkeleton />
        : <PlaceList data={places.placesList}/>}
    </div>
  )
}