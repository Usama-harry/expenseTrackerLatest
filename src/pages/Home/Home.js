import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import AnimatedOpacityDiv from "../../Components/UI/AnimatedOpacityDiv/AnimatedOpacityDiv";
import classes from "./Home.module.css";

const Home = (props) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) navigate("/auth");
  }, [isAuthenticated, navigate]);
  return (
    <AnimatedOpacityDiv className={`container ${classes.container}`}>
      <div className={`row`}>
        <div
          className={`col col-md-4 my-auto ${classes["menu-icon__container"]}`}
        >
          <FontAwesomeIcon
            className={classes["menu-icon"]}
            clas
            icon={faBars}
          />
        </div>
        <div className={`col d-none d-md-block`}>
          <div className={classes.title}>DashBoard</div>
        </div>
        <div className={`col col-md-4 my-auto ${classes["login-status"]}`}>
          <span>Usama Javed</span>
        </div>
      </div>
    </AnimatedOpacityDiv>
  );
};

export default Home;
