import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    questState: [
        {
            id: 1,
            stage: 0,
        }
    ],
    questStateUntracked: [
        {
            // Tracks the shadow blocking the passage in the goblin burrow
            id: 1,
            stage: 0,
            // 0 = not cleared, 1 = cleared
        }
    ]

};

const locationSlice = createSlice({
    name: 'quests',
    initialState: initialState,
    reducers: {
        setQuestStage: (state, action) => {
            const {questId, stage} = action.payload;
            state[questId] = stage;
        },
        setQuestStageUntracked: (state, action) => {
            const {questId, stage} = action.payload;
            state[questId] = stage;
        },
    },
});

export const {setQuestStage, setQuestStageUntracked} = locationSlice.actions;
export default locationSlice;
