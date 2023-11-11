/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";

import GameBoardHeader from "./GameBoardHeader";
import wb from "../assets/wb.svg";
import bb from "../assets/bb.svg";
import arrow from "../assets/arrow.svg";

import {
  makeMove,
  union,
  getLowestRowNumber,
  checkForWin,
  getCoordinates,
} from "../utils/functions";
import { winningPatternMasks } from "../data/winningPatternMasks";
import { ROW_NUMBER, COL_NUMBER } from "../data/boardDimension";

const initDiscState = {
  c0: [],
  c1: [],
  c2: [],
  c3: [],
  c4: [],
  c5: [],
  c6: [],
};

function App() {
  const [discState, setDiscState] = useState(initDiscState);
  const [playerTurn, setPlayerTurn] = useState("p1");
  // const [downArrowState, setDownArrowState] = useState({
  //   pos: null,
  //   isVisible: false,
  // });
  const [gameBoardState, setGameBoardState] = useState({
    bb1: 0n,
    bb2: 0n,
    bbemp: (BigInt(1) << BigInt(42)) - BigInt(1),
  });
  const [isThereWinner, setIsThereWinner] = useState(false);

  const board = useRef(null);

  useEffect(() => {
    if (isThereWinner) {
      console.log(`Winner is ${playerTurn === "p1" ? "yellow" : "red"}`);
      // const { bb1, bb2 } = gameBoardState;
      // const winnerbb = playerTurn === "p1" ? bb2 : bb1;
      // const coor = getCoordinates(winnerbb, ROW_NUMBER, COL_NUMBER);
      // const arrOfBoard = Array.from(board.current.children);

      // for (let i = 0; i < arrOfBoard.length; i++) {
      //   const arrOfDisks = Array.from(
      //     arrOfBoard[i].getElementsByTagName("div")
      //   );
      //   for (let j = 0; j < arrOfDisks.length; j++) {
      //     if (coor.includes(`${i},${j}`)) {
      //       setTimeout(() => {
      //         arrOfDisks[j].classList.add("temp");
      //       }, 600);
      //     }
      //   }
      // }
    }
  }, [isThereWinner, gameBoardState, playerTurn]);

  return (
    <main className="flex justify-center items-center bg-purple1 w-full h-screen font-main">
      <section className="w-[1032px] h-auto -translate-y-24">
        <GameBoardHeader />
        <div className="w-full h-auto flex justify-between items-center">
          <div className="w-[127px] h-[158px] rounded-3xl bg-white flex justify-center items-center before:context-plyrright">
            <div>
              <div className="font-bold text-xl">PLAYER 1</div>
              <div className="font-bold text-6xl text-center">0</div>
            </div>
          </div>

          {/* Main Board */}
          <div className="relative w-[632px] h-[584px]">
            <img src={bb} className="absolute z-10" />
            <img src={wb} className="absolute z-30 pointer-events-none" />
            {/* <img
              src={arrow}
              className={`absolute z-50 -top-10 ${
                downArrowState.isVisible ? "block" : "hidden"
              }`}
              style={{ left: `${downArrowState.pos}px` }}
            /> */}
            <div
              ref={board}
              className="relative flex justify-between w-[598px] h-full mx-auto hover:cursor-pointer z-20"
            >
              {Object.keys(discState).map((cno, i) => {
                return (
                  <BoardColumn
                    key={i}
                    columnNo={cno}
                    discState={discState}
                    setDiscState={setDiscState}
                    playerTurn={playerTurn}
                    setPlayerTurn={setPlayerTurn}
                    // setDownArrowPosX={setDownArrowState}
                    gameBoardState={gameBoardState}
                    setGameBoardState={setGameBoardState}
                    setIsThereWinner={setIsThereWinner}
                  />
                );
              })}
            </div>
          </div>

          <div className="w-[127px] h-[158px] rounded-3xl bg-white flex justify-center items-center before:context-plyrright">
            <div>
              <div className="font-bold text-xl">PLAYER 2</div>
              <div className="font-bold text-6xl text-center">0</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function Disk({ data, isLast }) {
  const { type, pos } = data;

  function calcRowNumber(pos) {
    return 20 + (5 - pos) * 88;
  }

  return (
    <>
      <style>
        {`
          @keyframes drop${pos} {
            0% {
              top: 0px
            }
            80% {
              top: ${calcRowNumber(pos)}px
            }
            90% {
              top: ${calcRowNumber(pos) - 20}px
            }
            100% {
              top: ${calcRowNumber(pos)}px
            }
          }
        `}
      </style>

      <div
        style={{
          top: `${calcRowNumber(pos)}px`,
          animation: `drop${pos} ${
            isLast ? "500ms" : "0s"
          } cubic-bezier(0.895, 0.030, 0.685, 0.220) forwards`,
        }}
        className={`absolute left-2/4 -translate-x-2/4 shadow-inner shadow-black-50  ${
          type === "p1" ? "bg-red" : "bg-yellow a"
        } w-[64px] h-[64px] rounded-full mx-auto before:content-[''] before:hidden before:top-2/4 before:-translate-y-2/4 before:left-2/4 before:-translate-x-2/4  before:w-7 before:h-7 before:border-[6px] before:rounded-full before:border-white`}
      ></div>
    </>
  );
}

function BoardColumn({
  columnNo,
  discState,
  setDiscState,
  playerTurn,
  setPlayerTurn,
  // setDownArrowPosX,
  gameBoardState,
  setGameBoardState,
  setIsThereWinner,
}) {
  function handleColumnClick(e) {
    if (discState[columnNo].length >= 6) {
      return;
    }

    // Game logic
    const currEl = e.target;
    const parentEl = e.target.parentNode;

    const bcolumnNumber = BigInt(Array.from(parentEl.children).indexOf(currEl));
    const combinedBoard = union(gameBoardState.bb1, gameBoardState.bb2);

    const browNumber = getLowestRowNumber(
      combinedBoard,
      bcolumnNumber,
      COL_NUMBER,
      ROW_NUMBER
    );

    const pBoard =
      playerTurn === "p1" ? gameBoardState.bb1 : gameBoardState.bb2;
    const eBoard = gameBoardState.bbemp;
    const [newPBoard, newEBoard] = makeMove(
      pBoard,
      eBoard,
      browNumber,
      bcolumnNumber,
      COL_NUMBER
    );

    setGameBoardState((prev) => {
      return {
        ...prev,
        [playerTurn === "p1" ? "bb1" : "bb2"]: newPBoard,
        bbemp: newEBoard,
      };
    });
    const isWinner = checkForWin(newPBoard, winningPatternMasks);
    if (isWinner) {
      setIsThereWinner(isWinner);
    }

    setDiscState((prev) => {
      const tempObj = {
        ...prev,
        [columnNo]: [
          ...prev[columnNo],
          { type: playerTurn, pos: prev[columnNo].length },
        ],
      };

      return tempObj;
    });

    setPlayerTurn((prev) => {
      if (prev === "p1") {
        return "p2";
      } else {
        return "p1";
      }
    });
  }

  // function handleMouseEnter(e) {
  //   const childRect = e.target.getBoundingClientRect();
  //   const parentRect = e.target.parentNode.getBoundingClientRect();
  //   const xDistance = childRect.left - parentRect.left;
  //   setDownArrowPosX((prev) => {
  //     return { ...prev, pos: 34 + xDistance, isVisible: true };
  //   });
  // }

  // function handleMouseLeave() {
  //   setDownArrowPosX((prev) => {
  //     return { ...prev, pos: null, isVisible: false };
  //   });
  // }

  return (
    <div
      className="relative w-[70px] h-full"
      onClick={handleColumnClick}
      // onMouseEnter={handleMouseEnter}
      // onMouseLeave={handleMouseLeave}
    >
      {discState[columnNo].map((el, i, arr) => {
        if (i === arr.length - 1) {
          return <Disk key={i} data={el} isLast={true} />;
        }
        return <Disk key={i} data={el} isLast={false} />;
      })}
    </div>
  );
}

export default App;
