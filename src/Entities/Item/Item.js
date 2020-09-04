import chests from "../../Data/items/chests";
import feet from "../../Data/items/feet";
import heads from "../../Data/items/heads";
import legs from "../../Data/items/legs";
import weapons from "../../Data/items/weapons";

export default class Item {
  constructor(type, item, id /* prototype */) {
    this.type = type;
    this.id = id; 
    this.qty = 1;

    let itemData;

    switch (type) {
      case "weapon": {
        itemData = weapons[item];
        break;
      }
      case "chest": {
        itemData = chests[item];
        break;
      }
      case "feet": {
        itemData = feet[item];
        break;
      }
      case "head": {
        itemData = heads[item];
        break;
      }
      case "legs": {
        itemData = legs[item];
        break;
      }
      default:
        break;
    }
    Object.assign(this, itemData);
  }
}
