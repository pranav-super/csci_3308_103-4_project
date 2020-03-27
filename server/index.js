const express = require('express')
const app = express()
const port = 3000


var gameState = {
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
}

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

app.get('/readyToShowWinner', (req,res) => {
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


app.get('/createLobby', (req, res) => {

})

app.post('/joinlobby', (req, res) => {

})

app.listen(port, () => {
  console.log(`Dis server listening on port ${port}!`)
})
