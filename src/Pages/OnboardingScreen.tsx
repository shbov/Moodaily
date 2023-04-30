import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import React from 'react';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

// project imports
import Style from '../Styles/Style';
import {ONBOARDING_KEY} from '@env';
import PrimaryButton from '../Components/PrimaryButton';
// import CarouselCards from '../Components/CarouselCards';

// images
const onboarding1 = require('../../assets/images/onboarding-1.png');
const onboarding2 = require('../../assets/images/onboarding-2.png');
const onboarding3 = require('../../assets/images/onboarding-3.png');

// data
const items = [
  {
    title: 'Храните заметки о настроении',
    src: onboarding1,
  },
  {
    title: 'Находите триггеры плохого настроения',
    src: onboarding2,
  },
  {
    title: 'Отслеживайте своё настроение',
    src: onboarding3,
  },
];
const OnboardingScreen = ({navigation, props}) => {
  const click = () => {
    AsyncStorage.setItem(ONBOARDING_KEY, 'true').then(() => {
      navigation.replace('Home');
    });
  };

  return (
    <SafeAreaView style={style.main}>
      <View style={style.container}>
        <View style={style.top}>
          <TouchableOpacity
            onPress={click}
            activeOpacity={Style.button.hover.opacity}>
            <Text style={style.btn}>Пропустить</Text>
          </TouchableOpacity>
        </View>

        <View>{/*<CarouselCards items={items} />*/}</View>

        <View style={style.bottom}>
          <PrimaryButton title="Начать пользоваться" onPress={click} />
        </View>
      </View>
    </SafeAreaView>
  );
};

// styles
const style = StyleSheet.create({
  main: {
    backgroundColor: Style.colors.primary,
    flex: 1,
  },

  container: {
    paddingLeft: Style.container.paddingHorizontal,
    paddingRight: Style.container.paddingHorizontal,
  },

  top: {
    display: 'flex',
    alignItems: 'flex-end',
    marginBottom: 48,
  },

  btn: {
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 19,
    color: Colors.white,
  },

  bottom: {
    marginTop: 30,
  },
});

export default OnboardingScreen;
