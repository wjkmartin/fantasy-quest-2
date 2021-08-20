import docks_brothel from './docks_brothel.js';


export default {
    name: 'docks1',
    icon: 'anchor',
    prettyName: "The Port",
    description1: 'This is quite the busy port. You can see at least a few score ships, some hardly larger than rowboats, and a few massive Galleons. A nearby brothel, "The Sextant" sees sailors come and go.',
    buttons: [{'Go inside the brothel':docks_brothel}], 
    type: 'top'
};