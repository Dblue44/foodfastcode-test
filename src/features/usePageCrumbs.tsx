import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@shared/lib";
import { setCrumbs } from "@entities/user";
import { selectPlacesList } from "@entities/place";
import { resolveCrumbs } from "@shared/config";

export function usePageCrumbs(pageName?: string | null) {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const places = useAppSelector(selectPlacesList);

  useEffect(() => {
    const crumbs = resolveCrumbs(pathname, places ?? [], pageName);
    dispatch(setCrumbs(crumbs));
  }, [dispatch, pathname, places, pageName]);
}