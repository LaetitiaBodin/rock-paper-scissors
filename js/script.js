// Default values.
let currentPlayer;
let newPlayerScore = 0;
let newComputerScore = 0;
let playerChoice = ``;
let computerChoice = ``;
let playerName = document.getElementById('playerName');
let playerScore = document.getElementById('playerScore');
let player = document.getElementById('player');
let computerScore = document.getElementById('computerScore');
let computer = document.getElementById('computer');
let imgPlayer = document.getElementById('imgPlayer');
let imgComputer = document.getElementById('imgComputer');
let resultText = document.getElementById('result');
let controlButtons = document.getElementById('controlButtons');

// Items common to both player and computer.
// Player chooses one, computer will pick one randomly.
let choiceOptions = [
    {
        option: `ROCK`,
        img: `img/hand-rock-solid.svg`
    },
    {
        option: `PAPER`,
        img: `img/hand-paper-solid.svg`
    },
    {
        option: `SCISSORS`,
        img: `img/hand-scissors-solid.svg`
    }
];

// Function only triggered when the page loads.
// Player can choose a custom name. If left blank, default value is used.
function customize() {
    let playerInput = prompt(`Please enter a player name.`).toUpperCase();
    if (playerInput === ``) {
        playerName.innerHTML = `PLAYER`;
        currentPlayer = `PLAYER`;
    } else {
        playerName.innerHTML = playerInput;
        currentPlayer = playerInput;
    }
}



// Player chooses one option.
function playerPick(arg) {
    playerChoice = choiceOptions[arg].option;
    imgPlayer.innerHTML = `<img src="${choiceOptions[arg].img}" class="w-50 mx-auto">`;
}


// Player confirms his choice ('click').
// Computer makes its choice ('randomOption').
// The choices are compared, a winner is declared.
function go() {

    // Computer's choice.
    let randomOption = Math.floor(Math.random() * choiceOptions.length);
    computerChoice = choiceOptions[randomOption].option;
    computer.innerHTML = `<p class="btn btn-light border border-secondary mx-auto">${computerChoice}</p>`;
    imgComputer.innerHTML = `<img src="${choiceOptions[randomOption].img}" class="w-50 mx-auto">`;

    // Choices comparisons.
    if (playerChoice === ``) {
        player.innerHTML = `<p class="btn btn-light border border-secondary mx-auto">FORFEIT</p>`;
        resultText.innerHTML = `${currentPlayer} loses by forfeit!`;
        resultText.className = "bg-danger py-5 h2 my-5";
    } else {
        player.innerHTML = `<p class="btn btn-light border border-secondary mx-auto">${playerChoice}</p>`;
        if (playerChoice == computerChoice) {
            resultText.innerHTML = `It's a TIE!`;
            document.getElementById('result').className = "bg-warning py-5 h2 my-5";
        } else if (playerChoice == `ROCK` && computerChoice == `PAPER` ||
            playerChoice == `PAPER` && computerChoice == `SCISSORS` ||
            playerChoice == `SCISSORS` && computerChoice == `ROCK`) {
            resultText.innerHTML = `COMPUTER wins!`;
            resultText.className = "bg-danger py-5 h2 my-5";
        } else if (playerChoice == `ROCK` && computerChoice == `SCISSORS` ||
            playerChoice == `PAPER` && computerChoice == `ROCK` ||
            playerChoice == `SCISSORS` && computerChoice == `PAPER`) {
            resultText.innerHTML = `${currentPlayer} wins!`;
            resultText.className = "bg-success py-5 h2 my-5";
        }
    }

    // Updating the scores.
    if (playerChoice === ``) {
        newComputerScore += 1;
        newPlayerScore += 0;
    } else if (playerChoice == computerChoice) {
        newComputerScore += 1;
        newPlayerScore += 1;
    } else if (playerChoice == `ROCK` && computerChoice == `PAPER` ||
        playerChoice == `PAPER` && computerChoice == `SCISSORS` ||
        playerChoice == `SCISSORS` && computerChoice == `ROCK`) {
        newComputerScore += 1;
        newPlayerScore += 0;
    } else if (playerChoice == `ROCK` && computerChoice == `SCISSORS` ||
        playerChoice == `PAPER` && computerChoice == `ROCK` ||
        playerChoice == `SCISSORS` && computerChoice == `PAPER`) {
        newComputerScore += 0;
        newPlayerScore += 1;
    }

    // Making the scores visible on the page.
    computerScore.innerHTML = newComputerScore;
    playerScore.innerHTML = newPlayerScore;

    // Removing the "GO!" button / Adding the "NEW ROUND!" button.
    controlButtons.innerHTML = `<button id="newRound" onclick="newRound();" class="h1 btn btn-light shadow-none">NEW ROUND</button>`;
}

// Setting a new round.
function newRound() {

    // Playing area is reset, the scores are kept.
    player.innerHTML =
        `<button class="px-4 btn btn-light border border-secondary" onclick=playerPick(0);>ROCK</button>
        <button class="px-4 btn btn-light border border-secondary" onclick=playerPick(1);>PAPER</button>
        <button class="px-2 btn btn-light border border-secondary" onclick=playerPick(2);>SCISSORS</button>`;
    computer.innerHTML = `<p class="h3">&nbsp;</p>`;
    computerChoice = ``;
    playerChoice = ``;
    imgPlayer.innerHTML = ``;
    imgComputer.innerHTML = ``;
    resultText.innerHTML = ``;
    resultText.className = "py-5 my-5 h2";

    // Removing the "NEW ROUND!" button / Adding the "GO!" button .
    controlButtons.innerHTML =
        `<button id="go" onclick="go();" class="h1 btn btn-light shadow-none">GO!</button>`;
}
