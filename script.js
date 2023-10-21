/* define some variables from the HTML document */
const cells = document.querySelectorAll(".cell");
const message = document.getElementById("message");
const resetButton = document.getElementById("reset");

/* extra variables (player and ) game activity */
let currentPlayer = "X";
let isGame = true;

/* The following function checks if the winning conditions are satisfied */
function checkWin() {
  /* winning combinations */
  let combs = [
    /* rows */
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8] ,
    /* columns */
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8] ,
    /* diagonals */
    [0, 4, 8],
    [2, 4, 6]
  ]; 

  for (let comb of combs) {
    /* check if the wining combinations are equal and non enpty*/
    if (
      cells[comb[0]].textContent == cells[comb[1]].textContent &&
      cells[comb[1]].textContent == cells[comb[2]].textContent &&
      cells[comb[0]].textContent != ""
    ) {
      return true;
    }
  }
  return false;
}

/* The following function checks if the conditions for a draw are satisfied */
function checkDraw() {
  for (const cell of cells) {
    if (cell.innerText == "") {
      return false;
    }
  }
  /* all cells are filled and there is not a win */
  return true;
}

/* The following function handles the changes in display */
function handleCellClick(event) {
  const cell = event.target;
  if (cell.innerText === "" && isGame) {
    /* fill cell with X or O */
    cell.innerText = currentPlayer;
    if (checkWin()) {
      /* show which player wins and stop the game */
      message.innerText = `Player ${currentPlayer} wins!`;
      isGame = false;
    } else if (checkDraw()) {
      /* display that we have a draw and stop the game */
      message.innerText = "It's a draw!";
      isGame = false;
    } else {
      /* if we dont have a win or a draw, it is next players turn */
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      message.innerText = `Player ${currentPlayer}'s turn`;
    }
  }
}

/* The following function resets the game */
function resetGame() {
  /* empty cells and return to original game settings */
  cells.forEach((cell) => (cell.innerText = ""));
  isGame = true;
  currentPlayer = "X";
  message.innerText = "Player X's turn";
}

/* call the functions */
cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
resetButton.addEventListener("click", resetGame);
