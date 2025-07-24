import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import dayjsLocalizedFormat from 'dayjs/plugin/localizedFormat';
import dayjsUtc from 'dayjs/plugin/utc';

import { type DateFormats, dateFormats } from './types';

import 'dayjs/locale/en';
import 'dayjs/locale/sw';

/* Pluging config */
dayjs.extend(dayjsLocalizedFormat);
dayjs.extend(dayjsUtc);
dayjs.extend(advancedFormat);

/* Initialization */
export const initDateLocale = (locale: string) => dayjs.locale(locale);
export const getDateLocale = () => dayjs.locale();

/* Formatting */
export const formatDate = (date: dayjs.ConfigType, format: DateFormats, isUTC = true) => {
  if (!isUTC) return dayjs(date).format(dateFormats[format]);

  return dayjs.utc(date).format(dateFormats[format]);
};

/* Getters */
export const getDateInfo = ({
  date,
  informationToGet,
}: {
  date: dayjs.ConfigType;
  informationToGet: dayjs.UnitType;
}) => dayjs.utc(date).get(informationToGet);
