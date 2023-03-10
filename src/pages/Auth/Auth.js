import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { signUp, signIn, autoLogin } from "../../store/authSlice";
import AnimatedOpacityDiv from "../../Components/UI/AnimatedOpacityDiv/AnimatedOpacityDiv";

//UI
import AlertDialog from "../../Components/UI/AlertDialog/AlertDialog";
import LoadingSpinner from "../../Components/UI/LoadingSpinner/LoadingSpinner";
import Button from "../../Components/UI/Button/Button";
import Input from "../../Components/UI/Input/Input";
//Styles
import classes from "./Auth.module.css";

const AuthModes = {
  login: 0,
  register: 1,
  reset: 2,
};

const Auth = (props) => {
  const [authMode, setAuthMode] = useState(AuthModes.login);
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoginMode = authMode === AuthModes.login;
  const isRegisterMode = authMode === AuthModes.register;
  const isResetMode = authMode === AuthModes.reset;

  //Trying login from local storage
  useEffect(() => {
    dispatch(autoLogin());
  }, [dispatch]);

  //Redirecting not authorized users
  useEffect(() => {
    if (isAuthenticated) navigate("/home");
  }, [isAuthenticated, navigate]);

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

      dispatch(
        signUp(name, email, password, confirmPassword, setIsLoading, setAlert)
      );
    } else if (isLoginMode) {
      password = passwordRef.current.value;
      dispatch(signIn(email, password, setIsLoading, setAlert));
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
              {alert && (
                <AlertDialog
                  onClick={() => setAlert(null)}
                  message={alert.message}
                  isError={alert.isError}
                ></AlertDialog>
              )}
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
              {/* {isLoginMode && (
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
              )} */}
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
