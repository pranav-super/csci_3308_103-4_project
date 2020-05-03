import React, { Component } from 'react';
import { Text, View, TouchableOpacity, TextInput, StyleSheet, Alert, ScrollView, FlatList, Image } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

import Carousel from "react-native-carousel-control";

import ProgressBarAnimated from 'react-native-progress-bar-animated';

var { Dimensions } = require('react-native')

const CARDS = [
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


class Item extends Component { /*the reason I haven't been using this syntax for everything is because react navigation won't work with it at the moment */

  constructor(props) {
    super(props);
    this.state = {
      index: props.index,
      value: props.value,
      selected: this.props.selected
    }
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
        this.setState({selected: !this.state.selected});
        CARDS[this.state.index].selected = this.state.selected;
        if (!this.state.selected) {
          selectedCards.push(this.state.value);
        }
        else {
          const index = selectedCards.indexOf(this.state.value);
          if (index > -1) {
            selectedCards.splice(index, 1);
          }
        }

        console.log(selectedCards);
      }}>
        <Card.Content style={{flexDirection:"row", justifyContent: "space-evenly"}}>
          <Title style={{flex: 1}}>{this.state.value}</Title>
          {this.selectedOrNot()}
        </Card.Content>
      </Card>
    );
  }
}

class Timer extends Component {
  constructor(props) {
    super(props);
    /*this.gameState = {
      setGameState: props.setGameState,
      gameState: props.gameState,
    }*/
    this.complete = false;
    this.state = {
      progress: 0,
      complete: false
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

  componentDidUpdate() {
    console.log(this.state.progress);
    const role = this.props.gameState.myState.role;
    const status = this.props.gameState.myState.status;
    if (role == 'judge') {
      if(status == 'WAITING' && this.complete == true) {
        this.props.setGameState('PLAYING');
        console.log('here')
      }
      else if (status == 'JUDGED') {
        this.props.setGameState('WAITING');
        //do a http request to update state entirely!!!
      }
    }
    else {
      if (status == 'PLAYING') {
        this.props.setGameState('WAITING');
      }
      else if(status == 'JUDGED') {
        this.props.setGameState('WAITING');
        //do a http request to update state entirely!!!
      }
    }
  }

  render() {

    const width=Math.round(Dimensions.get('window').width);
    const role = this.props.gameState.myState.role;
    const status = this.props.gameState.myState.status;

    if(this.props.gameState.myState.role == "judge") {
      //wait for submissions
      if (status == 'WAITING') {
        return (
          <ProgressBarAnimated
                value={this.state.progress}
                backgroundColorOnComplete="#6CC644"
                backgroundColor="green"
                width={width}
                barAnimationDuration={1000}
                onComplete={() => {
                  this.complete = true
                  /*this.props.setGameState('PLAYING');/*{
                    players: this.props.gameState.players,

                    chat: this.props.gameState.chat,

                    prompt: this.props.gameState.prompt,

                    myState: {
                      role: this.props.gameState.myState.role,
                      status: "PLAYING",
                      submitted: this.props.gameState.myState.submitted
                    }
                  })*/
                }}
              />
        );
      }
      //timer to choose (inconsequential)
      else if (status == 'PLAYING') {
        return(
          <ProgressBarAnimated
                value={this.state.progress}
                backgroundColorOnComplete="#6CC644"
                backgroundColor="green"
                width={width}
                barAnimationDuration={1000}
                onComplete={() => {
                  Alert.alert("Hurry up!");
                }}
              />
        );
        return(<View />);
      }
      //timer showing winner ("JUDGED")
      else {
        return(
          <ProgressBarAnimated
                value={this.state.progress}
                backgroundColorOnComplete="#6CC644"
                backgroundColor="green"
                width={width}
                barAnimationDuration={1000}
                onComplete={() => {
                  this.complete = true/*this.props.setGameState('WAITING')/*{
                    players: this.props.gameState.players,

                    chat: this.props.gameState.chat,

                    prompt: this.props.gameState.prompt,

                    myState: {
                      role: this.props.gameState.myState.role,
                      status: "WAITING",
                      submitted: this.props.gameState.myState.submitted
                    }
                  })*/ //http post request, to update player's role and state!!!!
                }}
              />
        );
      }
    }
    else {
      //timer to pick cards
      if (status == 'PLAYING') {
        return (
          <ProgressBarAnimated
                value={this.state.progress}
                backgroundColorOnComplete="#6CC644"
                backgroundColor="green"
                width={width}
                barAnimationDuration={1000}
                onComplete={() => {
                  this.complete = true/*this.props.setGameState('WAITING')/*{
                    players: this.props.gameState.players,

                    chat: this.props.gameState.chat,

                    prompt: this.props.gameState.prompt,

                    myState: {
                      role: this.props.gameState.myState.role,
                      status: "WAITING",
                      submitted: this.props.gameState.myState.submitted
                    }
                  })*/
                }}
              />
        );
      }
      //timer to wait for judge (inconsequential)
      else if (status == 'WAITING') {
        return(
          <ProgressBarAnimated
                value={this.state.progress}
                backgroundColorOnComplete="#6CC644"
                backgroundColor="green"
                width={width}
                barAnimationDuration={1000}
                onComplete={() => {
                  Alert.alert("Hurry up!");
                }}
              />
        );
      }
      //timer showing winner ("JUDGED")
      else {
        return(
          <ProgressBarAnimated
                value={this.state.progress}
                backgroundColorOnComplete="#6CC644"
                backgroundColor="green"
                width={width}
                barAnimationDuration={1000}
                onComplete={() => {
                  this.complete = true/*this.props.setGameState('WAITING')/*{
                    players: this.props.gameState.players,

                    chat: this.props.gameState.chat,

                    prompt: this.props.gameState.prompt,

                    myState: {
                      role: this.props.gameState.myState.role,
                      status: "WAITING",
                      submitted: this.props.gameState.myState.submitted
                    }
                  })*/ //http post request, to update player's role and state!!!!
                }}
              />
        );
      }
    }

    /*TO DO:
    FUCK WITH TIMERS TO HAVE TIMERS FOR ALL CASES:
    -player, time to pick cards
    -player, timer to wait for judge (inconsequential)
    -judge, wait for submissions
    -judge, timer to like pick shit (inconsequential)
    -judge/player, timer showing winner

    //if(this.state.gameState.myState.status == "judged") {
      return(
        <ProgressBarAnimated
              value={this.state.progress}
              backgroundColorOnComplete="#6CC644"
              backgroundColor="green"
              width={width}
              barAnimationDuration={1000}
              onComplete={() => {
                this.state.setGameState({
                  players: this.state.gameState.players,

                  chat: this.state.gameState.chat,

                  prompt: this.state.gameState.prompt,

                  myState: {
                    role: this.state.gameState.myState.role,
                    status: "judged",
                    submitted: true
                  }
                }) //http post request
              }}
            />
          );
    //}
    /*else {
      return (
        <ProgressBarAnimated
              value={this.state.progress}
              backgroundColorOnComplete="#6CC644"
              backgroundColor="green"
              width={width}
              barAnimationDuration={1000}
              onComplete={() => {
                this.state.setGameState({
                  players: this.state.gameState.players,

                  chat: this.state.gameState.chat,

                  prompt: this.state.gameState.prompt,

                  myState: {
                    role: "CHANGE",
                    status: "CHANGE",
                    submitted: false
                  }
                }) //http post request
              }}
            />
          );
    }*/
  }
}

function showCards(gameState, setGameState) {
  if(gameState.myState.status == "JUDGED") {

    //http request

    var card = {value: "pee pee poo poo"};

    return (
      <View style={{flex:1}}>
        <Text>THE WINNER IS</Text>
        <Text>PLAYER X</Text>
        <Item value={card.value} index={0}/>
      </View>
    );
  }





  if(gameState.myState.role == "judge" && gameState.myState.status == 'WAITING') {
    return (
      <View style={{flex:1}}>
        <Text>WAITING FOR SUBMISSIONS...</Text>
      </View>
    );
  }

  else if (gameState.myState.role == "judge" && gameState.myState.status == 'PLAYING') {
    var results = gameState.prompt.responses;/*[
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
    ];*/

    if (results == null) {

      //http request

      return(
        <View style={{flex:1}}>
          <Text>FETCHING SUBMISSIONS...</Text>
        </View>
      );
    }
    else {


      setGameState('PLAYING');/*
        {
          players: gameState.players,

          chat: gameState.chat,

          prompt: gameState.prompt,

          myState: {
            role: gameState.myState.role,
            status: 'PLAYING',
            submitted: gameState.myState.submitted
          }
        }
      );*/


      return(




        <View style={{flex: 1}}>
          <View style={{flex: 1}}>
            <ScrollView>
              {
                results.map((card, index) => {
                  return(
                    <View>
                      <View><Text> </Text></View>
                      <Item value={card.value} index={index}/>
                      <View><Text> </Text></View>
                    </View>
                  );
                })
              }
            </ScrollView>
          </View>



          <TouchableOpacity style={{backgroundColor: "green", flex:0.15}} onPress={() => {
            //verify number of cards selected is right
            if (selectedCards.length == 1) {
              //if so, send info to submitted screen
              //setJudged(true); //I CANNOT EASILY USE STATE BECAUSE REACT NAVIGATION DOESN'T AGREE WITH CLASSES!
              setGameState('JUDGED');/*
                {
                  players: gameState.players,

                  chat: gameState.chat,

                  prompt: gameState.prompt,

                  myState: {
                    role: gameState.myState.role,
                    status: 'JUDGED',
                    submitted: gameState.myState.submitted
                  }
                }
              )*/
              //HTTP request
              //navigation.navigate("SubmittedForPlayers", {username: username, lobbykey: lobbykey, cards: selectedCards});
            }
            else if (selectedCards.length > 1) {
              //if not, alert
              Alert.alert("Too many cards selected!");
            }
            else {
              Alert.alert("Too few cards selected!");
            }
          }}>
            <Text>Submit</Text>
          </TouchableOpacity>
        </View>



      );
    }
  }


  //IF YOU ARE A PLAYER, NOT A JUDGE

  else if (gameState.myState.status == 'WAITING') {
    return (
      <View style={{flex:1}}>
        <Text>SUBMITTED...</Text>
      </View>
    );
  }
  else { //playing

    setGameState('PLAYING');/*
      {
        players: gameState.players,

        chat: gameState.chat,

        prompt: gameState.prompt,

        myState: {
          role: gameState.myState.role,
          status: 'PLAYING',
          submitted: gameState.myState.submitted
        }
      }
    );*/


    return (

    <View style={{flex: 1}}>
      <View style={{flex: 1}}>
        <Carousel>
          {CARDS.map((card, index) => {
            return(
                <Item value={card.value} index={index}/>
            );
          })}
        </Carousel>
      </View>



      <TouchableOpacity style={{backgroundColor: "green", flex:0.15}} onPress={() => {
        //verify number of cards selected is right
        if (selectedCards.length == gameState.prompt.numSlots) {
          //if so, send info to submitted screen
          //setSubmitted(true);
          setGameState('WAITING');/*
            {
              players: gameState.players,

              chat: gameState.chat,

              prompt: gameState.prompt,

              myState: {
                role: gameState.myState.role,
                status: 'WAITING',
                submitted: gameState.myState.submitted
              }
            }
          );*/
          //HTTP request
          //navigation.navigate("SubmittedForPlayers", {username: username, lobbykey: lobbykey, cards: selectedCards});
        }
        else if (selectedCards.length > gameState.prompt.numSlots) {
          //if not, alert
          Alert.alert("Too many cards selected!");
        }
        else {
          Alert.alert("Too few cards selected!");
        }
      }}>
        <Text>Submit</Text>
      </TouchableOpacity>
    </View>
    );
  }
}



export function GameWrapper({ route, navigation }) {
  const gameState =
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
        role: "judge",
        status: "WAITING",
        submitted: false
      }
    }

