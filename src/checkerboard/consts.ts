import { BoardPosition, Square, CheckerSquare } from "./types";

export const COLUMNS = "abcdefgh".split("");

export var new_board: BoardPosition = {
  "h8": undefined,
  "f8": undefined,
  "d8": undefined,
  "b8": undefined,
  "g7": undefined,
  "e7": undefined,
  "c7": undefined,
  "a7": undefined,
  "h6": undefined,
  "f6": undefined,
  "d6": undefined,
  "b6": undefined,
  "g5": undefined,
  "e5": undefined,
  "c5": undefined,
  "a5": undefined,
  "h4": undefined,
  "f4": undefined,
  "d4": undefined,
  "b4": undefined,
  "g3": undefined,
  "e3": undefined,
  "c3": undefined,
  "a3": undefined,
  "h2": undefined,
  "f2": undefined,
  "d2": undefined,
  "b2": undefined,
  "g1": undefined,
  "e1": undefined,
  "c1": undefined,
  "a1": undefined,
}
export const START_POSITION_OBJECT: BoardPosition = {
  "h8": "bM",
  "f8": "bM",
  "d8": "bM",
  "b8": "bM",
  "g7": "bM",
  "e7": "bM",
  "c7": "bM",
  "a7": "bM",
  "h6": "bM",
  "f6": "bM",
  "d6": "bM",
  "b6": "bM",
  "g5": undefined,
  "e5": undefined,
  "c5": undefined,
  "a5": undefined,
  "h4": undefined,
  "f4": undefined,
  "d4": undefined,
  "b4": undefined,
  "g3": "wM",
  "e3": "wM",
  "c3": "wM",
  "a3": "wM",
  "h2": "wM",
  "f2": "wM",
  "d2": "wM",
  "b2": "wM",
  "g1": "wM",
  "e1": "wM",
  "c1": "wM",
  "a1": "wM",
};

export const SQUARE_MAP: Record<Square, CheckerSquare> = {
  "b8":  1, "d8":  2, "f8":  3, "h8":  4,
  "a7":  5, "c7":  6, "e7":  7, "g7":  8,
  "b6":  9, "d6": 10, "f6": 11, "h6": 12,
  "a5": 13, "c5": 14, "e5": 15, "g5": 16,
  "b4": 17, "d4": 18, "f4": 19, "h4": 20,
  "a3": 21, "c3": 22, "e3": 23, "g3": 24,
  "b2": 25, "d2": 26, "f2": 27, "h2": 28,
  "a1": 29, "c1": 30, "e1": 31, "g1": 32
};

export const CHECKER_SQUARE_MAP: Record<CheckerSquare, Square> = {
   1: "b8",  2: "d8",  3: "f8",  4: "h8",
   5: "a7",  6: "c7",  7: "e7",  8: "g7",
   9: "b6", 10: "d6", 11: "f6", 12: "h6",
  13: "a5", 14: "c5", 15: "e5", 16: "g5",
  17: "b4", 18: "d4", 19: "f4", 20: "h4",
  21: "a3", 22: "c3", 23: "e3", 24: "g3",
  25: "b2", 26: "d2", 27: "f2", 28: "h2",
  29: "a1", 30: "c1", 31: "e1", 32: "g1"
};

export const WHITE_COLUMN_VALUES: { [col in string]: number } = {
  a: 0,
  b: 1,
  c: 2,
  d: 3,
  e: 4,
  f: 5,
  g: 6,
  h: 7,
};
export const BLACK_COLUMN_VALUES: { [col in string]: number } = {
  a: 7,
  b: 6,
  c: 5,
  d: 4,
  e: 3,
  f: 2,
  g: 1,
  h: 0,
};

export const WHITE_ROWS = [7, 6, 5, 4, 3, 2, 1, 0];
export const BLACK_ROWS = [0, 1, 2, 3, 4, 5, 6, 7];