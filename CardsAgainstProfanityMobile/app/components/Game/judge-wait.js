import React, { Component } from 'react';
import { Text, View, TouchableOpacity, TextInput, StyleSheet, Alert, ScrollView, FlatList, Image } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { Item, Timer } from './index.js'

import Carousel from "react-native-carousel-control";

import ProgressBarAnimated from 'react-native-progress-bar-animated';

import { StackActions } from '@react-navigation/native'

export function JudgeWaitWrapper({ route, navigation }) {

  var { username } = route.params;
  var { lobbykey } = route.params;

  console.log(route.params)

  console.log(username);

  return (
    <View style={styles.container}>
      <JudgeWait navigation={navigation} username={username} lobbykey={lobbykey} />
    </View>
  );
}

class JudgeWait extends Component {

  constructor(props) {
    super(props);
    //this.state = props.gameState;
    this.state = {

    }
    this.navigation = props.navigation;
    this.username = props.username;
    this.lobbykey = props.lobbykey;
    this.getUpdate = this.getUpdate.bind(this);
  }

  componentDidMount() {
    this.timer = setInterval(() => this.getUpdate(), 6000);
  }

  getUpdate() {
    //fetch
    fetch('http://10.74.50.180:3000/readytojudge', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"lobbykey": this.lobbykey})
    })
        .then((response) => response.json())
        .then((responseJson) => {
           console.log(responseJson);
           /*this.setState({
              players: responseJson.players,
              chat: responseJson.chat,
              prompt: responseJson.prompt,
              myState: responseJson.myState
           })*/
          if (responseJson.finished) {
            clearInterval(this.timer);
            //this.state.navigation.navigate('JudgeSelectWrapper', { username: this.username, lobbykey: this.lobbykey})//judge-select
            this.navigation.dispatch(
              StackActions.replace('JudgeSelectWrapper', {username: this.username, lobbykey: this.lobbykey})
            )
          }

        })
        .catch((error) => {
           console.log(error);
        });
  }


  render() {

    //this.timer = setInterval(() => this.getUpdate(), 6000);

   return (
    <View style={styles.container}>

      <View style={{backgroundColor: "blue", flex:0.15, flexDirection: "row"}}>
        <TouchableOpacity style={{backgroundColor: "red", flex: .30, justifyContent: "center", alignItems: "center"}} onPress={() => this.navigation.push("Chat", {"username": this.username, "lobbykey": this.lobbykey})}>
          <Text> Chat </Text>
        </TouchableOpacity>

        <View style={{flex: 1, flexDirection:"column", justifyContent: "center", alignItems: "center"}}>
          <Text style={{color: "white"}}>
            {this.username}
          </Text>
          <Text style={{color: "white"}}>
            {this.lobbykey}
          </Text>
        </View>

        <TouchableOpacity style={{backgroundColor: "red", flex: .30, justifyContent: "center", alignItems: "center"}} onPress={() => this.navigation.push("Scoreboard", {"lobbykey": this.lobbykey})}>
          <Text> Scoreboard </Text>
        </TouchableOpacity>
      </View>

      <View>
        <Text>WAITING FOR SUBMISSIONS...</Text>
      </View>

    </View>
   );
  }
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
