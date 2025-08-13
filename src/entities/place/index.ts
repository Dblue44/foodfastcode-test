export {
  default as placesReducer,
  clearPlaces
} from './model/placeSlice.ts'
export {fetchUserPlaces, createUserPlace, updateUserPlace, deleteUserPlace} from './model/placeThunk.ts'
export {selectPlacesBase, selectPlacesList} from './model/selector'
