import {Record} from '../Types/Record';
import AsyncStorage from '@react-native-async-storage/async-storage';
import _ from 'lodash';
import {parseISO} from 'date-fns';
import format from 'date-fns/format';

export const RECORDS_KEY = 'records';

export const addRecord = async (record: Record) => {
  try {
    const storedRecords = await AsyncStorage.getItem(RECORDS_KEY);
    const records = storedRecords ? JSON.parse(storedRecords) : {};
    if (record.id === -1) {
      record.id = await getFreeID();
    }

    record.updated_at = new Date().toISOString();
    records[record.id] = record;
    await AsyncStorage.setItem(RECORDS_KEY, JSON.stringify(records));
  } catch (error) {
    console.error(error);
  }
};

async function getRecordsArray(): Promise<Record[]> {
  const storedRecords = await AsyncStorage.getItem(RECORDS_KEY);
  const records = storedRecords ? JSON.parse(storedRecords) : {};
  return Object.values(records);
}

export const getRecord = async (id: number): Promise<Record | undefined> => {
  try {
    const recordsArray = await getRecordsArray();
    return recordsArray.find(record => record.id === id);
  } catch (error) {
    console.error(error);
  }
};

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

export const getAllRecords = async (): Promise<Record[]> => {
  console.log('loading data...');

  try {
    return await getRecordsArray();
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const deleteAllRecords = async () => {
  try {
    await AsyncStorage.removeItem(RECORDS_KEY);
  } catch (error) {
    console.error(error);
  }
};

export const getFreeID = async () => {
  const records = await getAllRecords();
  if (records.length === 0) {
    return 1;
  }

  const ids = records.map(record => record.id);
  const maxId = Math.max(...ids);
  return maxId + 1;
};

export const getRecordsForStats = async (
  year: number,
  allRecords: Record[],
): Promise<any[]> => {
  const records = _.filter(
    allRecords,
    item => Number(parseISO(item.created_at).getFullYear()) === Number(year),
  );

  const recordsByMonth = _.groupBy(records, record => {
    return format(parseISO(record.created_at), 'MM-yyyy');
  });

  const list = Object.values(
    _.mapValues(recordsByMonth, recordsInMonth => {
      const emotionCounts = _.countBy(_.flatMap(recordsInMonth, 'emotions'));
      const totalEmotions = _.sum(_.values(emotionCounts));

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

  return _.orderBy(list, ['year', 'month']).reverse();
};
