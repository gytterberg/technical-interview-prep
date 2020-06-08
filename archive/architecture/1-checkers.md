# Prompt

Design / architect checkers as a web-app.

# Checkers rules

In general, the *exact* details are not terribly important. The general gist of the game and how it's played is good to understand.

- [Written description](http://www.darkfish.com/checkers/rules.html)
- [Video tutorial](https://youtu.be/SuQY1_fCVsA)

# Specs

## App entry

- User can start a private game and receive a URL to share
- User can join a private game by URL
- User can start a public game
- User can browse existing public games
- User can join a public game
- User can spectate a public game

## Game

- User sees waiting screen while game has them
- Once a game has both players, it begins
- User sees whose turn it is
- Active user (only) can make a move
- User cannot make illegal move
- All users see moves in real time
- Once all of a player's pieces are taken, their opponent wins
- Upon game end, both users see the result
