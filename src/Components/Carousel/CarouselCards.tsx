import React, {useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';

import Carousel from 'react-native-reanimated-carousel';
import {Pagination} from 'react-native-snap-carousel';

import Style from '../../Styles/Style';
import CarouselCard from './CarouselCard';
import {Item} from '../../Types/Item';

type PropsType = {
  items: Item[];
};

const fullWidth =
  Dimensions.get('window').width - 2 * Style.container.paddingHorizontal;

const style = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 450,
    marginBottom: 48,
  },
});

const CarouselCards = (props: PropsType) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <View>
      <Carousel
        loop
        width={fullWidth}
        autoPlay={true}
        data={props.items}
        autoPlayInterval={2500}
        style={style.container}
        renderItem={({item}) => <CarouselCard item={item} />}
        onSnapToItem={index => setActiveIndex(index)}
      />
      <Pagination
        dotsLength={props.items.length}
        activeDotIndex={activeIndex}
        containerStyle={{backgroundColor: 'transparent'}}
        dotStyle={{
          width: 16,
          height: 16,
          borderRadius: 100,
          marginHorizontal: 4,
          backgroundColor: Style.colors.purple,
        }}
        inactiveDotScale={Style.button.hover.opacity}
      />
    </View>
  );
};

export default CarouselCards;
