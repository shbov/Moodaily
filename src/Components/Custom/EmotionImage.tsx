import {EmotionType} from 'Enums/Emotion';
import React from 'react';
import CustomImage from './CustomImage';

type Props = {
  emotion: EmotionType;
};

export const EmotionImage = (props: Props) => {
  return (
    <CustomImage
      source={props.emotion.source}
      width={48}
      key={props.emotion.name}
    />
  );
};
