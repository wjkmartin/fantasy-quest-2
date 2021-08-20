import sewerEntranceTransition from './sewerEntranceCityTransition.js';

export default 
{
    name: 'sewerEntrance',
    icon: "archway",
    prettyName: 'Sewer Dungeon Entrance',
    description1: 'The sounds of the city can be heard through the pipe that you\'ve just entered by.',
    buttons:[
        { "Return to the city.": sewerEntranceTransition },
      ],
    type: 'top',
    discovered: true,
};