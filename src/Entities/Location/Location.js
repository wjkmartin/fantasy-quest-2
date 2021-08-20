class Location {
  constructor(id, locationData) {
    this.id = id;
    this.discovered = false;
    Object.assign(this, locationData);
  }
}

export default Location;
