import { BoardPosition, Square, CheckerSquare } from "./types";

export const COLUMNS = "abcdefgh".split("");

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

export const POSITION_MAP: Record<Square, CheckerSquare> = {
  "b8":  1, "d8":  2, "f8":  3, "h8":  4,
  "a7":  5, "c7":  6, "e7":  7, "g7":  8,
  "b6":  9, "d6": 10, "f6": 11, "h6": 12,
  "a5": 13, "c5": 14, "e5": 15, "g5": 16,
  "b4": 17, "d4": 18, "f4": 19, "h4": 20,
  "a3": 21, "c3": 22, "e3": 23, "g3": 24,
  "b2": 25, "d2": 26, "f2": 27, "h2": 28,
  "a1": 29, "c1": 30, "e1": 31, "g1": 32
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