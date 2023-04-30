import React from 'react';

import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import Style from '../Styles/Style';
import {Colors} from 'react-native/Libraries/NewAppScreen';

type ButtonProps = {
  title: string;
  onPress: any;
};

const PrimaryButton = (props: ButtonProps) => {
  const style = StyleSheet.create({
    btn: {
      paddingHorizontal: 24,
      paddingVertical: 14,
      borderRadius: 100,
      backgroundColor: Colors.white,
      shadowColor: Style.colors.dark,
      shadowRadius: 3,
      shadowOpacity: 0.1,
    },

    text: {
      fontWeight: '500',
      fontSize: 16,
      lineHeight: 24,
      color: Style.colors.dark,

      textAlign: 'center',
    },
  });

  return (
    <TouchableOpacity
      style={style.btn}
      onPress={props.onPress}
      activeOpacity={Style.button.hover.opacity}>
      <Text style={style.text}>{props.title}</Text>
    </TouchableOpacity>
  );
};

export default PrimaryButton;
