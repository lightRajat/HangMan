
# hangman.js

> **To create the classic guess-the-word game with all the functions you might need**

--------------------------------------

## Table of Contents

1. [What is HangMan](#what-is-hangman)
2. [Features](#notable-features)
3. [Setup](#setup)
4. [Documentation](#precise-documentation)
5. [Program Flow](#general-flow-of-program)
6. [License](#what-can-you-do-with-this)
7. [Contribute](#contribute)
8. [Thank You Note](#thank-you-for-using)

--------------------------------------

## What is HangMan

Hangman is a classic guess-the-word game where the player has to guess a hidden word (represented by dashes or stars in place of every letter) by suggesting letters within a constrained number of tries. Every correct guess reveals the positions of guessed letter in the hidden word until the player runs out of tries or becomes successful in guessing the entire word.

--------------------------------------

## Notable Features of this Module

1. Configurable list of words
2. Random word on every replay without repetition
3. Limited, configurable tries
4. Track of used and revealed letters
5. Presence of game-running and game-over states

--------------------------------------

## Setup

1. Just copy the **hangman.js** to any directory inside the project's root folder.
2. Then, put proper relative address of the module in the source codes wherever required.

--------------------------------------

## Documentation

The module hangman.js contains a single function **`HangMan()`**, which is used to imitate a class behaviour. This function has several variables and functions under private and public access.

The following public variables and functions are accessible outside the module on the instance it is created upon.

### Variables

1. **`this.availableWords`** - This contains a *list of strings* representing all the default and custom words, that have not been used before for the player. When a word is used from this list, it is deleted. When it is empty, it can be refilled with all the words again, by calling the `this.resetWords()` function.
2. **`this.isRunning`** - This contains a *boolean* value representing the state of the game.
3. **`this.triesLeft`** - This contains a *number* representing the number of chances left with the user.
4. **`this.chosenWord`** - This contains a *string* representing the randomly chosen word for the player to guess.
5. **`this.guessed`** - This contains a *string* representing the currently exposed word. The letters still hidden are represented by asterisk (*).
6. **`this.usedLetters`** - This contains a *list of strings* representing all the used letters which were not present in the word.

### Functions

1. **`this.guess(letter)`** - This function takes a single *string* parameter containing a single letter and returns a *string* representing the status symbol about the presence of the letter in the hidden word. All the status symbols have been discussed in the 7th point of the section [General Flow](#general-flow-of-program).
2. **`this.restart(tries = 7)`** - This function restarts the game. If game is running, it returns a *string* **gameRunning** as status symbol; else, if there are no new words available, it returns a *string* **noWords** as status symbol; else, it sets `this.isRunning` to `true`, sets `this.triesLeft` to the passed argument or 7 as default, sets a new randomly chosen word from `this.availableWords`, sets the respective hidden string in `this.guessed` and truncates the list `this.usedLetters`.
3. **`this.resetWords()`** - This function makes all the default and custom words available again inside the `this.availableWords` to be used.

> The private constant variable **`HangMan.allWords`** contains a list of all the default and custom words as *string*s.

--------------------------------------

## General Flow Of Program

The module is *object-oriented* and considers the game-play to be a single object. Thus, the game is referenced as *game object*. The person playing the game is referenced as *player*. Though the user is free to use the module in whichever way ze wants to use, a general flow can be considered, which is shown below:

1. **Link the main script** to the html head by assigning the `type` as ***module***.
```html
<script type="module" src="./PATH/TO/MAIN/SCRIPT.js" defer></script>
```
2. **Import** the module to your script.
```javascript
import { HangMan } from './PATH/TO/hangman.js';
```
3. **Initialize** the game object with an optional *integer* parameter representing the tries that should be given to the player *(defaults to 7)* and another optional parameter representing a *list of strings*, containing custom words to be available in the program apart from the default words.
```javascript
const game = new HangMan(10, WORD_LIST);
```
4. **Use the *`guessed`*** variable to set the hidden word.
```javascript
window.eleWord.textContent = game.guessed;
```
5. **Use the *`triesLeft`*** variable to set the chances the player is given to guess the word.
```javascript
window.triesBoxHeight = window.eleTries.clientHeight / game.triesLeft;
```
> The code above is peculiar because the use of triesLeft here is implemented in a continuous way rather than just showing a discrete number of chances left with the player. Refer the website provided.
6. **Use the *`guess()`*** function to check if the letter taken from the player and passed as an argument is correct. It returns a status symbol in the form of a string.
```javascript
const status = game.guess(input); //where input is a letter
```
7. Use the returned **status symbol to determine the further flow** of your game. Following are the possible statuses and their meanings:

    * **gameSuspended** - The game is not running and the value of the variable **`isRunning`** is false. In this case, nothing happens. It can be restarted with a new word.
    * **used** - The letter is not in the word and has already been used before. In this case, nothing happens.
    * **guessed** - The letter is in the word, but has already been revealed before. In this case, nothing happens.
    * **right** - The letter is in the word. In this case, the position of the letter is revealed in the **`guessed`** variable.
    * **victory** - The letter is in the word and the whole word is completely revealed. In this case, the game stops running and the variable **`isRunning`** becomes `false`.
    * **wrong** - The letter is not in the word. In this case, the **`triesLeft`** variable (number of chances) is decremented by 1 and the player still has chances left to play. The **`usedLetters`** list is appended with the letter.
    * **defeat** - The letter is not in the word and after decrementing the **`triesLeft`** variable by 1, the player has no chances left. In this case, the **`usedLetters`** list is appended with the letter and the variable **`isRunning`** becomes `false`.
8. **Keep updating the stats** using the following public variables.
    * **`isRunning`** - to determine if the game is running.
    * **`triesLeft`** - to determine the number of chances left with the player.
    * **`guessed`** - to determine the currently revealed letters in the word.
    * **`usedLetters`** - to determine which letters have been used, which were not in the word.
9. **Keep using `check()`** function on every turn until the game ends (i.e. `isRunning = false`). In case of defeat, use the **`chosenWord`** variable to show the chosen word, intended for the player to be discovered. In this state, `check()` function becomes unusable and returns **gameSuspended** status symbol.
10. **Use `restart()`** function *(with an optional argument representing the tries that should be available to the player in the next turn)* to restart the game with a new, random word. All the variables will be re-initialized accordingly. This function is unusable when the game is running and returns the status symbol **gameRunning**. This function always sets a new word from the list of available words until the list is devoid of any new words. In this case, it returns **noWords** status symbol and does nothing. If this happens, **`resetWords()`** function needs to be used before calling `restart()` to make all the words available again to be randomized.
```javascript
if (game.restart() === 'noWords') {
        game.resetWords();
        game.restart();
    }
```

With this general flow, a smooth gameplay without any errors can be built.

> Good luck making your next pastime mini-project.

------------------------------------

## What can You Do with this?

This project is under *[GNU GPL-3.0 License](https://github.com/alphadinu/HangMan/blob/main/LICENSE.md)*. You can freely modify and use the source code. You can also redistribute it for personal and commercial purposes as long as it is under GNU GPL License as well and the source code is available to the public.

------------------------------------

## Contribute

I am planning to expand the project I've made with this module to add functionalities such as Custom Settings, Word Classes, Multiplayer, Progress Saving and Profile Creation. The current goals of the project are defined at this project *[Wiki](https://github.com/alphadinu/HangMan/wiki)*. **I'd be very thankful** if you help me expand this project by forking it.

------------------------------------

## Thank You For Using

Hey reader, thanks for using this module. I had made a similar project in python when I started out learning python; but due to its limited capabilities in design using tkinter module, I switched to web development and made this web mini-project, which is great, not only in functionalities, but also in design and asthetics *(thanks to html marking and css styling)*.

> ❤️‍🔥 Made with passion and love ❤️‍🔥