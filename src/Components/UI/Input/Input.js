import classes from "./Input.module.css";

const Input = (props) => {
  const allClasses = `${classes.input} ${props.className}`;
  return <input {...props.properties} className={allClasses} />;
};

export default Input;
