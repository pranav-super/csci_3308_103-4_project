import React, { Component } from 'react';
import { Text, View, TouchableOpacity, TextInput, StyleSheet, Alert, ScrollView, FlatList, Image } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph, DataTable } from 'react-native-paper';



const STATS = [
  {
    statName: 'Games Played',
    value: 25,
  },
  {
    statName: 'Win Loss Ratio',
    value: 0.3939293942309401,
  },
  {
    statName: 'Number of Decks',
    value: 2,
  },
  {
    statName: 'Pee Pee Poo Poo',
    value: 100,
  }
];

export function Stats({ route,navigation }) {

  const { username } = route.params;

  return (
      <View style={styles.container}>

        <View style={{backgroundColor: "black", flex:0.15, flexDirection: "row"}}>
          <View style={{flex: 1, flexDirection:"column", justifyContent: "center", alignItems: "center"}}>
            <Text style={styles.titleText}>
              STATS: {username}
            </Text>
          </View>
        </View>



        <View style={{flex: 1}}>
          <ScrollView>
              <DataTable>
                <DataTable.Header>
                  <DataTable.Title>Statistic</DataTable.Title>
                  <DataTable.Title numeric>Value</DataTable.Title>
                </DataTable.Header>
                {
                  STATS.map((item, index) => {
                    return(
                      <DataTable.Row>
                        <DataTable.Cell>{item.statName}</DataTable.Cell>
                        <DataTable.Cell numeric>{item.value}</DataTable.Cell>
                      </DataTable.Row>
                    )
                  })
                }
              </DataTable>
          </ScrollView>
        </View>

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
