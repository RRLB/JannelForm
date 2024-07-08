import moment from 'moment';

const validateDOB = (dob) => {
  if (!dob.trim()) {
    return 'Date de naissance est requise';
  }

  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(dob)) {
    return 'Format de date invalide (utilisez jj/mm/aaaa)';
  }

  const [day, month, year] = dob.split('/');
  const isoDate = `${year}-${month}-${day}`;

  if (!moment(isoDate, 'YYYY-MM-DD', true).isValid()) {
    return 'Date de naissance invalide';
  }

  return '';
};

export default validateDOB;
