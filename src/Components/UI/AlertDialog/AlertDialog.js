import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faCheck } from "@fortawesome/free-solid-svg-icons";
import Backdrop from "@mui/material/Backdrop";

import Button from "../Button/Button";
import classes from "./AlertDialog.module.css";

const AlertDialog = (props) => {
  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      ></Backdrop>
      <div className={classes.container}>
        <div
          style={{
            "background-color": props.isError ? "red" : "green",
          }}
          className={classes["statusIcon__container"]}
        >
          <FontAwesomeIcon
            className={classes["status-icon"]}
            icon={props.isError ? faXmark : faCheck}
          />
        </div>
        <div className={classes["message__container"]}>{props.message}</div>
        <div className={classes["action__container"]}>
          <Button
            properties={{
              onClick: props.onClick,
            }}
            className={classes.btn}
          >
            Okay
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AlertDialog;
