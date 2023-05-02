import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from './src/Pages/Home';
import OnboardingScreen from './src/Pages/OnboardingScreen';
// @ts-ignore
import {ONBOARDING_KEY, ONBOARDING_SHOW_DEV, APP_ENV} from '@env';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

function App(): JSX.Element {
  const Stack = createNativeStackNavigator();

  const [firstLaunch, setFirstLaunch] = React.useState<string>();

  React.useEffect(() => {
    const storeData = async () => {
      if (APP_ENV === 'dev' && ONBOARDING_SHOW_DEV === 'true') {
        await AsyncStorage.removeItem(ONBOARDING_KEY);
        setFirstLaunch(undefined);
      }

      const appData = await AsyncStorage.getItem(ONBOARDING_KEY);
      if (!appData) {
        setFirstLaunch('true');
        await AsyncStorage.setItem(ONBOARDING_KEY, 'true');
      } else {
        setFirstLaunch('false');
      }
    };

    storeData().then();
  }, []);

  return (firstLaunch !== undefined && (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator>
          {firstLaunch === 'true' && (
            <Stack.Screen
              options={{headerShown: false}}
              name="Onboarding"
              component={OnboardingScreen}
            />
          )}

          <Stack.Screen
            name="Home"
            component={Home}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  )) as JSX.Element;
}

export default App;
