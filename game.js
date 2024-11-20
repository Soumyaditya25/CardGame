const startButton = document.getElementById('start-btn');
const restartButton = document.getElementById('restart-btn');
const exitButton = document.getElementById('exit-btn');
const playerNameInput = document.getElementById('player-name');
const cardCountSelect = document.getElementById('card-count');
const playerDisplay = document.getElementById('player-display');
const playerScoreDisplay = document.getElementById('player-score');
const computerScoreDisplay = document.getElementById('computer-score');
const resultMessage = document.getElementById('result-message');
const playerInfoSection = document.getElementById('player-info');
const gameContainer = document.getElementById('game-container');
const playerCardsContainer = document.getElementById('player-cards');
const computerCardsContainer = document.getElementById('computer-cards');

let playerName = '';
let playerScore = 0;
let computerScore = 0;
let cardCount = 1;
let roundsPlayed = 0;

const suits = ['♠️', '♥️', '♦️', '♣️'];
const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];

// Start the game
startButton.addEventListener('click', () => {
    playerName = playerNameInput.value.trim();
    if (!playerName) {
        alert('Please enter your name!');
        return;
    }

    // Hide the input screen and show the game
    playerInfoSection.classList.add('hidden');
    gameContainer.classList.remove('hidden');

    // Move the game title to the top
    const gameHeader = document.getElementById('game-header');
    gameHeader.classList.add('top-position');  // Add class to move title

    cardCount = parseInt(cardCountSelect.value);
    resetGame();
    createCards();
});



// Restart the game
restartButton.addEventListener('click', () => {
    resetGame();
    createCards();
    resultMessage.textContent = '';
    restartButton.classList.add('hidden');
    exitButton.classList.add('hidden');
});

// Exit the game
exitButton.addEventListener('click', () => {
    window.location.reload(); // Reload the page to exit the game
});

// Reset game state
function resetGame() {
    playerScore = 0;
    computerScore = 0;
    roundsPlayed = 0;  // Reset rounds played
    playerScoreDisplay.textContent = `${playerName}'s Score: ${playerScore}`;
    computerScoreDisplay.textContent = computerScore;
    playerCardsContainer.innerHTML = '';
    computerCardsContainer.innerHTML = '';
    resultMessage.textContent = '';
}

// Create and display cards
function createCards() {
    for (let i = 0; i < cardCount; i++) {
        const playerCard = createCard();
        const computerCard = createCard();
        
        // Append the cards to their respective containers
        playerCardsContainer.appendChild(playerCard.card);
        computerCardsContainer.appendChild(computerCard.card);

        // When the card is clicked, play a round
        playerCard.card.addEventListener('click', () => playRound(playerCard, computerCard));
    }

    // Show the restart and exit buttons after all cards are created
    restartButton.classList.remove('hidden');
    exitButton.classList.remove('hidden');
}

// Create a card
function createCard() {
    const card = document.createElement('div');
    card.classList.add('card');
    const inner = document.createElement('div');
    inner.classList.add('inner');
    const front = document.createElement('div');
    front.classList.add('front');
    const back = document.createElement('div');
    back.classList.add('back');
    back.textContent = '?';

    const rank = ranks[Math.floor(Math.random() * ranks.length)];
    const suit = suits[Math.floor(Math.random() * suits.length)];
    
    front.innerHTML = `<div>${rank}</div><div>${suit}</div>`;
    if (suit === '♥️' || suit === '♦️') front.classList.add('red');

    inner.appendChild(front);
    inner.appendChild(back);
    card.appendChild(inner);

    return { card, rank, suit };
}

// Play a round
function playRound(playerCard, computerCard) {
    playerCard.card.classList.add('flipped');
    computerCard.card.classList.add('flipped');

    const playerValue = getCardValue(playerCard.rank);
    const computerValue = getCardValue(computerCard.rank);

    if (playerValue > computerValue) {
        playerScore++;
        playerScoreDisplay.textContent = `${playerName}'s Score: ${playerScore}`;
        resultMessage.textContent = 'You win this round!';
        resultMessage.style.color = "green";
    } else if (computerValue > playerValue) {
        computerScore++;
        computerScoreDisplay.textContent = computerScore;
        resultMessage.textContent = 'Computer wins this round!';
        resultMessage.style.color = "red";
    } else {
        resultMessage.textContent = 'It\'s a tie in this round!';
        resultMessage.style.color = "yellow";
    }

    roundsPlayed++;

    // Check if all rounds are completed
    if (roundsPlayed === cardCount) {
        setTimeout(showFinalResult, 1000); // Show final result after all rounds
    }
}

// Convert card rank to value for comparison
function getCardValue(rank) {
    if (['Jack', 'Queen', 'King'].includes(rank)) return 11 + ranks.indexOf(rank);
    if (rank === 'Ace') return 14;
    return parseInt(rank);
}

// Show the final result and display restart button
function showFinalResult() {
    if (playerScore > computerScore) {
        resultMessage.textContent = `${playerName} wins the game! Congratulations!🎉`;
        resultMessage.style.color = "green";
    } else if (computerScore > playerScore) {
        resultMessage.textContent = 'Computer wins! Better luck next time!😔';
        resultMessage.style.color = "red";
    } else {
        resultMessage.textContent = 'The game is a tie! Well played!🤐';
        resultMessage.style.color = "yellow";
    }

    // Hide result message and show restart and exit buttons after the game ends
    restartButton.classList.remove('hidden');
    exitButton.classList.remove('hidden');
}
