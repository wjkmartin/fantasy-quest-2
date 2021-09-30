import burrowEntrance from "../locations/burrowDungeon/burrowEntrance"
import burrowTunnel from "../locations/burrowDungeon/burrowTunnel"

export default {
    name: "burrowDungeon",
    img: "https://via.placeholder.com/418x345",
    nodes: [
        [undefined,undefined,undefined],
        [undefined, burrowEntrance, burrowTunnel],
        [undefined,undefined,undefined],
    ]
}