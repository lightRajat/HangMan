'use strict';
export { HangMan };

function HangMan(tries = 7, customWords) {
    const returnWords = function() {
        let words = ["apple", "orange", "bottle", "hogwarts"];
        if (customWords) {
            words = words.concat(customWords);
        }
        return words;
    };
    const setWord = function() {
        const index = Math.floor(Math.random() * this.availableWords.length);
        const word = this.availableWords[index];
        this.availableWords.splice(index, 1);
        return word;
    };
    const updateGuessed = function(letter) {
        let guessed = Array.from(this.guessed);
        for (let i in this.chosenWord) {
            if (this.chosenWord[i] === letter) {
                guessed[i] = letter;
            }
        }
        this.guessed = guessed.join('');
    };
    const gameOver = function() {
        this.isRunning = !this.isRunning;
    };
    const updateTries = function() {
        --this.triesLeft;
    };
    const updateUsed = function(letter) {
        this.usedLetters.push(letter);
    };
    const areWordsAvailable = function() {
        for (let i of this.availableWords) {
            return true;
        }
        return false;
    };
    const setGuessed = function() {
        return '*'.repeat(this.chosenWord.length);
    };
    const allWords = returnWords();

    this.availableWords = [...allWords];
    this.isRunning = true;
    this.triesLeft = tries;
    this.chosenWord = setWord.call(this);
    this.guessed = setGuessed.call(this);
    this.usedLetters = [];
    this.guess = function(letter) {
        if (!this.isRunning) {
            return 'gameSuspended';
        }
        if (this.usedLetters.includes(letter) || this.guessed.includes(letter)) {
            if (this.usedLetters.includes(letter)) {
                return 'used';
            }
            return 'guessed';
        }
        if (this.chosenWord.includes(letter)) {
            updateGuessed.call(this, letter);
            if (!this.guessed.includes('*')) {
                gameOver.call(this);
                return 'victory';
            }
            return 'right';
        }
        updateTries.call(this);
        updateUsed.call(this, letter);
        if (this.triesLeft === 0) {
            gameOver.call(this);
            return 'defeat';
        }
        return 'wrong';
    };
    this.restart = function(tries = 7) {
        if (this.isRunning) {
            return 'gameRunning';
        }
        if (!areWordsAvailable.call(this)) {
            return 'noWords';
        }
        this.isRunning = !this.isRunning;
        this.triesLeft = tries;
        this.chosenWord = setWord.call(this);
        this.guessed = setGuessed.call(this);
        this.usedLetters = [];
    };
    this.resetWords = function() {
        this.availableWords = [...allWords];
    }
}