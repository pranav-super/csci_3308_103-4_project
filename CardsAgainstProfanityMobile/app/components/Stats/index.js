import React, { Component } from 'react';
import { Text, View, TouchableOpacity, TextInput, StyleSheet, Alert, ScrollView, FlatList, Image } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';



const STATS = [
  {
    statName: 'Games Played',
    value: 25,
  },
  {
    statName: 'Win Loss Ratio',
    value: 0.3939293942309401,
  },
  {
    statName: 'Number of Decks',
    value: 2,
  },
  {
    statName: 'Pee Pee Poo Poo',
    value: 100,
  }
];

export function Stats({ route,navigation }) {

  const { username } = route.params;

  return (
      <View style={styles.container}>

        <View style={{backgroundColor: "blue", flex:0.15, flexDirection: "row"}}>
          <View style={{flex: 1, flexDirection:"column", justifyContent: "center", alignItems: "center"}}>
            <Text style={{color: "white"}}>
              STATS:
            </Text>
            <Text style={{color: "white"}}>
              {username}
            </Text>
          </View>
        </View>



        <View style={{flex: 1}}>
          <ScrollView style={{flex:1}}>
            <FlatList data={STATS} renderItem={({ item }) => <Text>{item.statName}: {item.value}</Text>} keyExtractor={item => item.id} />
          </ScrollView>
        </View>

      </View>
  );
}

const styles = StyleSheet.create({

  container: {
    backgroundColor: "#ddd2ce",
    justifyContent: 'flex-start',
    flex: 1
  },

  title: {
    alignItems: "center",
    justifyContent: "center",
    flex: .8
  },

  titleText: {
    fontFamily: "sans-serif-light",
    backgroundColor: "#3f3f37",
    color: "#dd977c",
    fontSize: 35
  },


  loginContainer: {
    //salignItems: 'center',

  },

  loginField: {
    margin: 10
  },

  textField: {
    margin: 10
  },

  button: {
    alignItems: 'center',
    backgroundColor: "#dd977c",
    padding: 10,
    margin: 10,
    borderRadius: 3
  }
});
