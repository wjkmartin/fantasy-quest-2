import React, { useState } from 'react';
import styles from './Powers.module.css';

import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import { useSelector } from 'react-redux';

import PassivePower from './PassivePower/PassivePower';
import CombatPower from './CombatPower/CombatPower';

export default function Powers() {
  const powersById = useSelector((state) => state.powers.passivePowersById);
  const combatPowersById = useSelector((state) => state.powers.combatPowersById);
  let playerPassivePowerIds = useSelector(
    (state) => state.powers.passivePowersOnActorById[0]
  );

  let passivePowers = playerPassivePowerIds.map((powerId, i) => {
    return (
      <PassivePower
        key={`__PassivePower__${i}`}
        powerData={powersById[powerId]}
      />
    );
  });

  let unlockedCombatPowers = useSelector(
    (state) => state.powers.unlockedCombatPowersById
  );

  let combatPowers = unlockedCombatPowers.map((powerId, i) => {
    return <CombatPower key={`__CombatPower__${i}`} power={combatPowersById[powerId]} />;
  });

  const noPowers = (
    <p className={styles.Powers__noPowers}>
      You currently have no powers of this type.
    </p>
  );

  if (combatPowers === undefined || combatPowers.length === 0)
    combatPowers = noPowers;
  if (passivePowers === undefined || passivePowers.length === 0)
    passivePowers = noPowers;

  return (
    <div className={styles.Powers}>
      <Tabs
        onSelect={(key, e) => {
          // this is to disable tab changing via arrow key
          if (e) {
            e.currentTarget.blur();
          }
        }}
        defaultActiveKey="combatPowers"
        transition={false}
      >
        <Tab eventKey="combatPowers" title="Combat">
          {combatPowers}
        </Tab>

        <Tab eventKey="passivePowers" title="Passive">
          {passivePowers}
        </Tab>
      </Tabs>
    </div>
  );
}
