import {ImageSourcePropType} from 'react-native';

/**
 * Доступные эмоции
 */
export const Emotion: EmotionInterface = {
  // Интерес
  excited: {
    name: 'Взволнованность',
    source: require('@assets/emotions/excited.png'),
  },
  inspired: {
    name: 'Вдохновленность',
    source: require('@assets/emotions/inspired.png'),
  },
  surprized: {
    name: 'Удивление',
    source: require('@assets/emotions/surprized.png'),
  },
  boring: {
    name: 'Скука',
    source: require('@assets/emotions/boring.png'),
  },

  // Радость
  happy: {
    name: 'Счастье',
    source: require('@assets/emotions/happy.png'),
  },
  joyful: {
    name: 'Радость',
    source: require('@assets/emotions/joyful.png'),
  },
  peace: {
    name: 'Покой',
    source: require('@assets/emotions/peace.png'),
  },
  safety: {
    name: 'Безопасность',
    source: require('@assets/emotions/safety.png'),
  },

  // Грусть
  apathetic: {
    name: 'Апатия',
    source: require('@assets/emotions/apathetic.png'),
  },
  tired: {
    name: 'Усталость',
    source: require('@assets/emotions/tired.png'),
  },
  tearfulness: {
    name: 'Слезливость',
    source: require('@assets/emotions/tearfulness.png'),
  },
  sad: {
    name: 'Грусть',
    source: require('@assets/emotions/sad.png'),
  },
  grief: {
    name: 'Горе',
    source: require('@assets/emotions/grief.png'),
  },

  // Страх
  anxious: {
    name: 'Тревога',
    source: require('@assets/emotions/anxious.png'),
  },
  shame: {
    name: 'Стыд',
    source: require('@assets/emotions/shame.png'),
  },
  offense: {
    name: 'Обида',
    source: require('@assets/emotions/offense.png'),
  },
  anxiety: {
    name: 'Обеспокоенность',
    source: require('@assets/emotions/anxiety.png'),
  },

  // Злость
  jealous: {
    name: 'Ревность',
    source: require('@assets/emotions/jealous.png'),
  },
  irritability: {
    name: 'Раздражение',
    source: require('@assets/emotions/irritability.png'),
  },
  anger: {
    name: 'Злость',
    source: require('@assets/emotions/anger.png'),
  },
};

/**
 * Тип эмоции
 */
export type EmotionType = {
  name: string;
  source: ImageSourcePropType;
};

interface EmotionInterface {
  [key: string]: EmotionType;
}
