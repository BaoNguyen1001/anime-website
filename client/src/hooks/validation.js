import validator from "validator";

export const required = value => {
  if (validator.isEmpty(value)) {
    return (
      <div className="alert" role="alert">
        This field is required!
      </div>
    );
  }
};