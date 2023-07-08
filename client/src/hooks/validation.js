import validator from "validator";

export const comparePassword = (password, confirm) => {
  if (confirm !== password) {
    return false;
  }
  return true;
};
