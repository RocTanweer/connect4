/* eslint-disable react/prop-types */
import { useState } from "react";

import GameBoardHeader from "./GameBoardHeader";
import wb from "../assets/wb.svg";
import bb from "../assets/bb.svg";

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
            <div
              className="relative flex justify-between w-[598px] h-full mx-auto hover:cursor-pointer z-20"
              onClick={console.log("hel")}
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
        className={`absolute left-2/4 -translate-x-2/4 ${
          type === "p1" ? "bg-red" : "bg-yellow a"
        } w-[64px] h-[64px] rounded-full mx-auto`}
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
}) {
  function handleColumnClick() {
    if (discState[columnNo].length >= 6) {
      return;
    }

    setDiscState((prev) => {
      return {
        ...prev,
        [columnNo]: [
          ...prev[columnNo],
          { type: playerTurn, pos: prev[columnNo].length },
        ],
      };
    });

    setPlayerTurn((prev) => {
      console.log(prev);
      if (prev === "p1") {
        return "p2";
      } else {
        return "p1";
      }
    });
  }

  return (
    <div className="relative w-[70px] h-full" onClick={handleColumnClick}>
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
