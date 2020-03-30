const express = require('express')
const app = express()
const port = 3000



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
    "What do you get when the _____ is a ______?"
  ],
  "Kids": [
    "What do you get when the chicken crossed the ______?"
  ]
}


var userpermissionsmapping = { //THIS WILL BE REPLACED BY AN SQL REQUEST, OR A REQUEST IN Landing/index.js WHERE THE USER PICKS THE DECKS TO USE FROM A FETCH REQUEST.
  "Player1": ["Kids"]
}


var gameState =
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

//app.get('/', (req, res) => res.send(gameState))
app.post('/role', (req, res) => {
  let username = req.params.username;
  res.json({
    role: gameState.players[username].role
  })
})

app.post('/playerselectstate', (req, res) => {
  let username = req.params.username;
  res.json({
    cards: gameState.players[username].cards,
    prompt: gameState.prompt
  })
})

app.get('/readytojudge', (req, res) => {
  if (gameState.prompt.responses.length == gameState.players.length) {
    res.json({
      finished: true
    });
  }
  res.json({finished:false});
})

app.get('/judgeselectstate', (req, res) => {
  res.json({
    cards: gameState.prompt.responses,
    prompt: gameState.prompt
  })
})

app.get('/readytoshowwinner', (req,res) => {
  if(gameState.prompt.winner != null) {
    res.json({
      ready: true
    });
  }
  res.json({ready: false});
})

app.post('/playerres', (req, res) => {
  gameState.prompt.responses.push({
    player: req.params.username,
    value: req.params.selected
  });
  for (var i = 0; i < req.params.value.length; i++) {
    gameState.players[req.params.username].cards.splice(gameState.players[req.params.username].cards.indexOf(req.params.selected[i]),1);
    if(deck.length > 0)
      gameState.players[req.params.username].cards.push(gameState.deck.pop());
  }
  res.json({
    completed: true
  })
})

app.post('/judgeres', (req, res) => {
  var winningPlayer = ""
  for (int i = 0; i < gameState.prompt.responses.length; i++) {
    if(gameState.prompt.responses[i].value == req.params.winner[0]) {
        winningPlayer = gameState.prompt.responses[i].player;
        break;
    }
  }
  gameState.prompt.winner = {
    player: winningPlayer,
    value: req.params.winner[0]
  }
  res.json({
    completed: true
  })
})

app.get('/winner', (req, res) => {
  let oldPrompt = gameState.prompt;
  let winner = gameState.prompt.winner;
  //CLEAR OUT STATE!!! UPDATE JUDGE!!!

  if(gameState.deck.length == 0 || gameState.promptDeck.length == 0) {
    //end the game.
    //REMOVE THIS GAME BY LOBBYKEY.
    res.json({
      status: "ended"
    })
  }

  let newPrompt = gameState.promptDeck.pop()
  gameState.prompt.text = newPrompt.text;
  gameState.prompt.responses = [];
  gameState.prompt.winner = null;

  res.json({
    prompt: oldPrompt,
    winner: winner
  })
})


app.post('/createlobby', (req, res) => {
  var newId = '';
  do {
    newId = ''
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; //https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      newId += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
  }
  while (!gameState.hasOwnProperty(newId));

  //we now created a new identifier/lobby key
  //let's create the game's state, importing the cards and the like, and adding this user to it.

  let username = req.params.username;

  gameState[newId] = {

    players: {
      username: {
        cards: [],
        role: "judge",
        status: "WAITING"
      }
    },

    chat: [

    ],

    prompt: {
      text: "",
      numSlots: -1,
      responses: [

      ],
      winner: null
    },

    deck: [

    ],

    promptDeck: [

    ],

    started: false
  }

  //fill decks, assign cards too, shuffle?

  //assign state?

  //send back lobbykey
})

app.post('/joinlobby', (req, res) => {
  //get LOBBYKEY

  //assign state
})

app.post('/lobbyready', (req, res) => {
  //get lobbykey
  //check if user started it
})

app.post('/startgame', (req, res) => {
  //get lobbykey
  //start
})

app.listen(port, () => {
  console.log(`Dis server listening on port ${port}!`)
})
