import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import dayjs from "dayjs";

export interface CalendarState {
    selected_date: string; // it's not recommended to store a Date() object in the store, so instead store it as string
}

const initialState: CalendarState = {
    selected_date: dayjs().format("YYYY-MM-DD"),
};

export const calendarSlice = createSlice({
    name: "calendar",
    initialState,
    reducers: {
        selectDate: (state, action: PayloadAction<string>) => {
            state.selected_date = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { selectDate } = calendarSlice.actions;

export default calendarSlice.reducer;
