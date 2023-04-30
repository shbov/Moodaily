import {Image} from 'react-native';

export const scaleHeight = ({source, desiredWidth}) => {
  const {width, height} = Image.resolveAssetSource(source);

  return (desiredWidth / width) * height;
};
