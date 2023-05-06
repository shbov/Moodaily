import React from 'react';
import {Record} from '../../Types/Record';
import {deleteRecord, getRecord} from '../../Actions/Record';
import {RecordNotFound} from '../../Components/Record/RecordNotFound';
import {ActionSheetIOS, StyleSheet, Text, View} from 'react-native';
import CustomImage from '../../Components/CustomImage';
import {Colors, Style} from '../../Styles/Style';

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

  async deleteRecord(recordTo: number) {
    await deleteRecord(recordTo);
    this.props.navigation.navigate('ShowAllRecords');
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
        marginBottom: 32,
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
    });

    const onClick = (recordTo: number) => {
      return ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['Назад', 'Удалить'],
          destructiveButtonIndex: 1,
          cancelButtonIndex: 0,
        },
        async buttonIndex => {
          if (buttonIndex === 0) {
            console.log('cancel');
          } else if (buttonIndex === 1) {
            await this.deleteRecord(recordTo);
          }
        },
      );
    };

    return (
      <View style={styles.container}>
        <View style={styles.emotions}>
          {this.state.record.emotions.map(emotion => (
            <CustomImage
              source={emotion.source}
              width={48}
              key={emotion.name}
            />
          ))}
        </View>

        <Text style={styles.title}>{this.state.record.title}</Text>

        {/*<ReadMore*/}
        {/*  numberOfLines={3}*/}
        {/*  renderTruncatedFooter={_renderTruncatedFooter}*/}
        {/*  renderRevealedFooter={_renderRevealedFooter}>*/}
        {/*  <Text style={styles.desc}>{props.record.description}</Text>*/}
        {/*</ReadMore>*/}

        <Text style={styles.desc}>{this.state.record.description}</Text>
      </View>
    );
  }
}
