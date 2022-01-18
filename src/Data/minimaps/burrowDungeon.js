import burrowEntrance from '../locations/burrowDungeon/burrowEntrance';
import burrowTunnel from '../locations/burrowDungeon/burrowTunnel';

import GM_NODE_1 from '../locations/burrowDungeon/GM_NODE_1';
import deadEndShop from '../locations/burrowDungeon/deadEndShop';
import burrowCells from '../locations/burrowDungeon/burrowCells';
import burrowTunnelStartHidden from '../locations/burrowDungeon/burrowTunnelStartHidden';
import shadowyCorridor from '../locations/burrowDungeon/shadowyCorridor';

export default {
  name: 'burrowDungeon',
  img: 'https://via.placeholder.com/418x345',
  nodes: [
    // prettier-ignore
    [undefined, undefined, undefined, undefined, undefined, undefined, deadEndShop, undefined,],
    [undefined, undefined, undefined, undefined, undefined, undefined, burrowTunnel, undefined,],
    [undefined, undefined, burrowTunnel, burrowTunnel, burrowTunnel, burrowTunnel, burrowTunnel, burrowTunnel,],
    [undefined, undefined, burrowTunnel, undefined, undefined, undefined, undefined, burrowCells,],
    [undefined, undefined, burrowTunnel, undefined, undefined, undefined, undefined, undefined,],
    [burrowEntrance, burrowTunnel, burrowTunnel, burrowTunnel, burrowTunnel,undefined, burrowTunnel,undefined,],
    [undefined, undefined , burrowTunnel, undefined, burrowTunnel, burrowTunnel,burrowTunnel, undefined],
    [undefined, burrowTunnel, burrowTunnel, undefined, undefined, undefined, undefined, undefined,],
    [undefined, shadowyCorridor, undefined, burrowTunnel, burrowTunnel, burrowTunnel, undefined, GM_NODE_1,],
    [undefined, burrowTunnelStartHidden, burrowTunnel, burrowTunnel, undefined, burrowTunnel, undefined, burrowTunnel,],
    [undefined, burrowTunnel, undefined, undefined, undefined, burrowTunnel, undefined, burrowTunnel,],
    [burrowTunnel, burrowTunnel, burrowTunnel, undefined, burrowTunnel, burrowTunnel, burrowTunnel, burrowTunnel,],
  ],
};
