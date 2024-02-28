// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import vehiclesReducer from '../features/vehicles.reducer';

export const store = configureStore({
    reducer: {
        vehicles: vehiclesReducer,
    },
});

// TypeScript types for RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
