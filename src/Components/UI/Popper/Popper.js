import Popper from "@mui/material/Popper";
import Fade from "@mui/material/Fade";

import classes from "./Popper.module.css";

const MyPopper = (props) => {
  return (
    <Popper
      open={true}
      anchorEl={props.element}
      placement={props.postion}
      transition
    >
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={350}>
          <div className={classes.container}>
            {props.children.map((child, index) => (
              <div key={index}>{child} </div>
            ))}
          </div>
        </Fade>
      )}
    </Popper>
  );
};

export default MyPopper;
