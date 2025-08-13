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
import {placesReducer} from "@entities/place";
import {authErrorListener} from "@app/middlewares";
import {categoryReducer} from "@entities/category";
import {productReducer} from "@entities/product";
import {categoryFlowListener} from "@app/middlewares/categoryFlowMiddleware.tsx";

const rootReducer = combineReducers({
  user: userReducer,
  places: placesReducer,
  category: categoryReducer,
  product: productReducer
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
    }).concat(authErrorListener.middleware, categoryFlowListener.middleware),
})

export const persistor = persistStore(store)
export default store