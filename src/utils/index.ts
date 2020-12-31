let errors = "";

export const validate = (value: string) => {
  if (!value) {
    errors = "Enter an item to add";

    return errors;
  }

  if (!/^[A-Z0-9]/i.test(value)) {
    errors = "Enter a valid item descrition";

    return errors;
  }
};
