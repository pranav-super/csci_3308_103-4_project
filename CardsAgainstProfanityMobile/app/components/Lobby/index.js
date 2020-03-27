import React, { Component } from 'react';
import { Text, View, TouchableOpacity, TextInput, StyleSheet, Alert, ScrollView, FlatList, Image } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';


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
];

function Item({ title, profPic }) {
  console.log(title)
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

}


class Lobby extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
    this.username = props.username;
    this.lobbykey = props.username;
    this.isHost = props.isHost;
    this.lobbykey = props.lobbykey;
    this.canPlay = this.canPlay.bind(this);
  }
  //join lobby in a componentDidMount method. the response will send back the list of players. Then, poll every second to find more players in lobby and if game has started
  componentDidMount() {
    fetch('http://10.74.50.180:3000/joinlobby', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({winner: this.state.selected})
    })
      .then((response) => response.json())
      .then((responseJson) => {
         this.state.navigation.navigate('winner', { username: this.username, lobbykey: this.lobbykey })
      })
      .catch((error) => {
         console.log(error);
      });
  }

  canPlay(isHost, navigation, params) {
    if (this.state.isHost) {
      return(
        <TouchableOpacity style={{flex: 1, justifyContent: "center", alignItems: "center"}} onPress={() => this.state.navigation.navigate("GameWrapper", { username: this.state.username, lobbykey: this.state.lobbykey })}>
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

  container: {
    backgroundColor: "#ddd2ce",
    justifyContent: 'flex-start',
    flex: 1
  },


});
