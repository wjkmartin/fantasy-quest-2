
import {immerable} from "immer"
class Location {
  [immerable] = true
  constructor(id, locationData) {
    this.id = id;
    this.isDiscovered = false;
    this.type = 'hidden';
    Object.assign(this, locationData);
    if (typeof locationData?.description1 === 'function') {
      this.description1 = locationData.description1();
    }
  }
}

export default Location;
