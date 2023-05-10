import format from 'date-fns/format';
import ruLocale from 'date-fns/locale/ru';
import {parseISO} from 'date-fns';

/**
 * Форматирует дату в формате ISO
 * @param date - дата
 */
export const formatDate = (date: string) => {
  return format(parseISO(date), 'dd MMMM yyyy г.', {
    locale: ruLocale,
  });
};
