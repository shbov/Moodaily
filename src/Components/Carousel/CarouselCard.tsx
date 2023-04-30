import {View, Text, StyleSheet, Dimensions, Image} from 'react-native';
import React from 'react';

import Style from '../../Styles/Style';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {scaleHeight} from '../../Functions/scaleHeight';
import {Item} from '../../Types/Item';

const fullWidth =
  Dimensions.get('window').width - 2 * Style.container.paddingHorizontal;

type Props = {
  item: Item;
};

const CarouselCard: React.FC<Props> = ({item}) => {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'green',
    },

    text: {
      fontFamily: 'Inter',
      fontWeight: '600',
      fontSize: 32,
      lineHeight: 38,
      color: Colors.white,

      marginBottom: 48,
    },

    image: {
      width: fullWidth,
      height: scaleHeight({
        source: item.src,
        desiredWidth: fullWidth,
      }),
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{item.title}</Text>
      <Image source={item.src} style={styles.image} />
    </View>
  );
};
export default CarouselCard;
