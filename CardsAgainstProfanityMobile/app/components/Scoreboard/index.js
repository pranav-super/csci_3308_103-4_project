import React, { Component } from 'react';
import { Text, View, TouchableOpacity, TextInput, StyleSheet, Alert, ScrollView, FlatList, Dimensions, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Avatar, Button, Card, Title, Paragraph, DataTable } from 'react-native-paper';

import { StackActions } from '@react-navigation/native'

export function ScoreboardWrapperWrapper({ route, navigation }) {
  var { lobbykey } = route.params;

  return(
    <View style={styles.container}>
      <ScoreboardWrapper navigation={navigation} lobbykey={lobbykey} />
    </View>
  )
}


class ScoreboardWrapper extends Component {

  constructor(props) {
    super(props);
    this.state = {
      message: "",
      data: []
    }
    this.lobbykey = props.lobbykey;
    this.navigation = props.navigation;
  }

  render() {
    return (
        <View style={styles.container}>

            <View style={{backgroundColor: "blue", flex:0.15, flexDirection: "row"}}>
                <TouchableOpacity style={{backgroundColor: "red", flex: .30, justifyContent: "center", alignItems: "center"}} onPress={() => this.navigation.pop()}>
                    <Text> Go back </Text>
                </TouchableOpacity>

                <View style={{flex: 1, flexDirection:"column", justifyContent: "center", alignItems: "center"}}>
                    <Text style={{color: "white"}}>
                        SCOREBOARD
                    </Text>
                </View>

                <TouchableOpacity style={{backgroundColor: "red", flex: .30, justifyContent: "center", alignItems: "center"}} onPress={() => {
                  fetch('http://10.74.50.180:3000/updatescoreboard', {
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
                      console.log("HERE")
                      console.log(responseJson.scoreboard)
                       this.setState({data: responseJson.scoreboard})
                    })
                    .catch((error) => {
                       console.log(error);
                    });
                }}>
                    <Image source={{uri: 'https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/reload-512.png'}}/>
                </TouchableOpacity>
            </View>



            <View style={{flex: 1, flexDirection: "row"}}>
                <Table scores={this.state.data} lobbykey={this.lobbykey} style={{flex:0.8}} />
            </View>
        </View>

    )
  }
}


class Table extends Component {
    constructor(props) {
      super(props);
      this.state = {
        entries: props.scores
      }
      this.lobbykey = props.lobbykey;
    }

    componentDidMount() {
      fetch('http://10.74.50.180:3000/updatescoreboard', {
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
          console.log("HERE")
          console.log(responseJson.scoreboard)
           this.setState({entries: responseJson.scoreboard})
        })
        .catch((error) => {
           console.log(error);
        });
    }

    componentWillReceiveProps(nextProps) { //https://stackoverflow.com/questions/41233458/react-child-component-not-updating-after-parent-state-change
      this.setState({ entries: nextProps.scores });
    }

    render() {
        return(
          <View style={{flex: 1}}>
            <ScrollView>
              <DataTable>
                <DataTable.Header>
                  <DataTable.Title>Username</DataTable.Title>
                  <DataTable.Title numeric>Score</DataTable.Title>
                </DataTable.Header>

                {
                  this.state.entries.map((score, index) => {
                    return(
                      <DataTable.Row>
                        <DataTable.Cell>{score.username}</DataTable.Cell>
                        <DataTable.Cell numeric>{score.score}</DataTable.Cell>
                      </DataTable.Row>
                    )
                  })
                }
              </DataTable>
            </ScrollView>
          </View>
        )
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
