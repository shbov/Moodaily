import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Record} from '../../Types/Record';
import {Colors, Style, StyleConstant} from '../../Styles/Style';
import {TransparentButton} from '../Custom/TransparentButton';
import {formatDate} from '../../Functions/formatDate';
import {EmotionImage} from '../Custom/EmotionImage';

type Props = {
  record: Record;
  onClick: any;
  navigation: any;
};

export const Single = (props: Props) => {
  const styles = StyleSheet.create({
    record: {
      ...Style.item,
      ...Style.shadow,

      backgroundColor: Colors.white,
      borderRadius: Style.button.borderRadius,
    },

    created_at: {
      ...Style.text,

      fontWeight: '400',
      fontSize: 16,
      lineHeight: 24,
      color: Colors.tertiary,
    },

    top: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 8,
    },

    title: {
      ...Style.text,

      fontWeight: '600',
      fontSize: 18,
      lineHeight: 28,
      color: Colors.dark,
      marginBottom: 8,
    },

    desc: {
      ...Style.text,
      fontWeight: '400',
      fontSize: 16,
      lineHeight: 24,

      color: Colors.dark,
    },

    readMore: {
      ...Style.text,
      fontWeight: '400',
      fontSize: 14,
      lineHeight: 19,

      color: Colors.dark,
      marginTop: 8,
    },

    svg: {},

    img: {
      width: 24,
      height: 24,
    },

    emotions: {
      flexDirection: 'row',
      gap: 4,
      alignItems: 'center',
      marginTop: 8,
    },
  });

  const onClick = () => {
    props.navigation.navigate('ShowRecord', {
      recordID: props.record.id,
    });
  };

  return (
    <TouchableOpacity
      style={styles.record}
      onPress={onClick}
      activeOpacity={StyleConstant.hover.opacity / 1.5}>
      <View>
        <View style={styles.top}>
          <Text style={styles.created_at}>
            {formatDate(props.record.created_at)}
          </Text>
          <TransparentButton
            stylesContainer={styles.svg}
            stylesImage={styles.img}
            source={require('../../../assets/images/icon-more.png')}
            onClick={() => props.onClick(props.record)}
          />
        </View>

        <Text style={styles.title}>{props.record.title}</Text>

        {props.record.description.trim() !== '' && (
          <Text numberOfLines={3} style={styles.desc}>
            {props.record.description}
          </Text>
        )}

        {props.record.emotions.length > 0 && (
          <View style={styles.emotions}>
            {props.record.emotions.map(emotion => (
              <EmotionImage key={emotion} name={emotion} />
            ))}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};
