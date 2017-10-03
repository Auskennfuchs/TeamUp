import isEmpty from 'lodash/isEmpty';

export default function validateInput(data) {
  let errors = {};

  if (isEmpty(data.identifier)) {
    errors.identifier = 'This field is required';
  }
  
  return {
    errors,
    isValid: isEmpty(errors)
  };
}