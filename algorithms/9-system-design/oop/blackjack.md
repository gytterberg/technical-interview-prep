# Design a Deck of Cards and a Basic Game of Black Jack

## Goals of the System

Black Jack is played with a standard 52 card deck. A deck has 13 ranks (Ace, 2-10, Jack, Queen, King) and 4 suits (Diamonds, Spades, Clubs, Hearts).

- The players and the dealers are dealt separate hands with only two cards
- The players' goal is to make a hand that has more points than the dealers but is also less than or equal to 21 points.
- The players have an option to be "hit" once the game starts to add to their hand to get closer to 21.
- The dealer has the same option as the players.

### Point System

- 2-10 have 2-10 values
- Jack, Queen, King all have 10 point values
- Ace can be counted as a 1 or an 11
- Two card winner is an Ace and a Jack, Queen or King

### Gameplay

1. Players and dealer are dealt cards
2. Players and dealer can "hit" themselves to try to get to 21.
3. If anyone goes over, they fold.
4. Person with highest accumulated points (or 21) wins.
5. If multiple people tie, it's a draw.

## Main Actors of the System

- Dealer: Deals cards and game resolution and can "hit" self and stand
- Player: "Hit" self, stand

## Classes

- Card: A card in a deck with a value from 1 to 11.
- BlackJackCard: Jack, Queen, King have value of 10; Ace has value of 1 or 11
- Deck
- Hand: A collection of two cards
- Player
- Dealer
- Game

## Class Diagram

## Activity Diagram
