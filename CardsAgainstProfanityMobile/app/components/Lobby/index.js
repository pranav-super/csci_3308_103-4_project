import React, { Component } from 'react';
import { Text, View, TouchableOpacity, TextInput, StyleSheet, Alert, ScrollView, FlatList, Image } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { CheckBox } from 'react-native-elements'

import { StackActions } from '@react-navigation/native'

/*const DECKS = [
  "Adult",
  "Kids"
];


const DATA = [
  {
    title: 'First Player',
    profPic: 'https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png?w=392',
  },
  {
    title: 'Second Player',
    profPic: 'https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png?w=392',
  },
  {
    title: 'Third Player',
    profPic: 'https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png?w=392',
  },
];*/

function Item({ title }) {
  //console.log(title)
  var profPic = 'https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png?w=392';
  return (
    <Card>
      <Card.Content style={{flexDirection:"row", justifyContent: "space-evenly"}}>
        <Card.Cover source={{uri: profPic}} style={{height:30, width: 30}}/>
        <Title style={{flex: 1}}>    {title}</Title>
      </Card.Content>
    </Card>
  );
}




export function LobbyWrapper({ route, navigation }) {
  console.log(route.params)
  const { username } = route.params;
  const { isHost } = route.params;
  const { lobbykey } = route.params;

  console.log("username: " + username)

  return (
    <View style={styles.container}>
      <Lobby navigation={navigation} username={username} isHost={isHost} lobbykey={lobbykey}/>
    </View>
  )
}


class Lobby extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: []
    }
    this.navigation = props.navigation;
    this.username = props.username;
    this.isHost = props.isHost;
    this.lobbykey = props.lobbykey;
    this.canPlay = this.canPlay.bind(this);
    this.isLobbyReady = this.isLobbyReady.bind(this)
  }

  componentDidMount() {
    this.interval = setInterval(this.isLobbyReady, 3000);
    if(!this.isHost) {
      fetch('http://10.74.50.180:3000/joinlobby', {
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
          //this.state.players = responseJson.players;
          this.setState({ players: responseJson.players })
        })
        .catch((error) => {
           console.log(error);
           Alert.alert("Failed to join lobby!")
        });
    }
  }

  isLobbyReady() {
    console.log("here")
    fetch('http://10.74.50.180:3000/lobbyready', {
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
        //this.state.players = responseJson.players;
        this.setState({ players: responseJson.players })
         if (responseJson.started) {
           clearInterval(this.interval)
           this.navigation.dispatch(
             StackActions.replace('GameWrapper', {username: this.username, lobbykey: this.lobbykey})
           )
         }
      })
      .catch((error) => {
         console.log(error);
         Alert.alert("Failed to check if game started!")
      });
  }

  canPlay() {
    if (this.isHost) {
      return(
        <TouchableOpacity style={{flex: 1, justifyContent: "center", alignItems: "center"}} onPress={() => {
          fetch('http://10.74.50.180:3000/startgame', {
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
               if (responseJson.started) {
                 //startgame
                 clearInterval(this.interval)
                 //this.navigation.navigate("GameWrapper", { username: this.username, lobbykey: this.lobbykey })
                 this.navigation.dispatch(
                   StackActions.replace('GameWrapper', {username: this.username, lobbykey: this.lobbykey})
                 )
               }
            })
            .catch((error) => {
               console.log(error);
            });

        }}>
          <Text style={{color: "white"}}>CLICK TO START</Text>
        </TouchableOpacity>
      );
    }
    else {
      return (
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
          <Text style={{color: "white"}}>WAITING TO START GAME</Text>
        </View>
      );
    }
  }

  render() {
    return(
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
          <ScrollView style={{flex:1}}>
            <FlatList data={Object.keys(this.state.players)} renderItem={({ item }) => <Item title={item} />} keyExtractor={item => item.id} />
          </ScrollView>
        </View>




        <View style={{backgroundColor: "black", flex:0.15}}>
          {this.canPlay()}
        </View>
      </View>
    );
  }

}
//put this in wrapper
/*export function Lobby({ route, navigation }) {

  const { username } = route.params;
  const { lobbykey } = route.params;
  const { isHost } = route.params;


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



        <View style={{flex: 1}}>
          <ScrollView style={{flex:1}}>
            <FlatList data={DATA} renderItem={({ item }) => <Item title={item.title} profPic={item.profPic}/>} keyExtractor={item => item.id} />
          </ScrollView>
        </View>



        <View style={{backgroundColor: "blue", flex:0.15}}>
          {canPlay(isHost, navigation, route.params)}
        </View>
      </View>
  );
}*/

const styles = StyleSheet.create({

  invalid: {
    fontFamily: "sans-serif-light",
    backgroundColor: "red",
    color: "white",
    fontSize: 15
  },

  container: {
    backgroundColor: "white",
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
