import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import { combineReducers } from 'redux';

import quests from './reducers/quests';

import locationSlice from './slices/locations';
import combatSlice from './slices/combat';
import UISlice from './slices/UI';
import itemSlice from './slices/items';
import actorSlice from './slices/actors';

const rootReducer = combineReducers({
  locations: locationSlice.reducer,
  actors: actorSlice.reducer,
  items: itemSlice.reducer,
  combat: combatSlice.reducer,
  UI: UISlice.reducer,
  quests: quests,
});

// const persistentState = localStorage.getItem('state')
//   ? JSON.parse(localStorage.getItem('state'))
//   : {};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: true }).concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
  // preloadedState: persistentState,
});

// store.subscribe(() => {
//   const state = store.getState();
//   // const serializedState = JSON.stringify(state);
//   // localStorage.setItem('state', serializedState);
// });

export default store;
