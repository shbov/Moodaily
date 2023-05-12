import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Colors, Style} from '../../Styles/Style';
import {getAllSettings} from '../../Actions/Settings';
import {Setting} from '../../Types/Setting';
import {FaceID} from '../../Components/Settings/FaceID';
import {ExportData} from '../../Components/Settings/ExportData';
import {ImportData} from '../../Components/Settings/ImportData';
import {Notify} from '../../Components/Settings/Notifications';

type Props = NativeStackScreenProps<any> & {};

interface State {
  settings: Setting[];
}

export class Settings extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      settings: [],
    };
  }

  async componentDidMount() {
    this.setState({
      settings: await getAllSettings(),
    });
  }

  render() {
    const styles = this.getStyles();
    const Divider = () => <View style={styles.divider} />;

    const data = [
      {
        title: 'Данные',
        data: [
          <ExportData navigation={this.props.navigation} />,
          <Divider />,
          <ImportData navigation={this.props.navigation} marginTop={true} />,
        ],
      },
      {
        title: 'Кастомизация',
        data: [<Notify />],
      },
      {
        title: 'Безопасность',
        data: [<FaceID />],
      },
    ];

    return (
      <ScrollView style={styles.container}>
        {data.map((group, index) => (
          <View key={group.title}>
            <Text style={styles.header}>{group.title}</Text>
            <View style={styles.item}>
              {group.data.map((setting, key) => (
                <View key={index + key}>{setting}</View>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    );
  }

  getStyles() {
    return StyleSheet.create({
      container: {
        ...Style.container,
        flex: 1,
      },

      item: {
        ...Style.item,
        ...Style.shadow,

        backgroundColor: Colors.white,
        borderRadius: Style.button.borderRadius,
        marginBottom: 16,
      },

      title: {
        fontWeight: '400',
        fontSize: 16,
        lineHeight: 19,

        color: Colors.dark,
      },

      header: {
        fontWeight: '500',
        fontSize: 19,
        lineHeight: 24,

        color: Colors.danger,
        marginBottom: 8,
      },

      switch: {},
      divider: {
        height: 1,
        backgroundColor: Colors.lightGrey,
        marginVertical: 8,
        marginHorizontal: -1 * Style.item.paddingHorizontal,
      },
    });
  }
}
