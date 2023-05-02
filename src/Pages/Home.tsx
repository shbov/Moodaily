import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import React from 'react';
import Style from '../Styles/Style';

const styles = StyleSheet.create({
  container: {
    paddingLeft: Style.container.paddingHorizontal,
    paddingRight: Style.container.paddingHorizontal,
    marginTop: 16,
  },

  view: {},

  main: {
    backgroundColor: Style.colors.background,
    flex: 1,
  },
});

const Home: () => JSX.Element = () => {
  return (
    <SafeAreaView style={styles.main}>
      <StatusBar />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.container}>
        <View style={styles.view}>
          <Text>тест</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
