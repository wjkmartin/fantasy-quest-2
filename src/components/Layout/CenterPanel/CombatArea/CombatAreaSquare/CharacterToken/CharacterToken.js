import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import actions from "../../../../../../DataHandlers/redux/actions";
import animationsByDirection from "./animationsByDirection";
import styles from "./CharacterToken.module.css";

export default function CharacterToken(props) {
  const target = useRef();
  const animationPath = useSelector((state) => state.UI.animationPath);
  const actorIdAnimating = 0;
  const coordsFinal = [
    animationPath[animationPath.length - 1]?.x,
    animationPath[animationPath.length - 1]?.y,
  ];

  let dispatch = useDispatch();

  useEffect(() => {
    const animRef = target.current;
    if (animationPath.length > 0 && props.actorHereId === 0) {
      let keyframeEffects = [];
      let xTransformAccumulated = 0;
      let yTransformAccumulated = 0;
      animationPath.forEach((node, index) => {
        function direction(_node) {
          const deltaX = _node.x - _node.parent.x; // 1, 0, -1
          const deltaY = _node.y - _node.parent.y; // 1, 0, -1
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
            { delay: delay, duration: 250, iterations: 1 }
          )
        );
      });

      let animations = [];
      let promises = [];
      keyframeEffects.forEach((effect, index) => {
        let animation = new Animation(effect);
        animation.finished.then(() => {
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
        console.log(animation);
        animation.play();
      });
      Promise.all([...promises]).then((values) => {
        resetAnimationParams(actorIdAnimating, coordsFinal);
        console.log("all animations done");
      });
    }
  }, []);

  const resetAnimationParams = (_actorIdAnimating, _coordsFinal) => {
    dispatch(actions.setIsAnimatingtoCoords(undefined, undefined, undefined));
    dispatch(actions.setAnimationPath([]));
    dispatch(actions.moveActorLocationCombat(_actorIdAnimating, _coordsFinal));
  };

  return (
    <img
      ref={target}
      className={styles.CharacterToken}
      alt={""}
      src={props.tokenImage}
    />
  );
}
