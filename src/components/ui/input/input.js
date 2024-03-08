import React from "react";
import styles from "./input.module.css";

const Input = ({ name, ...otherProps }, ref) => {
  return (
    <input className={styles.formInput} {...otherProps} name={name} ref={ref} />
  );
};

const FormInput = React.forwardRef(Input);

export default FormInput;
