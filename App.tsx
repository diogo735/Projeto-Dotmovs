import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import BottomTabBar from './Navigation/Bottom_tabs';
import { View } from 'react-native';
import Toast from 'react-native-toast-message';
import { PaperProvider } from 'react-native-paper';

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
      <NavigationContainer>
        
        <BottomTabBar />
        <StatusBar style="light" />
      </NavigationContainer>
     </PaperProvider>
    </SafeAreaProvider>
  );
}


