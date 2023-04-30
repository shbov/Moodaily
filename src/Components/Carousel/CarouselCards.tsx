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

const fullWidth = Dimensions.get('window').width;

const CarouselCards = (props: PropsType) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <View style={style.container}>
      <Carousel
        loop={false}
        width={fullWidth}
        autoPlay={true}
        data={props.items}
        style={style.carousel}
        autoPlayInterval={2500}
        renderItem={({item}) => <CarouselCard item={item} />}
        onSnapToItem={index => setActiveIndex(index)}
        pagingEnabled={true}
      />
      <Pagination
        dotsLength={props.items.length}
        activeDotIndex={activeIndex}
        dotStyle={style.dotBase}
        inactiveDotStyle={style.dotInactive}
        inactiveDotOpacity={1}
        inactiveDotScale={0.6}
      />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    minHeight: 500,
    marginHorizontal: -20,
  },

  carousel: {
    flex: 1,
  },

  dotBase: {
    width: 16,
    height: 16,
    borderRadius: 100,
    marginHorizontal: 3,
    backgroundColor: Style.colors.purple,
  },

  dotInactive: {
    backgroundColor: 'rgba(232, 234, 236, 1)',
  },
});

export default CarouselCards;
