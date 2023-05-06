import {Image, ImageSourcePropType, TouchableOpacity} from 'react-native';
import React from 'react';

type Props = {
  source: ImageSourcePropType;
  onClick: any;
  stylesContainer: any;
  stylesImage: any;
};

export const TransparentButton = (props: Props) => {
  return (
    <TouchableOpacity style={props.stylesContainer} onPress={props.onClick}>
      <Image source={props.source} style={props.stylesImage} />
    </TouchableOpacity>
  );
};
