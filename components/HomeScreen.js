import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as Font from 'expo-font';

let customFonts = { 'Lemon-Regular': require('../assets/fonts/Lemon-Regular.ttf') };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  avatar: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  paragraph: {
    fontSize: 16,
    fontFamily: 'Lemon-Regular',
    padding: 20,
    textAlign: 'justify',
  },
});

const HomeScreen = (props) => {
  const [image, setImage] = useState(null);

  const loadCustomFont = async () => {
    await Font.loadAsync(customFonts);
  };

  useEffect(() => {
    loadCustomFont();
  }, []); // The empty array indicates that the effect runs only on component mount

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.assets[0].uri);
      Alert.alert('Image sélectionnée avec succès!');
    }
  };

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.assets[0].uri);
      Alert.alert('Nouvelle photo prise avec succès!');
    }
  };

  const showImagePickerOptions = () => {
    Alert.alert(
      'Choisissez une option 📸',
      'Voulez-vous choisir une image de votre bibliothèque ou prendre une nouvelle photo?',
      [
        {
          text: 'Choisir de la bibliothèque',
          onPress: pickImage,
        },
        {
          text: 'Prendre une photo',
          onPress: takePhoto,
        },
        {
          text: 'Annuler',
          onPress: () => {}, // Ne fait rien, ferme simplement l'alerte
          style: 'cancel', // Style iOS pour indiquer une action d'annulation
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20 }}>Bonjour {props.name} </Text>
      {!image && (
        <TouchableOpacity onPress={showImagePickerOptions} style={styles.avatar}>
          <View style={{ borderRadius: 300, overflow: 'hidden' }}>
            <Ionicons name="image" size={150} color="grey" />
          </View>
        </TouchableOpacity>
      )}

      {image && (
        <TouchableOpacity onPress={showImagePickerOptions}>
          <Image source={{ uri: image }} style={{ width: 150, height: 150, borderRadius: 75 }} />
        </TouchableOpacity>
      )}
      <Text style={styles.paragraph}>
        Bienvenu dans notre communauté dédiée aux passions et aux loisirs. Que vous soyez un amateur enthousiaste ou que vous recherchiez de nouvelles inspirations, notre application est l'endroit idéal pour explorer, apprendre et partager vos centres d'intérêt.
      </Text>
    </View>
  );
};

export default HomeScreen;
