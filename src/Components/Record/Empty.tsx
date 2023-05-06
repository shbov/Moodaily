import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {Colors, Style} from '../../Styles/Style';
import CustomImage from '../CustomImage';

class Empty extends React.Component {
  render() {
    const {width} = Dimensions.get('window');
    const computedWidth = width - 2 * Style.container.paddingHorizontal;

    const style = StyleSheet.create({
      empty: {
        ...Style.centered,
        ...Style.shadow,

        borderRadius: Style.button.borderRadius,
        backgroundColor: Colors.white,

        paddingVertical: 49,
        paddingHorizontal: Style.container.paddingHorizontal,

        overflow: 'hidden',
        width: computedWidth,
        marginBottom: 4,
      },

      title: {
        ...Style.centered,
        ...Style.text,

        fontWeight: '600',
        fontSize: 20,
        lineHeight: 30,
        color: Colors.dark,

        marginVertical: 8,
      },

      desc: {
        ...Style.centered,
        ...Style.text,

        fontWeight: '400',
        fontSize: 16,
        lineHeight: 24,

        color: Colors.dark,
      },
    });

    return (
      <View style={style.empty}>
        <CustomImage
          source={require('../../../assets/images/empty-entity.png')}
          width={160}
        />

        <Text style={style.title}>Здесь будут ваши записи</Text>

        <Text style={style.desc}>
          Создавайте и храните заметки о своём настроении
        </Text>
      </View>
    );
  }
}

export default Empty;
