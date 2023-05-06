// export enum Emotion {
//   HAPPY = 'happy.png',
//   JOYFUL = 'joyful.png',
//   CHILL = 'chill.png',
//   EXITED = 'exited.png',
//   CONCERNED = 'concerned.png',
//   SURPRISED = 'surprised.png',
//   CONFUSED = 'confused.png',
//   APATHETIC = 'apathetic.png',
//   ANXIOUS = 'anxious',
//   STRESS = 'stress',
// }

// export interface IEmotionRecord {
//   [key: string]: EmotionType;
// }

export const Emotion = {
  happy: {
    name: 'Счастливый',
    source: require('../../assets/emotions/happy.png'),
  },
};

// export type EmotionType = {
//   source: ImageSourcePropType;
//   name: string;
// };
