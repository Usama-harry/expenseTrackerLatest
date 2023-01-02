import { useState } from "react";

import AnimatedOpacityDiv from "../../Components/UI/AnimatedOpacityDiv/AnimatedOpacityDiv";
import Button from "../../Components/UI/Button/Button";
import Input from "../../Components/UI/Input/Input";
import classes from "./Auth.module.css";

const AuthModes = {
  login: 0,
  register: 1,
  reset: 2,
};

const Auth = (props) => {
  const [authMode, setAuthMode] = useState(AuthModes.login);

  const isLoginMode = () => authMode === AuthModes.login;
  const isRegisterMode = () => authMode === AuthModes.register;
  const isResetMode = () => authMode === AuthModes.reset;

  return (
    <AnimatedOpacityDiv className={`${classes.container}`}>
      <div className={`container `}>
        <div className={`row ${classes.row} `}>
          <div
            className={`col-lg-4 col-md-6 offset-lg-4 offset-md-3 ${classes.col}`}
          >
            <Input
              properties={{
                placeholder: "Email",
              }}
              className={classes.input}
            ></Input>
            <Input
              properties={{
                placeholder: "Password",
              }}
              className={classes.input}
            ></Input>
            <button className={classes["forget-btn"]}>Forget password?</button>
            <Button className={`${classes.btn} ${classes["main-btn"]}`}>
              {isLoginMode() ? "Login" : "Register"}
            </Button>
            <hr className={classes.hr}></hr>
            <Button
              properties={{
                onClick: () => {
                  setAuthMode(
                    isLoginMode() ? AuthModes.register : AuthModes.login
                  );
                },
              }}
              className={`${classes.btn} ${classes["alt-btn"]}`}
            >
              {isLoginMode() ? "Register" : "Login"}
            </Button>
          </div>
        </div>
      </div>
    </AnimatedOpacityDiv>
  );
};

export default Auth;
