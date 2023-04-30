import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from './src/Pages/Home';
import OnboardingScreen from './src/Pages/OnboardingScreen';
import {ONBOARDING_KEY, APP_ENV} from '@env';

function App(): JSX.Element {
  const Stack = createNativeStackNavigator();
  const [firstLaunch, setFirstLaunch] = React.useState<boolean>(null);

  React.useEffect(() => {
    const storeData = async () => {
      if (APP_ENV === 'dev') {
        await AsyncStorage.removeItem(ONBOARDING_KEY);
      }

      const appData = await AsyncStorage.getItem(ONBOARDING_KEY);
      if (appData == null) {
        setFirstLaunch(true);
        await AsyncStorage.setItem(ONBOARDING_KEY, 'true');
      } else {
        setFirstLaunch(false);
      }
    };

    storeData().then();
  }, []);

  return (firstLaunch != null && (
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
  )) as JSX.Element;
}

export default App;
