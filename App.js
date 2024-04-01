import { View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StackScreens } from './src/components/StackScreens';


const App = () => {
  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer>
        <SafeAreaProvider>
          <StackScreens />
        </SafeAreaProvider>
      </NavigationContainer>
    </View>
  )
}

export default App
