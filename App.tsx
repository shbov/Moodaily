import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from './src/Pages/Home';
import OnboardingScreen from './src/Pages/OnboardingScreen';
// @ts-ignore
import {ONBOARDING_KEY, APP_ENV} from '@env';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import 'react-native-gesture-handler';

function App(): JSX.Element {
  const Stack = createNativeStackNavigator();
  const [firstLaunch, setFirstLaunch] = React.useState<string>('false');

  React.useEffect(() => {
    const storeData = async () => {
      if (APP_ENV === 'dev') {
        await AsyncStorage.removeItem(ONBOARDING_KEY);
      }

      const appData = await AsyncStorage.getItem(ONBOARDING_KEY);
      if (appData === 'false') {
        setFirstLaunch('true');
        await AsyncStorage.setItem(ONBOARDING_KEY, 'true');
      } else {
        setFirstLaunch('false');
      }
    };

    storeData().then();
  }, []);

  return (firstLaunch != null && (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator>
          {firstLaunch && (
            <Stack.Screen
              options={{headerShown: false}}
              name="Onboarding"
              component={OnboardingScreen}
            />
          )}

          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  )) as JSX.Element;
}
export default App;
