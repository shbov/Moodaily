import React from 'react';
import CustomImage from './CustomImage';
import {Emotion, EmotionType} from '../../Types/Emotion';
import {StyleConstant} from '../../Styles/Style';

type Props = {
  key: string;
  name: string;
  width?: number;
};

export const EmotionImage = (props: Props) => {
  const emotion: EmotionType | undefined = Object.values(Emotion).find(
    (item: EmotionType) => item.name === props.name,
  );

  if (!emotion) {
    return (
      <CustomImage
        source={require('../../../assets/emotions/empty.png')}
        width={props.width ?? StyleConstant.emotionSize}
        key={props.name}
      />
    );
  }

  return (
    <CustomImage
      source={emotion.source}
      width={props.width ?? StyleConstant.emotionSize}
      key={emotion.name}
    />
  );
};
