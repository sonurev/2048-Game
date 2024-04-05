let parentDiv = document.querySelector(".grid");

for (let i = 0; i < 16; i++) {
  const newDiv = document.createElement("div");
  newDiv.classList.add("cell");
  parentDiv.appendChild(newDiv);
}

let score = 0;
let scoreCard = document.getElementById("scoreValue");

let board = [];
for (let i = 0; i < 4; i++) {
  let a = [];
  for (let j = 0; j < 4; j++) {
    a.push(0);
  }
  board.push(a);
}

function emptyCells() {
  let arr = [];
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (board[i][j] == 0) {
        let ind = i * 4 + j;
        arr.push(ind);
      }
    }
  }
  return arr;
}

function clearCells() {
  for (let i = 0; i < 16; i++) {
    let cell = parentDiv.children[i];
    cell.classList.remove("cell-after");
    cell.innerText = "";
  }
}

function initialize() {
  let arr = emptyCells();
  for (let i = 0; i < 2; i++) {
    let ranInd = Math.floor(Math.random() * arr.length);
    let row = Math.floor(arr[ranInd] / 4);
    let col = arr[ranInd] % 4;
    board[row][col] = 2;
    let cell = parentDiv.children[arr[ranInd]];
    cell.classList.add("cell-after");
    cell.innerText = "2";
    // console.log(ranInd);
    arr = emptyCells();
  }
}

initialize();

function createNewTile(arr) {
  // let arr = emptyCells();
  let ranInd = Math.floor(Math.random() * arr.length);
  let row = Math.floor(arr[ranInd] / 4);
  let col = arr[ranInd] % 4;
  board[row][col] = 2;
  let cell = parentDiv.children[arr[ranInd]];
  cell.classList.add("cell-after");
  cell.innerText = "2";
}

const newGameButton = document.getElementById("newbutton");
newGameButton.addEventListener("click", function () {
  scoreCard.innerText = `${0}`;
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      board[i][j] = 0;
    }
  }

  for (let i = 0; i < 16; i++) {
    let cell = parentDiv.children[i];
    cell.classList.remove("cell-after");
    cell.innerText = "";
  }
  initialize();
});

document.addEventListener("keydown", function (event) {
  if (event.key == "ArrowUp") {
    upArrowHandler();
  }
  if (event.key == "ArrowDown") {
    downArrowHandler();
  }
  if (event.key == "ArrowLeft") {
    leftArrowHandler();
  }
  if (event.key == "ArrowRight") {
    rightArrowHandler();
  }
});

function upArrowHandler() {
  for (let c = 0; c < 4; c++) {
    for (let i = 1; i < 4; i++) {
      // Start loop from the second row up to the last row
      for (let j = 0; j < 4; j++) {
        if (board[i][j] != 0) {
          if (board[i - 1][j] == 0) {
            board[i - 1][j] = board[i][j];
            board[i][j] = 0;
          } else if (board[i - 1][j] == board[i][j]) {
            board[i - 1][j] += board[i][j];
            score += board[i - 1][j];
            scoreCard.innerText = `${score}`;
            board[i][j] = 0;
          } else continue;
        }
      }
    }
  }
  updateBoardView(); // Update the board view after moving the tiles
  let arr = emptyCells();
  checkLoss();
  createNewTile(arr); // Create a new tile after moving tiles
}

function downArrowHandler() {
  for (let c = 0; c < 4; c++) {
    for (let i = 2; i >= 0; i--) {
      for (let j = 0; j < 4; j++) {
        if (board[i][j] != 0) {
          if (board[i + 1][j] == 0) {
            board[i + 1][j] = board[i][j];
            board[i][j] = 0;
          } else if (board[i + 1][j] == board[i][j]) {
            board[i + 1][j] += board[i][j];
            score += board[i + 1][j];
            scoreCard.innerText = `${score}`;
            board[i][j] = 0;
          } else continue;
        }
      }
    }
  }
  updateBoardView(); // Update the board view after moving the tiles
  let arr = emptyCells();
  checkLoss();
  createNewTile(arr); // Create a new tile after moving tiles
}

function leftArrowHandler() {
  for (let r = 0; r < 4; r++) {
    for (let j = 1; j < 4; j++) {
      // Start loop from the second column to the last column
      for (let i = 0; i < 4; i++) {
        if (board[i][j] != 0) {
          if (board[i][j - 1] == 0) {
            board[i][j - 1] = board[i][j];
            board[i][j] = 0;
          } else if (board[i][j - 1] == board[i][j]) {
            board[i][j - 1] += board[i][j];
            score += board[i][j - 1];
            scoreCard.innerText = `${score}`;
            board[i][j] = 0;
          } else continue;
        }
      }
    }
  }
  updateBoardView(); // Update the board view after moving the tiles
  let arr = emptyCells();
  checkLoss();
  createNewTile(arr); // Create a new tile after moving tiles
}

function rightArrowHandler() {
  for (let r = 0; r < 4; r++) {
    for (let j = 2; j >= 0; j--) {
      // Start loop from the second-to-last column to the first column
      for (let i = 0; i < 4; i++) {
        if (board[i][j] != 0) {
          if (board[i][j + 1] == 0) {
            board[i][j + 1] = board[i][j];
            board[i][j] = 0;
          } else if (board[i][j + 1] == board[i][j]) {
            board[i][j + 1] += board[i][j];
            score += board[i][j + 1];
            scoreCard.innerText = `${score}`;
            board[i][j] = 0;
          } else continue;
        }
      }
    }
  }
  updateBoardView(); // Update the board view after moving the tiles
  let arr = emptyCells();
  checkLoss();
  createNewTile(arr); // Create a new tile after moving tiles
}

function updateBoardView() {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      let cell = parentDiv.children[i * 4 + j];
      if (board[i][j] == 0) {
        cell.classList.remove("cell-after");
        cell.innerText = "";
      } else {
        cell.classList.add("cell-after");
        cell.innerText = `${board[i][j]}`;
      }
    }
  }
}

function congratulations() {
  window.alert("Superb! You have won the game.");
  const playAgain = window.confirm("Do you want to play again?");

  if (playAgain) {
    initialize();
  }
}

function checkLoss() {
  let arr = emptyCells();
  console.log(arr.length);
  if (arr.length == 0) {
    window.alert(
      `You have scored ${score} points ! To play again, press New Game.`
    );
  }
}