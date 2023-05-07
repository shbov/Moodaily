import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import React from 'react';
import {Colors, Style, StyleConstant} from '../Styles/Style';

import PrimaryButton from '../Components/Custom/PrimaryButton';
import CarouselCards from '../Components/Carousel/CarouselCards';

import {Item} from '../Types/Item';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

const OnboardingScreen = ({navigation}: NativeStackScreenProps<any>) => {
  const items: Item[] = [
    {
      title: 'Храните заметки о настроении',
      src: require('../../assets/images/onboarding-2.png'),
    },
    {
      title: 'Находите триггеры плохого настроения',
      src: require('../../assets/images/onboarding-3.png'),
    },
    {
      title: 'Отслеживайте своё настроение',
      src: require('../../assets/images/onboarding-4.png'),
    },
  ];

  const click = () => {
    navigation.replace('Home');
  };

  return (
    <SafeAreaView style={style.main}>
      <View style={style.container}>
        <View style={style.top}>
          <TouchableOpacity
            style={{padding: 8}}
            onPress={click}
            activeOpacity={StyleConstant.hover.opacity}>
            <Text style={style.btn}>Пропустить</Text>
          </TouchableOpacity>
        </View>

        <View style={style.carousel}>
          <CarouselCards items={items} />
        </View>

        <View style={style.bottom}>
          <PrimaryButton title="Начать пользоваться" onPress={click} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  main: {
    backgroundColor: Colors.primary,
    flex: 1,
  },

  container: {
    ...Style.container,
    flex: 1,
  },

  top: {
    display: 'flex',
    alignItems: 'flex-end',
    marginBottom: 48,
    marginTop: -8,
  },

  btn: {
    ...Style.text,

    fontWeight: '400',
    fontSize: 16,
    lineHeight: 19,
    color: Colors.white,
  },

  carousel: {
    marginBottom: 'auto',
  },

  bottom: {
    display: 'flex',
    marginVertical: Style.container.paddingHorizontal,
  },
});

export default OnboardingScreen;
