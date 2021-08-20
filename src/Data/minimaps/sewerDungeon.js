import basicSewerHorizontal from '../locations/sewerDungeon/basicSewerHorizontal'
import basicSewerVertical from '../locations/sewerDungeon/basicSewerVertical'
import basicSewerVerticalStartHidden from '../locations/sewerDungeon/basicSewerVerticalStartHidden'

import basicSewerSquare from '../locations/sewerDungeon/basicSewerSquare'
import sewerEntrance from '../locations/sewerDungeon/sewerEntrance'

import enemyLoc1 from '../locations/sewerDungeon/basicSewerHorizontal-e1' //GR
import enemyLoc2 from '../locations/sewerDungeon/basicSewerHorizontal-e2' //GR2
import enemyLoc3 from '../locations/sewerDungeon/basicSewerHorizontal-e3' //GR
import enemyLoc4 from '../locations/sewerDungeon/basicSewerHorizontal-e4' //GR
import enemyLoc5 from '../locations/sewerDungeon/basicSewerHorizontal-e5' //GR2
import enemyLoc6 from '../locations/sewerDungeon/basicSewerHorizontal-e6' //RG
import enemyLoc7 from '../locations/sewerDungeon/basicSewerHorizontal-e7' //RG
import enemyLoc8 from '../locations/sewerDungeon/basicSewerHorizontal-e8' //GR2
import enemyLoc9 from '../locations/sewerDungeon/basicSewerHorizontal-e9' //GR2

import ratQueenRoom from '../locations/sewerDungeon/ratQueenRoom' //Rat Queen
import mossyCistern from '../locations/sewerDungeon/mossyCistern' //Sewer Troll
import adamantineGate from '../locations/sewerDungeon/adamantineGate' //Adamantine gate


export default {
    name: "sewerDungeon",
    img: "https://via.placeholder.com/418x345",
    nodes: [
        [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
        [undefined, basicSewerSquare, basicSewerHorizontal, basicSewerHorizontal, basicSewerHorizontal, basicSewerHorizontal, basicSewerHorizontal, undefined, basicSewerSquare, basicSewerHorizontal, basicSewerHorizontal, basicSewerSquare, undefined, basicSewerVertical],
        [basicSewerSquare, basicSewerSquare, undefined, basicSewerVertical, undefined, basicSewerVertical, undefined, undefined, basicSewerVertical, undefined, undefined, basicSewerVertical, undefined, basicSewerVertical],
        [basicSewerVertical, undefined, undefined, undefined, undefined, basicSewerSquare, basicSewerHorizontal, basicSewerSquare, basicSewerSquare, undefined, basicSewerHorizontal, basicSewerVerticalStartHidden, basicSewerHorizontal, basicSewerSquare],
        [undefined, undefined, undefined, basicSewerVertical, undefined, undefined, undefined, basicSewerVertical, undefined, undefined, undefined, adamantineGate, undefined, undefined],
        [undefined, undefined, basicSewerHorizontal, basicSewerSquare, basicSewerSquare, undefined, undefined, undefined, undefined, undefined, basicSewerSquare, basicSewerSquare, basicSewerHorizontal, basicSewerSquare],
        [undefined, undefined, undefined, undefined, basicSewerVertical, basicSewerHorizontal, basicSewerSquare, undefined, basicSewerVertical, undefined, basicSewerVertical, undefined, undefined, basicSewerVertical],
        [undefined, sewerEntrance, basicSewerHorizontal, enemyLoc1, basicSewerSquare, undefined, basicSewerSquare, basicSewerHorizontal, enemyLoc2, basicSewerHorizontal, basicSewerSquare, basicSewerHorizontal, undefined, undefined],
        [undefined, undefined, undefined, undefined, undefined, undefined, basicSewerVertical, undefined, undefined, undefined, undefined, undefined, undefined, basicSewerVertical],
        [undefined, basicSewerSquare, enemyLoc3, basicSewerHorizontal, enemyLoc4, mossyCistern, basicSewerSquare, undefined, basicSewerVertical, undefined, basicSewerSquare, basicSewerHorizontal, basicSewerHorizontal, basicSewerSquare],
        [undefined, basicSewerVertical, undefined, undefined, basicSewerVertical, undefined, undefined, undefined, basicSewerVertical, undefined, basicSewerVertical, undefined, basicSewerVertical, undefined],
        [undefined, basicSewerSquare, basicSewerSquare, undefined, basicSewerSquare, enemyLoc6, basicSewerHorizontal, basicSewerHorizontal, enemyLoc7, basicSewerHorizontal, basicSewerSquare, undefined, basicSewerSquare, basicSewerHorizontal],
        [undefined, undefined, basicSewerVertical, undefined, undefined, undefined, basicSewerVertical, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
        [undefined, undefined, basicSewerSquare, enemyLoc5, basicSewerHorizontal, undefined, basicSewerSquare, basicSewerHorizontal, enemyLoc8, basicSewerHorizontal, enemyLoc9, basicSewerHorizontal, ratQueenRoom, undefined],
        [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
        [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    ]
}