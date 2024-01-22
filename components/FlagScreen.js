import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import * as Font from 'expo-font';

let customFonts = { 'Lemon-Regular': require('../assets/fonts/Lemon-Regular.ttf') };

const FlagScreen = () => {
  const [data, setData] = useState([]);

  const loadCustomFont = async () => {
    await Font.loadAsync(customFonts);
  };

  useEffect(() => {
    loadCustomFont();
  }, []); // The empty array indicates that the effect runs only on component mount

  useEffect(() => {
    fetch('https://restcountries.com/v2/all', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(dataApi => {
        setData(dataApi);
      })
      .catch(error => {
        console.error(error);
      });
  }, []); // The empty array indicates that the effect runs only on component mount

  return (
    <ScrollView>
      {data.map(item => (
        <Card key={item.alpha3Code} style={styles.card}>
          {/* Displaying country flag */}
          {item.flag && (
            <Card.Cover
              source={{ uri: item.flag }}
              style={styles.cardImage}
            />
          )}
          <Card.Content>
            <Text style={styles.titleText}>{item.name}</Text>
            <Text style={styles.releaseDateText}>Population: {item.population}</Text>
          </Card.Content>
        </Card>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
  },
  cardImage: {
    height: 200,
    resizeMode: 'cover',
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 18,
    fontFamily: 'Lemon-Regular',
  },
  releaseDateText: {
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'Lemon-Regular',
  },
});

export default FlagScreen;
