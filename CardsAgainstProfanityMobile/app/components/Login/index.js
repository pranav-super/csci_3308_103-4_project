import React, { Component } from 'react';
import { Text, View, TouchableOpacity, TextInput, StyleSheet, Alert, Image } from 'react-native';


function Invalid(attemptedSubmit) {
  if (attemptedSubmit) {
    console.log("Here, attemptedSubmit");
    return(
      <View style={{alignItems: "center", justifyContent: "center"}}>
        <Image style={{width: 20, height: 20}} source={require('../../../resources/imgs/Picture1.png')}/>
        <Text style={styles.invalid}> This isn't a valid username or password! </Text>
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


export function Login({ navigation }) {


  const [username, setUsername] = React.useState("");

  const [password, setPassword] = React.useState("");

  const [attemptedsubmit, setAttemptedsubmit] = React.useState(false);


  return (
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.titleText}> CARDS </Text>
          <Text style={styles.titleText}> AGAINST </Text>
          <Text style={styles.titleText}> PROFANITY. </Text>
        </View>

        <View style={styles.loginContainer}>
          <View style={styles.loginField}>
            <TextInput onChangeText={(text) => setUsername(text)} placeholder={"Username"} style={styles.textField} />
            <TextInput onChangeText={(text) => setPassword(text)} placeholder={"Password"} secureTextEntry={true} style={styles.textField}/>
            {Invalid(attemptedsubmit)}
          </View>

          <TouchableOpacity onPress={() => {
                if (username != "" && password != "") {
                  setAttemptedsubmit(false)
                  fetch('http://10.74.50.180:3000/verifyuser', {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({"username": username, "password": password})
                  })
                    .then((response) => response.json())
                    .then((responseJson) => {
                      if(responseJson.success == true) {
                        navigation.navigate("Landing", {username: username, password: password})
                      }
                    })
                    .catch((error) => {
                       console.log(error);
                    });
                }
                else {
                  setAttemptedsubmit(true)
                }
              }} style={styles.button}>
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
