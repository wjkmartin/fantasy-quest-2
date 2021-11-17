import goblinBurrowTransition from "./burrowEntranceFieldTransition"

export default 
{
    name: 'burrowEntrance',
    icon: "archway",
    prettyName: 'Goblin Burrow Entrance',
    description1: 'There\'s almost no light filtering in through the narrow opening. Cries of pain can be heard from further down the cramped tunnels.',
    buttons:[
        { "Return to the surface.": goblinBurrowTransition },
      ],
    type: 'top',
    isDiscovered: true,
};