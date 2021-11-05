import { immerable } from "@reduxjs/toolkit/node_modules/immer";
import basicAttack from "../CombatAbilities/basicAttack";

class Actor {
  [immerable] = true
  static id = 0;
  constructor(actorData) {
    Object.assign(this, actorData);
    this.id = Actor.id
    this.raceLevelClassString = actorData.race + " Level " + actorData.level + " " + actorData.actorClass;
    this.dodge = Math.floor(actorData.dexterity / 10);
    this.focus = Math.floor(actorData.wisdom * 2.5);
    this.movementRemaining = this.speed;
    this.abilities = { basicAttack: basicAttack };
    this.dialogueState = "meet";
    this.xp = 0;
    this.xpToNextLevel = 100;
    this.isDead = false;
    if (this.type === 'monster') {
      this.isAggressive = true;
      this.baseEarnedXP = actorData.level * 5
    }
    Actor.id += 1;
    
  }
}

export default Actor;
