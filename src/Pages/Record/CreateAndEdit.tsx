import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Colors, Style, StyleConstant} from '../../Styles/Style';
import React, {Component} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Record} from '../../Types/Record';
import {formatDate} from '../../Functions/formatDate';
import {addRecord, getRecord} from '../../Actions/Record';
import {TransparentButton} from '../../Components/Buttons/TransparentButton';
import DatePicker from 'react-native-date-picker';
import {SaveRecord} from '../../Components/PageControls/SaveRecord';
import {
  CustomTextInput,
  ErrorStyles,
} from '../../Components/Custom/CustomTextInput';
import {Emotion, EmotionType} from '../../Types/Emotion';
import _ from 'lodash';
import CustomImage from '../../Components/Custom/CustomImage';

interface MyComponentState {
  record: Record;
  isLoading: boolean;
  openDateModal: boolean;
  selectedDate: Date;
  errors: ErrorList;
  isEdited: boolean;
  showMore: boolean;
}

type ErrorList = {
  [key: string]: string;
};

type Props = NativeStackScreenProps<any> & {};

export class CreateAndEdit extends Component<Props, MyComponentState> {
  private static MAX_EMOTION_COUNT = 6;

  constructor(props: Props) {
    super(props);

    this.state = {
      isLoading: true,
      selectedDate: new Date(),
      openDateModal: false,
      showMore: false,
      isEdited: true,
      errors: {},

      record: {
        id: -1,
        title: '',
        description: '',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        emotions: [],
      },
    };
  }

  async componentDidMount() {
    const recordID = this.props.route.params?.recordID;
    if (recordID) {
      const record = await getRecord(recordID);

      if (record) {
        this.setState({record: record, isEdited: false});
      }
    }

    this.setState({isLoading: false});
  }

  updateTitle = (text: string) => {
    if (this.state.record.title.trim() !== text) {
      this.setState({isEdited: true});
    }

    this.setState({
      record: {
        ...this.state.record,
        title: text,
      },
    });
  };

