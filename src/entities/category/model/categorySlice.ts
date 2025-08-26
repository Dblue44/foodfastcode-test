import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import {fetchUserPlaceCategories} from "./categoryThunk";
import type {Category, CategoryStore} from "@shared/types";

const initialState: CategoryStore = {
  categoriesList: [],
  selectedPlaceId: "",
  loadingCategories: false,
}

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategoryPlaceId: (state, action: PayloadAction<string>) => {
      state.selectedPlaceId = action.payload
    },
    clearCategories: (state) => {
      state.categoriesList = []
      state.selectedPlaceId = ""
      state.loadingCategories = true
    },
    extendCategoryList: (state, action: PayloadAction<Category>) => {
      state.categoriesList = [...state.categoriesList, action.payload]
    },
    removeCategoryFromList: (state, action: PayloadAction<string>) => {
      state.categoriesList = [...state.categoriesList.filter((c) => c.id !== action.payload)]
    },
    replaceCategoryInList: (state, action: PayloadAction<Category>) => {
      state.categoriesList = [...state.categoriesList.filter((c) => c.id !== action.payload.id), action.payload]
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserPlaceCategories.pending, (state) => {
        state.loadingCategories = true
      })
      .addCase(fetchUserPlaceCategories.fulfilled, (state, action) => {
        if (action.payload.data) {
          state.categoriesList = [...action.payload.data].sort((a, b) => a.name.localeCompare(b.name, "ru", { sensitivity: "base" }))
        }
        state.loadingCategories = false
      })
      .addCase(fetchUserPlaceCategories.rejected, (state) => {
        state.loadingCategories = false
      })
  }
})

export const {clearCategories, setCategoryPlaceId, extendCategoryList, removeCategoryFromList, replaceCategoryInList} = categorySlice.actions
export default categorySlice.reducer