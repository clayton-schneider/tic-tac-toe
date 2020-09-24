import React, { useContext } from 'react';
import { GameContext } from '../contexts/GameContext';
import Board from './Board';

const Game = () => {
  const { state, calculateWinner, jumpTo, calcPos, toggleAsc } = useContext(
    GameContext
  );

  const history = state.history;
  const current = history[state.stepNumber];
  const winnerInfo = calculateWinner(current.squares);
  const winner = winnerInfo ? winnerInfo[0] : null;

  const tied = !winnerInfo && state.stepNumber === 9 ? true : false;
  const moves = history.map((step, move) => {
    const { column, row } = calcPos(step.picked);
    const desc = move
      ? 'Go to move #' + move + ` (${column}, ${row})`
      : 'Go to start of game';
    if (move === history.length - 1) {
      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>
            <span className="bold">{desc}</span>
          </button>
        </li>
      );
    } else {
      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{desc}</button>
        </li>
      );
    }
  });

  if (state.isAsc === false) {
    moves.reverse();
  }

  let status;
  if (winner) {
    status = 'Winner ' + winner;
  } else if (tied) {
    status = 'Draw!';
  } else {
    status = 'Next player: ' + (state.xIsNext ? 'X' : 'O');
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <button onClick={toggleAsc}>
          {state.isAsc ? 'Ascending' : 'Descending'}
        </button>
        <ol>{moves}</ol>
      </div>
    </div>
  );
};

export default Game;
