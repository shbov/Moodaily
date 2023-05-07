import {Record} from '../Types/Record';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Emotion, EmotionType} from '../Types/Emotion';

export const RECORDS_KEY = 'records';

export const addRecord = async (record: Record) => {
  try {
    const storedRecords = await AsyncStorage.getItem(RECORDS_KEY);
    const records = storedRecords ? JSON.parse(storedRecords) : {};

    record.updated_at = new Date().toISOString();
    records[record.id] = record;

    await AsyncStorage.setItem(RECORDS_KEY, JSON.stringify(records));
  } catch (error) {
    console.error(error);
  }
};

async function getRecordsArray() {
  const storedRecords = await AsyncStorage.getItem(RECORDS_KEY);
  const records = storedRecords ? JSON.parse(storedRecords) : {};
  const recordsArray: Record[] = Object.values(records);
  resolveEmotions(recordsArray);
  return recordsArray;
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

const resolveEmotions = (recordsArray: Record[]) => {
  recordsArray.forEach(record => {
    record.emotions = record.emotions.map(emotion => {
      const realEmotion = Object.values(Emotion).find(
        (em: EmotionType) => em.name === emotion.name,
      );

      return {
        name: realEmotion?.name ?? emotion.name,
        source: realEmotion?.source ?? emotion.source,
      };
    });
  });
};

export const getAllRecords = async (): Promise<Record[]> => {
  console.log('loading data...');

  try {
    const recordsArray = await getRecordsArray();
    resolveEmotions(recordsArray);
    return recordsArray;
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
