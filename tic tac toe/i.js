let player1=prompt("enter the name of player 1 who choses O:")
let player2=prompt("enter the name of player 2 who choses X:")
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let p = document.querySelector("#para");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; //playerX, playerO
let count = 0; //To Track Draw

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

let resetGame = () => {
  player1=prompt("enter the name of player 1 who choses 0:");
  player2=prompt("enter the name of player 2 who choses 1:");
  turnO = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
};

boxes.forEach((box) => { 
  p.innerText=`${player1} your chance to put O`;
  box.addEventListener("click", () => {
    if (turnO) {
      p.innerText="";
      p.innerText=`${player2} your chance to put X`;
      //playerO
      box.innerText = "O";
      turnO = false;
    } else {
      p.innerText="";
      p.innerText=`${player1} your chance to put O`;
      //playerX
      box.innerText = "X";
      turnO = true;
    }
    box.disabled = true;
    count++;

    let isWinner = checkWinner();

    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});

const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
    p.innerText="";
    p.innerText=`${player1} your chance to put O`;
  }
};

const showWinner = (winner) => {
  if(player1===null&&player2===null) msg.innerText = `YOU HAVE NOT ENTERED BOTH THE PLAYERS NAMES BUT THE WINNER IS ${winner}`;
  else if(player1===null) msg.innerText = `YOU HAVE NOT ENTERED PLAYER 1 NAME BUT THE WINNER IS ${winner}`;
  else if(player2===null) msg.innerText = `YOU HAVE NOT ENTERED PLAYER 2 NAME BUT THE WINNER IS ${winner}`;
  else if(winner==="X"){
    msg.innerText = `Congratulations, Winner is ${player2}`;
  }
  else if(winner==="O")
    msg.innerText = `Congratulations, Winner is ${player1}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
        return true;
      }
    }
  }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);