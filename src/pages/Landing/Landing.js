import { Fragment } from "react";

import Button from "../../Components/UI/Button/Button";
import trackingGif from "../../assets/tracking.gif";
import classes from "./Landing.module.css";

const Landing = (props) => {
  return (
    <Fragment>
      <div className={`row ${classes.main}`}>
        <div className={`col-md-6`}>
          <img
            className={classes["tracking-gif"]}
            src={trackingGif}
            alt="tracking-gif"
          ></img>
        </div>
        <div className={`col-md-6 order-md-first ${classes.content}`}>
          <h1 className={classes["content__title"]}>
            Expense <span>Tracking</span> App
          </h1>
          <p className={classes["content__description"]}>
            Track your expenses like never before. Keep record of your all
            expenses
          </p>
          <Button className={classes.btn}>Login / Register</Button>
        </div>
      </div>
    </Fragment>
  );
};

export default Landing;
