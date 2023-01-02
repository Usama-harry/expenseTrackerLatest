import { motion } from "framer-motion";

const AnimatedOpacityDiv = (props) => {
  const duration = props.duration;

  return (
    <motion.div
      className={props.className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: duration || 1 } }}
      exit={{ opacity: 0 }}
    >
      {props.children}
    </motion.div>
  );
};

export default AnimatedOpacityDiv;
