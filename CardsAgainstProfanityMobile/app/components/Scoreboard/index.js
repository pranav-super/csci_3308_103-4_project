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

            <View style={{backgroundColor: "black", flex:0.15, flexDirection: "row"}}>
                <TouchableOpacity style={{backgroundColor: "white", flex: .30, justifyContent: "center", alignItems: "center"}} onPress={() => this.navigation.pop()}>
                    <Image style={{width: "100%", height: "100%"}} source={{uri: 'https://lh3.googleusercontent.com/proxy/BIOIx-ejLU0gAusXvvtBkUpDlpd1vij0f6QAb-S1N77uPnTZIis72sN3EWgjgfCYdQHTZeWYfs_5vOpOAJF8xKu8qLn7HzdkXpFMpvSr_jlhfi1FWQb2UoHaigg0FttrpXEsCUw-WFIH-zSGQtlwmNo'}}/>
                </TouchableOpacity>

                <View style={{flex: 1, flexDirection:"column", justifyContent: "center", alignItems: "center"}}>
                    <Text style={styles.titleText}>
                        SCOREBOARD
                    </Text>
                </View>

                <TouchableOpacity style={{backgroundColor: "black", flex: .40, justifyContent: "center", alignItems: "center"}} onPress={() => {
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
                    <Image style={{width: "90%", height: "90%"}} source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRkVP28Mti-0t6WC9m0HdPY6GPKUx1MmFpJbC_gOPNAkfiDuEeA&usqp=CAU'}}/>
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
    fontSize: 30
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
