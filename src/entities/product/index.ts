export {
  default as productReducer,
  clearProducts,
  setProductPlaceId,
  setCategoryId,
  stopLoadingProducts,
  resetCategoryChanged
} from './model/productSlice.ts'
export {
  fetchUserCategoryProducts,
  fetchUserProduct,
  createUserCategoryProduct,
  editUserProduct,
  deleteUserProduct,
  loadUserProductImage
} from './model/productThunk.ts'
export {
  selectProductStoreBase,
  selectCategoryProductsList,
  selectCategoryId,
  selectProductPlaceId,
  selectIsProductsLoading,
  selectCategoryChanged
} from './model/selector'
