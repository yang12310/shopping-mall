import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import auth from "./state/index";
import purchase from "./state/purchase"
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import {persistStore,persistReducer,FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER,} from "redux-persist"; //현재 페이지가 유지되도록 해주는 것.
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

const persistConfig = { key: "root", storage, version: 1 };
const rootReducer = combineReducers({auth, purchase})
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <App />
        </LocalizationProvider>
      </PersistGate>
    </Provider>
);

