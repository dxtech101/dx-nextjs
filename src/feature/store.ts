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
import developerOnboardingReducer from './reducers/developerOnboarding';
import developerProfileReducer from './reducers/developerProfile';
import developerSalesforceIDReducer from './reducers/developerSalesforceId';

const rootReducer = combineReducers({
  developerOnboarding: developerOnboardingReducer,
  developerProfile: developerProfileReducer,
  developerSalesforceID: developerSalesforceIDReducer,
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


