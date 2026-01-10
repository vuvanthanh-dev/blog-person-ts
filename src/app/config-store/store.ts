import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import { loadingMiddleware } from "./middleware";
import loadingReducer from "./loading.slice";
import authReducer from "@/modules/auth/slice.auth";
import categoryReducer from "@/modules/category/slice.category";
import postReducer from "@/modules/post/slice.post";
import tagReducer from "@/modules/tag/slice.tag";

const rootReducer = combineReducers({
  app: loadingReducer,
  auth: authReducer,
  category: categoryReducer,
  post: postReducer,
  tag: tagReducer,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(loadingMiddleware),
});

export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
