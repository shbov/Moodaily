import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Colors, Style} from '../Styles/Style';
import {TransparentButton} from './TransparentButton';
import {getWordEnding} from '../Functions/getWordEnding';

type Props = {
  onClick: any;
  count: number;
};

const PageControl = (props: Props) => {
  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      paddingHorizontal: Style.container.paddingHorizontal,
      borderTopColor: Colors.grey,
      borderTopWidth: 1,
      paddingVertical: 16,
    },

    label: {
      ...Style.text,

      fontWeight: '500',
      fontSize: 12,
      lineHeight: 18,
      textAlign: 'center',

      color: Colors.dark,
      alignSelf: 'center',
    },

    svg: {
      position: 'absolute',
      right: Style.container.paddingHorizontal,
      top: '50%',
    },

    img: {
      width: 36,
      height: 36,
    },
  });
  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {getWordEnding(props.count, ['запись', 'записи', 'записей'])}
      </Text>

      <TransparentButton
        stylesContainer={styles.svg}
        stylesImage={styles.img}
        source={require('../../assets/images/icon-plus.png')}
        onClick={props.onClick}
      />
    </View>
  );
};

export default PageControl;
