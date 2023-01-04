import { useState, useRef } from "react";
import { useDispatch } from "react-redux";

import LoadingSpinner from "../../Components/UI/LoadingSpinner/LoadingSpinner";
import { signUp, signIn } from "../../store/authSlice";
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
  const [isLoading, setIsLoading] = useState(false);

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const dispatch = useDispatch();

  const isLoginMode = authMode === AuthModes.login;
  const isRegisterMode = authMode === AuthModes.register;
  const isResetMode = authMode === AuthModes.reset;

  const submitFormHandler = (event) => {
    event.preventDefault();
    let name;
    let email = emailRef.current.value;
    let password;
    let confirmPassword;

    if (isRegisterMode) {
      name = nameRef.current.value;
      password = passwordRef.current.value;
      confirmPassword = confirmPasswordRef.current.value;

      dispatch(signUp(name, email, password, confirmPassword, setIsLoading));
    } else if (isLoginMode) {
      password = passwordRef.current.value;
      dispatch(signIn(email, password, setIsLoading));
    }
  };

  return (
    <AnimatedOpacityDiv className={`${classes.container}`}>
      <div className={`container `}>
        <div className={`row ${classes.row} `}>
          <div
            className={`col-lg-4 col-md-6 offset-lg-4 offset-md-3 ${classes.col}`}
          >
            <form onSubmit={submitFormHandler}>
              {isRegisterMode && (
                <Input
                  properties={{
                    placeholder: "Name",
                    ref: nameRef,
                    required: true,
                    type: "text",
                  }}
                  className={classes.input}
                ></Input>
              )}
              <Input
                properties={{
                  placeholder: "Email",
                  ref: emailRef,
                  required: true,
                  type: "email",
                }}
                className={classes.input}
              ></Input>
              {!isResetMode && (
                <Input
                  properties={{
                    placeholder: "Password",
                    ref: passwordRef,
                    required: true,
                    type: "password",
                  }}
                  className={classes.input}
                ></Input>
              )}
              {isRegisterMode && (
                <Input
                  properties={{
                    placeholder: "Confirm Password",
                    ref: confirmPasswordRef,
                    required: true,
                    type: "password",
                  }}
                  className={classes.input}
                ></Input>
              )}
              {isLoginMode && (
                <button
                  onClick={() => {
                    setAuthMode(
                      isLoginMode ? AuthModes.reset : AuthModes.login
                    );
                  }}
                  className={classes["forget-btn"]}
                >
                  Forget password?
                </button>
              )}
              {isLoading ? (
                <LoadingSpinner
                  className={classes["loading-spinner"]}
                ></LoadingSpinner>
              ) : (
                <Button
                  properties={{}}
                  className={`${classes.btn} ${classes["main-btn"]}`}
                >
                  {isLoginMode
                    ? "Login"
                    : isRegisterMode
                    ? "Register"
                    : "Reset Password"}
                </Button>
              )}

              <hr className={classes.hr}></hr>

              <Button
                properties={{
                  type: "button",
                  onClick: () => {
                    setAuthMode(
                      isLoginMode ? AuthModes.register : AuthModes.login
                    );
                  },
                }}
                className={`${classes.btn} ${classes["alt-btn"]}`}
              >
                {isLoginMode ? "Register" : "Login"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </AnimatedOpacityDiv>
  );
};

export default Auth;
