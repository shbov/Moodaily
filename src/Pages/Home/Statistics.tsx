import _ from 'lodash';
import React from 'react';

import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Colors, Style, StyleConstant} from '../../Styles/Style';
import {getAllRecords, getRecordsForStats} from '../../Actions/Record';
import Empty from '../../Components/Record/Empty';
import CustomImage from '../../Components/Custom/CustomImage';
import {Record} from '../../Types/Record';
import {StatisticsModal} from '../../Components/Modals/StatisticsModal';
import {MonthItem} from '../../Components/Statistics/MonthItem';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<any> & {};

interface MyComponentState {
  records: any[];
  year: number;
  loading: boolean;
  openDateModal: boolean;
  years: any[];
}

export class Statistics extends React.Component<Props, MyComponentState> {
  focusSubscription: Function = () => {};

  constructor(props: Props) {
    super(props);

    this.state = {
      records: [],
      year: new Date().getFullYear(),
      loading: true,
      openDateModal: false,
      years: [],
    };
  }

  async componentDidMount() {
    await this.loadAllData();

    this.focusSubscription = this.props.navigation.addListener(
      'focus',
      async () => {
        await this.loadAllData();
      },
    );
  }

  private async loadAllData() {
    const allRecords = await getAllRecords();
    const records = await getRecordsForStats(this.state.year, allRecords);

    this.setAllYears(allRecords);
    this.setState({
      records: records,
      loading: false,
    });
  }

  async componentDidUpdate(
    prevProps: Readonly<Props>,
    prevState: Readonly<MyComponentState>,
  ) {
    if (this.state.year !== prevState.year) {
      this.setState({
        records: await getRecordsForStats(
          this.state.year,
          await getAllRecords(),
        ),
      });
    }
  }

  componentWillUnmount() {
    this.focusSubscription();
  }

  render() {
    if (this.state.loading) {
      return null;
    }

    const styles = this.getStyles();
    return (
      <View style={styles.container}>
        <View style={styles.top}>
          <TouchableOpacity
            style={styles.background}
            activeOpacity={StyleConstant.hover.opacity}
            onPress={() =>
              this.setState({openDateModal: !this.state.openDateModal})
            }>
            <CustomImage
              source={require('@assets/images/icon-calendar.png')}
              width={16}
            />

            <Text style={styles.year}>{this.state.year}</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={this.state.records}
          renderItem={item => <MonthItem item={item} />}
          ListEmptyComponent={
            <Empty
              desc="Пока недостаточно данных, чтобы показать статистику"
              label="Недостаточно данных"
            />
          }
          ItemSeparatorComponent={() => (
            <View
              style={{
                height: 16,
                width: '100%',
              }}
            />
          )}
        />

        <StatisticsModal
          visible={this.state.openDateModal}
          onExit={year => this.saveYear(year)}
          years={this.state.years}
        />
      </View>
    );
  }

  private setAllYears(allRecords: Record[]) {
    let index = 0;

    const years = Array.from(
      _.uniqBy(
        allRecords.map(record => {
          return {
            label: new Date(record.created_at).getFullYear().toString(),
            key: index++,
          };
        }),
        'label',
      ),
    );

    if (years.length === 0) {
      years.push({
        label: '2023',
        key: 0,
      });
    }

    this.setState({
      years: _.sortBy(years, 'label').reverse(),
    });
  }

  private getStyles() {
    return StyleSheet.create({
      container: {
        ...Style.container,
        flex: 1,
      },

      top: {
        marginBottom: 24,
        alignItems: 'flex-start',
      },

      background: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        padding: 8,
        backgroundColor: Colors.backgroundAccent,
        borderRadius: Style.button.borderRadius,
      },

      year: {
        ...Style.text,
        fontWeight: '500',
        fontSize: 14,
        lineHeight: 20,
      },
    });
  }

  private saveYear(year: number) {
    this.setState({
      openDateModal: false,
      year: year,
    });
  }
}
