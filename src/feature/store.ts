import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import companyCreateProjectIDReducer from './reducers/companyCreateProject';
import userOnboardingReducer from './reducers/userOnboarding';
import userProfileReducer from './reducers/userProfile';
import userSalesforceIDReducer from './reducers/userSalesforceId';
import userCompanyReducer from './reducers/userCompany';

const rootReducer = combineReducers({
  userProfile: userProfileReducer,
  userSalesforceID: userSalesforceIDReducer,
  userOnboarding: userOnboardingReducer,
  userCompany: userCompanyReducer,
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


