const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions = [
  [0, 1, 2,3,4],
  [ 5,6,7,8,9],
  [10,11,12,13,14],
  [15,16,17,18,19],
  [20,21,22,23,24],
  [0,5,10,15,20],
  [1,6,11,16,21],
  [2,7,12,17,22],
  [3,8,13,18,23],
  [4,9,14,19,24],
  [0,6,12,18,24],
  [4,8,12,16,20],
 
];

//create a function first to initialize the game

function initGame() {
  currentPlayer = "X";
  gameGrid = ["", "", "", "", "", "", "", "", "","","", "", "", "", "", "", "", "", "","","", "", "", "", ""]; //boxes empty in grid

  // to show boxes empty on ui
  boxes.forEach((box, index) => {
    box.innerText = "";
    boxes[index].style.pointerEvents = "all";

//after click on new game background green color should also be removed  or  we can say all its css properties will be same as initially.

box.classList=`box box${index+1}`;



  });

  // to remove new game button on ui
  newGameBtn.classList.remove("active");
  gameInfo.innerText = `Current Player - ${currentPlayer}`;


}

initGame();

// index to track which box is clicked out of 9
boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    handleClick(index);
  });
});

function handleClick(index) {
  // perform only if grid is empty at any index
  if (gameGrid[index] === "") {
    boxes[index].innerText = currentPlayer; // to show on ui

    // to implememnt internal logic

    gameGrid[index] = currentPlayer;
    // to remove hand after putting value

    boxes[index].style.pointerEvents = "none";

    //swap the turn
    swapTurn();

    //check if someone won or not

    checkGameOver();
  }
}

function swapTurn() {
  if (currentPlayer === "X") {
    currentPlayer = "O";
  } else {
    currentPlayer = "X";
  }

  // UPDATE ON UI

  gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

// new game button will call init function to initialize the game

newGameBtn.addEventListener("click", initGame);

function checkGameOver() {
  let answer = ""; // initially no one win so it store nothing.
  // newGameBtn.classList.add("active");

    // all 3 boxes should be  empty  sand exactly same in value
    // win-positions-
    // [0, 1, 2],
    // [3, 4, 5],
    // [6, 7, 8],
    // [0, 3, 6],
    // [1, 4, 7],
    // [2, 5, 8],
    // [0, 4, 8],
    // [2, 4, 6]

    //position = [0,1,2] and so on all position are fetched out from grid and index in position[0],position[1],... show the value inside position array of win-position array.
    winningPositions.forEach((position) => {
   
    if((gameGrid[position[0]]==="X" && gameGrid[position[1]]==="X" && gameGrid[position[2]]==="X" && gameGrid[position[3]]==="X" && gameGrid[position[4]]==="X" ) || (gameGrid[position[0]]==="O" && gameGrid[position[1]]==="O" && gameGrid[position[2]]==="O"  && gameGrid[position[3]]==="O" && gameGrid[position[4]]==="O"))
        
        {
      //check if winner is X

      if (gameGrid[position[0]] === "X") {
        answer = "X";
      } else {
        answer = "O";
      }


      //now disabling pointer events so that no one can click on box after move

boxes.forEach((box)=>{
  box.style.pointerEvents="none";
 
})

      //Now we know X/O is winner, set background color by win class

      boxes[position[0]].classList.add("win");
      boxes[position[1]].classList.add("win");
      boxes[position[2]].classList.add("win");
      boxes[position[3]].classList.add("win");
      boxes[position[4]].classList.add("win");

    }
  });



//it means we have winner if answer will not be empty

if(answer!==""){
   
      gameInfo.innerText=`Winner Player - ${answer}`;
      newGameBtn.classList.add("active");
      return;
}


//to check whether the game is tied 
 // if we reached here it means no one wins and all box had filled

 let fillCount=0;
gameGrid.forEach((box)=>{
  if(box!=""){
    fillCount++;
  }
});

//board is filled , game is tied

if(fillCount===25){
  gameInfo.innerText="Game Tied !";
  //enable new game button
  newGameBtn.classList.add("active");
}
 

}
