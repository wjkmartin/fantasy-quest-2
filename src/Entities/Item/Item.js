import chests from "../../Data/items/chests";
import feet from "../../Data/items/feet";
import heads from "../../Data/items/heads";
import legs from "../../Data/items/legs";
import weapons from "../../Data/items/weapons";
import consumables from '../../Data/items/consumables'

export default class Item {
  static id = 0;
  constructor(type, item /* prototype */) {
    this.type = type;
    Item.id += 1;
    this.id = Item.id
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
      case "consumable": {
        itemData = consumables[item]
        break;
      }
      default:
        break;
    }
    Object.assign(this, itemData);
  }
}
