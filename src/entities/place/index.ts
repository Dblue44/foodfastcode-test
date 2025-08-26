export {
  default as placesReducer,
  clearPlaces,
  setCurrentPlace,
  removePlaceFromList
} from './model/placeSlice.ts'
export {fetchUserPlaces, createUserPlace, updateUserPlace, deleteUserPlace} from './model/placeThunk.ts'
export {selectPlacesBase, selectPlacesList, selectCurrentPlace} from './model/selector'
