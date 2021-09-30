import goblinBurrowTransition from "./burrowEntranceFieldTransition"

export default 
{
    name: 'burrowEntrance',
    icon: "archway",
    prettyName: 'Goblin Burrow Entrance',
    description1: 'The sounds of the city can be heard through the pipe that you\'ve just entered by.',
    buttons:[
        { "Return to the surface.": goblinBurrowTransition },
      ],
    type: 'top',
    discovered: true,
};