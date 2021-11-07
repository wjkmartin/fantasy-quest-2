import mountainsTransition from './mountainsTransition.js';

export default 
{
    name: 'roadToMountains',
    icon: "archway",
    prettyName: 'The road to the northern mountains',
    description1: 'The road to the northern mountains.',
    buttons:[
        { "Travel to the mountains.": mountainsTransition },
      ],
    type: 'top',
};