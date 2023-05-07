import React from 'react';

import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Colors, Style, StyleConstant} from '../../Styles/Style';

type ButtonProps = {
  title: string;
  onPress: any;
};

const PrimaryButton = (props: ButtonProps) => {
  const style = StyleSheet.create({
    btn: {
      ...Style.centered,
      ...Style.shadow,

      paddingHorizontal: Style.container.paddingHorizontal,
      paddingVertical: 14,
      borderRadius: 100,
      backgroundColor: Colors.white,
    },

    text: {
      ...Style.text,

      fontWeight: '500',
      fontSize: 16,
      lineHeight: 24,
      color: Colors.dark,
    },
  });

  return (
    <TouchableOpacity
      style={style.btn}
      onPress={props.onPress}
      activeOpacity={StyleConstant.hover.opacity}>
      <Text style={style.text}>{props.title}</Text>
    </TouchableOpacity>
  );
};

export default PrimaryButton;
