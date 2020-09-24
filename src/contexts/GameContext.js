import React, { createContext, useState } from 'react';

export const GameContext = createContext();

const GameContextProvider = props => {
  const [state, setState] = useState({
    history: [{ squares: Array(9).fill(null), picked: null }],
    xIsNext: true,
    stepNumber: 0,
    isAsc: true,
  });

  const handleClick = i => {
    const history = state.history.slice(0, state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = state.xIsNext ? 'X' : 'O';
    setState({
      history: history.concat([
        {
          squares,
          picked: i + 1,
        },
      ]),
      stepNumber: history.length,
      xIsNext: !state.xIsNext,
      isAsc: state.isAsc,
    });
  };

  const jumpTo = step => {
    setState({
      history: state.history.slice(0, state.step),
      stepNumber: step,
      xIsNext: step % 2 === 0,
      isAsc: state.isAsc,
    });
  };

  const calcPos = move => {
    let column, row;
    if (move % 3 === 0) {
      column = 3;
    } else if (move % 3 === 2) {
      column = 2;
    } else if (move % 3 === 1) {
      column = 1;
    }

    if (move <= 3) {
      row = 1;
    } else if (move > 3 && move <= 6) {
      row = 2;
    } else {
      row = 3;
    }
    return { column, row };
  };

  const calculateWinner = squares => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return [squares[a], a, b, c];
      }
    }
    return null;
  };

  const toggleAsc = () => {
    setState({
      history: state.history,
      stepNumber: state.stepNumber,
      xIsNext: state.xIsNext,
      isAsc: !state.isAsc,
    });
  };

  return (
    <GameContext.Provider
      value={{
        state,
        calculateWinner,
        jumpTo,
        handleClick,
        calcPos,
        toggleAsc,
      }}
    >
      {props.children}
    </GameContext.Provider>
  );
};

export default GameContextProvider;
