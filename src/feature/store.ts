import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import userProfileReducer from './reducers/userProfile';
import userSalesforceIDReducer from './reducers/userSalesforceId';
import userOnboardingReducer from './reducers/userOnboarding';
import companyCreateProjectIDReducer from './reducers/companyCreateProject';

const rootReducer = combineReducers({
  userProfile: userProfileReducer,
  userSalesforceID: userSalesforceIDReducer,
  userOnboarding: userOnboardingReducer,
  companyCreateProject: companyCreateProjectIDReducer,
});

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);


