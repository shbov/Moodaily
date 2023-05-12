import React from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {importAllRecordsFromJson} from '../../Actions/Record';
import {Colors, Style, StyleConstant} from '../../Styles/Style';
import {DocumentDirectoryPath, readFile} from 'react-native-fs';
import RNExitApp from 'react-native-exit-app';

type Props = {
  navigation: any;
  marginTop?: boolean;
};

interface State {}

export const FILE_NAME = 'moodaily-records-export.json';

export class ImportData extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {};
  }

  render() {
    const styles = ImportData.getStyles();
    return (
      <View style={styles.item}>
        <Text>Импорт данных</Text>
        <TouchableOpacity
          activeOpacity={StyleConstant.hover.opacity}
          onPress={() => this.onClick()}>
          <Text style={styles.btn}>Загрузить</Text>
        </TouchableOpacity>
      </View>
    );
  }

  public static getStyles() {
    return StyleSheet.create({
      item: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },

      btn: {
        ...Style.text,

        fontWeight: '500',
        fontSize: 16,
        lineHeight: 24,

        color: Colors.primary,
        alignSelf: 'flex-end',
      },

      border: {
        height: 1,
        backgroundColor: Colors.lightGrey,
      },
    });
  }

  async onClick() {
    const path = `${DocumentDirectoryPath}/${FILE_NAME}`;
    console.log(path);

    try {
      const content = await readFile(path, 'utf8');
      await importAllRecordsFromJson(content);

      Alert.alert(
        'Данные успешно загружены',
        'Сейчас приложение закроется, чтобы обновить данные. Пожалуйста, откройте его снова.',
        [
          {
            text: 'Ок',
            onPress: () => RNExitApp.exitApp(),
          },
        ],
        {cancelable: false},
      );
    } catch (error: any) {
      Alert.alert('Ошибка загрузки данных', error.message);
      console.error(error);
    }
  }
}
