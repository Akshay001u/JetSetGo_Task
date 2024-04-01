import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FlightSearchController from './flight_search/FlightSearchController';
import FlightDetailsController from './flight_details/FlightDetailsController';
import SplashScreen from './SplashScreen';
import CheckoutController from './checkout/CheckoutController';




export const StackScreens = (props) => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName={"splash"}
      screenOptions={{
        headerShown: false,
        presentation: Platform.OS === 'ios' ? 'card' : 'modal',
        animationTypeForReplace: 'push',
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="splash" component={SplashScreen} />
      <Stack.Screen name="flightSearch" component={FlightSearchController} />
      <Stack.Screen name="flightDetails" component={FlightDetailsController} />
      <Stack.Screen name="checkout" component={CheckoutController} />

    </Stack.Navigator>
  );
};
