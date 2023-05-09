import {SafeAreaView, StyleSheet} from 'react-native';

import React from 'react';
import {Colors, Style, StyleConstant} from '../Styles/Style';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {ShowAllRecords} from './Record/ShowAllRecords';
import {ShowStats} from './ShowStats';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  item: {
    padding: 0,
  },

  bar: {
    backgroundColor: 'transparent',
    borderBottomColor: Colors.lightGrey,
    borderBottomWidth: 3,
  },

  indicator: {
    backgroundColor: Colors.tertiary,
    bottom: -3,
    height: 3,
  },

  indicatorContainer: {},

  label: {
    ...Style.text,

    fontWeight: '400',
    fontSize: 16,
    lineHeight: 24,
    textTransform: 'none',
  },

  safe: {
    paddingHorizontal: Style.container.paddingHorizontal,
    flex: 1,
  },

  main: {
    ...Style.centered,
    flex: 1,
  },

  home: {
    paddingHorizontal: Style.container.paddingHorizontal,
    flex: 1,
  },
});

const Home = () => {
  const Tab = createMaterialTopTabNavigator();

  return (
    <SafeAreaView style={styles.safe}>
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: styles.label,
          tabBarItemStyle: styles.item,
          tabBarIndicatorStyle: styles.indicator,
          tabBarIndicatorContainerStyle: styles.indicatorContainer,
          tabBarStyle: styles.bar,

          tabBarActiveTintColor: Colors.dark,
          tabBarInactiveTintColor: Colors.tertiary,

          tabBarPressOpacity: StyleConstant.hover.opacity,
        }}>
        <Tab.Screen
          name="ShowAllRecords"
          component={ShowAllRecords}
          options={{
            title: 'Главная',
          }}
        />
        <Tab.Screen
          name="ShowStats"
          component={ShowStats}
          options={{
            title: 'Статистика',
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default Home;
