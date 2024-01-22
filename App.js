import React from 'react';
import { Text, SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import CustomStatusBar from './components/StatusBar'; // Importez votre composant CustomStatusBar ici

// Importez vos autres composants
import HomeScreen from './components/HomeScreen';
import MovieScreen from './components/MovieScreen';
import FlagScreen from './components/FlagScreen';

const MyTabBottom = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <CustomStatusBar /> {/* Utilisez CustomStatusBar ici */}
      <NavigationContainer>
        <MyTabBottom.Navigator initialRouteName="Home">
          <MyTabBottom.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="home" size={size} color={color} />
              ),
            }}
          />
          <MyTabBottom.Screen
            name="Movie"
            component={MovieScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="tv" size={size} color={color} />
              ),
            }}
          />
          <MyTabBottom.Screen
            name="World"
            component={FlagScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="planet" size={size} color={color} />
              ),
            }}
          />
        </MyTabBottom.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
