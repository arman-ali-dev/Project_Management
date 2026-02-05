import { combineReducers, configureStore } from "@reduxjs/toolkit";

import authReducer from "./member/authSlice";
import userReducer from "./member/userSlice";

import adminUserReducer from "./admin/userSlice";

import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import storage from "redux-persist/lib/storage";

// AUTH
const authPersistConfig = {
  key: "auth",
  storage,
  blacklist: ["loading", "error"],
};

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,

  // ADMIN
  adminUser: adminUserReducer,
});

const rootPersistConfig = {
  key: "pm",
  storage,
};

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
