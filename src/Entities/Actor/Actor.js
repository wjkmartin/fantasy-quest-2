import basicAttack from "../CombatAbilities/basicAttack";


class Actor {
  constructor(actorData) {
    Object.assign(this, actorData);
    this.raceLevelClassString = actorData.race + " Level " + actorData.level + " " + actorData.actorClass;
    
    this.dodge = Math.floor(actorData.abilityScores.dexterity / 10);
    this.focus = Math.floor(actorData.abilityScores.wisdom * 2.5);
    this.speed = 2;
    this.movementRemaining = this.speed;
    this.abilities = { basicAttack: basicAttack };
    this.dialogueState = "meet";

    if (this.type === 'monster') {
      this.isAggressive = true;
    }

    
  }
}

export default Actor;
