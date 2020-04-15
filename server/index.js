const express = require('express')
var bodyParser = require('body-parser')
const app = express()
const port = 3000

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

var decks = {
  "Adult": [
    "Profane Word 1",
    "Profane Word 2",
    "Profane Word 3",
    "Profane Word 4",
    "Profane Word 5",
    "Profane Word 6",
  ],
  "Kids": [
    "Not Profane Word 1",
    "Not Profane Word 2",
    "Not Profane Word 3",
    "Not Profane Word 4",
    "Not Profane Word 5",
    "Not Profane Word 6",
  ]
}

var promptDecks = {
  "Adult": [
    {
      text: "What do you get when the _____ is a ______?",
      numSlots: 2
    }
  ],
  "Kids": [
    {
      text: "What do you get when the chicken crossed the ______?",
      numSlots: 1
    }
  ]
}


/*var userpermissionsmapping = { //THIS WILL BE REPLACED BY AN SQL REQUEST, OR A REQUEST IN Landing/index.js WHERE THE USER PICKS THE DECKS TO USE FROM A FETCH REQUEST.
  "Player1": ["Kids"]
}*/


var gameState = {
  defaultValue: 1
}
/*{
  players: {
    "Player1": {
      cards: ["funny1", "funny2", "funny3"],
      role: "judge",
      status: "WAITING"
    },

    "Player2": {
      cards: ["funny1", "funny2", "funny3"],
      role: "player",
      status: "PLAYING"
    },

    "Player3": {
      cards: ["funny1", "funny2", "funny3"],
      role: "player",
      status: "PLAYING"
    },

    "Player4": {
      cards: ["funny1", "funny2", "funny3"],
      role: "player",
      status: "PLAYING"
    }
  },

  chat: [
    {
      author: "Player1",
      message: "i want her"
    },
    {
      author: "Player2",
      message: "i want her"
    },
    {
      author: "Player1",
      message: "i want her"
    },
    {
      author: "Player3",
      message: "i want her"
    },
    {
      author: "Player1",
      message: "i want her"
    }
  ],

  prompt: {
    text: "Here's a funny question, what do you get when _____ goes _____?",
    numSlots: 2,
    responses: [
      {
        player: "Player 1",
        value: "funny phrase"
      },
      {
        player: "Player 2",
        value: "funny phrase 2"
      },
      {
        player: "Player 3",
        value: "funny phrase 3"
      }
    ],
    winner: null
  },

  deck: [
    "Balls",
    "In",
    "My",
    "Face"
  ],

  promptDeck: [
    {
      text: "Here's a funny question, what do you get when _____ goes _____?",
      numSlots: 2
    },
    {
      text: "The chicken crossed the road because ______.",
      numSlots: 1
    }
  ]
}*/



//////////////////////////////////////////////////GAME//////////////////////////////////////////////////

/*this will post a username. This will respond with that user’s role this round.*/
app.post('/role', (req, res) => {
  let lobbykey = req.body.lobbykey;
  let username = req.body.username;

  /*if (username != "P") {
    gameState[lobbykey].players[username].role = "judge"
  }
  else {
    gameState[lobbykey].players[username].role = "player"
  }*/

  res.json({
    role: gameState[lobbykey].players[username].role
  })
})



/*this will post a username. This will respond with a state update for players that are
ready to play this round; this update includes the cards they have this round, and
information on this round’s prompt.*/
app.post('/playerselectstate', (req, res) => {
  let lobbykey = req.body.lobbykey;
  let username = req.body.username;
  console.log(gameState[lobbykey].players[username])
  res.json({
    cards: gameState[lobbykey].players[username].cards,
    prompt: gameState[lobbykey].prompt
  })
})



