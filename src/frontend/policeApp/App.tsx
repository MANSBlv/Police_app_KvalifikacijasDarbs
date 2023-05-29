/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import SubmissionScreen from './codeHere/screens/SubmissionScreen';
import Register from "./codeHere/screens/Register";
import CompleteProfile from "./codeHere/screens/CompleteProfile";
import { createStackNavigator } from '@react-navigation/stack';
import Geocoder from 'react-native-geocoding';
import Home from "./codeHere/screens/Home";
import Sos from "./codeHere/screens/Sos";
import PoliceStation from "./codeHere/screens/PoliceStation";
import UserSubmissions from "./codeHere/screens/UserSubmissions";
import PoliceOfficerHome from "./codeHere/screens/PoliceOfficerHome";

function App(): JSX.Element {
  Geocoder.init("GEOCODER API KEY");

  const Stack = createStackNavigator();


  return (
      <NavigationContainer>
        <Stack.Navigator
            screenOptions={{
              headerShown: false
            }}>
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="CompleteProfile" component={CompleteProfile} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Submission" component={SubmissionScreen} />
          <Stack.Screen name="Sos" component={Sos} />
          <Stack.Screen name="PoliceStation" component={PoliceStation} />
          <Stack.Screen name="UserSubmissions" component={UserSubmissions} />
          <Stack.Screen name="PoliceOfficerHome" component={PoliceOfficerHome} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

export default App;
