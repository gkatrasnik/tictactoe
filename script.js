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

    const checkWin = (currentPlayer) => {
        const winArraysCombinations = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6],
        ];
    
        return winArraysCombinations.some((combination) => {
          return combination.every((index) => {
            return boardArray[index].includes(currentPlayer.mark);
          });
        });
      };
    
      const isDraw = (playerOne, playerTwo) => {
        return boardArray.every((cell) => {
          return cell.includes(playerOne) || cell.includes(playerTwo);
        });
      };


      const reset = () => {
        boardArray = ["", "", "", "", "", "", "", "", ""];
      }

    return {
        cells,
        render,
        getBoard,
        setBoard,
        checkWin,
        isDraw,
        reset
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
        }
    }

    const resetGame = () => {
        playerOneName.value = "";
        playerTwoName.value = "";
        window.location.reload();
    }

    

    //add event listeners to gameboard divs
    for (let i=0; i<cell.length; i++) {
        cell[i].addEventListener("click", function(event) {  
            if (event.target.textContent === "") {
                currentPlayer.playTurn(event, currentPlayer.mark);
                
                if (boardObject.checkWin(currentPlayer)) {
                    gameText.textContent = `${currentPlayer.name} is a winner!`;
                    boardObject.reset();
                    boardObject.render();
                } else if (boardObject.isDraw(player1.mark, player2.mark)) {
                    gameText.textContent = `It's a Tie..`;
                    boardObject.reset();
                    boardObject.render();
                } else {
                switchPlayer();
                gameText.textContent = `Player ${currentPlayer.mark}: ${currentPlayer.name}'s turn!`;
                }
            }
        })
    }



    
    //reset game button
    resetButton.addEventListener("click", () => {        
        resetGame();
    })

    //submit player names, start game
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