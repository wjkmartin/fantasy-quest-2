import Location from "../Entities/Location/Location";

const loadLocationData = (map) => {
  const flattenedMap = map.nodes.flat();

  const locations = flattenedMap.map((locationData, index) => {
    
    return new Location(index, locationData)
  })

  return locations;
}

export default loadLocationData;
