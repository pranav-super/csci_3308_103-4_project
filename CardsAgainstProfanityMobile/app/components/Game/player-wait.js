import React, { Component } from 'react';
import { Text, View, TouchableOpacity, TextInput, StyleSheet, Alert, ScrollView, FlatList, Image } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { Item, Timer } from './index.js'

import Carousel from "react-native-carousel-control";

import ProgressBarAnimated from 'react-native-progress-bar-animated';

export function PlayerWaitWrapper({ route, navigation }) {

  var { username } = route.params;
  var { lobbykey } = route.params;

  console.log(route.params)

  console.log(username);

  return (
    <View style={styles.container}>
      <PlayerWait navigation={navigation} username={username} lobbykey={lobbykey} />
    </View>
  );
}

class PlayerWait extends Component {

  constructor(props) {
    super(props);
    //this.state = props.gameState;
    this.state = {
      navigation: props.navigation,
      prompt: props.prompt
    }
    this.username = props.username;
    this.lobbykey = props.lobbykey;
    this.getUpdate = this.getUpdate.bind(this);
  }

  componentDidMount() {
    this.timer = setInterval(() => this.getUpdate(), 1000);
  }

  getUpdate() {
    //fetch
    fetch('http://10.74.50.180:3000/readyToShowWinner')
        .then((response) => response.json())
        .then((responseJson) => {
           console.log(responseJson);
           /*this.setState({
              players: responseJson.players,
              chat: responseJson.chat,
              prompt: responseJson.prompt,
              myState: responseJson.myState
           })*/
           if (responseJson.ready)
            this.state.navigation.navigate('Winner', { username:this.username, lobbykey: this.lobbykey })//winner


        })
        .catch((error) => {
           console.log(error);
        });
      }
  }

  render() {

   return (
    <View style={styles.container}>

      <View style={{backgroundColor: "blue", flex:0.15, flexDirection: "row"}}>
        <TouchableOpacity style={{backgroundColor: "red", flex: .30, justifyContent: "center", alignItems: "center"}} onPress={() => navigation.navigate("Chat")}>
          <Text> Chat </Text>
        </TouchableOpacity>

        <View style={{flex: 1, flexDirection:"column", justifyContent: "center", alignItems: "center"}}>
          <Text style={{color: "white"}}>
            {this.state.username}
          </Text>
          <Text style={{color: "white"}}>
            {this.state.lobbykey}
          </Text>
        </View>

        <TouchableOpacity style={{backgroundColor: "red", flex: .30, justifyContent: "center", alignItems: "center"}} onPress={() => navigation.navigate("Scoreboard")}>
          <Text> Scoreboard </Text>
        </TouchableOpacity>
      </View>

      <View>
        <Text>WAITING FOR JUDGE</Text>
      </View>

      <View style={{backgroundColor: "blue", flex:0.15}}>
        <Text>{this.state.prompt.text}</Text>
      </View>

    </View>
   );
  }
}
