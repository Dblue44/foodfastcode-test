import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit"
import {
  clearCategories,
  extendCategoryList,
  fetchUserPlaceCategories,
  selectPlaceCategoriesList
} from "@entities/category"
import {
  clearProducts,
  fetchUserCategoryProducts, resetCategoryChanged,
  selectCategoryChanged, selectCategoryId,
  selectProductPlaceId,
  setCategoryId,
  stopLoadingProducts
} from "@entities/product"
import {toast} from "sonner";
import {AlertCircleIcon} from "lucide-react";
import type {ErrorLineType, FetchCategoriesResponse} from "@shared/types";

export const categoryFlowListener = createListenerMiddleware()

categoryFlowListener.startListening({
  matcher: isAnyOf(fetchUserPlaceCategories.fulfilled, fetchUserPlaceCategories.rejected),
  effect: async (action, api) => {
    const { dispatch } = api as { dispatch: AppDispatch }

    if (fetchUserPlaceCategories.rejected.match(action)) {
      const payload = (action as { payload?: ErrorLineType }).payload
      dispatch(clearCategories())
      dispatch(clearProducts())
      dispatch(stopLoadingProducts())
      toast.error("Ошибка", {
      icon: <AlertCircleIcon />,
        richColors: true,
        description: "Не удалось получить список категорий. " + payload?.error,
      })
      return
    }

    // fulfilled
    const list = (action as { payload?: FetchCategoriesResponse }).payload?.data
    if (!list?.length) {
      return
    }

    const [first] = [...list].sort((a, b) => a.name.localeCompare(b.name, "ru", { sensitivity: "base" }))
    if (first?.id) {
      dispatch(setCategoryId(first.id))
    }
  },
})

categoryFlowListener.startListening({
  actionCreator: setCategoryId,
  effect: async (action, api) => {
    const { dispatch, getState } = api as { dispatch: AppDispatch; getState: () => RootState }

    const state = getState()

    if (!selectCategoryChanged(state)) return

    dispatch(resetCategoryChanged())

    const nextCategoryId = action.payload as string

    const productPlaceId = selectProductPlaceId(state)

    const category = selectPlaceCategoriesList(state).find((c) => c.id === nextCategoryId)
    const categoryPlaceId = category?.placeId

    if (!productPlaceId || !categoryPlaceId) return

    if (productPlaceId !== categoryPlaceId) return

    dispatch(fetchUserCategoryProducts())
  },
})

categoryFlowListener.startListening({
  actionCreator: extendCategoryList,
  effect: async (_, api) => {
    const { dispatch, getState } = api as { dispatch: AppDispatch; getState: () => RootState }
    const state = getState()
    const currentCategoryId = selectCategoryId(state)
    const categoriesList = selectPlaceCategoriesList(state)
    if (categoriesList?.length == 1) {
      if (currentCategoryId != categoriesList[0].id) {
        dispatch(setCategoryId(categoriesList[0].id))
      }

    }
  }
})
