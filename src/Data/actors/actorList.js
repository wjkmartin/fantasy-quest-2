import player from "./player/player"
import ajwar from "./ajwar/ajwar";
import arinya from "./arinya/arinya";
import pamina from "./pamina/pamina";
import javik from "./javik/javik";
import rival from "./rival/rival";
import goblinBase from "./monsters/goblins/baseGoblin"
import ratQueen from './monsters/rats/ratQueen'
import sewerTroll from './monsters/trolls/sewerTroll'

export default {
  player,
  ajwar,
  arinya,
  banditQueen: pamina,
  javik,
  rival,
  goblin: goblinBase,
  goblin2: goblinBase,
  ratQueen: ratQueen,
  sewerTroll
};
