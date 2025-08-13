import {createSlice} from "@reduxjs/toolkit";
import type {ProductStore} from "@shared/types";
import {fetchUserCategoryProducts} from "@entities/product";

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
    setCategoryId: (state, action) => {
      if (state.selectedCategoryId === action.payload) return
      state.selectedCategoryId = action.payload
      state.categoryChanged = true
    },
    resetCategoryChanged: (state) => {
      state.categoryChanged = false
    },
    setProductPlaceId: (state, action) => {
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

export const {clearProducts, setCategoryId, setProductPlaceId, stopLoadingProducts, resetCategoryChanged} = productSlice.actions
export default productSlice.reducer