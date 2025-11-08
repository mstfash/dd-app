import PNF from 'google-libphonenumber';

const phoneUtil = PNF.PhoneNumberUtil.getInstance();

export const isValidPhoneNumber = (phone: string) => {
  return phoneUtil.isValidNumberForRegion(phoneUtil.parse(phone, 'EG'), 'EG');
};
