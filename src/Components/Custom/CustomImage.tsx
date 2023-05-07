import React, {Image, ImageSourcePropType, StyleSheet} from 'react-native';
import {scaleHeight} from '../../Functions/scaleHeight';

type Props = {
  source: ImageSourcePropType;
  width: number;
};

const CustomImage = (props: Props) => {
  const styles = StyleSheet.create({
    img: {
      width: props.width,
      height: scaleHeight({
        source: props.source,
        desiredWidth: props.width,
      }),
    },
  });

  return <Image source={props.source} style={styles.img} />;
};

export default CustomImage;
