import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {userReducer} from "@entities/user";
import {placesReducer} from "@entities/places";
import {authErrorListener} from "@app/middlewares";

const rootReducer = combineReducers({
  user: userReducer,
  places: placesReducer
})

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'places'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
        ],
      },
    }).concat(authErrorListener.middleware),
})

export const persistor = persistStore(store)
export default store