import React, { useEffect, useRef } from "react";
import {  useDispatch, useSelector } from "react-redux";
import actions from "../../../../../../DataHandlers/redux/actions";
import animationsByDirection from "./animationsByDirection";
import styles from "./CharacterToken.module.css";

export default function CharacterToken(props) {
  const target = useRef(null);
  const didAnimate = useRef(false);
  const actorId = useRef(props.actorId);
  const animationPath = useSelector((state) => state.UI.animationPath);
  const actorIdAnimating = useSelector((state) => state.UI.actorIdAnimating);
  const isAnimatingToCoords = useSelector(
    (state) => state.UI.isAnimatingToCoords
  );
  const coordsFinal = [isAnimatingToCoords[0], isAnimatingToCoords[1]];

  let dispatch = useDispatch();

  console.log("4-", actorId.current);

  useEffect(() => {
    const animRef = target.current;

    if (
      !didAnimate.current &&
      actorId.current === actorIdAnimating &&
      animationPath !== undefined
    ) {
      
      console.log("5-", actorIdAnimating);
      let keyframeEffects = [];
      let xTransformAccumulated = 0;
      let yTransformAccumulated = 0;
      animationPath.forEach((node, index) => {
        function direction(n) {
          const deltaX = n.x - n.parent.x; // 1, 0, -1
          const deltaY = n.y - n.parent.y; // 1, 0, -1
          if (deltaX === -1 && deltaY === 0) return "north";
          else if (deltaX === 1 && deltaY === 0) return "south";
          else if (deltaX === 0 && deltaY === 1) return "east";
          else if (deltaX === 0 && deltaY === -1) return "west";
          else if (deltaX === -1 && deltaY === 1) return "northEast";
          else if (deltaX === -1 && deltaY === -1) return "northWest";
          else if (deltaX === 1 && deltaY === 1) return "southEast";
          else if (deltaX === 1 && deltaY === -1) return "southWest";
        }
        const delay = 250 * index;
        const x = animationsByDirection[direction(node)].x;
        const y = animationsByDirection[direction(node)].y;

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
            { delay: delay, duration: 250, iterations: 1, easing: "linear" }
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
        console.log("6-", actorIdAnimating);
        resetAnimationParams(actorIdAnimating, coordsFinal);
      });
    }
  }, []);

  function resetAnimationParams(_actorIdAnimating, _coordsFinal) {
    const id = _actorIdAnimating;
    didAnimate.current = true;
    dispatch(actions.setAnimationPath(undefined));
    console.log("7-", actorIdAnimating);
    dispatch(actions.moveActorLocationCombat(id, _coordsFinal));

    dispatch(actions.setIsAnimatingtoCoords(undefined, undefined, undefined));
  }

  return (
    <img
      ref={target}
      className={styles.CharacterToken}
      alt={""}
      src={props.tokenImage}
    />
  );
}
