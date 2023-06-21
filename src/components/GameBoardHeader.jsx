import logo from "../assets/logo.svg";

function GameBoardHeader() {
  return (
    <div className="w-[632px] flex items-center justify-between mx-auto mb-20">
      <button className="bg-purple2 text-white font-bold py-1 px-4 rounded-3xl h-10">
        MENU
      </button>

      <img src={logo} />

      <button className="bg-purple2 text-white font-bold py-1 px-4 rounded-3xl h-10">
        RESTART
      </button>
    </div>
  );
}

export default GameBoardHeader;
