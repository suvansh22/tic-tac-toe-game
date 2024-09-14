import { useState } from "react";
import "./index.css";

const INITIAL_BOARD_STATE = ["", "", "", "", "", "", "", "", ""];

export default function TicTacTo() {
  const [winner, setWinner] = useState("");
  const [player, setPlayer] = useState(true);
  const [board, setBoard] = useState(INITIAL_BOARD_STATE);

  const checkWinner = (currentBoardState) => {
    const horizontalStartIndex = [0, 3, 6];
    const verticalStartIndex = [0, 1, 2];
    for (let i = 0; i < 9; i += 1) {
      if (
        horizontalStartIndex.includes(i) &&
        currentBoardState[i] !== "" &&
        currentBoardState[i] === currentBoardState[i + 1] &&
        currentBoardState[i] === currentBoardState[i + 2]
      ) {
        return true;
      }
      if (
        verticalStartIndex.includes(i) &&
        currentBoardState[i] !== "" &&
        currentBoardState[i] === currentBoardState[i + 3] &&
        currentBoardState[i] === currentBoardState[i + 6]
      ) {
        return true;
      }
    }
    if (
      currentBoardState[0] !== "" &&
      currentBoardState[0] === currentBoardState[4] &&
      currentBoardState[0] === currentBoardState[8]
    ) {
      return true;
    }
    if (
      currentBoardState[2] !== "" &&
      currentBoardState[2] === currentBoardState[4] &&
      currentBoardState[2] === currentBoardState[6]
    ) {
      return true;
    }
    return false;
  };

  const checkTie = (currentBoardState) => {
    let cellData = 0;
    for (let i = 0; i < 9; i++) {
      if (currentBoardState[i] !== "") {
        cellData++;
      }
    }
    if (cellData === 9) {
      setWinner("tie");
    }
  };

  const cellOnClick = (e, id) => {
    if (e.currentTarget.innerText !== "") return;
    const tempBoard = [...board];
    if (player) {
      e.currentTarget.innerText = "O";
      tempBoard[id] = "O";
    } else {
      e.currentTarget.innerText = "X";
      tempBoard[id] = "X";
    }
    setBoard(tempBoard);
    if (checkWinner(tempBoard)) {
      setWinner(player ? "Player 1" : "Player 2");
    } else {
      checkTie(tempBoard);
    }
    setPlayer((prev) => !prev);
  };

  const reset = () => {
    const cell = document.querySelectorAll(".child");
    cell.forEach((item) => {
      item.innerHTML = "";
    });
    setBoard(INITIAL_BOARD_STATE);
    setWinner("");
    setPlayer(true);
  };

  return (
    <>
      <div className="parent">
        <div onClick={(e) => cellOnClick(e, 0)} className="child"></div>
        <div onClick={(e) => cellOnClick(e, 1)} className="child"></div>
        <div onClick={(e) => cellOnClick(e, 2)} className="child"></div>
        <div onClick={(e) => cellOnClick(e, 3)} className="child"></div>
        <div onClick={(e) => cellOnClick(e, 4)} className="child"></div>
        <div onClick={(e) => cellOnClick(e, 5)} className="child"></div>
        <div onClick={(e) => cellOnClick(e, 6)} className="child"></div>
        <div onClick={(e) => cellOnClick(e, 7)} className="child"></div>
        <div onClick={(e) => cellOnClick(e, 8)} className="child"></div>
      </div>
      <div className="winner">
        {winner === "tie"
          ? `It's a tie`
          : winner
          ? `${winner} is the winner`
          : ""}
      </div>
      <button onClick={reset}>Reset</button>
    </>
  );
}
