import React, { Component } from 'react';
import { Text, View, TouchableOpacity, TextInput, StyleSheet, Alert, ScrollView, FlatList, Image } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { CheckBox } from 'react-native-elements'


import { StackActions } from '@react-navigation/native'


const DECKS = [
  {title: "Adult"},
  {title: "Kids"}
];


function DeckCheckbox({ title, onCheck }) {
  const [checked, setChecked] = React.useState(false);
  console.log(title)

  return (
    <CheckBox
      title={title}
      checked={checked}
      checkedIcon={"check"}
      uncheckedIcon={"check"}
      onPress={() => {
        let newVal = !checked;
        setChecked(newVal);
        onCheck(title, newVal);
        /*.then(
          //run handler
          onCheck(title, checked)
        );*/
      }}
    />
  )
}


class DeckSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      decks: []
    }
    this.navigation = props.navigation;
    this.username = props.username;
    this.isHost = props.isHost;
    this.addDecks = this.addDecks.bind(this);
  }

  addDecks(title, isChecked) {
    if(isChecked) {
      this.state.decks.push(title);
    }
    else {
      this.state.decks.splice(this.state.decks.indexOf(title),1)
    }
  }

  render() {
    return(
      <View style={styles.container}>
        <View style={{flex: 1}}>
          <ScrollView style={{flex:1}}>
            <FlatList data={DECKS} renderItem={({ item }) => {
              console.log("DECK: " + item.title)
              return(<DeckCheckbox title={item.title} onCheck={this.addDecks} />)
            }}
            keyExtractor={item => item.id}/>
          </ScrollView>
        </View>
        <View style={{flex: 0.15}}>
          <TouchableOpacity style={{backgroundColor: "white", flex: 1, justifyContent: "center", alignItems: "center"}} onPress={() => {
                      if (this.state.decks.length == 0) {
                        Alert.alert("Please select a deck (or more)!");
                      }
                      else {

                        fetch('http://10.74.50.180:3000/createlobby', { //first, create the lobby
                          method: 'POST',
                          mode: 'cors',
                          headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                          },
                          /*headers: { "Content-Type": "application/x-www-form-urlencoded" },*/
                          body: JSON.stringify({"username": this.username, "decks": this.state.decks})
                        })
                          .then((response) => response.json())
                          .then((responseJson) => {
                             console.log(responseJson);
                             //this.navigation.navigate("LobbyWrapper", {username: this.username, isHost: true, lobbykey: responseJson.lobbykey});
                             this.navigation.dispatch(
                               StackActions.replace('LobbyWrapper', {username: this.username, isHost: true, lobbykey: responseJson.lobbykey})
                             )
                          })
                          .catch((error) => {
                             console.log(error);
                             Alert.alert("Lobby creation failed!")
                          });
                      }
                  }}>
            <Text style={{color: "black"}}>CREATE THE LOBBY</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}


export function DeckSelectWrapper({ route, navigation }) {

  var { username } = route.params;
  var { isHost } = route.params;

  return (
    <View style={styles.container}>
      <DeckSelect navigation={navigation} username={username} isHost={isHost} />
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
    backgroundColor: "black",
    color: "white",
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
