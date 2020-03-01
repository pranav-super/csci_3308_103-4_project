import React, { Component } from 'react';
import { Text, View, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';

export function SubmittedForJudges({ navigation }) {
  return (
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.titleText}> CARDS </Text>
          <Text style={styles.titleText}> AGAINST </Text>
          <Text style={styles.titleText}> PROFANITY. </Text>
        </View>

        <View style={styles.loginContainer}>
          <View style={styles.loginField}>
            <TextInput onChangeText={(text) => this.setState({username: text})} placeholder={"Username"} style={styles.textField} />
            <TextInput onChangeText={(text) => this.setState({password: text})} placeholder={"Password"} secureTextEntry={true} style={styles.textField}/>
          </View>

          <TouchableOpacity onPress={() => navigation.navigate("Landing", {username: "SampleUsername", password: "Hash"})} style={styles.button}>
            <Text>Log in!</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("CreateAccount")} style={styles.button}>
            <Text>I don't have an account.</Text>
          </TouchableOpacity>
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
