function toggleModal() {
  document.getElementById("modal").classList.toggle("hidden");
}

let player1 = "O";
let player2 = "X";
let currentPlayer = player1;

let gameState = ["", "", "", "", "", "", "", "", ""];
const winningCondition = {
  1: [0, 1, 2],
  2: [3, 4, 5],
  3: [0, 3, 6],
  4: [2, 4, 6],
  5: [1, 4, 7],
  6: [6, 7, 8],
  7: [2, 5, 8],
  8: [0, 4, 8],
};

const cubes = document.getElementById("cubes").children;
const cubeArray = Object.values(cubes);
const playerNameContainer = document.getElementById("current-player");
const resultContainer = document.getElementById("result-message");
const resultMsg = document.getElementById("result-msg");

let move = -1;
let hasResult = false;
let winner;

function handlePlayerChange() {
  currentPlayer = currentPlayer == player1 ? player2 : player1;
  playerNameContainer.innerHTML = `${currentPlayer}'s`;
}

cubeArray.forEach((cube) => {
  cube.addEventListener("click", () => {
    move++;

    cube.innerHTML = currentPlayer;
    cube.style.pointerEvents = "none";
    gameState[cube.dataset.index] = currentPlayer;
    if (move >= 4) {
      let result = checkForResult(currentPlayer);
      if (hasResult) {
        if (result != null) {
          displayResult(result);
        } else {
          console.log("calling for draw");
          displayResult();
        }
        return;
      }
    }
    handlePlayerChange();
  });
});

function checkForResult(playerSign) {
  let flag = false;
  for (let i = 1; i <= 8; i++) {
    let indexes = winningCondition[i];
    if (
      gameState[indexes[0]] === playerSign &&
      gameState[indexes[1]] === playerSign &&
      gameState[indexes[2]] === playerSign
    ) {
      hasResult = true;
      winner = playerSign === "O" ? player1 : player2;
      flag = true;
      return indexes;
    }
  }
  console.log(move);
  if (!flag && move == 8) {
    hasResult = true;
    return null;
  } else if (!flag) {
    return null;
  }
}

function winningMessage() {
  return `Congratulations! ${winner} has won the match!`;
}
function DrawMessage() {
  return `Draw! Game over!`;
}
function displayResult(indexArr = null) {
  if (winner) {
    toggleModal();
    cubeArray.forEach((cube) => {
      if (indexArr.includes(parseInt(cube.dataset.index))) {
        cube.classList.remove("bg-green-300");
        cube.classList.add("bg-red-500");
      }
    });
    resultContainer.innerHTML = winningMessage();
    resultMsg.innerHTML = winningMessage();
    playerNameContainer.parentNode.classList.add("hidden");
  } else {
    toggleModal();
    resultContainer.innerHTML = DrawMessage();
    resultMsg.innerHTML = DrawMessage();
    playerNameContainer.parentNode.classList.add("hidden");
  }
}

function reset() {
  cubeArray.forEach((cube) => {
    if (cube.classList.contains("bg-red-500")) {
      cube.classList.remove("bg-red-500");
      cube.classList.add("bg-green-300");
    }
    cube.style.pointerEvents = "auto";
    cube.innerHTML = "";
    gameState[cube.dataset.index] = "";
    currentPlayer = player1;
    hasResult = undefined;
    winner = undefined;
    move = -1;
    playerNameContainer.parentNode.classList.remove("hidden");
    resultMsg.innerHTML = "";
  });
}
function playAgain() {
  toggleModal();
  reset();
}
