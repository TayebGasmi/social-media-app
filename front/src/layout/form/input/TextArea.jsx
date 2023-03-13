import React from "react";
import { useField } from "formik";

const TextArea = ({ name, label, ...props }) => {
  const [field, meta] = useField(name);
  return (
    <div className="d-flex flex-column">
      <label htmlFor={props.id || props.name}>{label}</label>
      <textarea className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};
export default TextArea;
