let firstDiv = document.querySelector('#container');

//Helper function to give multiple attributes to element
function setAttributes(el, attrs){
    for(var key in attrs){
        el.setAttribute(key, attrs[key]);
    }
}

//Creating a grid
for(var i = 1; i<=9; i++){
    let div1 = document.createElement('div');
    setAttributes(div1, {"id": i, "class": "cell"})
    firstDiv.appendChild(div1);
}


//Game functions
let statusDisplay = document.querySelector('.game-status');
let gameActive = true;

let currentPlayer = "X";
let currentPlayer1 = "Player1"

let gameState = ["", "", "", "","", "","", "",""];


//why this is function not a  simple varable  becoz it depend on the current  player we want it to be dyanmic
const winningMessage = () => alert(`Congratulations! ${currentPlayer1} wins`);
const drawMessage = () => alert(`Draw!`);

let currentPlayerTurn = () => `Its ${currentPlayer1}'s turn`;
statusDisplay.innerHTML = currentPlayerTurn();


function handelCellPlayed(clickedCell, clickedCellIndex){
    gameState[clickedCellIndex-1] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
    

}

function handlePlayerChange(){
    currentPlayer1 = currentPlayer1 ==="Player1" ? "Player2": "Player1";
    currentPlayer = currentPlayer === "X" ? "0": "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}

const winningCondition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [0, 4, 8],
]
function handleResultValidation(){
    let roundWon = false;
    //check fot each winning condition
    for(let i = 0; i<winningCondition.length; i++){
        let currentCondition = winningCondition[i];

        let a = gameState[currentCondition[0]];
        let b = gameState[currentCondition[1]];
        let c = gameState[currentCondition[2]];

        if(a === '' || b==='' || c===''){
            continue;
        }
        if(a === b && b === c){
            roundWon = true;
            break;  
      }   
    }
    if(roundWon){
        winningMessage();
        gameActive = false;
        return;
    }
    //Draw condition
    let roundDraw = !gameState.includes("");
    if(roundDraw){
        gameActive = false;
        drawMessage();
        return;
    }

    //Handle currentplayerTurn
    handlePlayerChange();
    

}

function handleCellClick(clickedCellEvent){
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute("id"));
    console.log(clickedCellIndex);

    if(gameState[clickedCellIndex-1]!== '' || !gameActive){
        return;
    }
    //else change the game state and display currentplayer in that cell
    handelCellPlayed(clickedCell, clickedCellIndex);
    //to check game is win or ended after each click
    handleResultValidation();


};

function handleRestartGame(){
    gameActive =true;
    currentPlayer = "X";
    currentPlayer1 = "Player1"
    gameState = ["", "", "", "","", "","", "",""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll(".cell").forEach(cell => (cell.innerHTML = ""));
};

document
.querySelectorAll('.cell')
.forEach(cell => {cell.addEventListener("click", handleCellClick)   
});

document.querySelector('.game-restart').addEventListener("click", handleRestartGame);