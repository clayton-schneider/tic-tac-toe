import React, { useContext } from 'react';
import { GameContext } from '../contexts/GameContext';
import Square from './Square';

const Board = () => {
  const { state, handleClick, calculateWinner } = useContext(GameContext);
  const history = state.history;
  const current = history[state.stepNumber];
  const winnerInfo = calculateWinner(current.squares);
  const winnerCells = winnerInfo ? winnerInfo.slice(1) : [];

  return (
    <div className="board">
      {current.squares.map((square, index) => {
        if (winnerCells.includes(index)) {
          return (
            <Square
              value={current.squares[index]}
              onClick={() => handleClick(index)}
              key={index}
              winner={true}
            />
          );
        }
        return (
          <Square
            value={current.squares[index]}
            onClick={() => handleClick(index)}
            key={index}
            winner={false}
          />
        );
      })}
    </div>
  );
};

export default Board;
