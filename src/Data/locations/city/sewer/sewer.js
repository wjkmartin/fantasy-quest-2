import sewerDungeonTransition from "./sewerDungeonTransition";

export default {
  name: "sewer",
  icon: "poop",
  buttons: [{ "Enter the nasty sewers.": sewerDungeonTransition }], //make it harder to get in
  description1:
    "This whole area reeks with the sweet intensity of human waste. A large round hole juts out of the wall, trickling brown sludge into the nearby canal.",
  prettyName: "Sewer Entrance",
  type: "top",
};

