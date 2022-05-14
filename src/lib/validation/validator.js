import * as t from './errorTypes';

const validationsByType = {
  codeField: [t.EMPTY_FIELD, t.INVALID_CODE],
  confirmPassword: [t.EMPTY_FIELD],
  email: [t.EMPTY_FIELD, t.INVALID_EMAIL],
  phoneNumber: [t.EMPTY_FIELD, t.INVALID_PHONE_NUMBER],
  requiredField: [t.EMPTY_FIELD],
};

export const regexes = {
  [t.EMPTY_FIELD]: /\S/,
  [t.INVALID_CODE]: /^[0-9]{6}$/,
  [t.INVALID_PHONE_NUMBER]: /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/,
  [t.INVALID_EMAIL]:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
};

const validator = (type) => (value) => {
  const validations = validationsByType[type];

  return validations.find((validation) => !regexes[validation].test(value));
};

export default validator;
