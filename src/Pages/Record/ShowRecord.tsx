import React from 'react';
import {Record} from '../../Types/Record';
import {deleteRecord, getRecord} from '../../Actions/Record';
import {RecordNotFound} from '../../Components/Record/RecordNotFound';
import {ActionSheetIOS, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Colors, Style} from '../../Styles/Style';
import {formatDate} from '../../Functions/formatDate';

import {EmotionImage} from '../../Components/Custom/EmotionImage';

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
          navigation.replace('CreateAndEdit', {
            recordID: recordTo,
          });
        } else if (buttonIndex === 2) {
          await deleteRecord(recordTo);
          navigation.navigate('Home');
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

    const styles = StyleSheet.create({
      container: {
        ...Style.container,
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
        gap: 4,
        alignItems: 'center',
        marginBottom: 16,
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

    return (
      <ScrollView style={styles.container}>
        <Text style={styles.created_at}>
          {formatDate(this.state.record.created_at)}
        </Text>

        {this.state.record.emotions.length > 0 && (
          <View style={styles.emotions}>
            {this.state.record.emotions.map(emotion => (
              <EmotionImage emotion={emotion} key={emotion.name} />
            ))}
          </View>
        )}

        <Text style={styles.title}>{this.state.record.title}</Text>
        <Text style={styles.desc}>{this.state.record.description}</Text>
      </ScrollView>
    );
  }
}
