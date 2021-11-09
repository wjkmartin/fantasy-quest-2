import React from 'react';
import { useSelector } from 'react-redux';

import styles from './ActiveActorInfo.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import RequestDuelButton from './RequestDuelButton/RequestDuelButton';
import TradeButton from './TradeButton/TradeButton';
import TalkButton from './TalkButton/TalkButton';
import InspectButton from './InspectButton/InspectButton';
import AddToFriendsButton from './AddToFriendsButton/AddToFriendsButton';

function ActiveActorInfo(props) {
  const combatObject = useSelector((state) => state.combat);
  const inCombat = combatObject.inCombat;
  const inDialogue = useSelector((state) => state.UI.inConversation);
  const actorObject = useSelector((state) => state.actors);

  const currentSuperLocation = useSelector(
    (state) => state.locations.currentLocation
  );
  const currentSubLocation = useSelector(
    (state) => state.locations.currentSubLocation
  );

  const currentLocation =
    currentSubLocation === undefined
      ? currentSuperLocation
      : currentSubLocation;

  const actorsHere = actorObject.actorsById.filter(
    (actor) => actor.location === currentLocation
  );

  const talkButton = (
    <TalkButton
      key={'talkButton'}
      activeActor={props.activeActor}
      className={styles.actionButton}
    />
  );

  const duelButton = (
    <RequestDuelButton
      key={'requestDuelButton'}
      activeActor={props.activeActor}
      className={styles.actionButton}
    />
  );

  const tradeButton = (
    <TradeButton
      key={'tradeButton'}
      activeActor={props.activeActor}
      className={styles.actionButton}
    />
  );

  const inspectButton = (
    <InspectButton key={'inspectButton'} className={styles.actionButton} />
  );

  const addToFriendsButton = (
    <AddToFriendsButton
      key={'addToFriendsButton'}
      className={styles.actionButton}
    />
  );

  const evadeButton = (
    <button key={'evadeButton'} className={styles.actionButton}>
      <FontAwesomeIcon icon={['fas', 'shoe-prints']} /> Evade
    </button>
  );

  const buttons = [
    talkButton,
    tradeButton,
    duelButton,
    inspectButton,
    addToFriendsButton,
  ];
  const monsterButtons = [duelButton, evadeButton];
  const healthPercentage =
    props.activeActor === undefined
      ? 'none'
      : Math.round(
          (props.activeActor?.health / props.activeActor?.maxHealth) * 100
        ) + '%';
  const spPercentage =
    props.activeActor === undefined
      ? 'none'
      : Math.round((props.activeActor?.sp / props.activeActor?.maxSp) * 100) +
        '%';
  const manaPercentage =
    props.activeActor === undefined
      ? 'none'
      : Math.round(
          (props.activeActor?.mana / props.activeActor?.maxMana) * 100
        ) + '%';

  return (
    <div className={props.className}>
      <div className={styles.topRow}>
        <img
          src={props.activeActor?.portrait}
          alt="character portrait"
          className={styles.characterPortrait}
          height="250"
          width="100"
        />
        <div
          style={{
            width: '70%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}
        >
          <p
            className={`${styles.actorName} ${
              props.activeActor?.type === 'hunter' ? styles.hunter : ''
            }`}
            id="targetActorName"
          >
            ~ {props.activeActor?.actorName} ~
          </p>
          <p className={styles.actorTitle}>
            {`<< ${
              props.activeActor?.title !== undefined
                ? props.activeActor?.title
                : ''
            } >>`}
          </p>
          <p className={styles.actorTitle}>
            {props.activeActor?.raceLevelClassString}
          </p>
          <div className={styles.barWrapper}>
            <FontAwesomeIcon
              className={styles.attributeIcon}
              icon={['fas', 'plus']}
            ></FontAwesomeIcon>
            <div className={styles.bar}>
              <div
                style={{
                  width: healthPercentage,
                  position: 'absolute',
                  height: '11px',
                  backgroundColor: '#e06666',
                  borderRadius: '10% 10% 10% 10% / 0% 50% 50% 0% ',
                }}
              ></div>
              <div className={styles.bar__numerals}>
                {props.activeActor?.health} / {props.activeActor?.maxHealth}
              </div>
            </div>
          </div>
          <div className={styles.barWrapper}>
            <FontAwesomeIcon
              className={styles.attributeIcon}
              icon={['fas', 'user']}
            ></FontAwesomeIcon>
            <div className={styles.bar}>
              <div
                style={{
                  width: spPercentage,
                  height: '11px',
                  backgroundColor: '#93c47d',
                  borderRadius: '10% 10% 10% 10% / 0% 50% 50% 0% ',
                }}
              ></div>
              <div className={styles.bar__numerals}>
                {props.activeActor?.sp} / {props.activeActor?.maxSp}
              </div>
            </div>
          </div>
          <div className={styles.barWrapper}>
            <FontAwesomeIcon
              className={styles.attributeIcon}
              icon={['fas', 'star']}
            ></FontAwesomeIcon>
            <div className={styles.bar}>
              <div
                style={{
                  width: manaPercentage,
                  height: '11px',
                  backgroundColor: '#6fa8dc',
                  borderRadius: '10% 10% 10% 10% / 0% 50% 50% 0% ',
                }}
              ></div>
              <div className={styles.bar__numerals}>
                {props.activeActor?.mana} / {props.activeActor?.maxMana}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.bottomRow}>
        {inCombat || inDialogue
          ? ' '
          : props.activeActor?.type === 'monster'
          ? monsterButtons.map((button) => button)
          : buttons.map((button) => button)}
      </div>
    </div>
  );
}

export default ActiveActorInfo;
