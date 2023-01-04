import { useSpring, animated } from "react-spring";

const AnimatedNumber = (props) => {
  const num = props.number;

  const { number } = useSpring({
    from: { number: 0 },
    number: num,
    delay: 1,
    config: { mass: 1, tension: 20, friction: 10 },
  });

  return (
    <div>
      <animated.div className={props.className}>
        {number.to((num) => num.toFixed(0))}
      </animated.div>
    </div>
  );
};

export default AnimatedNumber;
