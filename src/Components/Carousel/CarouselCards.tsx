import React, {useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';

import {Colors, Style} from '../../Styles/Style';

import {Item} from '../../Types/Item';
import CarouselCard from './CarouselCard';
// @ts-ignore
import Carousel, {CarouselProps} from 'react-native-snap-carousel';
import CustomPagination from './CustomPagination';

type PropsType = {
  items: Item[];
};

const CarouselCards = (props: PropsType) => {
  const {width} = Dimensions.get('window');
  const [slideIndex, setSlideIndex] = useState<number>(0);

  const settings: CarouselProps<any> = {
    autoplay: true,
    data: props.items,
    itemWidth: width,
    sliderWidth: width,
    hasParallaxImages: false,
    onSnapToItem: (index: number) => setSlideIndex(index),
    renderItem: CarouselCard,
  };

  return (
    <View style={style.margin}>
      <Carousel {...settings} />
      <CustomPagination data={props.items} activeSlide={slideIndex} />
    </View>
  );
};

const style = StyleSheet.create({
  margin: {
    marginHorizontal: -1 * Style.container.paddingHorizontal,
  },

  dotBase: {
    width: 16,
    height: 16,
    borderRadius: 100,
    marginHorizontal: 3,
    backgroundColor: Colors.purple,
  },
});

export default CarouselCards;
