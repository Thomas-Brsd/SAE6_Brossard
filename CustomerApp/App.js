import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CustomerScreen from './screens/CustomerScreen';
import HistoriqueLivraisons from './screens/HistoriqueScreen';
import PanierDetails from './screens/PanierDetails';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Customer">
        <Stack.Screen name="Customer" component={CustomerScreen} />
        <Stack.Screen name="PanierDetails" component={PanierDetails} />
        <Stack.Screen name="HistoriqueScreen" component={HistoriqueLivraisons} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
