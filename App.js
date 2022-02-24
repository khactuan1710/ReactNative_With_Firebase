import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/Home';
import Splash from './src/Splash';

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen component={Splash} name="Splash"/>
        <Stack.Screen component={Home} name ="Home"/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
