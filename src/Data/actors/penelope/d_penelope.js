export default {
  meet: {
    text: 'Welcome into the light of eternal forgiveness my child. Rolep is with you always.',
    buttons: [
      { healMe: "I'm here to be healed." },
      { blessMe: "I'm here to recieve a blessing." },
      { quitConvo: 'Uh oh, a crazy. Goodbye. (exit)' },
    ],
  },
  healMe: {
    text: 'Of course, the power of Rolep can reverse the course of any wounds. For a small donation of 50 gold, naturally.',
    buttons: [
      {
        getHealed: {
          text: '[Fork over the 50 gold]',
          conditions: [{ check: 'gold', value: 50 }],
          onClick: function (store, actions, dispatch) {
            dispatch(
              actions.actors.actions.modifyActorAttributeByActorId({
                actorId: 0,
                attribute: 'gold',
                value: -50,
              })
            );
            dispatch(
              actions.actors.actions.setActorAttributeByActorId({
                actorId: 0,
                attribute: 'health',
                value: store.actors.actorsById[0].maxHealth,
              })
            );
          },
        },
      },
      {
        quitConvo:
          "Yeah... I've changed my mind. Keep your stupid light. (exit)",
      },
    ],
  },
  getHealed: {
    text: 'By the light of holy Rolep, thy wounds are healed. Go in peace my child.',
    buttons: [{ quitConvo: 'Right... thanks. (exit)' }],
  },
  blessMe: {
    text: 'The divinity can empower you in many ways... you must choose. The blessing will last for an hour, and I will also renew any blessings that you already have. Allow the light of Rolep to fill thy soul and carry you to salvation.',
    buttons: [
      {
        strength: {
          text: 'Strength [1000 gold]',
          conditions: [
            { check: 'gold', value: 1000 },
            {
              check: (state) => {
                return (
                  state.actors.actorsById[0].powers.find((power) => {
                    return power.ref === 'rolep_strength';
                  }) === undefined
                );
              },
            },
          ],
          onClick: function (store, actions, dispatch) {
            dispatch(
              actions.actors.actions.modifyActorAttributeByActorId({
                actorId: 0,
                attribute: 'gold',
                value: -1000,
              })
            );
            dispatch(
              actions.actors.actions.addPowerToActorByDataRefAndActorId({
                powerDataRef: 'rolep_strength',
                actorId: 0,
              })
            );
          },
        },
      },
      {
        dexterity: {
          text: 'Dexterity [1000 gold]',
          conditions: [
            { check: 'gold', value: 1000 },
            {
              check: (state) => {
                return (
                  state.actors.actorsById[0].powers.find((power) => {
                    return power.ref === 'rolep_dexterity';
                  }) === undefined
                );
              },
            },
          ],
          onClick: function (store, actions, dispatch) {
            dispatch(
              actions.actors.actions.modifyActorAttributeByActorId({
                actorId: 0,
                attribute: 'gold',
                value: -1000,
              })
            );
            dispatch(
              actions.actors.actions.addPowerToActorByDataRefAndActorId({
                powerDataRef: 'rolep_dexterity',
                actorId: 0,
              })
            );
          },
        },
      },
      {
        constitution: {
          text: 'Constitution [1000 gold]',
          conditions: [
            { check: 'gold', value: 1000 },
            {
              check: (state) => {
                return (
                  state.actors.actorsById[0].powers.find((power) => {
                    return power.ref === 'rolep_constitution';
                  }) === undefined
                );
              },
            },
          ],
          onClick: function (store, actions, dispatch) {
            dispatch(
              actions.actors.actions.modifyActorAttributeByActorId({
                actorId: 0,
                attribute: 'gold',
                value: -1000,
              })
            );
            dispatch(
              actions.actors.actions.addPowerToActorByDataRefAndActorId({
                powerDataRef: 'rolep_constitution',
                actorId: 0,
              })
            );
          },
        },
      },
      {
        charisma: {
          text: 'Charisma [1000 gold]',
          conditions: [
            { check: 'gold', value: 1000 },
            {
              check: (state) => {
                return (
                  state.actors.actorsById[0].powers.find((power) => {
                    return power.ref === 'rolep_charisma';
                  }) === undefined
                );
              },
            },
          ],
          onClick: function (store, actions, dispatch) {
            dispatch(
              actions.actors.actions.modifyActorAttributeByActorId({
                actorId: 0,
                attribute: 'gold',
                value: -1000,
              })
            );
            dispatch(
              actions.actors.actions.addPowerToActorByDataRefAndActorId({
                powerDataRef: 'rolep_charisma',
                actorId: 0,
              })
            );
          },
        },
      },
      {
        wisdom: {
          text: 'Wisdom [1000 gold]',
          conditions: [
            { check: 'gold', value: 1000 },
            {
              check: (state) => {
                return (
                  state.actors.actorsById[0].powers.find((power) => {
                    return power.ref === 'rolep_wisdom';
                  }) === undefined
                );
              },
            },
          ],
          onClick: function (store, actions, dispatch) {
            dispatch(
              actions.actors.actions.modifyActorAttributeByActorId({
                actorId: 0,
                attribute: 'gold',
                value: -1000,
              })
            );
            dispatch(
              actions.actors.actions.addPowerToActorByDataRefAndActorId({
                powerDataRef: 'rolep_wisdom',
                actorId: 0,
              })
            );
          },
        },
      },
      {
        intelligence: {
          text: 'Intelligence [1000 gold]',
          conditions: [
            { check: 'gold', value: 1000 },
            {
              check: (state) => {
                return (
                  state.actors.actorsById[0].powers.find((power) => {
                    return power.ref === 'rolep_intelligence';
                  }) === undefined
                );
              },
            },
          ],
          onClick: function (store, actions, dispatch) {
            dispatch(
              actions.actors.actions.modifyActorAttributeByActorId({
                actorId: 0,
                attribute: 'gold',
                value: -1000,
              })
            );
            dispatch(
              actions.actors.actions.addPowerToActorByDataRefAndActorId({
                powerDataRef: 'rolep_intelligence',
                actorId: 0,
              })
            );
          },
        },
      },
      {
        quitConvo:
          'Ummm... this is awkward. But actually, just no. Bye. (exit)',
      },
    ],
  },
  strength: {
    text: 'Thou art blest.',
    buttons: [{ quitConvo: 'Woah, I feel it. Thanks lady. (exit)' }],
  },
  dexterity: {
    text: 'Thou art blest.',
    buttons: [{ quitConvo: 'Woah, I feel it. Thanks lady. (exit)' }],
  },
  constitution: {
    text: 'Thou art blest.',
    buttons: [{ quitConvo: 'Woah, I feel it. Thanks lady. (exit)' }],
  },
  charisma: {
    text: 'Thou art blest.',
    buttons: [{ quitConvo: 'Woah, I feel it. Thanks lady. (exit)' }],
  },
  wisdom: {
    text: 'Thou art blest.',
    buttons: [{ quitConvo: 'Woah, I feel it. Thanks lady. (exit)' }],
  },
  intelligence: {
    text: 'Thou art blest.',
    buttons: [{ quitConvo: 'Woah, I feel it. Thanks lady. (exit)' }],
  },
};
