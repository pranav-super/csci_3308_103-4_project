import * as React from 'react';
import { Text, View, TouchableOpacity, TextInput, StyleSheet, Alert, Button } from 'react-native';import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Login } from './app/components/Login/index.js';
import { CreateAccount } from './app/components/Create User/index.js';
import { Landing } from './app/components/Landing/index.js';
import { LobbyWrapper } from './app/components/Lobby/index.js';
import { GameWrapper } from './app/components/Game/index.js';
import { JLobby } from './app/components/Join Lobby/index.js';
import { Stats } from './app/components/Stats/index.js';
import { DeckSelectWrapper } from './app/components/Landing/deck-select.js';
import { JudgeWaitWrapper } from './app/components/Game/judge-wait.js';
import { JudgeSelectWrapper } from './app/components/Game/judge-select.js';
import { PlayerSelectWrapper } from './app/components/Game/player-select.js';
import { PlayerWaitWrapper } from './app/components/Game/player-wait.js';
import { WinnerWrapper } from './app/components/Game/winner.js';
//import { SubmittedForJudges } from './app/components/SubmittedForJudges/index.js';
//import { SubmittedForPlayers } from './app/components/SubmittedForPlayers/index.js';
import { ChatWrapperWrapper } from './app/components/Chat/index.js';
import { ScoreboardWrapperWrapper } from './app/components/Scoreboard/index.js';


/*function DetailsScreen({ route,navigation }) {
  const { itemId } = route.params;
  const { otherParam } = route.params;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Text>itemId: {JSON.stringify(itemId)}</Text>
      <Text>otherParam: {JSON.stringify(otherParam)}</Text>
      <Button
        title="Go to Details... again"
        onPress={() =>
          navigation.push('Details', {
            itemId: Math.floor(Math.random() * 100),
          })
        }
      />
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}*/

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}}>

        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Landing" component={Landing} />
        <Stack.Screen name="CreateAccount" component={CreateAccount} />


        <Stack.Screen name="LobbyWrapper" component={LobbyWrapper} />
        <Stack.Screen name="DeckSelectWrapper" component={DeckSelectWrapper} />
        <Stack.Screen name="JLobby" component={JLobby} />



        <Stack.Screen name="GameWrapper" component={GameWrapper} />

        <Stack.Screen name="PlayerSelectWrapper" component={PlayerSelectWrapper} />
        <Stack.Screen name="PlayerWaitWrapper" component={PlayerWaitWrapper} />

        <Stack.Screen name="JudgeSelectWrapper" component={JudgeSelectWrapper} />
        <Stack.Screen name="JudgeWaitWrapper" component={JudgeWaitWrapper} />

        <Stack.Screen name="WinnerWrapper" component={WinnerWrapper} />



        <Stack.Screen name="Stats" component={Stats} />
        <Stack.Screen name="Chat" component={ChatWrapperWrapper} />
        <Stack.Screen name="Scoreboard" component={ScoreboardWrapperWrapper} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default App;


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
