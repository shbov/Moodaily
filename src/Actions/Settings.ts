import AsyncStorage from '@react-native-async-storage/async-storage';
import {Setting} from '../Types/Setting';

// ключ для хранения настроек
export const SETTINGS_KEY: string = 'settings';

/**
 * Удаляет все настройки
 */
export const deleteAllSettings = async () => {
  try {
    await AsyncStorage.removeItem(SETTINGS_KEY);
  } catch (error) {
    console.error(error);
  }
};

/**
 * Возвращает все настройки
 */
export const getAllSettings = async (): Promise<Setting[]> => {
  console.log('loading settings...');

  try {
    const stored = await AsyncStorage.getItem(SETTINGS_KEY);
    const settings = stored ? JSON.parse(stored) : {};

    return Object.values(settings);
  } catch (error) {
    console.error(error);
    return [];
  }
};

/**
 * Возвращает настройку по key
 * @param key - ключ настройки
 */
export const getSettingsValueById = async (key: string) => {
  try {
    const settings = await getAllSettings();
    return settings.find(setting => setting.name === key);
  } catch (error) {
    console.error(error);
  }

  return undefined;
};

/**
 * Обновляет настройку
 * @param setting - настройка
 */
export const updateSetting = async (setting: Setting) => {
  try {
    const storedSettings = await AsyncStorage.getItem(SETTINGS_KEY);
    const settings = storedSettings ? JSON.parse(storedSettings) : {};
    settings[setting.name] = setting;

    await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (error) {
    console.error(error);
  }
};
