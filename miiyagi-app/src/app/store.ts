import { configureStore } from "@reduxjs/toolkit";
import workoutsSlice from "../features/workout/workoutsSlice";
import calendarSlice from "../features/calendar/calendarSlice";
import contentSlice from "../features/content/contentSlice";

export const store = configureStore({
    reducer: {
        workouts: workoutsSlice,
        calendar: calendarSlice,
        content: contentSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
