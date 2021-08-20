import mapImage from '../../Assets/img/combat_maps/tavern/01.jpg'

export default {
	passableMap: [[0,0,0,0,0,0,0,0,0,0],[0,0,1,1,1,1,1,1,1,0],[0,0,1,1,0,1,0,0,0,0],[0,1,1,1,1,1,1,1,1,0],[0,0,1,1,1,1,1,0,1,0],[0,1,1,1,0,1,1,1,1,0],[0,1,1,1,1,1,1,1,1,0],[0,1,0,1,0,0,0,0,0,0],[0,1,1,1,0,1,1,1,1,1],[0,0,0,0,0,1,1,1,1,1]],
	width: 10,
    height: 10,
    heightWidthPerSquare: 4,
	mapImage: mapImage,
    playerStartCoords: [3, 7],
    enemyStartCoords: [[6, 2], [6,3]]
}
