import { BoardPosition, ChessSquare, Square } from "./types";

export const COLUMNS = "abcdefgh".split("");

export const START_POSITION_OBJECT: BoardPosition = {
  1: "bM",
  2: "bM",
  3: "bM",
  4: "bM",
  5: "bM",
  6: "bM",
  7: "bM",
  8: "bM",
  9: "bM",
  10: "bM",
  11: "bM",
  12: "bK",
  13: undefined,
  14: undefined,
  15: undefined,
  16: undefined,
  17: undefined,
  18: undefined,
  19: undefined,
  20: undefined,
  21: "wM",
  22: "wM",
  23: "wM",
  24: "wM",
  25: "wM",
  26: "wM",
  27: "wM",
  28: "wM",
  29: "wM",
  30: "wM",
  31: "wM",
  32: "wK",
};

export const POSITION_MAP: Record<Square, ChessSquare> = {
  1: "b8", 2: "d8", 3: "f8", 4: "h8",
  5: "a7", 6: "c7", 7: "e7", 8: "g7",
  9: "b6", 10: "d6", 11: "f6", 12: "h6",
  13: "a5", 14: "c5", 15: "e5", 16: "g5",
  17: "b4", 18: "d4", 19: "f4", 20: "h4",
  21: "b3", 22: "d3", 23: "f3", 24: "h3",
  25: "a2", 26: "c2", 27: "e2", 28: "g2",
  29: "b1", 30: "d1", 31: "f1", 32: "h1"
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