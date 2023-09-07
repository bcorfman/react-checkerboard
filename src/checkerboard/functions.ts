import { BoardOrientation, BoardPosition, Square } from "./types";
import { 
  BLACK_COLUMN_VALUES,
  BLACK_ROWS,
  START_POSITION_OBJECT,
  WHITE_COLUMN_VALUES,
  WHITE_ROWS,
  POSITION_MAP
 } from "./consts";

/**
 * Retrieves the coordinates at the centre of the requested square, relative to the top left of the board (0, 0).
 */
export function getRelativeCoords(
  boardOrientation: BoardOrientation,
  boardWidth: number,
  square: Square
): {
  x: number;
  y: number;
} {
  const csq = POSITION_MAP[square];
  const squareWidth = boardWidth / 8;
  const columns =
    boardOrientation === "white" ? WHITE_COLUMN_VALUES : BLACK_COLUMN_VALUES;
  const rows = boardOrientation === "white" ? WHITE_ROWS : BLACK_ROWS;

  const x = columns[csq[0]] * squareWidth + squareWidth / 2;
  const y = rows[parseInt(csq[1], 10) - 1] * squareWidth + squareWidth / 2;
  return { x, y };
}

/**
 * Returns whether the passed position is different from the start position.
 */
export function isDifferentFromStart(newPosition: BoardPosition): boolean {
  let isDifferent = false;
  for (const [key, _] of Object.entries(START_POSITION_OBJECT)) {
    if (typeof key === "number" && newPosition[key] !== START_POSITION_OBJECT[key]) {
      isDifferent = true;      
    }
  }
  
  for (const [key, _] of Object.entries(newPosition)) {
    if (typeof key === "number" && START_POSITION_OBJECT[key] !== newPosition[key]) {
      isDifferent = true;      
    }
  }
  
  return isDifferent;
}

/**
 * Returns what pieces have been added and what pieces have been removed between board positions.
 */
export function getPositionDifferences(
  currentPosition: BoardPosition,
  newPosition: BoardPosition
): {
  added: BoardPosition;
  removed: BoardPosition;
} {
  const difference: { added: BoardPosition; removed: BoardPosition } = {
    removed: {},
    added: {},
  };

  // removed from current
  for (const [key, _] of Object.entries(currentPosition)) {
    if (typeof key === "number" && newPosition[key] !== currentPosition[key]) {
        difference.removed[key] = currentPosition[key];
    }
  }

  // added from new
  for (const [key, _] of Object.entries(newPosition)) {
    if (typeof key === "number" && currentPosition[key] !== newPosition[key]) {
        difference.added[key] = newPosition[key];
    }
  }

  return difference;
}

/**
 * Converts a fen string or existing position object to a position object.
 */
export function convertPositionToObject(
  position: string | BoardPosition
): BoardPosition {
  if (position === "start") {
    return START_POSITION_OBJECT;
  }

  if (typeof position === "string") {
    // attempt to convert fen to position object
    return fenToObj(position);
  }

  return position;
}

/**
 * Converts a fen string to a position object.
 */
function fenToObj(fen: string): BoardPosition {
  // cut off any move, castling, etc info from the end. we're only interested in position information
  const position: BoardPosition = {};
  const slots = fen.split(":");
  const white_tokens = slots[1];
  const black_tokens = slots[2];
  for (let token in white_tokens.split(",")) {
    if (token[0] === "W") {
      const sq = parseInt(token.slice(1), 10);
      position[sq as Square] = "wM";
    }
    else if (token[0] === "K") {
      const sq = parseInt(token.slice(1), 10);
      position[sq as Square] = "wK";
    }     
  }
  for (let token in black_tokens.split(",")) {
    if (token[0] === "B") {
      const sq = parseInt(token.slice(1), 10);
      position[sq as Square] = "bM";
    }
    else if (token[0] === "K") {
      const sq = parseInt(token.slice(1), 10);
      position[sq as Square] = "bK";
    }     
  }
  return position;
}
