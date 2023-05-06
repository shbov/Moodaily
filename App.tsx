import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from './src/Pages/Home';
import OnboardingScreen from './src/Pages/OnboardingScreen';

// @ts-ignore
import {ONBOARDING_KEY, ONBOARDING_SHOW_DEV, APP_ENV} from '@env';
import {AddNewRecord} from './src/Pages/Record/AddNewRecord';
import {Colors, Style} from './src/Styles/Style';
import {ShowRecord} from './src/Pages/Record/ShowRecord';
import {TransparentButton} from './src/Components/TransparentButton';
import {ActionSheetIOS, StyleSheet, Text, View} from 'react-native';
import {deleteRecord} from './src/Actions/Record';

interface MyComponentState {
  showOnboarding: boolean;
  onboardingLoaded: boolean;
}

interface Props {}

class App extends React.Component<Props, MyComponentState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      showOnboarding: false,
      onboardingLoaded: false,
    };
  }

  async componentDidMount() {
    if (APP_ENV === 'dev' && ONBOARDING_SHOW_DEV === 'true') {
      await AsyncStorage.removeItem(ONBOARDING_KEY);
    }

    const isFirstTime = await AsyncStorage.getItem(ONBOARDING_KEY);
    if (!isFirstTime) {
      await AsyncStorage.setItem(ONBOARDING_KEY, 'true');
      this.setState({showOnboarding: true});
    }

    this.setState({
      onboardingLoaded: true,
    });
  }

  render() {
    const Stack = createNativeStackNavigator();
    const MyTheme = {
      ...DefaultTheme,
      colors: {
        ...DefaultTheme.colors,
        background: Colors.background,
      },
    };

    const headerSettings = {
      headerStyle: {
        backgroundColor: Colors.background,
      },
      headerShadowVisible: false, // applied here
      headerBackTitleVisible: false,
      headerTintColor: Colors.dark,
      headerTitleStyle: {
        ...Style.text,
        fontWeight: '500',
      },
    };

    const styles = StyleSheet.create({
      svg: {},

      img: {
        width: 24,
        height: 24,
      },
    });

    const handleOnClick = (recordTo: number, navigation: any) => {
      return ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['Назад', 'Редактировать', 'Удалить'],
          destructiveButtonIndex: 2,
          cancelButtonIndex: 0,
        },
        async buttonIndex => {
          if (buttonIndex === 0) {
            console.log('cancel');
          } else if (buttonIndex === 1) {
            console.log('edit');
          } else if (buttonIndex === 1) {
            await deleteRecord(recordTo);
            navigation.pop();
          }
        },
      );
    };

    return (
      this.state.onboardingLoaded && (
        <NavigationContainer theme={MyTheme}>
          <Stack.Navigator initialRouteName="Onboarding">
            {this.state.showOnboarding && (
              <Stack.Screen
                name="Onboarding"
                component={OnboardingScreen}
                options={{headerShown: false}}
              />
            )}
            <Stack.Screen
              name="Home"
              component={Home}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name={'AddNewRecord'}
              component={AddNewRecord}
              options={{
                title: 'Добавить запись',
                ...headerSettings,
              }}
            />

            <Stack.Screen
              name={'ShowRecord'}
              component={ShowRecord}
              options={({navigation, route}) => ({
                title: 'Запись',
                ...headerSettings,
                headerRight: () => (
                  <TransparentButton
                    stylesContainer={styles.svg}
                    stylesImage={styles.img}
                    source={require('./assets/images/icon-more-dark.png')}
                    onClick={() => {
                      handleOnClick(route.params.recordID, navigation);
                    }}
                  />
                ),
              })}
            />
          </Stack.Navigator>
        </NavigationContainer>
      )
    );
  }
}

export default App;
