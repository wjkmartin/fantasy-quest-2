import { createSlice } from '@reduxjs/toolkit';

import loadLocationData from '../../loadLocationData';
import loadSubLocationData from '../../loadSubLocationData';
import map from '../../../Data/minimaps/city';

import city from '../../../Data/minimaps/city';
import field from '../../../Data/minimaps/field';
import sewerDungeon from '../../../Data/minimaps/sewerDungeon';
import burrowDungeon from '../../../Data/minimaps/burrowDungeon';

const locationsInitial = loadLocationData(map);
const subLocationsInitial = loadSubLocationData(locationsInitial);

const initialState = {
  locations: locationsInitial,
  savedMapStates: {
    city: undefined,
    field: undefined,
    sewerDungeon: undefined,
    burrowDungeon: undefined,
  },
  subLocations: subLocationsInitial,
  map: map,
  currentLocation: locationsInitial[24],
  currentSubLocation: undefined,
  maps: {
    city: city,
    field: field,
    sewerDungeon: sewerDungeon,
    burrowDungeon: burrowDungeon,
  },
};

const locationSlice = createSlice({
    name: 'locations',
    initialState: initialState,
    reducers: {
        setCurrentLocationById: (state, action) => {
            const { id } = action.payload;
            const location = state.locations.find(location => location.id === id);
            state.currentLocation = location;
            state.currentSubLocation = undefined;
        },
        setSubLocationByName: (state, action) => {
            const { name } = action.payload;
            const subLocation = state.subLocations.find(subLocation => subLocation.name === name);
            state.currentSubLocation = subLocation;
        },
        setMap: (state, action) => {
            const { mapName, startLocationName } = action.payload;
            const locationData = loadLocationData(state.maps[mapName]);
            state.locations = locationData;
            const map = state.maps[mapName];
            state.map = map;
            const newCurrentLocation = locationData.find(location => location.name === startLocationName);
            state.currentLocation = newCurrentLocation;
            state.currentSubLocation = undefined;
            state.subLocations = loadSubLocationData(locationData)  
        },
        setIsDiscovered: (state, action) => {
            const { id } = action.payload;
            const location = state.locations.find(location => location.id === id);
            if (location) {
                location.isDiscovered = true;
            }
        },
        setIsVisited: (state, action) => {
            const { id } = action.payload;
            const location = state.locations.find(location => location.id === id);
            location.isVisited = true;
        },
        saveCurrentMapState: (state) => {
            state.savedMapStates[state.map.name] = state.locations;
        },
        loadSavedMapState: (state, action) => {
            const { mapName } = action.payload;
            state.locations = state.savedMapStates[mapName];
        },
        modifyLocationPropertyById: (state, action) => {
            const { id, property, value } = action.payload;
            const location = state.locations.find(location => location.id === id);
            location[property] = value;
        },
    }
});

export const {setCurrentLocationById, setSubLocationByName, setMap, setIsDiscovered, setIsVisited, saveCurrentMapState, loadSavedMapState, modifyLocationPropertyById} = locationSlice.actions;

export default locationSlice;
