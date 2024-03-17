import { ErrorMessage } from "formik";

export const Checkbox = ({ form, name, label, disabled, id, className }) => {
  return (
    <div>
      <input
        type="checkbox"
        id={name}
        name={name}
        onChange={(e) => {
          form.setFieldValue(name, e.target.checked);
        }}
      />
      <label htmlFor={name}> {label}</label>
      <ErrorMessage component="div" className="input-error" name="checkbox" />
    </div>
  );
};
