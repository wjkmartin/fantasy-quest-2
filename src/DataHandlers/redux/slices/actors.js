import { createSlice } from "@reduxjs/toolkit";

const initialState = { }

const actorsSlice = createSlice({
    name: "actors",
    initialState,
    reducers: {
        setActiveActorInfoWindowById(state, action) {
            state.activeActorInfoWindow = action.id;
        }
    }
});

export const {
    setActiveActorInfoWindowById
} = actorsSlice.actions;

export default actorsSlice.reducer;