import { createSlice } from "@reduxjs/toolkit";

import { loadActors, loadSingleActorFromData } from "../../loadActorData";
import powers from "../../../Data/powers/powers";

const actors = loadActors();

const initialState = {
  actorsById: actors,
  powersById: {0: []}
};

const actorSlice = createSlice({
    name: "actors",
    initialState: initialState,
    reducers: {
        modifyActorAttributeByActorId: (state, action) => {
            const { actorId, attribute, value } = action.payload;
            state.actorsById[actorId][attribute] += value
        },
        // @param {string} actorId - the id of the actor to be modified
        // @param {string} attribute - the attribute to set
        // @param {number} value - the value to set the attribute to
        setActorAttributeByActorId: (state, action) => {
            const { actorId, attribute, value } = action.payload;
             state.actorsById[actorId][attribute] = value;  
        },
        removeActorFromCurrentLocationById: (state, action) => {
            state.actorsById[action.payload].location = undefined;
            
        },
        addActorToGivenLocationById: (state, action) => {
            // currently unused but could be used to add an existing actor to a location
            const { actorId, location } = action.payload; 
            state.actorsById[actorId].location = location;
        },
        createNewActorFromDataFileAndLocation: (state, action) => {
            const { actorData, location } = action.payload;
            let newActor = loadSingleActorFromData(actorData);
            newActor.location = location;
            state.actorsById[newActor.id] = newActor;
        },
        addPowerToActorByDataRefAndActorId: (state, action) => {
            const { actorId, powerDataRef } = action.payload;
            const power = powers[powerDataRef];
            state.powersById[actorId].push(power);
        },
        removePowerFromActorByDataRefAndActorId: (state, action) => {
            const { actorId, powerDataRef } = action.payload;
            state.powersById[actorId].filter((power) => power.ref !== powerDataRef);
        },
        // updatePowerDurationByDataRefAndActorId: (state, action) => {
        //     const { actorId, powerDataRef, duration } = action.payload;
        //     const power = powers[powerDataRef];
        //     state.actorsById[actorId].powers[
        //         state.actorsById[actorId].powers.indexOf(power)
        //     ].duration = duration;
        // },

    }
})

export const {
    modifyActorAttributeByActorId,
    setActorAttributeByActorId,
    removeActorFromCurrentLocationById,
    addActorToGivenLocationById,
    createNewActorFromDataFileAndLocation,
    addPowerToActorByDataRefAndActorId,
    removePowerFromActorByDataRefAndActorId,
    updatePowerDurationByDataRefAndActorId,
} = actorSlice.actions;

export default actorSlice;