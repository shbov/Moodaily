import {Image, ImageSourcePropType} from 'react-native';

export const scaleHeight: ({
  source,
  desiredWidth,
}: {
  source: ImageSourcePropType;
  desiredWidth: number;
}) => number = ({source, desiredWidth}) => {
  const {width, height} = Image.resolveAssetSource(source);

  return (desiredWidth / width) * height;
};
