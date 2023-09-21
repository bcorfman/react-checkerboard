import { fenToObj } from "../src/checkerboard/functions";
import { BoardPosition } from "../src/checkerboard/types/index";

test('fenToObj', () => {
   expect(fenToObj("junk") === {} as BoardPosition );
});