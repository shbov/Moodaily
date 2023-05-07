import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';

import {Colors, Style, StyleConstant} from '../../Styles/Style';
import {Item} from '../../Types/Item';
import CustomImage from '../Custom/CustomImage';

type Props = {
  item: Item;
};

const CarouselCard: React.FC<Props> = ({item}) => {
  let {width} = Dimensions.get('window');

  const styles = StyleSheet.create({
    text: {
      ...Style.text,

      fontWeight: '600',
      fontSize: 32,
      lineHeight: 38,
      color: Colors.white,

      marginBottom: 48,
      paddingHorizontal: Style.container.paddingHorizontal,
    },
    container: {},
  });

  if (width > StyleConstant.viewScreen.proMax) {
    width = StyleConstant.viewScreen.proMax;
    styles.container = {
      ...Style.centered,
    };
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{item.title}</Text>
      <CustomImage source={item.src} width={width} />
    </View>
  );
};

export default CarouselCard;
