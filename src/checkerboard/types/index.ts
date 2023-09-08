import type { FC, ReactElement, ReactNode, Ref, RefObject } from "react";
import { BackendFactory } from "dnd-core";


export type Square =
  | "b8"
  | "d8"
  | "f8"
  | "h8"
  | "a7"
  | "c7"
  | "e7"
  | "g7"
  | "b6"
  | "d6"
  | "f6"
  | "h6"
  | "a5"
  | "c5"
  | "e5"
  | "g5"
  | "b4"
  | "d4"
  | "f4"
  | "h4"
  | "a3"
  | "c3"
  | "e3"
  | "g3"
  | "b2"
  | "d2"
  | "f2"
  | "h2"
  | "a1"
  | "c1"
  | "e1"
  | "g1";

export type CheckerSquare =  1 |  2 |  3 |  4 |  5 |  6 |  7 |  8 |  9 | 10 | 
                            11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 |
                            21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 |
                            31 | 32;


export type Piece =
  | "wM"
  | "wK"
  | "bM"
  | "bK";

export type BoardPosition = { [square in Square]?: Piece };

export type PromotionPieceOption =
  | "wM"
  | "bM";
export type PromotionStyle = "default";

export type CustomSquareProps = {
  children: ReactNode;
  // Allow user to specify their outer element
  // Opting not to use generics for simplicity
  ref: Ref<any>;
  square: Square;
  squareColor: "white" | "black";
  style: Record<string, string | number>;
};

export type CustomSquareRenderer =
  | FC<CustomSquareProps>
  | keyof JSX.IntrinsicElements;

export type CustomPieceFnArgs = {
  isDragging: boolean;
  squareWidth: number;
};

export type CustomPieceFn = (args: CustomPieceFnArgs) => ReactElement;

export type CustomPieces = {
  [key in Piece]?: CustomPieceFn;
};

export type CustomSquareStyles = {
  [key in Square]?: Record<string, string | number>;
};

export type BoardOrientation = "white" | "black";

export type DropOffBoardAction = "snapback" | "trash";

export type Coords = { x: number; y: number };

