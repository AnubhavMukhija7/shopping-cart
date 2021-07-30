import CardDetails from '@/interface/card-details-interface';
import validator from 'validator';

export const validateCardDetails = (card: CardDetails): Array<string> => {
  const cardErrors = [];
  if (card.name === '') {
    cardErrors.push('Enter Name');
  }
  if (card.number === '') {
    cardErrors.push('Enter card');
  }
  if (!validator.isCreditCard(card.number) && card.number !== '') {
    cardErrors.push('Enter valid card number');
  }
  if (card.expMonth === '0') {
    cardErrors.push('Enter Month');
  }
  if (card.expYear === '0') {
    cardErrors.push('Enter Year');
  }
  if (card.cvv.length !== 3 || typeof card.cvv !== 'string') {
    cardErrors.push('Enter valid cvv');
  }
  return cardErrors;
};
