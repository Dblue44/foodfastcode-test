export {
  default as placesReducer,
  setPlaceCategories,
  resetAuthError,
  clearPlaces
} from './model/placesSlice'
export {getUserPlaces, createUserPlace} from './model/placesThunk'
export {selectPlacesBase, selectPlacesList} from './model/selector'
