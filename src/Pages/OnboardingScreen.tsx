import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import React from 'react';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import Style from '../Styles/Style';

import PrimaryButton from '../Components/PrimaryButton';
import CarouselCards from '../Components/Carousel/CarouselCards';
import {Item} from '../Types/Item';

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
const OnboardingScreen: ({navigation}: {navigation: any}) => JSX.Element = ({
  navigation,
}) => {
  const click = () => {
    navigation.replace('Home');
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

        <CarouselCards items={items} />

        <View style={style.bottom}>
          <PrimaryButton title="Начать пользоваться" onPress={click} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  main: {
    backgroundColor: Style.colors.primary,
    flex: 1,
  },

  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 48,
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
    marginTop: 16,
  },

  bottom: {
    backgroundColor: 'red',
  },
});

export default OnboardingScreen;
