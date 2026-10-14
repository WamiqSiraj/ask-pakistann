// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import servicesReducer from './servicesSlice';

export const store = configureStore({
  reducer: {
    services: servicesReducer,
  },
});