import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import BottomTabBar from './Navigation/Bottom_tabs';
import { View } from 'react-native';

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        
        <BottomTabBar />
        <StatusBar style="light" />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}


