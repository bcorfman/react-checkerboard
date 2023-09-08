import { COLUMNS, SQUARE_MAP } from "../consts";
import { Square } from "../types";
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
  const blackColor = customDarkSquareStyle.backgroundColor;
  const isDarkSquare = getColumn() + getRow() in SQUARE_MAP;

  function getRow() {
    return boardOrientation === "white" ? 8 - row : row + 1;
  }

  function getColumn() {
    return boardOrientation === "black" ? COLUMNS[7 - col] : COLUMNS[col];
  }

  function getSquareNumber() {
    const idx: string = getColumn() + getRow();
    const num = SQUARE_MAP[idx as Square];
    return num;
  }

  function renderNumber() {
    return (
      <div
        style={{
          userSelect: "none",
          zIndex: 0,
          position: "absolute",
          ...(boardOrientation === "black"
            ? { color: row % 2 === 0 ? whiteColor : whiteColor }
            : { color: row % 2 === 0 ? whiteColor : whiteColor }),
          ...numericStyle(boardWidth),
        }}
      >
        {getSquareNumber()}
      </div>
    );
  }

  if (isDarkSquare) {
    return renderNumber();
  }

  return null;
}

const numericStyle = (width: number) => ({
  alignSelf: "flex-start",
  paddingRight: width / 8 - width / 48,
  fontSize: width / 48,
});