export type CheckerboardProps = {
  /**
   * Time in milliseconds for piece to slide to target square. Only used when the position is programmatically changed. If a new position is set before the animation is complete, the board will cancel the current animation and snap to the new position.
   * @default 300
   */
  animationDuration?: number;
  /**
   * Whether or not arrows can be drawn with right click and dragging.
   * @default true
   */
  areArrowsAllowed?: boolean;
  /**
   * Whether or not all pieces are draggable.
   * @default true
   */
  arePiecesDraggable?: boolean;
  /**
   * Whether or not premoves are allowed.
   * @default false
   */
  arePremovesAllowed?: boolean;
  /**
   * The orientation of the board, the chosen colour will be at the bottom of the board.
   * @default white
   */
  boardOrientation?: BoardOrientation;
  /**
   * The width of the board in pixels.
   */
  boardWidth?: number;
  /**
   * If premoves are allowed, whether or not to clear the premove queue on right click.
   * @default true
   */
  clearPremovesOnRightClick?: boolean;
  /**
   * Array of custom arrows to draw on the board. Each arrow within the array must be an array of length 2 with strings denoting the from and to square to draw the arrow e.g. [ ['a3', 'a5'], ['g1', 'f3'] ].
   * @default []
   */
  customArrows?: Square[][];
  /**
   * String with rgb or hex value to colour drawn arrows.
   * @default rgb(255,170,0)
   */
  customArrowColor?: string;
  /**
   * Custom board style object e.g. { borderRadius: '5px', boxShadow: '0 5px 15px rgba(0, 0, 0, 0.5 '}.
   * @default {}
   */
  customBoardStyle?: Record<string, string | number>;
  /**
   * Custom dark square style object.
   * @default { backgroundColor: "#B58863" }
   */
  customDarkSquareStyle?: Record<string, string>;
  /**
   * Custom react-dnd backend to use instead of the one provided by react-checkerboard.
   */
  customDndBackend?: BackendFactory;
  /**
   * Options to use for the given custom react-dnd backend. See customDndBackend.
   */
  customDndBackendOptions?: unknown;
  /**
   * Custom drop square style object (Square being hovered over with dragged piece).
   * @default { boxShadow: "inset 0 0 1px 6px rgba(255,255,255,0.75)" }
   */
  customDropSquareStyle?: Record<string, string | number>;
  /**
   * Custom light square style object.
   * @default { backgroundColor: "#F0D9B5" }
   */
  customLightSquareStyle?: Record<string, string>;
  /**
   * Custom pieces object where each key must match a corresponding checkers piece (wP, wB, wN, wR, wQ, wK, bP, bB, bN, bR, bQ, bK). The value of each piece is a function that takes in some optional arguments to use and must return JSX to render. e.g. { wK: ({ isDragging: boolean, squareWidth: number }) => jsx }.
   * @default {}
   */
  customPieces?: CustomPieces;
  /**
   * Custom premove dark square style object.
   * @default { backgroundColor: "#A42323" }
   */
  customPremoveDarkSquareStyle?: Record<string, string | number>;
  /**
   * Custom premove light square style object.
   * @default { backgroundColor: "#BD2828" }
   */
  customPremoveLightSquareStyle?: Record<string, string | number>;
  /**
   * Custom square renderer for all squares.
   * @default div
   */
  customSquare?: CustomSquareRenderer;
  /**
   * Custom styles for all squares.
   * @default {}
   */
  customSquareStyles?: CustomSquareStyles;
  /**
   * Action to take when piece is dropped off the board.
   * @default snapback
   */
  dropOffBoardAction?: DropOffBoardAction;
  /**
   * Board identifier, necessary if more than one board is mounted for drag and drop.
   * @default 0
   */
  id?: string | number;
  /**
   * Function called when a piece drag is attempted. Returns if piece is draggable.
   * @default () => true
   */
  isDraggablePiece?: (args: { piece: Piece; sourceSquare: Square }) => boolean;
  /**
   * User function that receives current position object when position changes.
   * @default () => {}
   */
  getPositionObject?: (currentPosition: BoardPosition) => any;
  /**
   * User function is run when arrows are set on the board.
   * @default () => {}
   */
  onArrowsChange?: (squares: Square[][]) => void;
  /**
   * User function that is run when piece is dragged over a square.
   * @default () => {}
   */
  onDragOverSquare?: (square: Square) => any;
  /**
   * User function that is run when mouse leaves a square.
   * @default () => {}
   */
  onMouseOutSquare?: (square: Square) => any;
  /**
   * User function that is run when mouse is over a square.
   * @default () => {}
   */
  onMouseOverSquare?: (square: Square) => any;
  /**
   * User function that is run when piece is clicked.
   * @default () => {}
   */
  onPieceClick?: (piece: Piece) => any;
  /**
   * User function that is run when piece is grabbed to start dragging.
   * @default () => {}
   */
  onPieceDragBegin?: (piece: Piece, sourceSquare: Square) => any;
  /**
   * User function that is run when piece is let go after dragging.
   * @default () => {}
   */
  onPieceDragEnd?: (piece: Piece, sourceSquare: Square) => any;
  /**
   * User function that is run when piece is dropped on a square. Must return whether the move was successful or not.
   * @default () => true
   */
  onPieceDrop?: (
    sourceSquare: Square,
    targetSquare: Square,
    piece: Piece
  ) => boolean;
  /**
   * User function that is run when piece is dropped. Must return whether the move results in a promotion or not.
   * @default (sourceSquare, targetSquare, piece) => (((piece === "wP" && sourceSquare[1] === "7" && targetSquare[1] === "8") || 
   *                                                  (piece === "bP" && sourceSquare[1] === "2" && targetSquare[1] === "1")) && 
   *                                                  Math.abs(sourceSquare.charCodeAt(0) - targetSquare.charCodeAt(0)) <= 1)
   */
  onPromotionCheck?: (
    sourceSquare: Square,
    targetSquare: Square,
    piece: Piece
  ) => boolean;
  /**
   * User function that is run when a promotion piece is selected. Must return whether the move was successful or not.
   * @default () => true
   */
  onPromotionPieceSelect?: (piece?: PromotionPieceOption) => boolean;
  /**
   * User function that is run when a square is clicked.
   * @default () => {}
   */
  onSquareClick?: (square: Square) => any;
  /**
   * User function that is run when a square is right clicked.
   * @default () => {}
   */
  onSquareRightClick?: (square: Square) => any;
  /**
   * FEN string or position object notating where the checkers pieces are on the board. Start position can also be notated with the string: 'start'.
   * @default start
   */
  position?: string | BoardPosition;
  /**
   * Style of promotion dialog.
   * @default default
   */
  promotionDialogVariant?: PromotionStyle;
  /**
   * The square to promote a piece to.
   * @default null
   */
  promotionToSquare?: Square | null;
  /**
   * RefObject that is sent as forwardRef to checkerboard.
   */
  ref?: RefObject<HTMLDivElement>;
  /**
   * Whether or not to show the file and rank co-ordinates (a..h, 1..8).
   * @default true
   */
  showBoardNotation?: boolean;
  /**
   * Whether or not to show the promotion dialog.
   * @default false
   */
  showPromotionDialog?: boolean;
  /**
   * Whether or not to center dragged pieces on the mouse cursor.
   * @default true
   */
  snapToCursor?: boolean;
  /**
   * Whether or not to automatically promote pawn to queen
   * @default false
   */
  autoPromoteToQueen?: boolean;
};
