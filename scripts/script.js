'use strict';
import { HangMan } from './hangman.js';

const game = new HangMan(10, ["rajat", "sumit", "raj", "singh", "naman", "amit", "aaron"]);
getAccess();
init();

function getAccess() {
    window.eleWord = document.querySelector('.word');
    window.eleButton = document.querySelector('button');
    window.eleInput = document.querySelector('input');
    window.eleLog = document.querySelector('.log');
    window.eleGameOverLog = document.querySelector('.guess > span');
    window.eleUsed = document.querySelector('.used > p');
    window.eleMain = document.querySelector('main');
    window.eleTries = document.querySelector('.tries');
}
function init() {
    window.eleWord.textContent = game.guessed;
    window.eleButton.onclick = process;
    window.addEventListener('keydown', event => {
        if (event.key === 'Enter') {
            window.eleButton.className = 'pressed';
        }
    })
    window.addEventListener('keyup', event => {
        if (event.key === 'Enter') {
            window.eleButton.className = '';
            window.eleButton.click();
        }
    });
    setTriesBoxHeight();
}
function process() {
    let input = window.eleInput.value;
    window.eleInput.value = '';
    if (!isValid(input)) {
        setLog('invalid');
        return;
    }
    input = input.toLowerCase();
    const status = game.guess(input);
    switch (status) {
        case 'used':
        case 'guessed':
            setLog(status);
            return;
        case 'victory':
            gameOver(status);
            return;
        case 'defeat':
            gameOver(status);
            setTries(0);
            return;
        case 'right':
            window.eleWord.textContent = game.guessed;
            setLog(status);
            return;
        case 'wrong':
            setUsed(input);
            setLog(status);
            setTries(0);
    }
}
function isValid(str) {
    let string = str.trim();
    if (string.length !== 1) {
        return false;
    }
    if (!/^[a-zA-Z]/.test(string)) {
        return false;
    }
    return true;
}
function setLog(status) {
    let log, gameOverLog;
    switch (status) {
        case 'invalid':
            log = "Enter a single alphabet";
            break;
        case 'used':
            log = "Letter already used";
            break
        case 'guessed':
            log = "Letter already guessed";
            break;
        case 'right':
            log = "You guessed it right";
            break;
        case 'wrong':
            log = "Try more";
            break;
        case 'victory':
            gameOverLog = "You guessed the word";
            log = '';
            break;
        case 'defeat':
            gameOverLog = "Better luck next time";
            log = '';
            break;
    }
    
    window.eleLog.textContent = log;
    if (gameOverLog) {
        window.eleGameOverLog.textContent = gameOverLog;
    }
}
function setUsed(letter) {
    const elem = document.createElement('span');
    elem.textContent = letter;
    window.eleUsed.appendChild(elem);
    setTimeout(() => {
        document.querySelector('.used > p > span:last-child').className = 'change';
    }, 10);
}
function setTries(status) {
    if (status === 0) {
        const elem = document.createElement('div');
        window.eleTries.appendChild(elem);
        setTimeout(() => {
            document.querySelector('.tries > div:last-child').style.height = `${window.triesBoxHeight}px`;
        }, 10);
        return;
    }
    document.querySelectorAll('.tries > div').forEach(element => {
        element.style.height = 0;
    });
    setTriesBoxHeight();
}
function setTriesBoxHeight() {
    window.triesBoxHeight = window.eleTries.clientHeight / game.triesLeft;
}
function gameOver(status) {
    window.eleWord.textContent = game.chosenWord;
    setLog(status);
    window.eleMain.className = 're-state';
    window.eleButton.textContent = "Restart";
    window.eleButton.onclick = restart;
}
function restart() {
    if (game.restart() === 'noWords') {
        game.resetWords();
        game.restart();
    }
    window.eleWord.textContent = game.guessed;
    window.eleMain.className = '';
    window.eleTries.innerHTML = '';
    window.eleButton.textContent = "Guess";
    window.eleUsed.innerHTML = '';
    window.eleLog.textContent = "Enter any letter";
    window.eleGameOverLog.textContent = '';
    window.eleButton.onclick = process;
    setTries(1);
    window.eleInput.focus();
}