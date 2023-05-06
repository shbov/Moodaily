import React, {Component} from 'react';
import {ActionSheetIOS, FlatList, StyleSheet, View} from 'react-native';

import Empty from '../../Components/Record/Empty';
import {Style} from '../../Styles/Style';
import {Record} from '../../Types/Record';
import {
  deleteAllRecords,
  deleteRecord,
  getAllRecords,
} from '../../Actions/Record';
import PageControl from '../../Components/PageControl';
import {Single} from '../../Components/Record/Single';
import {fakeDate} from '../../Actions/CreateFakeData';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

interface MyComponentState {
  records: Record[];
  loading: boolean;
}

type Props = NativeStackScreenProps<any>;

export class ShowAllRecords extends Component<Props, MyComponentState> {
  constructor(props: Props) {
    super(props);

    this.state = {
      records: [],
      loading: true,
    };
  }

  focusSubscription: Function = () => {};

  async componentDidMount() {
    await deleteAllRecords();
    await fakeDate();
    this.setState({records: await getAllRecords(), loading: false});
    this.focusSubscription = this.props.navigation.addListener(
      'focus',
      async () => {
        this.setState({records: await getAllRecords()});
      },
    );
  }

  componentWillUnmount() {
    this.focusSubscription();
  }

  render() {
    const click = () => {
      this.props.navigation.push('AddNewRecord');
    };

    const styles = StyleSheet.create({
      home: {
        flex: 1,
      },

      recordsList: {
        paddingHorizontal: Style.container.paddingHorizontal,
        paddingVertical: 24,
      },
    });

    const onClick = (recordTo: number) => {
      return ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['Назад', 'Редактировать', 'Удалить'],
          destructiveButtonIndex: 2,
          cancelButtonIndex: 0,
        },
        async buttonIndex => {
          if (buttonIndex === 0) {
            console.log('cancel');
          } else if (buttonIndex === 1) {
            console.log('edit');
          } else if (buttonIndex === 2) {
            await this.deleteRecord(recordTo);
          }
        },
      );
    };

    return (
      <View style={styles.home}>
        {!this.state.loading && (
          <FlatList
            data={this.state.records}
            contentContainerStyle={styles.recordsList}
            ListEmptyComponent={<Empty />}
            ItemSeparatorComponent={() => (
              <View
                style={{
                  height: 8,
                  width: '100%',
                }}
              />
            )}
            renderItem={record => (
              <Single
                record={record.item}
                key={record.item.id}
                navigation={this.props.navigation}
                onClick={() => onClick(record.item.id)}
              />
            )}
          />
        )}

        <PageControl onClick={click} count={this.state.records.length ?? 0} />
      </View>
    );
  }

  async deleteRecord(recordTo: number) {
    await deleteRecord(recordTo);
    this.setState({records: await getAllRecords()});
  }
}
