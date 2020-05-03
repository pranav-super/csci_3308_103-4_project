import React, { Component } from 'react';
import { Text, View, TouchableOpacity, TextInput, StyleSheet, Alert, Image } from 'react-native';

import { StackActions } from '@react-navigation/native'


function Invalid(attemptedSubmit) {
  if (attemptedSubmit) {
    console.log("Here, attemptedSubmit");
    return(
      <View style={{alignItems: "center", justifyContent: "center"}}>
        <Image style={{width: 20, height: 20}} source={require('../../../resources/imgs/Picture1.png')}/>
        <Text style={styles.invalid}> This isn't a valid lobby key! </Text>
      </View>
    );
  }
  else {
    console.log("Here, not attemptedSubmit");
    return (
      <View></View>
    );
  }
}

export function JLobby({ route, navigation }) {

  const { username } = route.params;
  //const { password } = route.params;

  const [lobbykey, setLobbykey] = React.useState("");

  const [attemptedsubmit, setAttemptedsubmit] = React.useState(false);

  return (
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.titleText}> join </Text>
          <Text style={styles.titleText}> lobby </Text>
        </View>

        <View style={styles.loginContainer}>
          <View style={styles.loginField}>
            <TextInput onChangeText={(text) => setLobbykey(text)} placeholder={"Lobby ID"} style={styles.textField} />
            {Invalid(attemptedsubmit)}
          </View>

          <TouchableOpacity onPress={() => {
            fetch('http://10.74.50.180:3000/verifylobby', {
              method: 'POST',
              mode: 'cors',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({"lobbykey": lobbykey})
            })
              .then((response) => response.json())
              .then((responseJson) => {
                 if(responseJson.valid) {
                   navigation.navigate("LobbyWrapper", {username: username, lobbykey: lobbykey, isHost: false})
                   /*navigation.dispatch(
                     StackActions.replace('LobbyWrapper', {username: username, lobbykey: lobbykey, isHost: false})
                   )*/
                 }
                 else {
                   setAttemptedsubmit(true)
                 }
              })
              .catch((error) => {
                 console.log(error);
              });
            /*if (lobbykey != "") {
              navigation.navigate("Lobby", {username: username, lobbykey: lobbykey, isHost: false})
            }
            else {
              setAttemptedsubmit(true)
            }*/

          }} style={styles.button}>
            <Text>Log in!</Text>
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
