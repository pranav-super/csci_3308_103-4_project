import React, { Component } from 'react';
import { Text, View, TouchableOpacity, TextInput, StyleSheet, Alert, ScrollView, FlatList, Dimensions, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

import { StackActions } from '@react-navigation/native'

export function ChatWrapperWrapper({ route, navigation }) {
  var { username } = route.params;
  var { lobbykey } = route.params;

  return(
    <View style={styles.container}>
      <ChatWrapper username={username} navigation={navigation} lobbykey={lobbykey} />
    </View>
  )
}


class ChatWrapper extends Component {

  constructor(props) {
    super(props);
    this.state = {
      message: "",
      data: []
    }
    this.username = props.username;
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
                        CHAT
                    </Text>
                </View>

                <TouchableOpacity style={{backgroundColor: "black", flex: .30, justifyContent: "center", alignItems: "center"}} onPress={() => {
                  fetch('http://128.138.54.141:10243/updatechat', {
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
                      console.log(responseJson.chat)
                       this.setState({data: responseJson.chat})
                    })
                    .catch((error) => {
                       console.log(error);
                    });
                }}>
                    <Image style={{width: "90%", height: "90%"}} source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRkVP28Mti-0t6WC9m0HdPY6GPKUx1MmFpJbC_gOPNAkfiDuEeA&usqp=CAU'}}/>
                </TouchableOpacity>
            </View>



            <View style={{flex: 1, flexDirection: "row"}}>
                <Chat messages={this.state.data} navigation={this.state.navigation} style={{flex:0.8}} />
            </View>

            <View style={{backgroundColor: "white", flex:0.15}}>
                <TextInput onChangeText={(text) => this.setState({message: text})} value={this.state.message} onSubmitEditing={(text) => {
                  console.log("hiiiiiiiiiiiii")
                  //append message to messages, handled in fetch
                  /*var tempData = data;
                  tempData.append({
                    author: username,
                    message: text
                  })
                  setData(tempData)*/

                  //clear text
                  if(this.state.message != "") {
                    this.setState({message: ""})

                    //send message on server
                    fetch('http://128.138.54.141:10243/sendchat', {
                      method: 'POST',
                      mode: 'cors',
                      headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({"lobbykey": this.lobbykey, "message":
                                                                                  {
                                                                                    author: this.username,
                                                                                    message: this.state.message
                                                                                  }})
                    })
                      .then((response) => response.json())
                      .then((responseJson) => {
                        console.log("here - 2")
                        console.log(responseJson.chat)
                        this.setState({data: responseJson.chat})
                      })
                      .catch((error) => {
                         console.log(error);
                      });
                  }

                }} placeholder={"Enter Message!"} style={styles.textField} />
            </View>

        </View>

    )
  }




}



function Message({ author, message }) {
    //console.log(title)
    var profPic = 'https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png?w=392';
    return (
        <Card>
            <Card.Content style={{flexDirection: "row", alignItems: 'flex-end'}}>
                <Card.Cover source={{uri: profPic}} style={{height:30, width: 30}}/>
                <View style={{flex: 0.2}}></View>
                <Title>{author}</Title>
            </Card.Content>
            <Card.Content style={{flexDirection: "column"}}>
                <View style={{flex: 0.2}}><Text>  </Text></View>
                <Paragraph style={{flex:0.8}}>{message}</Paragraph>
            </Card.Content>
        </Card>
    );
}



class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: props.messages
        }
        this.navigation = props.navigation
    }

    componentWillReceiveProps(nextProps) { //https://stackoverflow.com/questions/41233458/react-child-component-not-updating-after-parent-state-change
      this.setState({ messages: nextProps.messages });
    }

    render() {

      console.log("RERENDERING!!!")
      console.log(this.state.messages)

        return(
            <View style={{flex: 1}}>
                <ScrollView ref={ref => {this.scrollView = ref}} onContentSizeChange={() => this.scrollView.scrollToEnd({animated: true})}>
                    { //scroll to bottom effect: https://stackoverflow.com/questions/29310553/is-it-possible-to-keep-a-scrollview-scrolled-to-the-bottom
                      this.state.messages.map((message, index) => {
                        return(
                          <View style={{flexDirection: "row"}}>
                            <View style={{flex:0.1}}></View>
                            <View style={{flex:0.8}}>
                              <View><Text> </Text></View>
                                <Message author={message.author} message={message.message} index={index}/>
                              <View><Text> </Text></View>
                            </View>
                            <View style={{flex:0.1}}></View>
                          </View>
                        );
                      })
                    }
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
