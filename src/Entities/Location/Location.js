class Location {
  constructor(id, locationData) {
    this.id = id;
    Object.assign(this, locationData);
  }
}

export default Location;
