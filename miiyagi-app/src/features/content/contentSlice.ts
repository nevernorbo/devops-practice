import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ContentState {
    exerciseEditorVisible: boolean;
    updatedExerciseId: number | null;
}

const initialState: ContentState = {
    exerciseEditorVisible: false,
    updatedExerciseId: null,
};

export const contentSlice = createSlice({
    name: "content",
    initialState,
    reducers: {
        toggleExerciseEditorVisibility: (state) => {
            state.exerciseEditorVisible = !state.exerciseEditorVisible;
            state.updatedExerciseId = null;
        },
        setUpdatedExerciseId: (state, action: PayloadAction<number | null>) => {
            state.exerciseEditorVisible = true;
            state.updatedExerciseId = action.payload;
        },
    },
});

export const { toggleExerciseEditorVisibility, setUpdatedExerciseId } =
    contentSlice.actions;

export default contentSlice.reducer;
