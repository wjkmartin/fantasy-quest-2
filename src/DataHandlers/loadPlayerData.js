import Player from '../Entities/Actor/Player/Player'
import defaultPlayerData from '../Data/actors/player'

const loadPlayer = () => {
    return new Player(...Object.values(defaultPlayerData))
}

export default loadPlayer;