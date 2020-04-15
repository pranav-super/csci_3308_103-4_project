import React, { Component } from 'react';
import { Text, View, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';

export function CreateAccount({route, navigation}) {
  var state = {
    username: "",
    password: "",
    confirm: ""
  }


  return (
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.titleText}> CARDS </Text>
          <Text style={styles.titleText}> AGAINST </Text>
          <Text style={styles.titleText}> PROFANITY. </Text>
        </View>

        <View style={styles.loginContainer}>
          <View style={styles.loginField}>
            <TextInput onChangeText={(text) => state.username = text} placeholder={"New Username"} style={styles.textField} />
            <TextInput onChangeText={(text) => state.password = text} placeholder={"New Password"} secureTextEntry={true} style={styles.textField}/>
            <TextInput onChangeText={(text) => state.confirm = text} placeholder={"Confirm Password"} secureTextEntry={true} style={styles.textField}/>
          </View>

          <TouchableOpacity onPress={() => {
            if (state.password == state.confirm && state.username != "" && state.password != "") {
              navigation.navigate("Landing", {username: state.username, password: state.password})
            }
            else if (state.username == ""){
              Alert.alert(
                'error.',
                'username can\'t be empty!',
                [
                  {text: 'I will do better next time.', onPress: () => console.log('OK Pressed')},
                ],
                {cancelable: false},
              );
            }
            else if (state.password == ""){
              Alert.alert(
                'error.',
                'password can\'t be empty!',
                [
                  {text: 'I will do better next time.', onPress: () => console.log('OK Pressed')},
                ],
                {cancelable: false},
              );
            }
            else {
              Alert.alert(
                'error.',
                'password not confirmed!',
                [
                  {text: 'I will do better next time.', onPress: () => console.log('OK Pressed')},
                ],
                {cancelable: false},
              );
            }
          }} style={styles.button}>
            <Text>join the madness!</Text>
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
