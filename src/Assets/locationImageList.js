import tavern_inside from './img/locations/city/tavern.png'
import tavern from './img/locations/city/outsideTavern.jpg'
import cityBG from './img/locations/city/cityBG.jpg'
import docks from './img/locations/city/docks.jpg'
import centralSquare from './img/locations/city/centralSquare.jpg'
import market from './img/locations/city/market.jpg'
import blacksmiths from './img/locations/city/outsideBlacksmith.jpg'
import herbalists from './img/locations/city/outsideAlchemist.jpg'
import cityRoad1 from './img/locations/city/cityRoad/1.jpg'
import cityRoad2 from './img/locations/city/cityRoad/2.jpg'
import cityRoad3 from './img/locations/city/cityRoad/3.jpg'
import cityRoad4 from './img/locations/city/cityRoad/4.jpg'
import cityRoad5 from './img/locations/city/cityRoad/5.jpg'

import fieldBG from './img/locations/field/fieldBG.jpg'
import glade from './img/locations/field/glade.jpg'
import forest from './img/locations/field/forest.jpg'
import copse from './img/locations/field/copse.jpg'

import sewerBG from './img/locations/sewerDungeon/sewerBG.png'

export default {
    city: {
        bg: cityBG,
        tavern,
        tavern_inside,
        market,
        herbalists,
        blacksmiths,
        docks1: docks,
        docks2: docks,
        docks3: docks,
        centralSquare,
        roadImages: [cityRoad1, cityRoad2, cityRoad3, cityRoad4, cityRoad5],

    },
    field: {
        bg: fieldBG,
        glade2: glade,
        forest2: forest,
        copse8: copse,
        roadImages: [],
    },
    sewerDungeon: {
        bg: sewerBG

    },
    burrowDungeon: {}
}