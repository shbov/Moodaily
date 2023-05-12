import React from 'react';
import {Alert, Text, TouchableOpacity, View} from 'react-native';
import {getRareRecords} from '../../Actions/Record';
import {StyleConstant} from '../../Styles/Style';
import {DocumentDirectoryPath, writeFile} from 'react-native-fs';
import {FILE_NAME, ImportData} from './ImportData';

type Props = {
  navigation: any;
};

interface State {}

export const BACKUP_FILE_NAME = 'moodaily-records-backup.json';

export class ExportData extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {};
  }

  render() {
    const styles = ImportData.getStyles();

    return (
      <View style={styles.item}>
        <Text>Экспорт данных</Text>
        <TouchableOpacity
          activeOpacity={StyleConstant.hover.opacity}
          onPress={() => ExportData.onClick()}>
          <Text style={styles.btn}>Выгрузить</Text>
        </TouchableOpacity>
      </View>
    );
  }

  public static async onClick(withAlert = true, filename = FILE_NAME) {
    const string = await getRareRecords();
    const path = `${DocumentDirectoryPath}/${filename}`;
    console.log(path);

    try {
      if (string === null) {
        if (withAlert) {
          Alert.alert('Нет данных для экспорта');
        }
        return;
      }

      await writeFile(path, string, 'utf8');
      if (withAlert) {
        Alert.alert('Данные успешно экспортированы');
      }
    } catch (error) {
      console.error(error);
    }
  }
}