  var { username } = route.params;
  var { lobbykey } = route.params;

  console.log(route.params)

  console.log(username);

  return (
    <View style={styles.container}>
      <Game gameState={gameState} username={username} lobbykey={lobbykey} />

      <Timer gameState={this.state} setGameState={this.setGameState}/>
    </View>
  );
}



//export function Game({ route, navigation }) {

  /*var { username } = route.params;
  var { lobbykey } = route.params;

  //const [submitted, setSubmitted] = React.useState(false);
  //const [judged, setJudged] = React.useState(false);

  /*var prompt = {
    text: "THE PROMPT!",
    numberSlots: 2,
    isJudge: true
  }

  //get this from the server :)


  /*if (prompt.isJudge) {
    navigation.navigate("SubmittedForJudges"); //OR implement it here if u want; might be the play
  }*/



class Game extends Component {

  constructor(props) {
    super(props);
    this.state = props.gameState;
    this.username = props.username;
    this.lobbykey = props.lobbykey;
    this.setGameState = this.setGameState.bind(this);
  }

  setGameState(newState) {
    this.setState({
      myState: {
        role: this.state.myState.role,
        status: newState,
        submitted: this.state.myState.submitted
      }
    })
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


      {showCards(this.state, this.setGameState)}


      {/*<View style={{backgroundColor: "purple", flex:0.15}}>
        <Text>Timer</Text>
        {/*update the prompt*}
      </View>*/}

      <Timer gameState={this.state} setGameState={this.setGameState}/>

      <View style={{backgroundColor: "blue", flex:0.15}}>
        <Text>BLACK CARD TEXT</Text>
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
