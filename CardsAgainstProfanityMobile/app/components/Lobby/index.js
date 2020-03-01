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


function canPlay(isHost, navigation, params) {
  if (isHost) {
    return(
      <TouchableOpacity style={{flex: 1, justifyContent: "center", alignItems: "center"}} onPress={() => navigation.navigate("Game", params)}>
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

export function Lobby({ route, navigation }) {

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
}

const styles = StyleSheet.create({

  container: {
    backgroundColor: "#ddd2ce",
    justifyContent: 'flex-start',
    flex: 1
  },


});
