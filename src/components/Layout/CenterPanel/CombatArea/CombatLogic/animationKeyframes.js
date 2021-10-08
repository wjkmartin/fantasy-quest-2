import { keyframes } from "styled-components";

export default {
  north: keyframes`
  0% {
      transform: rotateX(0deg) rotateY(0deg) rotateZ(-45deg) translateY(-40px)
        translateX(8px);
    }
    25% {
      transform: rotateX(0deg) rotateY(0deg) rotateZ(-45deg) translateY(-90px)
        translateX(18px);
    }
    50% {
      transform: rotateX(0deg) rotateY(0deg) rotateZ(-45deg) translateY(-125px)
        translateX(29px);
    }
    75% {
      transform: rotateX(0deg) rotateY(0deg) rotateZ(-45deg) translateY(-100px)
        translateX(40px);
    }
    100% {
      transform: rotateX(0deg) rotateY(0deg) rotateZ(-45deg) translateY(-85px)
        translateX(50px);
    }`,
    south: keyframes`
    0% {
        transform: rotateX(0deg) rotateY(0deg) rotateZ(-45deg) translateY(-40px)
          translateX(8px);
      }
      25% {
        transform: rotateX(0deg) rotateY(0deg) rotateZ(-45deg) translateY(-70px)
          translateX(-3px);
      }
      50% {
        transform: rotateX(0deg) rotateY(0deg) rotateZ(-45deg) translateY(-80px)
          translateX(-13px);
      }
      75% {
        transform: rotateX(0deg) rotateY(0deg) rotateZ(-45deg) translateY(-70px)
          translateX(-21px);
      }
      100% {
        transform: rotateX(0deg) rotateY(0deg) rotateZ(-45deg) translateY(5px)
          translateX(-34px);
      }`
}