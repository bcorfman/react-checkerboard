import { BoardPosition } from "./types";

export const COLUMNS = "abcdefgh".split("");

export const START_POSITION_OBJECT: BoardPosition = {
  b8: "wM",
  d8: "wM",
  f8: "wM",
  h8: "wM",
  a7: "wM",
  c7: "wM",
  e7: "wM",
  g7: "wM",
  b6: "wM",
  d6: "wM",
  f6: "wM",
  h6: "wK",
  a1: "bM",
  c1: "bM",
  e1: "bM",
  g1: "bM",
  b2: "bM",
  d2: "bM",
  f2: "bM",
  h2: "bM",
  a3: "bM",
  c3: "bM",
  e3: "bM",
  g3: "bK",
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
