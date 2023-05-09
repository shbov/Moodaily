import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from './src/Pages/Home';
import OnboardingScreen from './src/Pages/OnboardingScreen';

// @ts-ignore
import {ONBOARDING_KEY, ONBOARDING_SHOW_DEV, APP_ENV} from '@env';
import {CreateAndEdit} from './src/Pages/Record/CreateAndEdit';
import {Colors, Style} from './src/Styles/Style';
import {ShowRecord} from './src/Pages/Record/ShowRecord';
import {TransparentButton} from './src/Components/Custom/TransparentButton';

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
      headerShadowVisible: false,
      headerBackTitleVisible: false,
      headerTintColor: Colors.dark,

      headerStyle: {
        backgroundColor: Colors.background,
      },

      headerTitleStyle: {
        ...Style.text,
        fontWeight: '500',
      },
    };

    return (
      this.state.onboardingLoaded && (
        <NavigationContainer theme={MyTheme}>
          <Stack.Navigator>
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

            <Stack.Group screenOptions={{presentation: 'modal'}}>
              <Stack.Screen
                name={'CreateAndEdit'}
                component={CreateAndEdit}
                options={({route}) => ({
                  ...headerSettings,
                  title: App.getTitle(route),
                })}
              />
            </Stack.Group>
            <Stack.Screen
              name={'ShowRecord'}
              component={ShowRecord}
              options={({navigation, route}) => ({
                title: 'Запись',
                ...headerSettings,
                headerRight: () => (
                  <TransparentButton
                    stylesContainer={{}}
                    stylesImage={{
                      width: 24,
                      height: 24,
                    }}
                    source={require('./assets/images/icon-more-dark.png')}
                    onClick={() => {
                      ShowRecord.onClick(route.params.recordID, navigation);
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

  static getTitle(route: any): string {
    if (!route.params || !route.params?.recordID) {
      return 'Создать запись';
    }

    return 'Редактировать запись';
  }
}

export default App;
