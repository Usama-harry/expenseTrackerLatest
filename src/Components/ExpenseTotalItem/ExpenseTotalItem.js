import AnimatedNumber from "../UI/AnimetedNumber/AnimatedNumber";

import classes from "./ExpenseTotalItem.module.css";

const ExpenseTotalItem = (props) => {
  return (
    <div className={`${classes.box}`}>
      <AnimatedNumber
        number={props.amount}
        className={classes.amount}
      ></AnimatedNumber>

      <div className={classes.time}>{props.title}</div>
    </div>
  );
};

export default ExpenseTotalItem;
