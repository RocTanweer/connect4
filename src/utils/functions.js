// validating that dropping by combining both bb1 and bb2
export const union = (board1, board2) => {
  return board1 | board2;
};

// dropping logic for a given column number
// getting the lowest possible row number for a given column number to drop
export const getLowestRowNumber = (
  uBoard,
  bcolumnNumber,
  COL_NUMBER,
  ROW_NUMBER
) => {
  const masks = [];

  for (let i = 0n; i < ROW_NUMBER; i++) {
    const leftOffset = i * COL_NUMBER + bcolumnNumber;
    const mask = 1n << leftOffset;
    masks.push(mask);
  }

  for (let i = 0n; i < masks.length; i++) {
    const result = masks[i] & uBoard;

    if (result === 0n) {
      return i;
    }
  }
  return -1n;
};

export const makeMove = (
  pBoard,
  eBoard,
  browNumber,
  bcolumnNumber,
  COL_NUMBER
) => {
  const mask = 1n << (browNumber * COL_NUMBER + bcolumnNumber);

  pBoard |= mask;

  eBoard ^= mask;

  return [pBoard, eBoard];
};

export const checkForWin = (pBoard, winningMasks) => {
  for (let i = 0n; i < winningMasks.length; i++) {
    const result = pBoard & winningMasks[i];

    if (result === winningMasks[i]) {
      return true;
    }
  }

  return false;
};

export const checkForDraw = (eBoard) => {
  if (eBoard === 0n) {
    return true;
  } else {
    return false;
  }
};

// const createMask = (rowNumber, colNumber) => {
//   const leftOffset = rowNumber * COL_NUMBER + colNumber;
//   return 1n << leftOffset;
// };

// const generateRowWins = () => {
//   const rowWins = [];

//   for (let i = 0n; i < 6n; i++) {
//     const mask1 = createMask(i, j);
//     const mask2 = createMask(i, j + 1n);
//     const mask3 = createMask(i, j + 2n);
//     const mask4 = createMask(i, j + 3n);
//     const result = mask1 | mask2 | mask3 | mask4;
//     rowWins.push(result);
//   }
//   return rowWins;
// };

// const generateColumnWins = () => {
//   const columnWins = [];

//   for (let i = 0n; i < 7n; i++) {
//     for (let j = 0n; j < 3n; j++) {
//       const mask1 = createMask(i, j);
//       const mask2 = createMask(i + 1n, j);
//       const mask3 = createMask(i + 2n, j);
//       const mask4 = createMask(i + 3n, j);
//       const result = mask1 | mask2 | mask3 | mask4;
//       columnWins.push(result);
//     }
//   }

//   return columnWins;
// };

// const generateDiagonalWinsblttr = () => {
//   const diagonalWinstltbr = [];

//   for (let i = 0n; i < 3n; i++) {
//     for (let j = 0n; j < 4n; j++) {
//       const mask1 = createMask(i, j);
//       const mask2 = createMask(i + 1n, j + 1n);
//       const mask3 = createMask(i + 2n, j + 2n);
//       const mask4 = createMask(i + 3n, j + 3n);
//       const result = mask1 | mask2 | mask3 | mask4;
//       diagonalWinstltbr.push(result);
//     }
//   }

//   return diagonalWinstltbr;
// };

// const generateDiagonalWinstltbr = () => {
//   const diagonalWinsbltr = [];

//   for (let i = 3n; i < 6n; i++) {
//     for (let j = 0n; j < 4n; j++) {
//       const mask1 = createMask(i, j);
//       const mask2 = createMask(i - 1n, j + 1n);
//       const mask3 = createMask(i - 2n, j + 2n);
//       const mask4 = createMask(i - 3n, j + 3n);
//       const result = mask1 | mask2 | mask3 | mask4;
//       diagonalWinsbltr.push(result);
//     }
//   }

//   return diagonalWinsbltr;
// };
