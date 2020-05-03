# Cards Against Profanity

A project for CSCI 3308 by team TeamName (103-4), consisting of Austin Lucas (A-Luc), Christopher Mccarroll-Gilbert (chrismcg14), Hayes Vavpetic (hayes-vavpetic), Pranav Subramanian (pranav-super), and Justin Murillo (jumu3668).

## About Our Project:

Cards Against Profanity is a novel take on the classic “Cards Against Humanity”/“Apples to Apples” type game. All 3 of these games operate under the same premise. Every player is dealt a few cards, which we can call “response cards”. Every single round, a new card, which we refer to as a “topic card” is provided. The topic card might look something like, “I like to _____.” It’s now the players’ duty to select one of their response cards, which could be really any word, and use those cards to respond to the topic card. If my best response card is just the word “cry”, I’d play that and hope nobody else put something better. Every round, a judge is picked (on a rotation), and the judge is the only player that, instead of submitting a card this round, judges the submissions and picks the best response. The judge picks a winning card, and the player who played that card wins the topic card, or an associated number of points!
The novel feature that we provide is the fact that we have migrated this card game to be a playable mobile application, and unlike “Cards Against Humanity”, which is geared towards adults, and “Apples to Apples”, which is geared towards kids, our game lets players choose if they want to play with kid-friendly or adult-friendly cards.

Also, by virtue of being an application, we offer user authentication services that allow players to have their own accounts, so that they can keep track of their own statistics, including information about how many games they've won! We also offer an in-game chat functionality, a live scoreboard, as well as a lobby creation system based on lobby keys, so that you can play * *locally* * with your friends by letting them know what the lobbykey is!

## Technologies Utilized:

- Node.js
- React Native
- Express.js
- MySQL
- Heroku

# Repository Organization/Structure

There are three folders that comprise this repository. Each of the following subsections details some important information about each of them.

## CardsAgainstProfanityMobile
This folder contains everything pertaining to the frontend, which was developed in React Native.

It has a main `App.js` file, which is the file that links all the components and views in the application together, while also initializing the navigator (based on the `react-navigation` library) that enables transitions between these views. This is sort of like a driver!

This folder also contains a `package.json` file, which contains all the important packages and dependencies that the frontend of our application relies on. Everything in the `node_modules` folder ultimately stems from importing all of these libraries.

The final thing to note is the `app/components` folder. In here is where the heart of the application lies, as this contains all the subdirectories and `.js` files that define every component and view that makes up our application, from user login capabilities, to gameplay capabilities!

## server
This folder contains everything pertaining to both the middleware and the backend.

Like the `CardsAgainstProfanityMobile` folder, this also has a `node_modules` folder; both of these folders and their related applications/software depend on packages that come from the Node Package Manager (npm). React Native, for example, can be installed and managed via npm.

The main file here is the `server.js` file. This file outlines the `Express.js` code for the middleware of our application, which handles everything from user authentication, to actually managing the game's state while it runs! The application reaches out to the server described in `server.js` as it is running, to figure out what to display based on what the server tells the app the game's state is.

Finally, there is the `test.sql` file. This file outlines all the SQL code which our database uses (we use a database primarily for user-authentication).

## Additional Project Information
This folder contains additional project information, namely a short demonstational video outlining the application's capabilities, a list of test cases, our seventh milestone, as well as a list of cURL requests.  A client using a shell could utilize these to mimic another player - it has a list of POST requests that, when sent at the server described earlier in `server.js`, could manipulate an existing game's state the same way a player playing the game would (also, you can use some of these requests to create instances of games too!).





# Deployment

<s>We chose to deploy our app locally. Should you want to play the game, you would want to work through the following steps involved in setting everything up.</s>
We chose to deploy the user profile system through Heroku database hosting. The rest is done locally. Should you want to play the game, you would want to work through the following steps involved in setting everything up.

## Requirements

- You are going to want an Android phone to run this. We elaborate on why in the following section, when we discuss preparing the mobile device.

## Setup

