import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { combineReducers } from 'redux';
import { PersistConfig, persistReducer } from 'redux-persist';
import { authApi } from './features/auth/authApi';
import authReducer from './features/auth/authSlice';
import { userApi } from './features/user/userApi';
import userReducer from './features/user/userSlice';

export type RootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  userAuth: authReducer,
  userStore: userReducer,
  [authApi.reducerPath]: authApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
});

const persistConfig: PersistConfig<RootState> = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
  whitelist: ['userAuth', 'userStore'],
  blacklist: [
    authApi.reducerPath,
    userApi.reducerPath,
  ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(
      authApi.middleware,
      userApi.middleware,
    ),
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;