/*this lets a judge in the game know if it is time to start judging cards, i.e. if
all submissions are in. This will respond with whether the game is ready or not.*/
app.post('/readytojudge', (req, res) => {
  console.log("HERE!!!")
  let lobbykey = req.body.lobbykey
  console.log("RESPONSES: ")
  console.log(gameState[lobbykey].prompt.responses)
  console.log(gameState[lobbykey].prompt.responses.length)
  console.log(Object.keys(gameState[lobbykey].players).length)
  if (gameState[lobbykey].prompt.responses.length == Object.keys(gameState[lobbykey].players).length - 1) {
    res.json({
      finished: true
    });
  }
  res.json({finished:false});
})



/*this lets a player know if judging is over, and if the game has a winner. This
will respond with whether the game is ready or not.*/
app.post('/readytoshowwinner', (req,res) => {
  let lobbykey = req.body.lobbykey;
  if(gameState[lobbykey].prompt.winner != null) {
    res.json({
      ready: true
    });
  }
  else {
    res.json({ready: false});
  }
})



/*this gives a state update for judges when the game is ready for them to pick a
winner - this will respond with an update including all the responses, and the
prompt.*/
app.post('/judgeselectstate', (req, res) => {
  let lobbykey = req.body.lobbykey;
  console.log(gameState[lobbykey].prompt.responses)
  var responseStringArr = [];
  for (var i = 0; i < gameState[lobbykey].prompt.responses.length; i++) {
    var obj = gameState[lobbykey].prompt.responses[i]
    var responseStr = ''
    for (var j = 0; j < obj.value.length; j++) {
      var str = obj.value[j]
      responseStr += str + ", "
    }
    console.log(responseStr)
    responseStringArr.push(responseStr)
  }

  console.log(responseStringArr)

  res.json({
    cards: responseStringArr,
    prompt: gameState[lobbykey].prompt
  })
})



/*this will post a lobbykey. This would be used whenever a user opens their
scoreboard, which would warrant an update. This will respond with an updated
scoreboard.*/
app.post('/updatescoreboard', (req, res) => {
  lobbykey = req.body.lobbykey;

  res.json({
    scoreboard: gameState[lobbykey].scoreboard
  })
})



/*this will post a lobbykey, and a new message. This would be used whenever a
user sends a message. This will respond with an updated chat/list of
messages.*/
app.post('/sendchat', (req, res) => {
  message = req.body.message;
  lobbykey = req.body.lobbykey;

  gameState[lobbykey].chat.push(message);
  res.json({
    chat: gameState[lobbykey].chat
  })
})



/*this will post a lobbykey. This would be used whenever a user opens their chat,
which would warrant an update. This will respond with an updated chat/list of
messages.*/
app.post('/updatechat', (req, res) => {
  lobbykey = req.body.lobbykey;

  res.json({
    chat: gameState[lobbykey].chat
  })
})



/*this will post a username and a card that the user selected. This is how a
user sends the card that corresponds to their response. The game removes that
card from the cards they had, and gives them a new one to replace it, and adds
it to the list of responses that it will send the judge. This will respond with
confirmation on whether the submission was successful.*/
app.post('/playerres', (req, res) => {
  let lobbykey = req.body.lobbykey;
  console.log(req.body.selected)
  console.log(gameState[lobbykey].prompt.responses)
  gameState[lobbykey].prompt.responses.push({
    player: req.body.username,
    value: req.body.selected
  });
  for (var i = 0; i < req.body.selected.length; i++) {
    gameState[lobbykey].players[req.body.username].cards.splice(gameState[lobbykey].players[req.body.username].cards.indexOf(req.body.selected[i]),1);
    if(gameState[lobbykey].deck.length > 0)
      gameState[lobbykey].players[req.body.username].cards.push(gameState[lobbykey].deck.pop());
  }
  res.json({
    completed: true
  })
})



