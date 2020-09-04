import basicAttack from "../CombatAbilities/basicAttack";

//this needs to be refactored
class Actor {
  constructor(actorData) {
    console.log(actorData)
    this.raceLevelClassString = actorData.race + " Level " + actorData.level + " " + actorData.actorClass;
    
    this.dodge = Math.floor(actorData.abilityScores.dexterity / 10);
    this.focus = Math.floor(actorData.abilityScores.wisdom * 2.5);
    this.speed = 3;
    this.abilities = { basicAttack: basicAttack };
    this.dialogueState = "meet";

    Object.assign(this, actorData);
  }
}

export default Actor;
