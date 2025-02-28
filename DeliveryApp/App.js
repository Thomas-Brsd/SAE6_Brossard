import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TourneeList from './screens/TourneeList';
import TourneeDetail from './screens/TourneeDetail';
import PanierRecap from './screens/PanierRecap';
import DeliveryRoute from './screens/DeliveryRoute';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Delivery">
        <Stack.Screen name="Delivery" component={TourneeList} />
        <Stack.Screen name="Details" component={TourneeDetail} />
        <Stack.Screen name="Panier" component={PanierRecap} />
        <Stack.Screen name="Route" component={DeliveryRoute} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
