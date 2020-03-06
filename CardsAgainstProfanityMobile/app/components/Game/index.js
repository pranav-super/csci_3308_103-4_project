import React, { Component } from 'react';
import { Text, View, TouchableOpacity, TextInput, StyleSheet, Alert, ScrollView, FlatList, Image } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

import Carousel from "react-native-carousel-control";

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


class Item extends Component {

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

function showCards(submitted, setSubmitted, prompt) {
  if (submitted) {
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
            return(<Item value={card.value} index={index}/>);
          })}
        </Carousel>
      </View>



      <TouchableOpacity style={{backgroundColor: "green", flex:0.15}} onPress={() => {
        //verify number of cards selected is right
        if (selectedCards.length == prompt.numberSlots) {
          //if so, send info to submitted screen
          setSubmitted(true);
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

  const [submitted, setSubmitted] = React.useState(false)

  var prompt = {
    text: "THE PROMPT!",
    numberSlots: 2
  }

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


      {showCards(submitted, setSubmitted, prompt)}


      <View style={{backgroundColor: "purple", flex:0.15}}>
        <Text>Timer</Text>
        {/*update the prompt*/}
      </View>

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
