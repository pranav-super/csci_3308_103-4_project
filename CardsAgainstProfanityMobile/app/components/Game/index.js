import React, { Component } from 'react';
import { Text, View, TouchableOpacity, TextInput, StyleSheet, Alert, ScrollView, FlatList, Image } from 'react-native';
import {Dimensions} from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

import { StackActions } from '@react-navigation/native'

import Carousel from "react-native-carousel-control";

import ProgressBarAnimated from 'react-native-progress-bar-animated';



/*const CARDS = [
  {
    selected: false,
    value: "funny phrase"
  },
  {
    selected: false,
    value: "funny phrase 2"
  },
  {
    selected: false,
    value: "funny phrase 3"
  }
];

var selectedCards = [];


*/
export class Item extends Component { /*the reason I haven't been using this syntax for everything is because react navigation won't work with it at the moment */

  constructor(props) {
    super(props);

    console.log("PROPS")
    console.log(props)

    this.state = {
      index: props.index,
      value: props.value,
      selected: false
    }
    this.selectCard = this.props.selectCard.bind(this);
    this.removeCard = this.props.removeCard.bind(this);
    this.selectedOrNot = this.selectedOrNot.bind(this);
  }

  selectedOrNot() {
    if(this.state.selected) {
      return (<Image style={{width: 30, height: 30}} source={require('../../../resources/imgs/check.png')}/>);
    }
    else {
      return (<View/>);
    }
  }

  render() {
    return (
      <Card onPress={() => {
        if(this.state.selected) {
          this.removeCard(this.state.value)
        }
        else {
          this.selectCard(this.state.value)
        }
        this.setState({selected: !this.state.selected});

        //CARDS[this.state.index].selected = this.state.selected;
        /*if (!this.state.selected) {
          //selectedCards.push(this.state.value);
        }
        else {
          const index = selectedCards.indexOf(this.state.value);
          if (index > -1) {
            selectedCards.splice(index, 1);
          }
        }

        console.log(selectedCards);*/
      }}>
        <Card.Content style={{flexDirection:"row", justifyContent: "space-evenly"}}>
          <Title style={{flex: 1}}>{this.state.value}</Title>
          {this.selectedOrNot()}
        </Card.Content>
      </Card>
    );
  }
}




export class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: 0
    }
    this.tick = this.tick.bind(this);
  }


  tick() {
    this.setState({
      progress: this.state.progress + 100
    });
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {

    const width=Math.round(Dimensions.get('window').width);

    if(this.state.judged) {
      return(<View/>);
    }

    return (
      <ProgressBarAnimated
            value={this.state.progress}
            backgroundColorOnComplete="#6CC644"
            backgroundColor="green"
            width={width}
            barAnimationDuration={30000}
            onComplete={() => {
              this.props.handler() //http post request
            }}
          />
    );
  }
}


export function GameWrapper({ route, navigation }) {
  /*var gameState =
    {
      players: [
        {
          name: "Player1",
          cards: ["funny1", "funny2", "funny3"]
        },

        {
          name: "Player2",
          cards: ["funny1", "funny2", "funny3"]
        },

        {
          name: "Player3",
          cards: ["funny1", "funny2", "funny3"]
        },

        {
          name: "Player4",
          cards: ["funny1", "funny2", "funny3"]
        }
      ],

      chat: [
        {
          author: "Player1",
          message: "i want her"
        },
        {
          author: "Player2",
          message: "i want her"
        },
        {
          author: "Player1",
          message: "i want her"
        },
        {
          author: "Player3",
          message: "i want her"
        },
        {
          author: "Player1",
          message: "i want her"
        }
      ],
      prompt: {
        text: "Here's a funny question, what do you get when _____ goes _____?",
        numSlots: 2,
        responses: [
          {
            player: "Player 1",
            value: "funny phrase"
          },
          {
            player: "Player 2",
            value: "funny phrase 2"
          },
          {
            player: "Player 3",
            value: "funny phrase 3"
          }
        ]
      },
      myState: {
        role: "beginning",
        status: "null"
      }
    }*/

  var { username } = route.params;
  var { lobbykey } = route.params;

  console.log(route.params)

  console.log(username);

  return (
    <View style={styles.container}>
      <Game navigation={navigation} username={username} lobbykey={lobbykey} />
    </View>
  );
}

class Game extends Component {

  constructor(props) {
    super(props);
    //this.state = props.gameState;
    this.state = {

    }
    this.navigation = props.navigation
    this.username = props.username;
    this.lobbykey = props.lobbykey;
  }

  componentDidMount() {
    this.timer = setInterval(() => this.getUpdate(), 6000);
  }

  getUpdate() {
    //fetch
    fetch('http://128.138.54.141:3000/role', {
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
         /*this.setState({
            players: responseJson.players,
            chat: responseJson.chat,
            prompt: responseJson.prompt,
            myState: responseJson.myState
         })*/
         clearInterval(this.timer);
         if (responseJson.role == 'judge') {
           this.navigation.dispatch(
             StackActions.replace('JudgeWaitWrapper', {username: this.username, lobbykey: this.lobbykey})
           )
           //this.state.navigation.navigate("JudgeWaitWrapper", {username: this.username, lobbykey: this.lobbykey});
         }
         else {
           this.navigation.dispatch(
             StackActions.replace('PlayerSelectWrapper', {username: this.username, lobbykey: this.lobbykey})
           )
           //this.state.navigation.navigate("PlayerSelectWrapper", {username: this.username, lobbykey: this.lobbykey});
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

      <View>
        <Text>WAITING FOR CARDS AND ROLES TO BE DEALT.</Text>
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
