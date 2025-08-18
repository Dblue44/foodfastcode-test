export {
  default as clientReducer,
  clearClients,
  setClientPlace,
  setClient,
} from './model/clientSlice'
export {fetchUserPlaceClients} from './model/clientThunk'
export {selectClientStoreBase, selectAllClients, selectClientPlace, selectIsClientsLoading} from './model/selector'
