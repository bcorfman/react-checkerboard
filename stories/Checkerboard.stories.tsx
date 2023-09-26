import React, { forwardRef, useEffect, useRef, useState, useMemo } from "react";
import { Meta, StoryFn } from "@storybook/react";
import { Checkerboard, ClearPremoves } from "../src";
import { BoardPosition, CustomSquareProps, Square } from "../src/checkerboard/types";
import { SQUARE_MAP } from "../src/checkerboard/consts";
import { convertPositionToObject, toChessFen } from "../src/checkerboard/functions"; 
import Engine from "../src/checkerboard/engine";

// examples
// multiboard example https://storybook.js.org/docs/react/writing-stories/stories-for-multiple-components

const buttonStyle = {
  cursor: "pointer",
  padding: "10px 20px",
  margin: "10px 10px 0px 0px",
  borderRadius: "6px",
  backgroundColor: "#f0d9b5",
  border: "none",
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.5)",
};

const inputStyle = {
  padding: "10px 20px",
  margin: "10px 0 10px 0",
  borderRadius: "6px",
  border: "none",
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.5)",
};

const boardWrapper = {
  width: `70vw`,
  maxWidth: "70vh",
  margin: "3rem auto",
};

export default {
  title: "Example/Checkerboard",
  component: Checkerboard,
} as Meta<typeof Checkerboard>;

const Template: StoryFn<typeof Checkerboard> = (args) => (
  <div style={boardWrapper}>
    <Checkerboard {...args} />
  </div>
);

export const ConfigurableBoard = Template.bind({});
ConfigurableBoard.args = {
  id: "Configurable Board",
};

///////////////////////////////////
////////// PlayVsRandom ///////////
///////////////////////////////////
export const PlayVsRandom = ({dropped, setDropped }) => {
  const game = new Engine();
  const [moved, setMoved] = useState(false);
  const [currentTimeout, setCurrentTimeout] = useState<NodeJS.Timeout>();
  const [gamePosition, setGamePosition] = useState<BoardPosition>();

  useEffect( () => {
    async function init()
    {
      const checkers_fen = await game.init();
      setGamePosition(convertPositionToObject(toChessFen(checkers_fen)));
      return async () => {
        await game.terminate();
      }
    }
    init();
  }, []);

  useEffect( () => {
    async function makeRandomMove() {
      let checkers_fen = await game.getCheckerboardState();
      const legal_moves = await game.legalMoves(checkers_fen);
      const captures = legal_moves['captures'];
      const moves = legal_moves['moves'];
      let possibleMoves = [];
      if (captures && captures.length > 0) {
        possibleMoves = captures;
      } else {
        possibleMoves = moves;
      }
  
      // exit if the game is over
      if (possibleMoves.length === 0)
        return;
  
      const randomIndex = Math.floor(Math.random() * possibleMoves.length);
      checkers_fen = await game.makeMove(possibleMoves[randomIndex][0], possibleMoves[randomIndex][1]);
      setGamePosition(convertPositionToObject(toChessFen(checkers_fen)));
    }

    makeRandomMove();
  }, [currentTimeout]);

  useEffect( () => {
    async function onDrop(sourceSquare, targetSquare, piece) {
      const checkers_fen = await game.makeMove(SQUARE_MAP[sourceSquare], SQUARE_MAP[targetSquare]);
      setGamePosition(convertPositionToObject(toChessFen(checkers_fen)));

      // store timeout so it can be cleared on undo/reset so computer doesn't execute move
      const newTimeout = setTimeout(() => setMoved(true), 200);
      setCurrentTimeout(newTimeout);
    }
  }, [dropped]);

  return (
    <div style={boardWrapper}>
      <Checkerboard
        id="PlayVsRandom"
        position={gamePosition}
        onPieceDrop={() => setDropped(true)}
        customBoardStyle={{
          borderRadius: "4px",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
        }}
      />
      <button
        style={buttonStyle}
        onClick={() => {
            game.terminate();
            game.init();
            clearTimeout(currentTimeout);
        }}
      >
        reset
      </button>
      <button
        style={buttonStyle}
        onClick={() => {
          /*safeGameMutate((game) => {
            game.undo();
          });*/
          clearTimeout(currentTimeout);
        }}
      >
        undo
      </button>
    </div>
  );
};
