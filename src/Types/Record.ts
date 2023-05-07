import {EmotionType} from './Emotion';

export type Record = {
  id: number;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
  emotions: EmotionType[];
};
