import React from 'react';
import {Record} from '../../Types/Record';
import {deleteRecord, getAllRecords, getRecord} from '../../Actions/Record';
import {RecordNotFound} from '../../Components/Record/RecordNotFound';
import {ActionSheetIOS, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Colors, Style, StyleConstant} from '../../Styles/Style';
import {formatDate} from '../../Functions/formatDate';

import {EmotionImage} from '../../Components/Custom/EmotionImage';
import {confirmDelete} from '../../Actions/confirmDelete';

interface MyComponentState {
  record: Record | undefined;
  loading: boolean;
}

interface Props {
  recordID: number;
  navigation: any;
  route: any;
}

export class ShowRecord extends React.Component<Props, MyComponentState> {
  focusSubscription: Function = () => {};

  constructor(props: Props) {
    super(props);

    this.state = {
      record: undefined,
      loading: true,
    };
  }

  async componentDidMount() {
    const recordID = this.props.route.params.recordID;
    this.setState({
      record: await getRecord(recordID),
      loading: false,
    });

    this.focusSubscription = this.props.navigation.addListener('focus', () => {
      if (this.state.record && this.state.record?.id !== -1) {
        getRecord(this.state.record.id).then(record =>
          this.setState({record: record}),
        );
      }
    });
  }

  componentWillUnmount() {
    this.focusSubscription();
  }

  public static onClick(recordTo: number, navigation: any) {
    return ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Назад', 'Редактировать', 'Удалить'],
        destructiveButtonIndex: 2,
        cancelButtonIndex: 0,
      },
      async buttonIndex => {
        if (buttonIndex === 1) {
          navigation.navigate('CreateAndEdit', {
            recordID: recordTo,
          });
        } else if (buttonIndex === 2) {
          await confirmDelete(recordTo, async (toDelete: number) => {
            await deleteRecord(toDelete);
            navigation.navigate('ShowAllRecords', {
              records: await getAllRecords(),
            });
          });
        }
      },
    );
  }

  render() {
    if (this.state.loading) {
      return null;
    }

    if (!this.state.record) {
      return <RecordNotFound />;
    }

    const styles = this.getStyles();

    return (
      <ScrollView style={styles.container}>
        <View style={styles.wrapper}>
          <Text style={styles.created_at}>
            {formatDate(this.state.record.created_at)}
          </Text>

          {this.state.record.emotions.length > 0 && (
            <View style={styles.emotions}>
              {this.state.record.emotions.map(emotion => (
                <EmotionImage key={emotion} name={emotion} />
              ))}
            </View>
          )}

          <Text style={styles.title}>{this.state.record.title}</Text>
          <Text style={styles.desc}>{this.state.record.description}</Text>
        </View>
      </ScrollView>
    );
  }

  private getStyles() {
    return StyleSheet.create({
      container: {
        ...Style.container,
      },

      wrapper: {
        paddingBottom: StyleConstant.paddingVertical * 2,
      },

      title: {
        ...Style.text,
        fontWeight: '600',
        fontSize: 24,
        lineHeight: 32,

        color: Colors.dark,
        marginBottom: 24,
      },

      desc: {
        ...Style.text,
        fontWeight: '400',
        fontSize: 16,
        lineHeight: 24,

        color: Colors.dark,
      },

      emotions: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        marginBottom: 16,
        gap: 4,
      },

      created_at: {
        ...Style.text,

        fontWeight: '400',
        fontSize: 16,
        lineHeight: 24,
        color: Colors.tertiary,
        marginBottom: 16,
      },
    });
  }
}
