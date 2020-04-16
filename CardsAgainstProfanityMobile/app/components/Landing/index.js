import React, { Component } from 'react';
import { Text, View, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';

export function Landing({route, navigation}) {
  const { username } = route.params;
  const { password } = route.params;
  return (
    <View style={styles.container}>
      <View style={styles.loginField}>

        <TouchableOpacity onPress={() => {
          /*//create lobby with http request

          fetch('http://10.74.50.180/createlobby', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({username: this.state.username})
          })
            .then((response) => response.json())
            .then((responseJson) => {

              //this.state.navigation.navigate('winner', { username: this.username, lobbykey: this.lobbykey })
            })
            .catch((error) => {
              console.log(error);
            });
            */
          navigation.navigate("DeckSelectWrapper", {username: username, isHost: true})}
        } style={styles.button}>
          <Text>start game.</Text>
        </TouchableOpacity>


        <TouchableOpacity onPress={() => navigation.navigate("JLobby",  {username: username})} style={styles.button}>
          <Text>join lobby.</Text>
        </TouchableOpacity>


        <TouchableOpacity onPress={() => navigation.navigate("Stats", {username: username})} style={styles.button}>
          <Text>check player stats.</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({

  invalid: {
    fontFamily: "sans-serif-light",
    backgroundColor: "red",
    color: "white",
    fontSize: 15
  },

  container: {
    backgroundColor: "black",
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
    backgroundColor: "white",
    color: "black",
    fontSize: 35
  },


  loginContainer: {
    //salignItems: 'center',

  },

  loginField: {
    margin: 10
  },

  textField: {
    margin: 10,
    backgroundColor: "white"
  },

  button: {
    alignItems: 'center',
    backgroundColor: "grey",
    padding: 10,
    margin: 10,
    borderRadius: 3
  }
});
