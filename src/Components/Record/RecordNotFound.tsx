import React from 'react';
import {BlockWithImageAndText} from '../Custom/BlockWithImageAndText';
import {StyleSheet, View} from 'react-native';
import {Style} from '../../Styles/Style';

export const RecordNotFound = () => {
  const styles = StyleSheet.create({container: {...Style.container}});

  return (
    <View style={styles.container}>
      <BlockWithImageAndText
        title={'Упс, запись не найдена'}
        desc={'Нам очень жаль, но мы не смогли найти вашу запись'}
        source={require('../../../assets/images/not-found.png')}
      />
    </View>
  );
};
