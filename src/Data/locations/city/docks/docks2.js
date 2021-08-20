
import docks_red_moon from './docks_red_moon.js';

export default {
    name: 'docks2',
    icon: 'anchor',
    prettyName: "The Port",
    description1: 'This is quite the busy port. You can see at least a few score ships, some hardly larger than rowboats, and a few massive Galleons. A particularly large vessel named "The Red Moon" currently sits in port, notably scant of sailors.',
    buttons: [{'Try and board the Red Moon':docks_red_moon}], //eventually will lead to an intermediate location with skill checks
    type: 'top'
};