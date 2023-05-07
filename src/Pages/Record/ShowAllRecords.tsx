import React, {Component} from 'react';
import {ActionSheetIOS, FlatList, StyleSheet, View} from 'react-native';

import Empty from '../../Components/Record/Empty';
import {Style, StyleConstant} from '../../Styles/Style';
import {Record} from '../../Types/Record';
import {deleteRecord, getAllRecords} from '../../Actions/Record';
import AllRecords from '../../Components/PageControls/AllRecords';
import {Single} from '../../Components/Record/Single';
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
    // await deleteAllRecords();
    // await generateFakeData();
    const records = await getAllRecords();
    this.setState({records: records, loading: false});
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
    const styles = StyleSheet.create({
      home: {
        flex: 1,
      },

      recordsList: {
        paddingHorizontal: Style.container.paddingHorizontal,
        paddingVertical: StyleConstant.paddingVertical,
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
          if (buttonIndex === 1) {
            this.props.navigation.navigate('CreateAndEdit', {
              recordID: recordTo,
            });
          } else if (buttonIndex === 2) {
            await this.deleteRecord(recordTo);
          }
        },
      );
    };

    function dateCompare(a: Record, b: Record) {
      return (
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    }

    return (
      <View style={styles.home}>
        {!this.state.loading && (
          <FlatList
            data={this.state.records.sort(dateCompare)}
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

        <AllRecords
          onClick={() => this.props.navigation.push('CreateAndEdit')}
          count={this.state.records.length ?? 0}
        />
      </View>
    );
  }

  async deleteRecord(recordTo: number) {
    await deleteRecord(recordTo);
    this.setState({records: await getAllRecords()});
  }
}
