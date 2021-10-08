import styled, { css } from "styled-components";
import frames from "./animationKeyframes";

import anime from "animejs";

export function animateMovePlayerToLocation(state, path, id) {
  const img = styled.img`
    position: relative;
    top: 15px;
    left: -4px;
    pointer-events: none;
    width: 60px;
    height: 100px;
    transform: rotateX(0deg) rotateY(0deg) rotateZ(-45deg) translateY(-40px)
      translateX(8px);
  `;

  if (!state || id !== 0) {
    return img;
  } else {
    let animatedImg;
    let animationNameCss = css``;
    let animationDelayList = css``;
    path.forEach((square, index) => {
      const direction = () => {
        const deltaX = square.x - square.parent.x; // 1, 0, -1
        const deltaY = square.y - square.parent.y; // 1, 0, -1
        if (deltaX === -1 && deltaY === 0) return "north";
        else if (deltaX === 1 && deltaY === 0) return "south";
        else if (deltaX === 0 && deltaY === 1) return "east";
        else if (deltaX === 0 && deltaY === -1) return "west";
        else if (deltaX === -1 && deltaY === 1) return "northEast";
        else if (deltaX === -1 && deltaY === -1) return "northWest";
        else if (deltaX === 1 && deltaY === 1) return "southEast";
        else if (deltaX === 1 && deltaY === -1) return "southWest";
      };

      // animationNameList +=  css` ${frames[direction()]},`

      // animationDelayList += ` ${200 * index}ms,`
      // // build strings, add to styled img at end

      animationNameCss = css`
        ${frames['north']}
      `
      console.log(animationNameCss)

      animationDelayList += ` ${200 * index}ms${index + 1 === path.length ? '' : ','}`

      animatedImg = styled.img`
        position: relative;
        top: 15px;
        left: -4px;
        pointer-events: none;
        width: 60px;
        height: 100px;
        transform: rotateX(0deg) rotateY(0deg) rotateZ(-45deg) translateY(-40px)
        translateX(8px);
      `;

      anime({
        targets: '.player',
        translateX: [
          { value: 250, duration: 1000, delay: 500 },
          { value: 0, duration: 1000, delay: 500 }
        ],
        translateY: [
          { value: -40, duration: 500 },
          { value: 40, duration: 500, delay: 1000 },
          { value: 0, duration: 500, delay: 1000 }
        ],
        scaleX: [
          { value: 4, duration: 100, delay: 500, easing: 'easeOutExpo' },
          { value: 1, duration: 900 },
          { value: 4, duration: 100, delay: 500, easing: 'easeOutExpo' },
          { value: 1, duration: 900 }
        ],
        scaleY: [
          { value: [1.75, 1], duration: 500 },
          { value: 2, duration: 50, delay: 1000, easing: 'easeOutExpo' },
          { value: 1, duration: 450 },
          { value: 1.75, duration: 50, delay: 1000, easing: 'easeOutExpo' },
          { value: 1, duration: 450 }
        ],
        easing: 'easeOutElastic(1, .8)',
        loop: true
      });

      // animation-delay: ${animationDelayList};
      // let styleWithDelay = styles
      // console.log(styles)

      // let delay = 200 * index;
      // styleWithDelay.animationDelay = `${delay}ms`
      // document.documentElement.style.setProperty(`--${this.id}`, this.value + suffix);
      // finalStyle += ` ${styles[direction()]}`
    });
    // let finalStyleNorth = `${styles.actorToken} ${styles.animationSouth}`
    // let finalStyle = basicStyle;
    return animatedImg;
  }
}
