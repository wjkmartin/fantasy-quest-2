import cityTransition from './gatehouse_go_to_city.js';

export default 
{
    name: 'gatehouseEast',
    icon: "archway",
    prettyName: 'The Eastern Gatehouse',
    description1: 'The Eastern gatehouse.',
    buttons:[
        { "Travel to the city.": cityTransition },
      ],
    type: 'top',
    isDiscovered: true
};