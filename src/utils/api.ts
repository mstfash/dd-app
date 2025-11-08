import Axios from 'axios';
import { SERVER_URL } from './constants';

import { PaymentData } from './types';

export async function verifyHmac(hmac: string, concatendatedString: string) {
  const data = {
    hmac,
    con: concatendatedString,
  };
  return Axios.post(`${SERVER_URL}/payment/verify_hmac`, data);
}

export async function generatePayment(data: PaymentData) {
  return Axios.post(`${SERVER_URL}/payment/generate_payment`, data);
}
