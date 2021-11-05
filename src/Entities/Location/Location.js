
import {immerable} from "immer"
class Location {
  [immerable] = true
  constructor(id, locationData) {
    this.id = id;
    this.isDiscovered = false;
    Object.assign(this, locationData);
  }
}

export default Location;
