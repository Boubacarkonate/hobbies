import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import * as Font from 'expo-font';

let customFonts = { 'Lemon-Regular': require('../assets/fonts/Lemon-Regular.ttf') };

const MovieScreen = () => {
  const [data, setData] = useState([]);
  
const loadCustomFont = async () => {
    await Font.loadAsync(customFonts);
  };

  useEffect(() => {
    loadCustomFont();
  }, []); // The empty array indicates that the effect runs only on component mount

  useEffect(() => {
    const apiKey = '08a341931ab5f5dcee467baeb4a68c76';
    const apiUrl = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=${apiKey}`;

    fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(result => {
        // Assuming the data you need is in the 'results' array of the response
        setData(result.results || []);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <ScrollView>
      {data.map(item => (
        <Card key={item.id} style={styles.card}>
          {item.poster_path && (
            <Card.Cover
              source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
              style={styles.cardImage}
            />
          )}
          <Card.Content>
            <Text style={styles.titleText}>{item.title}</Text>
            <Text style={styles.releaseDateText}>{item.release_date}</Text>
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
   height: 400,
    resizeMode:'cover'
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'Lemon-Regular',
  },
  releaseDateText: {
     fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'Lemon-Regular',
  },
});

export default MovieScreen;
