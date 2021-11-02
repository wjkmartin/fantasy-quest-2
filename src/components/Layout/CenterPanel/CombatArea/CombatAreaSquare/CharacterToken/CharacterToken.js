import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../../../../../../DataHandlers/redux/actions';

import UI from '../../../../../../DataHandlers/redux/slices/UI';
import combat from '../../../../../../DataHandlers/redux/slices/combat';

import movementAnimationsByDirection from './movementAnimationsByDirection';
import attackAnimationsByDirection from './attackAnimationsByDirection';
import styles from './CharacterToken.module.css';

export default function CharacterToken(props) {
  const target = useRef(null);
  let didAnimate = useRef(false);
  let actorId = useRef(null);
  const animationPath = useSelector((state) => state.UI.animationPath);
  const actorIdAnimating = useSelector((state) => state.UI.actorIdAnimating);
  const isAnimatingToCoords = useSelector(
    (state) => state.UI.isAnimatingToCoords
  );
  const attackAnimation = useSelector((state) => state.UI.actorIdAttackAnimation);
  const coordsFinal = [isAnimatingToCoords[0], isAnimatingToCoords[1]];
  const actorsById = useSelector((state) => state.actors.actorsById);

  let dispatch = useDispatch();

  function direction(n) {
    const deltaX = n.x - n.parent.x; // 1, 0, -1
    const deltaY = n.y - n.parent.y; // 1, 0, -1
    if (deltaX === -1 && deltaY === 0) return 'north';
    else if (deltaX === 1 && deltaY === 0) return 'south';
    else if (deltaX === 0 && deltaY === 1) return 'east';
    else if (deltaX === 0 && deltaY === -1) return 'west';
    else if (deltaX === -1 && deltaY === 1) return 'northEast';
    else if (deltaX === -1 && deltaY === -1) return 'northWest';
    else if (deltaX === 1 && deltaY === 1) return 'southEast';
    else if (deltaX === 1 && deltaY === -1) return 'southWest';
  }

  useEffect(() => {
    actorId.current = props.actorId;
    const animRef = target.current;

    if (attackAnimation[props.actorId] !== undefined) {
      let animationEffect = new KeyframeEffect(
        animRef,
        [
          {
            transform: `translate(${
              attackAnimationsByDirection[attackAnimation[props.actorId]].x
            }px,${
              attackAnimationsByDirection[attackAnimation[props.actorId]].y
            }px) rotateZ(315deg)`,
          },
        ],
        { duration: 200, iterations: 1, easing: 'ease-in-out' }
      );
      
      let animation = new Animation(animationEffect);
      animation.play();
      animation.finished.then(() => {
        dispatch(UI.actions.setActorAttackAnimation({actorId: 0, direction: undefined}))
      });
    }

    if (
      !didAnimate.current &&
      actorId.current === actorIdAnimating &&
      animationPath !== undefined
    ) {
      let keyframeEffects = [];
      let xTransformAccumulated = 0;
      let yTransformAccumulated = 0;
      animationPath.forEach((node, index) => {
        const delay = 250 * index;
        const x = movementAnimationsByDirection[direction(node)].x;
        const y = movementAnimationsByDirection[direction(node)].y;

        xTransformAccumulated += x;
        yTransformAccumulated += y;

        keyframeEffects.push(
          new KeyframeEffect(
            animRef,
            [
              {
                transform: `translate(${xTransformAccumulated}px,${yTransformAccumulated}px) rotateZ(315deg)`,
              },
            ],
            { delay: delay, duration: 250, iterations: 1, easing: 'linear' }
          )
        );
      });

      let animations = [];
      let promises = [];
      keyframeEffects.forEach((effect) => {
        let animation = new Animation(effect);
        animation.finished.then(() => {
          // Below code kept in case we need to ever extract transform data after it happens (from inside this loop)
          // if (index > 0) {
          //   const parensInsideReg = /\(([^\)]+)\)/;
          //   const valsReg = /-*\d+(?=px)/g;
          //   let vals = animation.effect
          //     .getKeyframes()[0]
          //     .transform.match(parensInsideReg)[1]
          //     .match(valsReg);
          //   let valsPrev = animations[index - 1].effect
          //     .getKeyframes()[0]
          //     .transform.match(parensInsideReg)[1]
          //     .match(valsReg);
          //   console.log(vals);
          //   console.log(valsPrev);
          //   animRef.style.transform = `translate(${
          //     parseInt(vals[0]) + parseInt(valsPrev[0])
          //   }px,${
          //     parseInt(vals[1]) + parseInt(valsPrev[1])
          //   }px) rotateZ(315deg)`;
          // } else {
          animRef.style.transform =
            animation.effect.getKeyframes()[0].transform;
          // }
        });
        promises.push(animation.finished);
        animations.push(animation);
      });
      animations.forEach((animation) => {
        animation.play();
      });
      Promise.all(promises).then(() => {
        resetAnimationParams(actorIdAnimating, coordsFinal);
      });
    }
  }, [animationPath, attackAnimation]);

  function resetAnimationParams(_actorIdAnimating, _coordsFinal) {
    didAnimate.current = true;
    dispatch(
      actions.setActorAttributeByActorId(
        _actorIdAnimating,
        'movementRemaining',
        actorsById[_actorIdAnimating].movementRemaining - animationPath.length
      )
    );
    dispatch(UI.actions.setAnimationPath(undefined));
    dispatch(
      combat.actions.setActorCoordsById({
        actorId: _actorIdAnimating,
        coords: { x: _coordsFinal[0], y: _coordsFinal[1] },
      })
    );
    dispatch(
      UI.actions.setIsAnimatingToCoords({
        actorId: undefined,
        coords: [undefined, undefined],
      })
    );
  }

  return (
    <img
      ref={target}
      className={styles.CharacterToken}
      alt={''}
      src={props.tokenImage}
    />
  );
}
