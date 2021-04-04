'use strict';

/*

==> Roll Dice button
document.querySelector('.btn--roll').textContent = 'roll dice';
==> Hold Score Button
document.querySelector('.btn--hold').textContent = 'hold score';
==> New game Button
document.querySelector('.btn--new').textContent = 'new game';
==>current score of players
    ==> player1
        document.querySelector('#current--0').textContent = "player1 current score";
    =>player2
        document.querySelector('#current--1').textContent = "player2 current score"
==> total score of players
    => player1
        document.querySelector("score--0").textContent = "player 1 total score"
    => player2
        document.querySelector('score--1').textContent = "player 2 total score";
*/

let currentPlayer = 0;
let currentScores = [0, 0];
let totalScores = [0, 0];
let isGamerOver = false;
document.querySelector('#score--0').textContent = 0;
document.querySelector('#score--1').textContent = 0;

const roll = function () {
  if (!isGamerOver) {
    let dice = Math.trunc(Math.random() * 6) + 1;
    let diceFile = `dice-${dice}.png`;
    document.querySelector('.dice').src = diceFile;
    if (dice === 1) {
      currentScores[currentPlayer] = 0;
      hold();
    } else {
      currentScores[currentPlayer] += dice;
      document.querySelector(`#current--${currentPlayer}`).textContent =
        currentScores[currentPlayer];
    }
  }
};
const win = function () {
  isGamerOver = true;
  document.querySelector(`#score--${currentPlayer}`).textContent =
    totalScores[currentPlayer];

  document
    .querySelector(`.player--${currentPlayer}`)
    .classList.add('player--winner');
  document
    .querySelector(`.player--${currentPlayer}`)
    .classList.remove('player--active');
};
const hold = function () {
  if (!isGamerOver) {
    totalScores[currentPlayer] += currentScores[currentPlayer];
    if (totalScores[currentPlayer] >= 100) {
      win();
    } else {
      currentScores[currentPlayer] = 0;
      document.querySelector(`#current--${currentPlayer}`).textContent =
        currentScores[currentPlayer];
      document.querySelector(`#score--${currentPlayer}`).textContent =
        totalScores[currentPlayer];
      document
        .querySelector(`.player--${currentPlayer}`)
        .classList.remove('player--active');
      currentPlayer = 1 - currentPlayer;
      document
        .querySelector(`.player--${currentPlayer}`)
        .classList.add('player--active');
    }
  }
};

const reset = function () {
  document
    .querySelector(`.player--${currentPlayer}`)
    .classList.remove('player--winner');
  currentPlayer = 0;
  currentScores = [90, 90];
  totalScores = [0, 0];
  isGamerOver = false;
  document.querySelector('#score--0').textContent = 0;
  document.querySelector('#score--1').textContent = 0;
  document.querySelector('#current--0').textContent = 0;
  document.querySelector('#current--1').textContent = 0;

  document
    .querySelector(`.player--${currentPlayer}`)
    .classList.add('player--active');
};
document.querySelector('.btn--roll').addEventListener('click', roll);

document.querySelector('.btn--hold').addEventListener('click', hold);

document.querySelector('.btn--new').addEventListener('click', reset);
