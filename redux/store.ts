import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { loadState } from "utils/handleState";
import navbarSlice from "./slices/navbar";
import userSlice from "./slices/userSlice";
//persist redux store
const persistConfig = {
  key: "root",
  storage: storage,
  rehydrate: true,
};

// const rootReducer = combineReducers({
//   user: userSlice,
// });

const persistedState = loadState();

// creating store
export const store = configureStore({
  reducer: {
      user: userSlice.reducer,
      // user: authReducer,
      navbar: navbarSlice.reducer,
  },
  devTools: process.env.NODE_ENV !== "production",
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
      }),
});

// export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;