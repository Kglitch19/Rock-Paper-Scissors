const choices = ["rock", "paper", "scissors"];
let winners = [];

function startGame() {
    // play the game until someone wins 5 times
    let imgs = document.querySelectorAll("img");
    imgs.forEach((img) => 
        img.addEventListener("click", () => {
            if(img.id) {
                playRound(img.id);
            }
        })
    );
}

function resetGame() {
    winners = [];
    document.querySelector(".playerScore").textContent = "Score: 0";
    document.querySelector(".computerScore").textContent = "Score: 0";
    document.querySelector(".ties").textContent = "Ties: 0";
    document.querySelector(".winner").textContent = "";
    document.querySelector(".playerChoice").textContent = "";
    document.querySelector(".computerChoice").textContent = "";
    document.querySelector(".reset").style.display = "none";
}

function playRound(playerSelection) {
    let wins = checkWins();
    if(wins >= 5) {
        return;
    }
    const computerSelection = computerChoice();
    const winner = checkWinner(playerSelection, computerSelection);
    winners.push(winner);
    tallyWins();
    displayRound(playerSelection, computerSelection, winner);
    wins = checkWins();
    if(wins == 5) {
        // display end results
        // change the button to visible
        // change the text to display winner
        displayEnd();
    }
}

function displayEnd() {
    let playerWins = winners.filter((item) => item == "Player").length;

    if(playerWins == 5) {
        document.querySelector(".winner").textContent = "You won 5 games, Congrats!!";
    } else {
        document.querySelector(".winner").textContent = "Sorry, the computer won 5 games";
    }

    document.querySelector(".reset").style.display = "flex";
}

function displayRound(playerChoice, computerChoice, winner) {
    document.querySelector(".playerChoice").textContent = `You chose:  
    ${playerChoice.charAt(0).toUpperCase() + playerChoice.slice(1)}`;

    document.querySelector(".computerChoice").textContent = `The computer chose:
    ${computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)}`;

    displayRoundWinner(winner);

}

function displayRoundWinner(winner) {
    if (winner == "Player") {
        document.querySelector(".winner").textContent = "You won the round!";
    } else if (winner == "Computer") {
        document.querySelector(".winner").textContent = "The computer won the round";
    } else {
        document.querySelector(".winner").textContent = "The round was a tie";
    }
}

function tallyWins() {
    const pWinCount = winners.filter((item) => item == "Player").length;
    const cWinCount = winners.filter((item) => item == "Computer").length;
    const ties = winners.filter((item) => item == "Tie").length;
    document.querySelector(".playerScore").textContent = `Score: ${pWinCount}`;
    document.querySelector(".computerScore").textContent = `Score: ${cWinCount}`;
    document.querySelector(".ties").textContent = `Ties: ${ties}`;
}

function computerChoice() {
    // todo - Update the DOM with the computer selection
    const choice = choices[Math.floor(Math.random()*choices.length)];
    document.querySelector(`.${choice}`).classList.add("active");
    setTimeout(() => {
        document.querySelector(`.${choice}`).classList.remove("active");
    }, 700)
    return choice;
}

function checkWins() {
    const pWinCount = winners.filter((item) => item == "Player").length;
    const cWinCount = winners.filter((item) => item == "Computer").length;
    return Math.max(pWinCount, cWinCount);
}

function checkWinner(choiceP, choiceC) {
    if (
        (choiceP === "rock" && choiceC === "scissors") || 
        (choiceP === "scissors" && choiceC === "paper") || 
        (choiceP === "paper" && choiceC === "rock")
        ) {
        return "Player";
    } else if (choiceP === choiceC) {
        return "Tie";
    } else {
        return "Computer";
    }
}

function setWins() {
    const pWinCount = winners.filter((item) => item == "Player").length;
    const cWinCount = winners.filter((item) => item == "Computer").length;
    const ties = winners.filter((item) => item == "Tie").length;
}

startGame();