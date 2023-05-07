import {ImageSourcePropType} from 'react-native';

export const Emotion = {
  happy: {
    name: 'Счастливый',
    source: require('../../assets/emotions/happy.png'),
  },
  joyful: {
    name: 'Радостный',
    source: require('../../assets/emotions/joyful.png'),
  },

  exited: {
    name: 'Взволнованный',
    source: require('../../assets/emotions/excited.png'),
  },

  chill: {
    name: 'Расслабленный',
    source: require('../../assets/emotions/chill.png'),
  },

  confused: {
    name: 'Запутанный',
    source: require('../../assets/emotions/confused.png'),
  },
  concerned: {
    name: 'Обеспокоенный',
    source: require('../../assets/emotions/concerned.png'),
  },
  apathetic: {
    name: 'Апатичный',
    source: require('../../assets/emotions/apathetic.png'),
  },

  angry: {
    name: 'Злой',
    source: require('../../assets/emotions/anger.png'),
  },

  anxious: {
    name: 'Тревожный',
    source: require('../../assets/emotions/anxious.png'),
  },
};

export type EmotionType = {
  name: string;
  source: ImageSourcePropType;
};
//
// export interface IEmotionRecord {
//   [key: string]: EmotionType;
// }
