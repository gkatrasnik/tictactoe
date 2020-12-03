//create players
const playerFactory = (name, mark) => {
    const playTurn = (event, currentPlayer) => {
        const id = boardObject.cells.indexOf(event.target);

        let newArray = boardObject.getBoard();
        newArray[id] = currentPlayer;
        boardObject.setBoard(newArray);
        boardObject.render();
    }
    
    return {
    name,
    mark,
    playTurn
    }
};


// game logic
const boardObject = (() => {

    

    let boardArray = ["", "", "", "", "", "", "", "", ""];
    const cells = Array.from(document.querySelectorAll(".cell"));

    const render = () => {
        for (i in boardArray) {
            cells[i].textContent = boardArray[i];
        }
        
    }

    const getBoard = () => {
        return boardArray;
    }

    const setBoard = (newArray) => {
        boardArray = newArray;
    }

    




    return {
        cells,
        render,
        getBoard,
        setBoard
    }

})();



//display game 
const displayControler = (() => {

    const playerOneName = document.querySelector("#playerx");
    const playerTwoName = document.querySelector("#playero");    
    const cell = document.getElementsByClassName("cell");
    const resetButton = document.getElementById("reset");
    const form = document.querySelector(".player-info");
    const formDiv = document.querySelector(".player-form");
    const gameText = document.querySelector(".gameText");
    const container = document.querySelector(".container");
    let player1;
    let player2;
    let currentPlayer ;

   const switchPlayer = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
        gameText.textContent = ("It's " + currentPlayer.name + "'s turn")
    }

   const init = () => {
        if (playerOneName.value != "" && playerTwoName.value != "") {
            player1 = playerFactory(playerOneName.value, "x");
            player2 = playerFactory(playerTwoName.value, "o");
            currentPlayer = player1;
            gameText.textContent = ("It's " + currentPlayer.name + "'s turn")
        }
    }

    const resetGame = () => {
        playerOneName.value = "";
        playerTwoName.value = "";
        window.location.reload();
    }

    for (let i=0; i<cell.length; i++) {
        cell[i].addEventListener("click", function(event) {  
            currentPlayer.playTurn(event, currentPlayer.mark);
            switchPlayer();
            
        })
    }

    
 
    resetButton.addEventListener("click", () => {        
        resetGame();
    })


   form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (playerOneName.value !== "" && playerTwoName.value !== "") {
        init();
        formDiv.classList.add("hidden");
        container.classList.remove("hidden");

    } else {
        window.location.reload();
        }
   });
        
   

   return {
       player1,
       player2,
       currentPlayer,
       init
   }
        
    

})();