import { formatRelative, parseISO, isValid } from 'date-fns';
import locale from 'date-fns/esm/locale/pt-BR';

const timeAgo = (date: string) => {
  if (!isValid(parseISO(date))) {
    return '';
  }

  const now = new Date();

  const formatted = formatRelative(parseISO(date), now, { locale });

  return formatted;
};

export default timeAgo;
