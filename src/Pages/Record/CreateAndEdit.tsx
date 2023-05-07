import {
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {Colors, Style, StyleConstant} from '../../Styles/Style';
import React, {Component, useRef} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Record} from '../../Types/Record';
import {formatDate} from '../../Functions/formatDate';
import {addRecord, getFreeID, getRecord} from '../../Actions/Record';
import {TransparentButton} from '../../Components/Custom/TransparentButton';
import DatePicker from 'react-native-date-picker';
import {SaveRecord} from '../../Components/PageControls/SaveRecord';
import {
  CustomTextInput,
  ErrorStyles,
} from '../../Components/Custom/CustomTextInput';
import {Emotion, EmotionType} from '../../Types/Emotion';
import CustomImage from '../../Components/Custom/CustomImage';

interface MyComponentState {
  record: Record;
  isLoading: boolean;
  openDateModal: boolean;
  selectedDate: Date;
  errors: ErrorList;
}

type ErrorList = {
  [key: string]: string;
};

type Props = NativeStackScreenProps<any>;

export class CreateAndEdit extends Component<Props, MyComponentState> {
  titleRef: React.RefObject<any>;
  descRef: React.RefObject<any>;

  constructor(props: Props) {
    super(props);

    this.state = {
      isLoading: true,
      selectedDate: new Date(),
      openDateModal: false,
      errors: {},

      record: {
        id: 0,
        title: '',
        description: '',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        emotions: [],
      },
    };

    this.titleRef = React.createRef();
    this.descRef = React.createRef();
  }

  async componentDidMount() {
    const recordID = this.props.route.params?.recordID;
    if (recordID) {
      const record = await getRecord(recordID);

      if (record) {
        this.setState({record: record});
      }
    } else {
      this.setState({
        record: {
          ...this.state.record,
          id: await getFreeID(),
        },
      });
    }

    this.setState({isLoading: false});
  }

  updateTitle = (text: string) => {
    this.setState({
      record: {
        ...this.state.record,
        title: text,
      },
    });
  };

  updateDesc = (text: string) => {
    this.setState({
      record: {
        ...this.state.record,
        description: text,
      },
    });
  };

  render() {
    if (this.state.isLoading) {
      return null;
    }

    const styles = StyleSheet.create({
      container: {
        ...Style.container,
        flex: 1,
      },

      title: {
        ...Style.text,
        fontWeight: '600',
        fontSize: 24,
        lineHeight: 32,

        color: Colors.dark,
        marginTop: 16,
      },

      desc: {
        ...Style.text,
        fontWeight: '400',
        fontSize: 16,
        lineHeight: 24,

        color: Colors.dark,
        marginTop: 24,
      },

      created_at: {
        ...Style.text,

        fontWeight: '400',
        fontSize: 16,
        lineHeight: 24,
        color: Colors.tertiary,
      },

      emotions: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        rowGap: 16,
        columnGap: 8,
      },

      top: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginBottom: 16,
      },

      bottom: {
        marginTop: 'auto',
        marginHorizontal: -1 * Style.container.paddingHorizontal,
      },
    });

    const handleTitleSubmit = () => {
      this.descRef.current.focus();
    };

    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.top}>
            <Text style={styles.created_at}>
              {formatDate(this.state.record.created_at)}
            </Text>
            <TransparentButton
              source={require('../../../assets/images/icon-edit.png')}
              onClick={() => this.setState({openDateModal: true})}
              stylesContainer={{padding: 4}}
              stylesImage={{width: 16, height: 16}}
            />
          </View>

          <View style={styles.emotions}>
            {Object.values(Emotion).map(emotion => (
              <TransparentButton
                key={emotion.name}
                onClick={() => this.addEmotion(emotion)}
                source={emotion.source}
                stylesContainer={{
                  opacity: this.getOpacity(emotion),
                }}
                stylesImage={{
                  width: 48,
                  height: 48,
                }}
              />
            ))}
          </View>

          {this.state.errors?.emotions && (
            <Text style={ErrorStyles.error}>{this.state.errors.emotions}</Text>
          )}

          <CustomTextInput
            titleStyle={styles.title}
            value={this.state.record.title}
            placeholder={'Заголовок'}
            onChangeText={this.updateTitle}
            error={this.state.errors.title}
            refName={this.titleRef}
            onSubmitEditing={handleTitleSubmit}
          />

          <CustomTextInput
            titleStyle={styles.desc}
            value={this.state.record.description}
            placeholder={'Расскажи, что произошло сегодня'}
            onChangeText={this.updateDesc}
            error={this.state.errors.description}
            refName={this.descRef}
            onSubmitEditing={() => this.saveRecord()}
          />
        </ScrollView>

        <DatePicker
          modal
          open={this.state.openDateModal}
          date={this.state.selectedDate}
          mode={'date'}
          locale={'ru'}
          onConfirm={date => {
            this.setState({
              openDateModal: false,
              record: {
                ...this.state.record,
                created_at: date.toISOString(),
              },
            });
          }}
          onCancel={() => {
            this.setState({openDateModal: false});
          }}
        />

        <View style={styles.bottom}>
          <SaveRecord onClick={() => this.saveRecord()} />
        </View>
      </View>
    );
  }

  saveRecord() {
    if (!this.checkIfRecordFieldsAreEmpty()) {
      return;
    }

    addRecord(this.state.record).then(() => {
      this.props.navigation.replace('ShowRecord', {
        recordID: this.state.record.id,
      });
    });
  }

  static isWhitespace(str: string) {
    return /^\s*$/.test(str);
  }

  /*
   * Проверяет, заполнены ли поля записи
   * Если поля не заполнены, то добавляет ошибку в state
   * Возвращает true, если поля заполнены
   */
  private checkIfRecordFieldsAreEmpty(): boolean {
    let errors: ErrorList = {};
    this.state.record.title = this.state.record.title.trim();
    this.state.record.description = this.state.record.description.trim();

    if (this.state.record.title === '') {
      console.log('title is empty');
      errors.title = 'Заголовок не может быть пустым';
    }

    // if (this.state.record.description === '') {
    //   console.log('desc is empty');
    //   errors.description = 'Описание не может быть пустым';
    // }

    if (this.state.record.emotions.length === 0) {
      console.log('emotions is empty');
      errors.emotions = 'Добавьте хотя бы одну эмоцию';
    }

    this.setState({errors: errors});
    return Object.keys(errors).length === 0;
  }

  private addEmotion(emotion: EmotionType) {
    let emotions = this.state.record.emotions;
    if (emotions.includes(emotion)) {
      emotions = emotions.filter(e => e !== emotion);
    } else {
      emotions.push(emotion);
    }

    this.setState({
      record: {
        ...this.state.record,
        emotions: emotions,
      },
    });
  }

  private getOpacity(emotion: EmotionType): number {
    const em = this.state.record.emotions.find(e => e.name === emotion.name);
    if (em) {
      return 1;
    }

    return 0.3;
  }
}
