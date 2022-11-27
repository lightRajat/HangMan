
# hangman.js

> **To create the classic guess-the-word game with all the functions you might need**

--------------------------------------

## Table of Contents

1. [What is HangMan](#what-is-hangman)
2. [Features](#notable-features)
3. [Setup](#setup)
4. [Program Flow](#general-flow-of-program)
5. [Thank You Note](#thank-you-for-using)

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

## General Flow Of Program

The module is *object-oriented* and considers the game-play to be a single object. Thus, the game is referenced as *game object*. The person playing the game is referenced as *player*. Though the user is free to use the module in whichever way ze wants to use, a general flow can be considered, which is shown below:

1. **Link the main script** to the html head by assigning the `type` as ***module***.
```html
<script type="module" src="script.js" defer></script>
```
2. **Import** the module to your script.
```javascript
import { HangMan } from '/hangman.js';
```
3. **Initialize** the game object with an optional argument representing the tries that should be given to the player *(defaults to 7)* and another optional argument representing a list, containing custom words to be available in the program apart from the default words.
```javascript
const game = new HangMan(10, ["rajat", "sumit", "raj", "singh", "naman", "amit", "aaron"]);
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
6. **Use the *`check()`*** function to check if the letter taken from the player and passed as an argument is correct. It returns a status symbol in the form of a string.
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

## Thank You For Using

Hey reader, thanks for using this module. I had made a similar project in python when I started out learning python; but due to its limited capabilities in design using tkinter module, I switched to web development and made this web mini-project, which is great, not only in functionalities, but also in design and asthetics *(thanks to html marking and css styling)*.

> ❤️‍🔥 Made with passion and love ❤️‍🔥