/*this will post a card that the judge selects as the winning card. This is how
a judge sends the information on the winning card, which the server uses to
figure out which user is the winner. It also updates the state of the game, so
that players can figure out if the round has ended, via /readytoshowwinner. This
will respond with confirmation on whether the submission was successful.*/
app.post('/judgeres', (req, res) => {
  let lobbykey = req.body.lobbykey;

  //find the winning player
  var winningPlayer = ""
  for (var i = 0; i < gameState[lobbykey].prompt.responses.length; i++) {
    if(gameState[lobbykey].prompt.responses[i].value == req.body.winner[0]) {
        winningPlayer = gameState[lobbykey].prompt.responses[i].player;
        break;
    }
  }

  //update gameState
  gameState[lobbykey].prompt.winner = {
    player: winningPlayer,
    value: req.body.winner[0]
  }

  //update scoreboard
  for (var i = 0; i < gameState[lobbykey].scoreboard.length; i++) {
    if(gameState[lobbykey].scoreboard[i].username == winningPlayer) {
      gameState[lobbykey].scoreboard[i].score += 1;
      break;
    }
  }
  gameState.sort((a,b) => a.score-b.score);

  res.json({
    completed: true
  })
})



/*this sends information on the winner of a round: who submitted the card and
what it was. Should the game be over/should there be no more cards, the game
ends here. Otherwise, it updates the game state with a new prompt. This will
respond with the card that won, and the username of the winner.*/
app.post('/winner', (req, res) => { //grab the winner, update state
  let lobbykey = req.body.lobbykey;
  let oldPrompt = gameState[lobbykey].prompt;
  let winner = gameState[lobbykey].prompt.winner;
  //CLEAR OUT STATE!!! UPDATE JUDGE!!!


  //assign cards to each player
  for (var player of Object.keys(gameState[lobbykey].players)) {
    gameState[lobbykey].players[player].cards = gameState[lobbykey].deck.splice(0, 2);
    gameState[lobbykey].players[player].role = "player";
  }

  //choose a judge at random
  var playerNames = Object.keys(gameState[lobbykey].players);
  var index = Math.floor(Math.random() * playerNames.length);
  gameState[lobbykey].players[playerNames[index]].role = "judge";


  if(gameState[lobbykey].deck.length == 0 || gameState[lobbykey].promptDeck.length == 0) {
    //end the game.
    //REMOVE THIS GAME BY LOBBYKEY.
    delete gameState[lobbykey];
    res.json({
      prompt: oldPrompt,
      winner: winner,
      status: "ended"
    })
  }

  else {
    //choose a new prompt
    var newPrompt = gameState[lobbykey].promptDeck.pop();
    gameState[lobbykey].prompt = {
      text: newPrompt.text,
      numSlots: newPrompt.numSlots,
      responses: [

      ],
      winner: null
    }

    res.json({
      prompt: oldPrompt,
      winner: winner
    })
  }
})



//////////////////////////////////////////////////LOBBY//////////////////////////////////////////////////

