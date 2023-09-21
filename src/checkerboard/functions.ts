import { BoardOrientation, BoardPosition, Square, Piece, CheckerSquare } from "./types";
import { 
  BLACK_COLUMN_VALUES,
  BLACK_ROWS,
  COLUMNS,
  START_POSITION_OBJECT,
  WHITE_COLUMN_VALUES,
  WHITE_ROWS,
  CHECKER_SQUARE_MAP
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
  const squareWidth = boardWidth / 8;
  const columns =
    boardOrientation === "white" ? WHITE_COLUMN_VALUES : BLACK_COLUMN_VALUES;
  const rows = boardOrientation === "white" ? WHITE_ROWS : BLACK_ROWS;

  const x = columns[square[0]] * squareWidth + squareWidth / 2;
  const y = rows[parseInt(square[1], 10) - 1] * squareWidth + squareWidth / 2;
  return { x, y };
}

/**
 * Returns whether the passed position is different from the start position.
 */
export function isDifferentFromStart(newPosition: BoardPosition): boolean {
  let isDifferent = false;

  (
    Object.keys(START_POSITION_OBJECT) as Array<
      keyof typeof START_POSITION_OBJECT
    >
  ).forEach((square) => {
    if (newPosition[square] !== START_POSITION_OBJECT[square])
      isDifferent = true;
  });

  (Object.keys(newPosition) as Array<keyof typeof newPosition>).forEach(
    (square) => {
      if (START_POSITION_OBJECT[square] !== newPosition[square])
        isDifferent = true;
    }
  );

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
  (Object.keys(currentPosition) as Array<keyof typeof currentPosition>).forEach(
    (square) => {
      if (newPosition[square] !== currentPosition[square])
        difference.removed[square] = currentPosition[square];
    }
  );

  // added from new
  (Object.keys(newPosition) as Array<keyof typeof newPosition>).forEach(
    (square) => {
      if (currentPosition[square] !== newPosition[square])
        difference.added[square] = newPosition[square];
    }
  );

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
export function fenToObj(fen: string): BoardPosition {
  if (!isValidFen(fen)) return {} as BoardPosition;

  // cut off any move, castling, etc info from the end. we're only interested in position information
  fen = fen.replace(/ .+$/, "");
  const rows = fen.split("/");
  const position: BoardPosition = {};
  let currentRow = 8;

  for (let i = 0; i < 8; i++) {
    const row = rows[i].split("");
    let colIdx = 0;

    // loop through each character in the FEN section
    for (let j = 0; j < row.length; j++) {
      // number / empty squares
      if (row[j].search(/[1-8]/) !== -1) {
        const numEmptySquares = parseInt(row[j], 10);
        colIdx = colIdx + numEmptySquares;
      } else {
        // piece
        const square = COLUMNS[colIdx] + currentRow;
        position[square as Square] = fenToPieceCode(row[j]);
        colIdx = colIdx + 1;
      }
    }
    currentRow = currentRow - 1;
  }
  return position;
}

/**
 * Returns whether string is valid fen notation.
 */
function isValidFen(fen: string): boolean {
  // cut off any move, castling, etc info from the end. we're only interested in position information
  fen = fen.replace(/ .+$/, "");

  // expand the empty square numbers to just 1s
  fen = expandFenEmptySquares(fen);

  // fen should be 8 sections separated by slashes
  const chunks = fen.split("/");
  if (chunks.length !== 8) return false;

  // check each section
  for (let i = 0; i < 8; i++) {
    if (chunks[i].length !== 8 || chunks[i].search(/[^kmKM1]/) !== -1) {
      return false;
    }
  }

  return true;
}

/**
 * Expand out fen notation to countable characters for validation
 */
function expandFenEmptySquares(fen: string): string {
  return fen
    .replace(/8/g, "11111111")
    .replace(/7/g, "1111111")
    .replace(/6/g, "111111")
    .replace(/5/g, "11111")
    .replace(/4/g, "1111")
    .replace(/3/g, "111")
    .replace(/2/g, "11");
}

/**
 * Convert fen piece code to camel case notation. e.g. bP, wK.
 */
function fenToPieceCode(piece: string): Piece {
  // black piece
  if (piece.toLowerCase() === piece) {
    return ("b" + piece.toUpperCase()) as Piece;
  }
  // white piece
  return ("w" + piece.toUpperCase()) as Piece;
}

export function toChessFen(checkersFen: string): string {
  return objToFen(checkersFenToObj(checkersFen));
}

function objToFen(position: BoardPosition): string {
  let fen: string = "";
  for (let row of BLACK_ROWS) {
    for (let col in BLACK_COLUMN_VALUES) {
      const loc = col + (row+1).toString();
      const piece = position[loc as Square];
      if (piece === undefined) {
        fen += "1";
      } else if (piece === "bK") {
        fen += "k";
      } else if (piece === "bM") {
        fen += "m"
      } else if (piece === "wK") {
        fen += "K";
      } else if (piece === "wM") {
        fen += "M";
      }
    }
      fen += "/";
  }
  return fen.slice(0, -1);
};

function parseTokens(player: string, tokens: string, position: BoardPosition)
{
  let piece = "";
  const nums = tokens.split(",");
  for (let item of nums) {
    let loc = 0;
    const player_char = player.slice(0, 1);
    if (item.startsWith(player_char.toUpperCase())) {
      piece = player_char + "M";
      loc = parseInt(item.slice(1), 10);
    } else if (item.startsWith("K")) {
      piece = player_char + "K";
      loc = parseInt(item.slice(1), 10);
    }
    else {
      loc = parseInt(item);
    }
    position[CHECKER_SQUARE_MAP[loc as CheckerSquare] as Square] = piece as Piece; 
  }
  return position;
}

function checkersFenToObj(checkers_fen: string): BoardPosition {
  let position: BoardPosition = {};
  const rows = checkers_fen.split(":");
  const white_tokens = rows[1];
  const black_tokens = rows[2];
  
  position = parseTokens("white", white_tokens, position);
  position = parseTokens("black", black_tokens, position);
  return position;
}