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
    this.state = {
      setSubmitted: props.setSubmitted,
      judged: props.judged,
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
            barAnimationDuration={1000}
            onComplete={() => {
              this.state.setSubmitted(true) //http post request
            }}
          />
    );
  }
}

function showCards(submitted, setSubmitted, prompt, judged, setJudged) {
  if(judged) {

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

  if(prompt.isJudge && !submitted) {
    return (
      <View style={{flex:1}}>
        <Text>WAITING FOR SUBMISSIONS...</Text>
      </View>
    );
  }

  else if (prompt.isJudge && submitted) {
    var results = [
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
    ];

    if (results == null) {

      //http request

      return(
        <View style={{flex:1}}>
          <Text>FETCHING SUBMISSIONS...</Text>
        </View>
      );
    }
    else {
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
              setJudged(true);
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


  else if (submitted) {
    return (
      <View style={{flex:1}}>
        <Text>SUBMITTED...</Text>
      </View>
    );
  }
  else {
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
        if (selectedCards.length == prompt.numberSlots) {
          //if so, send info to submitted screen
          setSubmitted(true);
          //HTTP request
          //navigation.navigate("SubmittedForPlayers", {username: username, lobbykey: lobbykey, cards: selectedCards});
        }
        else if (selectedCards.length > prompt.numberSlots) {
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

export function Game({ route, navigation }) {

  var { username } = route.params;
  var { lobbykey } = route.params;

  const [submitted, setSubmitted] = React.useState(false);
  const [judged, setJudged] = React.useState(false);

  var prompt = {
    text: "THE PROMPT!",
    numberSlots: 2,
    isJudge: true
  }

  //get this from the server :)
  const [gameState, setGameState] = React.useState(
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
        numSlots: 2
      },
      myState: {
        role: "judge",
        status: "waiting",
        submitted: false
      }
    }
  );

  /*if (prompt.isJudge) {
    navigation.navigate("SubmittedForJudges"); //OR implement it here if u want; might be the play
  }*/

  return (
    <View style={styles.container}>

      <View style={{backgroundColor: "blue", flex:0.15, flexDirection: "row"}}>
        <TouchableOpacity style={{backgroundColor: "red", flex: .30, justifyContent: "center", alignItems: "center"}} onPress={() => navigation.navigate("Chat")}>
          <Text> Chat </Text>
        </TouchableOpacity>

        <View style={{flex: 1, flexDirection:"column", justifyContent: "center", alignItems: "center"}}>
          <Text style={{color: "white"}}>
            {username}
          </Text>
          <Text style={{color: "white"}}>
            {lobbykey}
          </Text>
        </View>

        <TouchableOpacity style={{backgroundColor: "red", flex: .30, justifyContent: "center", alignItems: "center"}} onPress={() => navigation.navigate("Scoreboard")}>
          <Text> Scoreboard </Text>
        </TouchableOpacity>
      </View>


      {showCards(submitted, setSubmitted, prompt, judged, setJudged)}


      {/*<View style={{backgroundColor: "purple", flex:0.15}}>
        <Text>Timer</Text>
        {/*update the prompt*}
      </View>*/}

      <Timer setSubmitted={setSubmitted} judged={judged}/>

      <View style={{backgroundColor: "blue", flex:0.15}}>
        <Text>BLACK CARD TEXT</Text>
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
