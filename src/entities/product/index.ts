export {
  default as productReducer,
  clearProducts,
  setProductPlaceId,
  setCategoryId,
  stopLoadingProducts,
  resetCategoryChanged,
  extendProductList,
  replaceProductInList,
  removeProductFromList
} from './model/productSlice.ts'
export {
  fetchUserCategoryProducts,
  fetchUserProduct,
  createUserCategoryProduct,
  editUserProduct,
  deleteUserProduct,
  loadUserProductImage,
  loadImage
} from './model/productThunk.ts'
export {
  selectProductStoreBase,
  selectCategoryProductsList,
  selectCategoryId,
  selectProductPlaceId,
  selectIsProductsLoading,
  selectCategoryChanged
} from './model/selector'
