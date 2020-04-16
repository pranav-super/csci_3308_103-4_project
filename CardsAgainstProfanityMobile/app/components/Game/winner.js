import React, { Component } from 'react';
import { Text, View, TouchableOpacity, TextInput, StyleSheet, Alert, ScrollView, FlatList, Image } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { Item, Timer } from './index.js'

import { StackActions } from '@react-navigation/native'

import Carousel from "react-native-carousel-control";

import ProgressBarAnimated from 'react-native-progress-bar-animated';

export function WinnerWrapper({ route, navigation }) {

  var { username } = route.params;
  var { lobbykey } = route.params;

  console.log(route.params)

  console.log(username);

  return (
    <View style={styles.container}>
      <Winner navigation={navigation} username={username} lobbykey={lobbykey} />
    </View>
  );
}

class Winner extends Component {

  constructor(props) {
    super(props);
    //this.state = props.gameState;
    this.state = {
      ended: false,
      prompt: {

      },
      winner: {

      }
    }
    this.navigation = props.navigation;
    this.username = props.username;
    this.lobbykey = props.lobbykey;
    this.getUpdate = this.getUpdate.bind(this);
  }

  componentDidMount() {
    this.timer = setInterval(() => this.getUpdate(), 7000);
    fetch('http://10.74.50.180:3000/winner', {
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
        if(responseJson.status == "ended") {
          this.setState({
            ended: true,
            prompt: responseJson.prompt,
            winner: responseJson.winner
          })
        }
        else {
          this.setState({
            prompt: responseJson.prompt,
            winner: responseJson.winner
          })
        }
      })
  }

  getUpdate() {
    //fetch
    /*if (this.state.cards == null) {
      fetch('http://10.74.50.180:3000/')
        .then((response) => response.json())
        .then((responseJson) => {
           console.log(responseJson);
           /*this.setState({
              players: responseJson.players,
              chat: responseJson.chat,
              prompt: responseJson.prompt,
              myState: responseJson.myState
           })*
           if (responseJson.finished)
            this.state.navigation.navigate()//winner, pass the results, which come in responseJson


        })
        .catch((error) => {
           console.log(error);
        });
      }*/
      if (this.state.ended) {
        Alert.alert("Out of cards! The game is now over.");
        clearInterval(this.timer);
        //this.state.navigation.navigate("Landing", { username: this.username })
        this.navigation.dispatch(
          StackActions.replace('Landing', {username: this.username})
        )
      }
      else {
        clearInterval(this.timer);
        //this.state.navigation.navigate("GameWrapper", {username: this.username, lobbykey: this.lobbykey})
        this.navigation.dispatch(
          StackActions.replace('GameWrapper', {username: this.username, lobbykey: this.lobbykey})
        )
      }
  }

  render() {

    //this.timer = setInterval(() => this.getUpdate(), 7000);

   return (
    <View style={styles.container}>

      <View style={{backgroundColor: "black", flex:0.15, flexDirection: "row"}}>
        <TouchableOpacity style={{flex: .30, justifyContent: "center", alignItems: "center"}} onPress={() => this.navigation.push("Chat", {"username": this.username, "lobbykey": this.lobbykey})}>
          <Image style={{width: "100%", height: "100%"}} source={{uri: 'https://us.123rf.com/450wm/fokaspokas/fokaspokas1804/fokaspokas180400019/98531966-a-chat-icon-on-white-icon-on-black-background-.jpg?ver=6'}}/>
        </TouchableOpacity>

        <View style={{flex: 1, flexDirection:"column", justifyContent: "center", alignItems: "center"}}>
          <Text style={styles.titleText}>
            {this.username}
          </Text>
          <Text style={styles.titleText}>
            lobby: {this.lobbykey}
          </Text>
        </View>

        <TouchableOpacity style={{backgroundColor: "black", flex: .30, justifyContent: "center", alignItems: "center"}} onPress={() => this.navigation.push("Scoreboard", {"lobbykey": this.lobbykey})}>
          <Image style={{width: "100%", height: "100%"}} source={{uri: 'https://previews.123rf.com/images/jovanas/jovanas1908/jovanas190800249/128778639-scoreboard-icon-on-dark-background.jpg'}}/>
        </TouchableOpacity>
      </View>

      <Card style={{flex: 1}}>
        <Card.Content style={{flexDirection:"row", justifyContent: "space-evenly"}}>
          <Title style={{flex: 1}}>{this.state.winner.player}</Title>
          <Title style={{flex: 1}}>{this.state.winner.value}</Title>
        </Card.Content>
      </Card>

      <View style={{backgroundColor: "white", flex: 0.15, alignItems: "center"}}>
        <Text style={{color:"black"}}>{this.state.prompt.text}</Text>
      </View>



    </View>
   );
  }
}

const styles = StyleSheet.create({

  invalid: {
    fontFamily: "sans-serif-light",
    backgroundColor: "red",
    color: "white",
    fontSize: 15
  },

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
    backgroundColor: "black",
    color: "white",
    fontSize: 20
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
