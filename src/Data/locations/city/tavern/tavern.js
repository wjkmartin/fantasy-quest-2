import tavern_inside from "./tavern_inside.js";
import tavern_behind from "./tavern_behind.js";

export default {
  name: "tavern",
  icon: "beer",
  prettyName: "The Final Word",
  description1:
    "From the outside, the tavern looks quiet and unassuming. The sound of clinking glasses and raucous conversation filters into the street from the ajar double doors.",
  buttons: [
    { "Go inside the tavern": tavern_inside },
    { "Go through the alley to behind the tavern": tavern_behind },
  ],
  type: "top",
  isDiscovered: true

};