/*this will post a username. This is the pathway that users can use to create a
lobby, initializing that lobby’s game state. This responds with the lobbykey of
the lobby that the server has just created for the user.*/
app.post('/createlobby', (req, res) => {
  console.log("REACHED")
  console.log("Req.params: ")
  console.log(req.params)
  console.log(req.query)
  console.log(req.body)
  var newId = '';
  do {
    newId = ''
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; //https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
    var charactersLength = characters.length;
    for ( var i = 0; i < 6; i++ ) {
      newId += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    //console.log(gameState.hasOwnProperty(newId))
  }
  while (gameState.hasOwnProperty(newId));

  //console.log("here")
  //we now created a new identifier/lobby key
  //let's create the game's state, importing the cards and the like, and adding this user to it.

  //combine decks into a big array
  var fullDeckOfPrompts = [];
  var fullDeckOfResponses = [];
  //console.log(req.body.decks)
  for (var deck of req.body.decks) {
    /*console.log(deck)
    console.log(promptDecks)
    console.log(promptDecks[deck])*/
    fullDeckOfPrompts = fullDeckOfPrompts.concat(promptDecks[deck]);
    fullDeckOfResponses = fullDeckOfResponses.concat(decks[deck]);
  }

  /*console.log("fulldeck\n ")
  console.log(fullDeckOfPrompts)
  console.log("fulldeck\n")
  console.log(fullDeckOfResponses)*/

  let username = req.body.username;

  gameState[newId] = {

    players: {
      [username]: {
        cards: [],
        role: "judge",
        status: "WAITING"
      }
    },

    chat: [

    ],

    scoreboard: [
      {
        username: username,
        score: 0
      }
    ],

    prompt: {
      text: "",
      numSlots: -1,
      responses: [

      ],
      winner: null
    },

    deck: fullDeckOfResponses,

    promptDeck: fullDeckOfPrompts,

    started: false
  }
  //send back lobbykey

  console.log(newId)

  res.json({
    lobbykey: newId
  })

})



/*this will post a username and a lobbykey. This is the pathway that users can
use to join a lobby. This responds with confirmation on whether they have been
added, or on whether the lobbykey is invalid.*/
app.post('/joinlobby', (req, res) => {
  //get LOBBYKEY
  console.log(req.body)
  var lobbykey = req.body.lobbykey;
  var username = req.body.username;

  gameState[lobbykey].players[req.body.username] = {
    cards: [],
    role: "player",
    status: "WAITING"
  }

  gameState[lobbykey].scoreboard.push({
    username: [username],
    score: 0
  })

  res.json({
    players: gameState[lobbykey].players
  })
})



/*this will post a lobbykey. This will respond with whether the game for this
lobby has started or not.*/
app.post('/lobbyready', (req, res) => {
  console.log("LOBBYREADY CHECK")
  //get lobbykey
  var lobbykey = req.body.lobbykey;
  //check if user started it
  res.json({
    started: gameState[lobbykey].started,
    players: gameState[lobbykey].players
  });
})



/*this will post a lobbykey, and start its game. A lobby host would use this
route. This will respond with confirmation that the game has started.*/
app.post('/startgame', (req, res) => {
  //get lobbykey
  var lobbykey = req.body.lobbykey;

  //fill decks, assign cards too
  //assign state
  var players = gameState[lobbykey].players;
  var promptDeck = gameState[lobbykey].promptDeck;
  var overallDeck = gameState[lobbykey].deck;

  //assign cards to each player
  for (var player of Object.keys(players)) {
    players[player].cards = overallDeck.splice(0, 2);
    players[player].role = "player";
  }

  //choose a judge at random
  var playerNames = Object.keys(players);
  var index = Math.floor(Math.random() * playerNames.length);
  players[playerNames[index]].role = "judge";


  //choose a new prompt
  var newPrompt = promptDeck.pop();//splice(0,1);
  console.log(promptDeck)
  console.log(newPrompt)
  gameState[lobbykey].prompt = {
    text: newPrompt.text,
    numSlots: newPrompt.numSlots,
    responses: [

    ],
    winner: null
  }


  //start:
  if (!gameState[lobbykey].started) { //we call this method whenever we reassign roles.
    gameState[lobbykey].started = true;
  }

  res.json({
    started: true
  })

})



/*this will post a lobbykey, and respond with whether it is a valid lobbykey or not.*/
app.post('/verifylobby', (req, res) => {
  var lobbykey = req.body.lobbykey;

  res.send({valid: gameState.hasOwnProperty(lobbykey)});
})



//////////////////////////////////////////////////USER AUTHENTICATION//////////////////////////////////////////////////

/*this posts a username and a password hash to authenticate. This will respond
with verification that the user was authenticated or not.*/
app.post('/verifyuser', (req, res) => { //TO DO
  //TO DO
})



/*this posts a username and a password hash to create a new user. This will
respond with verification that the user was created.*/
app.post('/newuser', (req, res) => { //TO DO
  //TO DO
})



/*this posts a username. This will respond with the user stats responding to that username.*/
app.post('/userstats', (req, res) => { //TO DO
  //TO DO
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}.`)
})
