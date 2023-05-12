import _ from 'lodash';
import {Record} from '../Types/Record';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {parseISO} from 'date-fns';
import format from 'date-fns/format';
import {BACKUP_FILE_NAME, ExportData} from '../Components/Settings/ExportData';
import {getMonthByDate} from '../Functions/getMonthByDate';
import {getDataForWidget} from '../Functions/getDataForWidget';

export const RECORDS_KEY = 'records';

/**
 * Добавляет запись в хранилище
 * @param record - запись
 */
export const addRecord = async (record: Record) => {
  try {
    const storedRecords = await AsyncStorage.getItem(RECORDS_KEY);
    const records = storedRecords ? JSON.parse(storedRecords) : {};

    // если id = -1, то это новая запись, иначе - редактирование
    if (record.id === -1) {
      record.id = await getFreeID();
    }

    record.updated_at = new Date().toISOString();
    records[record.id] = record;
    await AsyncStorage.setItem(RECORDS_KEY, JSON.stringify(records));
    await getDataForWidget();
  } catch (error) {
    console.error(error);
  }
};

/**
 * Возвращает массив записей
 */
async function getRecordsArray(): Promise<Record[]> {
  const storedRecords = await AsyncStorage.getItem(RECORDS_KEY);
  const records = storedRecords ? JSON.parse(storedRecords) : {};
  return Object.values(records);
}

export async function getRareRecords() {
  return await AsyncStorage.getItem(RECORDS_KEY);
}

/**
 * Возвращает запись по id
 * @param id - id записи
 */
export const getRecord = async (id: number): Promise<Record | undefined> => {
  try {
    const recordsArray = await getRecordsArray();
    return recordsArray.find(record => record.id === id);
  } catch (error) {
    console.error(error);
  }
};

/**
 * Удаляет запись по id
 * @param id - id записи
 */
export const deleteRecord = async (id: number) => {
  try {
    const storedRecords = await AsyncStorage.getItem(RECORDS_KEY);
    const records = storedRecords ? JSON.parse(storedRecords) : {};
    delete records[id];
    await AsyncStorage.setItem(RECORDS_KEY, JSON.stringify(records));
  } catch (error) {
    console.error(error);
  }
};

/**
 * Возвращает все записи
 */
export const getAllRecords = async (): Promise<Record[]> => {
  console.log('loading data...');

  try {
    const records = await getRecordsArray();
    await getDataForWidget(records);
    return records;
  } catch (error) {
    console.error(error);
    return [];
  }
};

/**
 * Удаляет все записи
 */
export const deleteAllRecords = async () => {
  try {
    await AsyncStorage.removeItem(RECORDS_KEY);
  } catch (error) {
    console.error(error);
  }
};

/**
 * Возвращает свободный id для новой записи
 */
export const getFreeID = async () => {
  const records = await getAllRecords();
  if (records.length === 0) {
    return 1;
  }

  const ids = records.map(record => record.id);
  const maxId = Math.max(...ids);
  return maxId + 1;
};

/**
 * Возвращает записи для статистики
 * @param year - год
 * @param allRecords - все записи
 */
export const getRecordsForStats = async (
  year: number,
  allRecords: Record[],
): Promise<any[]> => {
  // фильтруем записи по году
  const records = _.filter(
    allRecords,
    item => Number(parseISO(item.created_at).getFullYear()) === Number(year),
  );

  // группируем записи по месяцам
  const recordsByMonth = _.groupBy(records, record => {
    return format(parseISO(record.created_at), 'MM-yyyy');
  });

  const list = Object.values(
    _.mapValues(recordsByMonth, recordsInMonth => {
      const emotionCounts = _.countBy(_.flatMap(recordsInMonth, 'emotions'));
      const totalEmotions = _.sum(_.values(emotionCounts));

      // сортируем по убыванию и берем первые 5
      const topEmotions = _.chain(emotionCounts)
        .toPairs()
        .sortBy(pair => pair[1])
        .reverse()
        .take(5)
        .value()
        .map(([emotion, count]) => {
          return {
            emotion: emotion,
            count: count,
            percentage: Math.floor((count / totalEmotions) * 100),
          };
        });

      return {
        month: parseISO(recordsInMonth[0].created_at).getMonth(),
        year: parseISO(recordsInMonth[0].created_at).getFullYear(),
        emotions: topEmotions,
      };
    }),
  );

  // сортируем по убыванию
  return _.orderBy(list, ['year', 'month']).reverse();
};

export const importAllRecordsFromJson = async (json: string) => {
  await ExportData.onClick(false, BACKUP_FILE_NAME);

  try {
    await deleteAllRecords();
    await AsyncStorage.setItem(RECORDS_KEY, json);
  } catch (error) {
    console.error(error);
  }
};

export const getRecordsForWidgetStats = async (
  allRecords: Record[],
): Promise<{month: string; year: number; emotions: any}> => {
  const currentDate = new Date();
  const records = await getRecordsForStats(
    currentDate.getFullYear(),
    allRecords,
  );

  const month = records.find(item => {
    return (
      item.year === currentDate.getFullYear() &&
      item.month === currentDate.getMonth()
    );
  });

  if (!month) {
    return {
      month: getMonthByDate(currentDate.getMonth()),
      year: currentDate.getFullYear(),
      emotions: [],
    };
  }

  month.month = getMonthByDate(currentDate.getMonth());
  return month;
};
