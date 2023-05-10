import {Alert} from 'react-native';

/**
 * Подтверждение удаления записи
 * @param recordTo - id записи
 * @param deleteRecord - функция удаления записи
 */
export const confirmDelete = async (recordTo: number, deleteRecord: any) => {
  Alert.alert('Вы уверены, что хотите удалить запись?', '', [
    {
      text: 'Отменить',
      style: 'cancel',
      onPress: () => {},
    },
    {
      text: 'Удалить',
      style: 'destructive',
      onPress: async () => await deleteRecord(recordTo),
    },
  ]);
};
