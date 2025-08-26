import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {Product, ProductStore} from "@shared/types";
import {fetchUserCategoryProducts} from "./productThunk";

const initialState: ProductStore = {
  productsList: [],
  selectedPlaceId: "",
  selectedCategoryId: "",
  categoryChanged: false,
  loadingProducts: false,
}

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setCategoryId: (state, action: PayloadAction<string>) => {
      if (state.selectedCategoryId === action.payload) return
      state.selectedCategoryId = action.payload
      state.categoryChanged = true
    },
    resetCategoryChanged: (state) => {
      state.categoryChanged = false
    },
    setProductPlaceId: (state, action: PayloadAction<string>) => {
      state.selectedPlaceId = action.payload
    },
    clearProducts: (state) => {
      state.productsList = []
      state.selectedPlaceId = ""
      state.selectedCategoryId = ""
      state.categoryChanged = true
    },
    stopLoadingProducts: (state) => {
      state.loadingProducts = false
    },
    removeProductFromList: (state, action: PayloadAction<string>) => {
      state.productsList = [...state.productsList.filter((p) => p.id !== action.payload)]
    },
    extendProductList: (state, action: PayloadAction<Product>) => {
      state.productsList = [...state.productsList, action.payload]
    },
    replaceProductInList: (state, action: PayloadAction<Product>) => {
      state.productsList = [...state.productsList.filter((p) => p.id !== action.payload.id), action.payload]
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserCategoryProducts.pending, (state) => {
        state.loadingProducts = true
      })
      .addCase(fetchUserCategoryProducts.fulfilled, (state, action) => {
        if (action.payload.data) {
          state.productsList = [...action.payload.data]
        }
        state.loadingProducts = false
      })
      .addCase(fetchUserCategoryProducts.rejected, (state) => {
        state.loadingProducts = false
      })
  }
})

export const {clearProducts, setCategoryId, setProductPlaceId, stopLoadingProducts, resetCategoryChanged, extendProductList, replaceProductInList, removeProductFromList} = productSlice.actions
export default productSlice.reducer