import classes from "./Button.module.css";

const Button = (props) => {
  const allClasses = `${classes.btn} ${props.className}`;

  return (
    <button className={allClasses} {...props.properties}>
      {props.children}
    </button>
  );
};

export default Button;