<s>-First, install the most recent version of `MySQL Workbench` and `MySQL Server`; for us, this was version **8.0**.
 - Take note of your root password!
 - Upon Installing it, go into `MySQL Workbench`, and connect to your local instance of MySQL.
 - Press `CTRL` + `T`, and open up a new query. In it, enter the code found in `test.sql` (in the `server`) directory of the repository. Make sure to modify the password on line 5 with your actual password. Run it.
 - Finally, go into your shell, navigate to the bin directory with your `MySQL Server 8.0` directory (this might look like, on a Windows machine: `C:\Program Files\MySQL\MySQL Server 8.0\bin`), and enter `mysql -u root -p`. It'll prompt you for a password, and upon entering it correctly, if you can sign into MySQL, and find a database in your MySQL instance by the name of `game_db` (a `SHOW databases;` command should do the trick), everything should be good to go on your backend!</s>

First, we are going to install nodejs and react native in order for the app to run properly

- Install Node.js (https://nodejs.org/en/download/) and React Native (following this: https://reactnative.dev/docs/environment-setup, specifically following the * *React Native CLI Quickstart* * option, as well as the * *Android* * option, which is what WE focused on).

- Clone the repository into a preferred directory.

- Fetch the necessary packages; go to the `CardsAgainstProfanityMobile` directory, and run `npm install`, which will install all dependencies listed in the `package.json` file. Go to the `server` directory, and do the same.

- Prepare your mobile device.
 - We did all of our testing on Android. Because React Native does provide cross-platform capabilities, and does compile natively, you could try to run it on an iPhone, but this might not work, as certain dependencies are unfortunately specific to Android and iOS; this might be true of some of ours. We have not tested this application on iOS (No one in our group owns Apple products), so we would prefer that you try to run it on Android. The following instructions are Android specific, as a result.
 - Enable developer mode, and USB debugging, following: https://developer.android.com/studio/debug/dev-options. One you have done this, if you plug your phone into your desktop via USB, your Android should say in its notifications that it is connected to your laptop for USB debugging. Since you should have Android Studio installed, you can go into your shell and enter `adb devices`, and it should verify that your device is connected!

- You're going to want to modify the code a little. Although we are deploying our application locally, a remote device, such as a phone, still needs to access the server that you would run on your desktop. This depends on its IP address.
 - Verify that your phone and desktop are on the same network.
 - Once you have done this, run `ipconfig`, or `ifconfig`, depending on your system, to obtain your local IP address. This should be the one corresponding to the interface that connects to the same network that your phone is connected to!
 - Modify the following files in the `CardsAgainstProfanityMobile/app/components` directory by replacing every occurence of `10.74.50.180` with * *your* * IP Address (this should, of course, be a local address):
  - `Chat/index.js lines 39 and 49`
  - `Create User/index.js line 29`
  - `Game/index.js line 158`
  - `Game/judge-select.js line 67`
  - `Game/judge-wait.js line 48`
  - `Game/player-select.js line 62, 85, 161`
  - `Game/player-wait.js line 48`
  - `Game/winner.js line 50`
  - `Join Lobby/index.js`
  - `Landing/deck-select.js`
  - `Lobby/index.js`
  - `Login/index.js`
  - `Scoreboard/index.js`
  - `Stats/index.js`
- Do the same for the `postRequestCurl` file in the `Additional Project Information` directory.
- Also, update `server.js` in the `server` directory with database information matching * *your* * MySQL instance (this involves changing line 55).


## Deployment/Running the Application
- Open three shell windows, all in the base folder where you cloned your repository.
- In the first shell window, go to the `server` directory, and run the command `node server.js`. You should see that it is listening on port 3000.
- In the second shell window, go to the `CardsAgainstProfanityMobile` directory, and run `npx react-native run-android` (or `npx react-native run-ios` if you're curious to see what dependencies might break or not break). Ensure that your phone is plugged in, and that running `adb devices` confirms that your phone is connected, prior to doing this!
 - And, like that, your app should be running! You can create a user, log in, and then try and run a game!
- Should you want another player, I’d like to refer you to your third shell window and the file `postRequestCurl`, found in the `AdditionalProjectInformation` directory.
 - Each of the commands listed in this file can be run, allowing your desktop to act as a user in a game, if you want to test out our system's multiplayer capabilities! Since our server gets input via POST requests, by sending these cURL POST requests, you are effectively emulating a player, without needing to run two instances of the app.
 - We used these extensively in testing, and you should be able to act as a proxy player, through your desktop.
 - For example, you can start a lobby by entering the appropriate command listed in the file; the response you get back tells you what your lobbykey is, which your instance on your phone could use to join the lobby that you created via your desktop!
