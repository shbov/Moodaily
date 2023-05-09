import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Colors, Style} from '../../Styles/Style';

type Props = {
  onClick: any;
  text: string;
};

export const SaveRecord = (props: Props) => {
  const styles = StyleSheet.create({
    container: {
      alignItems: 'flex-end',
      paddingHorizontal: Style.container.paddingHorizontal,
      borderTopColor: Colors.grey,
      borderTopWidth: 1,
      paddingVertical: 16,
      marginBottom: 16,
    },

    label: {
      ...Style.text,

      fontWeight: '500',
      fontSize: 16,
      lineHeight: 24,

      color: Colors.primary,
    },
  });
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={props.onClick}>
        <Text style={styles.label}>{props.text}</Text>
      </TouchableOpacity>
    </View>
  );
};
