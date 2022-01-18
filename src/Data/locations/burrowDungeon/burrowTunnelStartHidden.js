const randomString = () => {
  switch (Math.floor(Math.random() * 6) || 1) {
    case 1:
      return 'The moist earth in the tunnel squelches under your feet, removing any artifice of stealth you might attempt.';
    case 2:
      return 'A stench pervades here... blood mixed with manure. It causes you to retch more than once.';
    case 3:
      return 'The tunnel narrows here, forcing you to slide through a narrow crevice sidelong. You feel your heartbeat race against the earth.';
    case 4:
      return 'There are long, bloody scratches in the walls here. It was either the goblins, or their victims. The thought of the latter gives you the chills.';
    case 5:
      return 'Suddenly, the weight of the dirt and rock above you feels overpowering, and a moment of claustrophobia overtakes you.';
    default:
      return 'You are in a dark tunnel.';
  }
};

export default {
  name: 'burrowTunnel',
  icon: 'grip-lines',
  // buttons: [{}],
  description1: randomString,
  prettyName: 'Burrow Dungeon',
  type: 'hidden',
};
