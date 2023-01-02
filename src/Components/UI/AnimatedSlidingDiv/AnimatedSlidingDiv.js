import { motion } from "framer-motion";

const AnimatedSlidingDiv = (props) => {
  return (
    <motion.div
      className={props.className}
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: "100%" }}
    >
      {props.children}
    </motion.div>
  );
};

export default AnimatedSlidingDiv;
