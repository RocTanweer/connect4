import "./main.css";

const bb1 = 0n;
const bb2 = 0n;
const bbemp = (BigInt(1) << BigInt(42)) - BigInt(1);
const ROW_NUMBER = 6n;
const COL_NUMBER = 7n;
let userInput = 3n;
let lowestRowNumber;

const winningPatternMasks = [
  15n,
  30n,
  60n,
  120n,
  1920n,
  3840n,
  7680n,
  15360n,
  245760n,
  491520n,
  983040n,
  1966080n,
  31457280n,
  62914560n,
  125829120n,
  251658240n,
  4026531840n,
  8053063680n,
  16106127360n,
  32212254720n,
  515396075520n,
  1030792151040n,
  2061584302080n,
  4123168604160n,
  2113665n,
  4227330n,
  8454660n,
  270549120n,
  541098240n,
  1082196480n,
  34630287360n,
  69260574720n,
  138521149440n,
  4432676782080n,
  8865353564160n,
  17730707128320n,
  567382628106240n,
  1134765256212480n,
  2269530512424960n,
  72624976397598720n,
  145249952795197440n,
  290499905590394880n,
  9295996978892636160n,
  18591993957785272320n,
  37183987915570544640n,
  16843009n,
  33686018n,
  67372036n,
  134744072n,
  2155905152n,
  4311810304n,
  8623620608n,
  17247241216n,
  275955859456n,
  551911718912n,
  1103823437824n,
  2207646875648n,
  2130440n,
  4260880n,
  8521760n,
  17043520n,
  272696320n,
  545392640n,
  1090785280n,
  2181570560n,
  34905128960n,
  69810257920n,
  139620515840n,
  279241031680n,
];

// validating that dropping by combining both bb1 and bb2
const union = (board1, board2) => {
  return board1 | board2;
};

const createMask = (rowNumber, colNumber) => {
  const leftOffset = rowNumber * COL_NUMBER + colNumber;
  return 1n << leftOffset;
};

// dropping logic for a given column number
// getting the lowest possible row number for a given column number to drop
const getLowestRowNumber = (uBoard, colNumber) => {
  const masks = [];

  for (let i = 0n; i < 6n; i++) {
    const mask = createMask(i, colNumber);
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

const makeMove = (pBoard, eBoard, rowNumber, colNumber) => {
  const mask = 1n << (rowNumber * COL_NUMBER + colNumber);
  pBoard |= mask;

  eBoard ^= mask;

  return [pBoard, eBoard];
};

const generateRowWins = () => {
  const rowWins = [];

  for (let i = 0n; i < 6n; i++) {
    const mask1 = createMask(i, j);
    const mask2 = createMask(i, j + 1n);
    const mask3 = createMask(i, j + 2n);
    const mask4 = createMask(i, j + 3n);
    const result = mask1 | mask2 | mask3 | mask4;
    rowWins.push(result);
  }
  return rowWins;
};

const generateColumnWins = () => {
  const columnWins = [];

  for (let i = 0n; i < 7n; i++) {
    for (let j = 0n; j < 3n; j++) {
      const mask1 = createMask(i, j);
      const mask2 = createMask(i + 1n, j);
      const mask3 = createMask(i + 2n, j);
      const mask4 = createMask(i + 3n, j);
      const result = mask1 | mask2 | mask3 | mask4;
      columnWins.push(result);
    }
  }

  return columnWins;
};

const generateDiagonalWinsblttr = () => {
  const diagonalWinstltbr = [];

  for (let i = 0n; i < 3n; i++) {
    for (let j = 0n; j < 4n; j++) {
      const mask1 = createMask(i, j);
      const mask2 = createMask(i + 1n, j + 1n);
      const mask3 = createMask(i + 2n, j + 2n);
      const mask4 = createMask(i + 3n, j + 3n);
      const result = mask1 | mask2 | mask3 | mask4;
      diagonalWinstltbr.push(result);
    }
  }

  return diagonalWinstltbr;
};

const generateDiagonalWinstltbr = () => {
  const diagonalWinsbltr = [];

  for (let i = 3n; i < 6n; i++) {
    for (let j = 0n; j < 4n; j++) {
      const mask1 = createMask(i, j);
      const mask2 = createMask(i - 1n, j + 1n);
      const mask3 = createMask(i - 2n, j + 2n);
      const mask4 = createMask(i - 3n, j + 3n);
      const result = mask1 | mask2 | mask3 | mask4;
      diagonalWinsbltr.push(result);
    }
  }

  return diagonalWinsbltr;
};

const checkForWin = (pBoard, winningMasks) => {
  for (let i = 0n; i < winningMasks.length; i++) {
    const result = pBoard & winningMasks[i];

    if (result === winningMasks[i]) {
      return true;
    }
  }

  return false;
};

const checkForDraw = (eBoard) => {
  if (eBoard === 0n) {
    return true;
  } else {
    return false;
  }
};
