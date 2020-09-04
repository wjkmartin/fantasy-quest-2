import { createStore, combineReducers } from "redux";
import locations from "./reducers/locations";
import actors from "./reducers/actors";
import items from "./reducers/items";
import combat from "./reducers/combat";
import UI from "./reducers/UI";
import quests from "./reducers/quests"


let reducers = combineReducers({ locations, actors, items, combat, UI, quests });

export default createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
); //will be combined reducer of all reducers
