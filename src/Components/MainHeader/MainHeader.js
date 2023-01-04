import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faUser,
  faChevronDown,
  faSignOut,
} from "@fortawesome/free-solid-svg-icons";

import AlertDialog from "../../Components/UI/AlertDialog/AlertDialog";

import { authActions } from "../../store/authSlice";
import MyPopper from "../../Components/UI/Popper/Popper";
import classes from "./MainHeader.module.css";

const MainHeader = (props) => {
  const [showPopper, setShowPopper] = useState(false);
  const [popperElement, setPopperElement] = useState(null);

  const dataState = useSelector((state) => state.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const togglePopper = (event) => {
    if (showPopper) {
      setPopperElement(null);
    } else {
      setPopperElement(event.currentTarget);
    }
    setShowPopper((prev) => !prev);
  };

  const logout = () => {
    dispatch(authActions.logout());
    navigate("/");
  };

  return (
    <div>
      <div className={`row`}>
        <div
          className={`col col-md-4 my-auto ${classes["menu-icon__container"]}`}
        >
          {props.alert && (
            <AlertDialog
              message={alert.message}
              isError={alert.isError}
            ></AlertDialog>
          )}
          <FontAwesomeIcon className={classes["menu-icon"]} icon={faBars} />
        </div>
        <div className={`col d-none d-md-block`}>
          <div className={classes.title}>DashBoard</div>
        </div>
        <div className={`col col-md-4 my-auto ${classes["login-status__col"]}`}>
          <div
            onClick={togglePopper}
            className={classes["login-status__container"]}
          >
            <FontAwesomeIcon
              className={classes["profile-icon"]}
              icon={faUser}
            />
            <span>{dataState.user.name}</span>
            <FontAwesomeIcon
              className={classes["arrow-icon"]}
              icon={faChevronDown}
            />
          </div>
        </div>
        {showPopper && (
          <MyPopper element={popperElement} placement="bottom">
            <div className={classes["popper_item"]}>
              <div> Profile</div>
              <FontAwesomeIcon
                className={classes["popper_item__icon"]}
                icon={faUser}
              />
            </div>
            <div onClick={logout} className={classes["popper_item"]}>
              <div> Logout</div>
              <FontAwesomeIcon
                className={classes["popper_item__icon"]}
                icon={faSignOut}
              />
            </div>
          </MyPopper>
        )}
      </div>
    </div>
  );
};

export default MainHeader;
