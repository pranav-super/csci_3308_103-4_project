import React, { Component } from 'react';
import { Text, View, TouchableOpacity, TextInput, StyleSheet, Alert, ScrollView, FlatList, Image } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { Item, Timer } from './index.js'

import Carousel from "react-native-carousel-control";

import ProgressBarAnimated from 'react-native-progress-bar-animated';

import { StackActions } from '@react-navigation/native'

export function JudgeSelectWrapper({ route, navigation }) {

  var { username } = route.params;
  var { lobbykey } = route.params;

  console.log(route.params)

  console.log(username);

  return (
    <View style={styles.container}>
      <JudgeSelect navigation={navigation} username={username} lobbykey={lobbykey} />
    </View>
  );
}


class JudgeSelect extends Component {

  constructor(props) {
    super(props);
    //this.state = props.gameState;
    this.state = {
      navigation: props.navigation,
      cards: [],
      prompt: {

      },
      selected: [

      ]
    }
    this.username = props.username;
    this.lobbykey = props.lobbykey;
    this.timerHandler = this.timerHandler.bind(this);
    this.selectCard = this.selectCard.bind(this);
    this.removeCard = this.removeCard.bind(this);
  }


  selectCard(value) {
    this.state.selected.push(value);
  }

  removeCard(value) {
    this.state.selected.splice(this.state.selected.indexOf(value),1);
  }

  timerHandler() {//executed when timer finishes
    //do nothing
    Alert.alert("Hurry Up!");
  }

  componentDidMount() {
    //fetch cards
    fetch('http://10.74.50.180:3000/judgeselectstate', {
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
         this.setState({
            cards: responseJson.cards,
            prompt: responseJson.prompt
         })


      })
      .catch((error) => {
         console.log(error);
      });
  }

  render() {

    console.log(this.state.cards)

   return (
    <View style={styles.container}>

      <View style={{backgroundColor: "blue", flex:0.15, flexDirection: "row"}}>
        <TouchableOpacity style={{backgroundColor: "red", flex: .30, justifyContent: "center", alignItems: "center"}} onPress={() => navigation.push("Chat")}>
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

        <TouchableOpacity style={{backgroundColor: "red", flex: .30, justifyContent: "center", alignItems: "center"}} onPress={() => navigation.push("Scoreboard")}>
          <Text> Scoreboard </Text>
        </TouchableOpacity>
      </View>

      <View style={{flex: 1}}>
        <View style={{flex: 1}}>
          <View style={{flex: 1}}>
            <ScrollView>
              {
                this.state.cards.map((card, index) => {
                  console.log("CARD: " + card)

                  return(
                    <View>
                      <View><Text> </Text></View>
                        <Item value={card} selectCard={this.selectCard} removeCard={this.removeCard} index={index}/>
                      <View><Text> </Text></View>
                    </View>
                  );
                })
              }
            </ScrollView>
          </View>
        </View>


        <View style={{flex:0.15}}>
          <Timer handler={this.timerHandler} />
        </View>

        <TouchableOpacity style={{backgroundColor: "green", flex:0.15}} onPress={() => {
          //verify number of cards selected is right
          if (this.state.selected.length == 1) {
            //HTTP request, send winner to judgeres
            fetch('http://10.74.50.180:3000/judgeres', {
              method: 'POST',
              mode: 'cors',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({"winner": this.state.selected, "lobbykey": this.lobbykey})
            })
              .then((response) => response.json())
              .then((responseJson) => {
                 this.state.navigation.navigate('WinnerWrapper', { username: this.username, lobbykey: this.lobbykey })
                 /*this.state.navigation.dispatch(
                   StackActions.replace('WinnerWrapper', {username: this.username, lobbykey: this.lobbykey})
                 )*/
              })
              .catch((error) => {
                 console.log(error);
              });
            //navigation.navigate("SubmittedForPlayers", {username: username, lobbykey: lobbykey, cards: selectedCards});
          }
          else if (selectedCards.length > 1) {
            //if not, alert
            Alert.alert("There can only be one.");
          }
          else {
            Alert.alert("Pick a winner!");
          }
        }}>
          <Text>Submit</Text>
        </TouchableOpacity>
      </View>

      <View style={{backgroundColor: "blue", flex:0.15}}>
        <Text>{this.state.prompt.text}</Text>
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
