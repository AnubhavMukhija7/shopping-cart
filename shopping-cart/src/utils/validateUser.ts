import validator from 'validator';
import UserOrderDetailr from '../interface/user-order-detail-interface';

export const validateUser = (user: UserOrderDetailr): Array<string> => {
  const userErrors = [];
  if (user.firstName === '') {
    userErrors.push('Enter First Name');
  }
  if (user.lastName === '') {
    userErrors.push('Enter Last Name');
  }
  if (user.email === '') {
    userErrors.push('Enter Email');
  }
  if (user.email !== '' && !validator.isEmail(user.email)) {
    userErrors.push('Enter valid email');
  }
  if (user.phone === '') {
    userErrors.push('Enter Phone');
  }
  if (user.pinCode === '') {
    userErrors.push('Enter PinCode');
  }
  if (user.state === '') {
    userErrors.push('Enter State');
  }
  if (user.city === '') {
    userErrors.push('Enter City');
  }
  if (user.addressOne === '') {
    userErrors.push('Enter Address One');
  }
  if (user.country === '') {
    userErrors.push('Enter Country');
  }
  return userErrors;
};