  updateDesc = (text: string) => {
    if (this.state.record.description.trim() !== text) {
      this.setState({isEdited: true});
    }

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

    const allEmotions = this.state.showMore
      ? Object.values(Emotion)
      : Object.values(Emotion).slice(0, CreateAndEdit.MAX_EMOTION_COUNT);
    const styles = this.getStyles();

    return (
      <View style={styles.wrapper}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <View style={styles.container}>
            <View style={styles.top}>
              <TouchableOpacity
                activeOpacity={StyleConstant.hover.opacity}
                style={styles.date}
                onPress={() => this.setState({openDateModal: true})}>
                <Text style={styles.created_at}>
                  {formatDate(this.state.record.created_at)}
                </Text>
                <Image
                  source={require('../../../assets/images/icon-edit.png')}
                  style={{width: 16, height: 16}}
                />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={StyleConstant.hover.opacity}
                onPress={() => this.props.navigation.navigate('AllEmotions')}>
                <Text style={styles.more}>Подробнее об эмоциях</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.emotions}>
              {allEmotions.map(emotion => (
                <TransparentButton
                  key={emotion.name}
                  onClick={() => this.addOrRemoveEmotion(emotion)}
                  source={emotion.source}
                  stylesContainer={{
                    opacity: this.getOpacity(emotion),
                  }}
                  stylesImage={{
                    width: StyleConstant.emotionSize * 1.1,
                    height: StyleConstant.emotionSize * 1.1,
                  }}
                />
              ))}
            </View>

            <TouchableOpacity
              activeOpacity={StyleConstant.hover.opacity}
              onPress={() =>
                this.setState({
                  showMore: !this.state.showMore,
                })
              }>
              {!this.state.showMore ? (
                <View style={styles.showMore}>
                  <Text style={styles.showMoreText}>Показать еще</Text>
                  <CustomImage
                    source={require('@assets/images/icon-arrow-down.png')}
                    width={16}
                  />
                </View>
              ) : (
                <View style={styles.showMore}>
                  <Text style={styles.showMoreText}>Скрыть</Text>
                  <CustomImage
                    source={require('@assets/images/icon-arrow-up.png')}
                    width={16}
                  />
                </View>
              )}
            </TouchableOpacity>

            {this.state.errors?.emotions && (
              <Text style={ErrorStyles.error}>
                {this.state.errors.emotions}
              </Text>
            )}

            <View
              style={{
                minHeight: Dimensions.get('window').height - 250,
              }}>
              <CustomTextInput
                titleStyle={styles.title}
                value={this.state.record.title}
                placeholder={'Заголовок'}
                onChangeText={this.updateTitle}
                error={this.state.errors.title}
                type="title"
              />

              <CustomTextInput
                titleStyle={styles.desc}
                value={this.state.record.description}
                placeholder={'Расскажи, что произошло за день'}
                onChangeText={this.updateDesc}
                error={this.state.errors.description}
                type="description"
                onFinish={() => this.saveRecord()}
              />
            </View>
          </View>
        </ScrollView>

        <DatePicker
          modal
          open={this.state.openDateModal}
          date={this.state.selectedDate}
          mode={'date'}
          locale={'ru'}
          maximumDate={new Date()}
          minimumDate={new Date(2003, 8, 2)}
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
          <SaveRecord
            onClick={() => this.saveRecord()}
            text={this.getTextLabel()}
          />
        </View>
      </View>
    );
  }

  private getStyles() {
    return StyleSheet.create({
      wrapper: {
        flex: 1,
      },

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
        columnGap: 4,
      },

      top: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
      },

      bottom: {
        ...Style.container,

        marginTop: 'auto',
        marginHorizontal: -1 * Style.container.paddingHorizontal,
      },

      date: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
      },

      more: {
        ...Style.text,

        fontWeight: '400',
        fontSize: 14,
        lineHeight: 17,

        color: Colors.dark,
        alignSelf: 'flex-end',
      },

      showMore: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: 4,
        marginTop: 4,
      },
      showMoreText: {
        ...Style.text,

        fontWeight: '400',
        fontSize: 14,
        lineHeight: 17,

        color: Colors.dark,
      },
    });
  }

  /**
   * Сохраняет запись, если поля заполнены
   */
  async saveRecord() {
    if (!this.checkIfRecordFieldsAreEmpty()) {
      return;
    }

    addRecord(this.state.record).then(() => {
      this.props.navigation.pop();
    });
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
      errors.title = 'Заголовок не может быть пустым';
    }

    // if (this.state.record.description === '') {
    //   console.log('desc is empty');
    //   errors.description = 'Описание не может быть пустым';
    // }

    if (this.state.record.emotions.length === 0) {
      errors.emotions = 'Добавьте хотя бы одну эмоцию';
    }

    this.setState({errors: errors});
    return Object.keys(errors).length === 0;
  }

  /**
   * Добавляет эмоцию в запись или удаляет её
   * @param emotion - эмоция, которую нужно добавить или удалить
   * @private - используется только в этом файле
   */
  private addOrRemoveEmotion(emotion: EmotionType) {
    let emotions = this.state.record.emotions;
    if (emotions.includes(emotion.name)) {
      emotions = emotions.filter(key => key !== emotion.name);
    } else {
      emotions.push(emotion.name);
    }

    this.setState({
      isEdited: true,
      record: {
        ...this.state.record,
        emotions: _.uniq(emotions),
      },
    });
  }

  private getOpacity(emotion: EmotionType): number {
    if (this.state.record.emotions.includes(emotion.name)) {
      return 1;
    }

    return 1 - StyleConstant.hover.opacity / 1.2;
  }

  private getTextLabel(): string {
    if (this.state.record.id === -1) {
      return 'Добавить';
    }

    return 'Сохранить';
  }
}
