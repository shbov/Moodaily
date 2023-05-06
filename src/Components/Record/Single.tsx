import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Record} from '../../Types/Record';
import {Colors, Style, StyleConstant} from '../../Styles/Style';
import {parseISO} from 'date-fns';
import format from 'date-fns/format';
import ruLocale from 'date-fns/locale/ru';
import {TransparentButton} from '../TransparentButton';
import CustomImage from '../CustomImage';

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

  // const _renderTruncatedFooter = (handlePress: any) => {
  //   return (
  //     <Text style={styles.readMore} onPress={handlePress}>
  //       Подробнее
  //     </Text>
  //   );
  // };
  //
  // const _renderRevealedFooter = (handlePress: any) => {
  //   return (
  //     <Text style={styles.readMore} onPress={handlePress}>
  //       Скрыть
  //     </Text>
  //   );
  // };
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
            {format(parseISO(props.record.created_at), 'dd MMMM, yyyy г.', {
              locale: ruLocale,
            })}
          </Text>
          <TransparentButton
            stylesContainer={styles.svg}
            stylesImage={styles.img}
            source={require('../../../assets/images/icon-more.png')}
            onClick={() => props.onClick(props.record)}
          />
        </View>

        <Text style={styles.title}>{props.record.title}</Text>

        {/*<ReadMore*/}
        {/*  numberOfLines={3}*/}
        {/*  renderTruncatedFooter={_renderTruncatedFooter}*/}
        {/*  renderRevealedFooter={_renderRevealedFooter}>*/}
        {/*  <Text style={styles.desc}>{props.record.description}</Text>*/}
        {/*</ReadMore>*/}

        <Text numberOfLines={3} style={styles.desc}>
          {props.record.description}
        </Text>

        <View style={styles.emotions}>
          {props.record.emotions.map(emotion => (
            <CustomImage
              source={emotion.source}
              width={36}
              key={emotion.name}
            />
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );
};
