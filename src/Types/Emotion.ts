import {ImageSourcePropType} from 'react-native';

export const Emotion = {
  // Страх
  anxious: {
    name: 'Тревожный',
    source: require('@assets/emotions/anxious.png'),
  },

  // Интерес
  exited: {
    name: 'Взволнованный',
    source: require('@assets/emotions/excited.png'),
  },
  inspired: {
    name: 'Вдохновленный',
    source: require('@assets/emotions/inspired.png'),
  },
  boring: {
    name: 'Скучный',
    source: require('@assets/emotions/boring.png'),
  },

  // Радость
  happy: {
    name: 'Счастливый',
    source: require('@assets/emotions/happy.png'),
  },
  joyful: {
    name: 'Радостный',
    source: require('@assets/emotions/joyful.png'),
  },
  peace: {
    name: 'Спокойный',
    source: require('@assets/emotions/peace.png'),
  },

  // Грусть
  apathetic: {
    name: 'Апатичный',
    source: require('@assets/emotions/apathetic.png'),
  },
  grieving: {
    name: 'Горюющий',
    source: require('@assets/emotions/grief.png'),
  },
  tearfulness: {
    name: 'Плаксивый',
    source: require('@assets/emotions/tearfulness.png'),
  },

  // Злость
  angry: {
    name: 'Злой',
    source: require('@assets/emotions/anger.png'),
  },
  offense: {
    name: 'Обиженный',
    source: require('@assets/emotions/offense.png'),
  },
};

export type EmotionType = {
  name: string;
  source: ImageSourcePropType;
};
