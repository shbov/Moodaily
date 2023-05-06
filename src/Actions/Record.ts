import {Record} from '../Types/Record';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const RECORDS_KEY = 'records';

export const addRecord = async (record: Record) => {
  try {
    const storedRecords = await AsyncStorage.getItem(RECORDS_KEY);
    const records = storedRecords ? JSON.parse(storedRecords) : {};

    record.created_at = new Date().toISOString();
    record.updated_at = new Date().toISOString();
    records[record.id] = record;

    await AsyncStorage.setItem(RECORDS_KEY, JSON.stringify(records));
  } catch (error) {
    console.error(error);
  }
};

export const getRecord = async (id: number): Promise<Record | undefined> => {
  try {
    const storedRecords = await AsyncStorage.getItem(RECORDS_KEY);
    const records = storedRecords ? JSON.parse(storedRecords) : {};
    return records[id];
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
    const storedRecords = await AsyncStorage.getItem(RECORDS_KEY);
    const records = storedRecords ? JSON.parse(storedRecords) : {};
    return Object.values(records);
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
