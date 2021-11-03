import { createSlice } from "@reduxjs/toolkit";

import { loadActors, loadSingleActorFromData } from "../../loadActorData";
import powers from "../../../Data/powers/powers";

const actors = loadActors();

const initialState = {
  actorsById: actors,
};

const actorSlice = createSlice({
    name: "actors",
    initialState: initialState,
    reducers: {
        modifyActorAttributeByActorId: (state, action) => {
            const { actorId, attribute, value } = action.payload;
            if (
                attribute === "strength" ||
                attribute === "dexterity" ||
                attribute === "constitution" ||
                attribute === "charisma" ||
                attribute === "wisdom" ||
                attribute === "intelligence"
              ) { 
                state.actorsById[actorId].abilityScores[attribute] = state.actorsById[actorId].abilityScores[attribute] + value;
              } else {
                state.actorsById[actorId][attribute] = state.actorsById[actorId][attribute] + value;
              }
        },
        // @param {string} actorId - the id of the actor to be modified
        // @param {string} attribute - the attribute to set
        // @param {number} value - the value to set the attribute to
        setActorAttributeByActorId: (state, action) => {
            const { actorId, attribute, value } = action.payload;
            if (
                attribute === "strength" ||
                attribute === "dexterity" ||
                attribute === "constitution" ||
                attribute === "charisma" ||
                attribute === "wisdom" ||
                attribute === "intelligence"
              ) { 
                state.actorsById[actorId].abilityScores[attribute] = value;
              } else {
                state.actorsById[actorId][attribute] = value;
              }
        },
        removeActorFromCurrentLocationById: (state, action) => {
            const { actorId } = action.payload;
            const location = state.actorsById[actorId].location;
            state.byLocationName[location.name].splice(
                state.byLocationName[location.name].indexOf(actorId),
                1
            );
            state.actorsById[actorId].location = undefined;
            
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
            console.log(newActor);
            state.actorsById[newActor.id] = newActor;
        },
        addPowerToActorByDataRefAndActorId: (state, action) => {
            const { actorId, powerDataRef } = action.payload;
            const power = powers[powerDataRef];
            state.actorsById[actorId].powers.push(power);
        },
        removePowerFromActorByDataRefAndActorId: (state, action) => {
            const { actorId, powerDataRef } = action.payload;
            const power = powers[powerDataRef];
            state.actorsById[actorId].powers.splice(
                state.actorsById[actorId].powers.indexOf(power),
                1
            );
        },
        updatePowerDurationByDataRefAndActorId: (state, action) => {
            const { actorId, powerDataRef, duration } = action.payload;
            const power = powers[powerDataRef];
            state.actorsById[actorId].powers[
                state.actorsById[actorId].powers.indexOf(power)
            ].duration = duration;
        },

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