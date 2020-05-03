  import React, { Component } from 'react';
import { Text, View, TouchableOpacity, TextInput, StyleSheet, Alert, ScrollView, FlatList, Image } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { Item, Timer } from './index.js'

import Carousel from "react-native-carousel-control";

import ProgressBarAnimated from 'react-native-progress-bar-animated';

import { StackActions } from '@react-navigation/native'

export function PlayerSelectWrapper({ route, navigation }) {

  var { username } = route.params;
  var { lobbykey } = route.params;

  console.log(route.params)

  console.log(username);

  return (
    <View style={styles.container}>
      <PlayerSelect navigation={navigation} username={username} lobbykey={lobbykey} />
    </View>
  );
}

class PlayerSelect extends Component {

  constructor(props) {
    super(props);
    //this.state = props.gameState;
    this.state = {
      cards: [],
      prompt: {

      },
      selected: [

      ]
    }
    this.navigation = props.navigation;
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
    //submit, POST request, pass username, lobbykey, prompt
    fetch('http://128.138.54.141:3000/playerres', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"username": this.username, "selected": this.state.selected, "lobbykey": this.lobbykey})
    })
      .then((response) => response.json())
      .then((responseJson) => {
         //this.state.navigation.navigate('PlayerWaitWrapper', { username: this.username, lobbykey: this.lobbykey })
         this.navigation.dispatch(
           StackActions.replace('PlayerWaitWrapper', {username: this.username, lobbykey: this.lobbykey})
         )
      })
      .catch((error) => {
         console.log(error);
      });
  }

  componentDidMount() {
    //fetch cards
    fetch('http://128.138.54.141:3000/playerselectstate', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"username": this.username, "lobbykey": this.lobbykey})
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

      <View style={{flex: 1}}>
        <View style={{flex: 1}}>
          <View style={{flex: 1}}>
            <ScrollView>
              {
                this.state.cards.map((card, index) => {
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


        <View>
          <Timer handler={this.timerHandler} />
        </View>

        <TouchableOpacity style={{backgroundColor: "black", flex: 0.15, justifyContent: "center", alignItems: "center"}} onPress={() => {
          //verify number of cards selected is right
          if (this.state.selected.length == this.state.prompt.numSlots) {
            //HTTP request
            fetch('http://128.138.54.141:3000/playerres', {
              method: 'POST',
              mode: 'cors',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({"username": this.username, "selected": this.state.selected, "lobbykey": this.lobbykey})
            })
              .then((response) => response.json())
              .then((responseJson) => {
                 //this.state.navigation.navigate('PlayerWaitWrapper', { username: this.username, lobbykey: this.lobbykey })
                 console.log(responseJson);
                 this.navigation.dispatch(
                   StackActions.replace('PlayerWaitWrapper', {username: this.username, lobbykey: this.lobbykey})
                 )
              })
              .catch((error) => {
                 console.log(error);
              });
            //navigation.navigate("SubmittedForPlayers", {username: username, lobbykey: lobbykey, cards: selectedCards});
          }
          else if (this.state.selected.length > this.state.prompt.numSlots) {
            //if not, alert
            Alert.alert("Too many cards selected!");
          }
          else {
            Alert.alert("Too few cards selected!");
          }
        }}>
          <Text style={{color: "white"}}>Submit</Text>
        </TouchableOpacity>
      </View>

      <View style={{backgroundColor: "white", flex: 0.15, alignItems: "center"}}>
        <Text style={{color: "black"}}>{this.state.prompt.text}</Text>
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
