import * as actorList from "../Data/actors/actorList";
import Actor from "../Entities/Actor/Actor";

export const loadActors = () => {
  let actors = [];
  let actorData = Object.values(actorList.default);

  for (let i = 0; i < actorData.length; i++) {
    let actor = new Actor(actorData[i]);
    actor.id = i;
    actors.push(actor);
  }
  return actors;
};