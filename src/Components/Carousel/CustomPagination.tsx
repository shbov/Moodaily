import * as React from 'react';
import {Pagination} from 'react-native-snap-carousel';
import {StyleSheet} from 'react-native';
import {Colors} from '../../Styles/Style';
import {Item} from '../../Types/Item';

type Props = {
  data: Item[];
  activeSlide: number;
};

export default function CustomPagination(props: Props) {
  const styles = StyleSheet.create({
    dotStyle: {
      width: 16,
      height: 16,
      borderRadius: 16,
      backgroundColor: Colors.purple,
      marginHorizontal: 0,
      paddingHorizontal: 0,
    },

    inactiveDotStyle: {
      backgroundColor: Colors.lightGrey,
    },
  });

  const settings = {
    dotStyle: styles.dotStyle,
    dotsLength: props.data.length,
    activeDotIndex: props.activeSlide,
    inactiveDotStyle: styles.inactiveDotStyle,
    inactiveDotOpacity: 1,
    inactiveDotScale: 0.6,
  };

  return <Pagination {...settings} />;
}
