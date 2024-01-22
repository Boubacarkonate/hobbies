import React from 'react';
import { View, StatusBar, StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const CustomStatusBar = () => {
  return (
    <View style={[styles.statusBar, { height: getStatusBarHeight(true) }]}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
    </View>
  );
};

const styles = StyleSheet.create({
  statusBar: {
    backgroundColor: 'blue', // Couleur de fond de la barre d'état
  },
});

export default CustomStatusBar;
