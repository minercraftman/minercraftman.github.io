document.addEventListener('DOMContentLoaded', function () {
    const words = [
        "GOLDENDOODLE", "MINECRAFT", "STEELBLUE", "GIANTSWORD",
        "TOWERDEFENSE", "ZIMBABWE", "EASTEREGG", "AMBIDEXTROUS",
        "HANDYMAN", "QUICKSILVER", "JUMPINGJACKS"
    ];

    let currentWord = "";
    let guessedLetters = new Set();
    let wrongGuesses = 0;
    const maxGuesses = 8;
    let gameOver = false;

    const answerLabel = document.getElementById('AnswerLabel');
    const debugLabel = document.getElementById('debugLabel');
    const loseLabel = document.getElementById('LoseLabel');
    const clearButton = document.getElementById('ClearButton');
    const keyboardContainer = document.getElementById('Keyboard');

    function initGame() {
        currentWord = words[Math.floor(Math.random() * words.length)];
        guessedLetters.clear();
        wrongGuesses = 0;
        gameOver = false;

        loseLabel.innerText = "";
        debugLabel.innerText = `Guesses: 0/${maxGuesses}`;

        renderWord();
        renderKeyboard();

        clearButton.classList.remove('Triggered'); // Visual cue similar to existing app
    }

    function renderWord() {
        let display = "";
        let win = true;
        for (let char of currentWord) {
            if (guessedLetters.has(char)) {
                display += char + " ";
            } else {
                display += "_ ";
                win = false;
            }
        }
        answerLabel.innerText = display;

        if (win && !gameOver) {
            loseLabel.innerText = "YOU WIN";
            loseLabel.style.color = "green";
            gameOver = true;
            disableKeyboard();
            clearButton.classList.remove('Triggered');
        }
    }

    function renderKeyboard() {
        keyboardContainer.innerHTML = '';
        const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        for (let char of alphabet) {
            const btn = document.createElement('button');
            btn.innerText = char;
            btn.className = 'letter-btn';
            if (guessedLetters.has(char)) {
                btn.disabled = true;
                btn.classList.add('Triggered');
            }
            btn.onclick = () => handleGuess(char, btn);
            keyboardContainer.appendChild(btn);
        }
    }

    function handleGuess(char, btn) {
        if (gameOver || guessedLetters.has(char)) return;

        guessedLetters.add(char);
        btn.disabled = true;
        btn.classList.add('Triggered');

        if (!currentWord.includes(char)) {
            wrongGuesses++;
        }

        debugLabel.innerText = `Guesses: ${wrongGuesses}/${maxGuesses}`;
        renderWord();

        if (wrongGuesses >= maxGuesses) {
            loseLabel.innerText = "YOU LOSE";
            loseLabel.style.color = "red";
            gameOver = true;
            revealWord();
            disableKeyboard();
            clearButton.classList.remove('Triggered');
        }
    }

    function revealWord() {
        let display = "";
        for (let char of currentWord) {
            display += char + " ";
        }
        answerLabel.innerText = display;
    }

    function disableKeyboard() {
        const btns = keyboardContainer.querySelectorAll('button');
        btns.forEach(b => b.disabled = true);
    }

    if (clearButton) {
        clearButton.addEventListener('click', function (e) {
            e.preventDefault();
            initGame();
        });
    }

    const peekButton = document.getElementById('PeekButton');
    if (peekButton) {
        peekButton.addEventListener('click', function (e) {
            e.preventDefault();
            revealWord();
        });
    }

    // Start game on load
    initGame();
});
