import { COLUMNS } from "../consts";
import { useCheckerboard } from "../context/checkerboard-context";

type NotationProps = {
  row: number;
  col: number;
};

export function Notation({ row, col }: NotationProps) {
  const {
    boardOrientation,
    boardWidth,
    customDarkSquareStyle,
    customLightSquareStyle,
  } = useCheckerboard();

  const whiteColor = customLightSquareStyle.backgroundColor;
  //const blackColor = customDarkSquareStyle.backgroundColor;

  const isRow = col === 0;
  const isColumn = row === 7;
  const isBottomLeftSquare = isRow && isColumn;

  function getRow() {
    return boardOrientation === "white" ? 8 - row : row + 1;
  }

  function getColumn() {
    return boardOrientation === "black" ? COLUMNS[7 - col] : COLUMNS[col];
  }

  function renderBottomLeft() {
    return (
      <>
        <div
          style={{
            zIndex: 3,
            position: "absolute",
            ...{ color: whiteColor },
            ...numericStyle(boardWidth),
          }}
        >
        </div>
        <div
          style={{
            zIndex: 3,
            position: "absolute",
            ...{ color: whiteColor },
            ...alphaStyle(boardWidth),
          }}
        >
        </div>
      </>
    );
  }

  
  if (isBottomLeftSquare) {
    return renderBottomLeft();
  }

  return null;
}

const alphaStyle = (width: number) => ({
  alignSelf: "flex-end",
  paddingLeft: width / 8 - width / 48,
  fontSize: width / 48,
});

const numericStyle = (width: number) => ({
  alignSelf: "flex-start",
  paddingRight: width / 8 - width / 48,
  fontSize: width / 48,
});
