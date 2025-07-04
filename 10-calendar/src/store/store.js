import { configureStore } from '@reduxjs/toolkit';
import { authSlice, calendarSlice } from './';
import { uiSlice } from './';

export const store = configureStore({
  reducer: {
      calendar: calendarSlice.reducer,
      ui:       uiSlice.reducer,
      auth:     authSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => (getDefaultMiddleware)({
    serializableCheck: false,
  })
})