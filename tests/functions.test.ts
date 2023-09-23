import { expect, test } from '@jest/globals';
import { fenToObj } from "../src/checkerboard/functions";
import { BoardPosition } from "../src/checkerboard/types/index";

test('fenToObjUnparseable', () => {
   expect(fenToObj("junk") === {} as BoardPosition );  // invalid FEN
});

test('fenToObjFourCornersFourPieces', () => {
   expect(fenToObj("1M11111K/11111111/11111111/11111111/11111111/11111111/11111111/m11111k1/") === 
          {"h8": "wK",
          "f8": undefined,
          "d8": undefined,
          "b8": "wM",
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
          "g1": "bK",
          "e1": undefined,
          "c1": undefined,
          "a1": "bM",
        } as BoardPosition ); 

});