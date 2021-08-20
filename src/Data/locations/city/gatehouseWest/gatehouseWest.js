import fieldTransition from './gatehouse_go_to_field.js';

export default 
{
    name: "gatehouseWest",
    icon: "archway",
    prettyName: "The Western Gatehouse",
    description1:
      "The guarded entrance to the city- to the west sweep the Plains of Asteria.",
    buttons: [
      { "Travel outside the gates to the plains": fieldTransition },
    ],
    type: "top",
  };