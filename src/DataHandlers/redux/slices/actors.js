import { createSlice } from '@reduxjs/toolkit';

import { loadActors, loadSingleActorFromData } from '../../loadActorData';


const actors = loadActors();

const initialState = {
  actorsById: actors,
};

const actorSlice = createSlice({
  name: 'actors',
  initialState: initialState,
  reducers: {
    modifyActorAttributeByActorId: (state, action) => {
      const { actorId, attribute, value } = action.payload;
      state.actorsById[actorId][attribute] += value;
    },
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
    
  },
});

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
