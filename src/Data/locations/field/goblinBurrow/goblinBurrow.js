import goblinBurrowTransition from "./goblinBurrowTransition";

export default {
  name: "burrow",
  icon: "dungeon",
  buttons: [{ "Crawl through the hole into the burrow.": goblinBurrowTransition }], //make it harder to get in
  description1:
    "This whole area reeks with the sweet intensity of human waste. A large round hole juts out of the wall, trickling brown sludge into the nearby canal.",
  prettyName: "Goblin Burrow Entrance",
  type: "top",
};