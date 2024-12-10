import { createSlice } from "@reduxjs/toolkit";

export interface ContentState {
    exerciseEditorVisible: boolean;
}

const initialState: ContentState = {
    exerciseEditorVisible: false,
};

export const contentSlice = createSlice({
    name: "content",
    initialState,
    reducers: {
        toggleExerciseEditorVisibility: (state) => {
            state.exerciseEditorVisible = !state.exerciseEditorVisible;
        },
    },
});

export const { toggleExerciseEditorVisibility } = contentSlice.actions;

export default contentSlice.reducer;
