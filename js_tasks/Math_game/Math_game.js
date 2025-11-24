// Данные вопросов
const levelBeginner = [
    { level: 'beginner', question: '5 + 3', answer: '8' },
    { level: 'beginner', question: '12 - 4', answer: '8' },
    { level: 'beginner', question: '6 * 7', answer: '42' },
    { level: 'beginner', question: '20 / 5', answer: '4' },
    { level: 'beginner', question: '9 + 9', answer: '18' },
    { level: 'beginner', question: '15 - 7', answer: '8' },
    { level: 'beginner', question: '8 * 8', answer: '64' },
    { level: 'beginner', question: '45 / 9', answer: '5' },
    { level: 'beginner', question: '100 - 35', answer: '65' },
    { level: 'beginner', question: '3 * 11', answer: '33' }
];

const levelIntermediate = [
    { level: 'intermediate', question: '10 > 5', answer: 'true' },
    { level: 'intermediate', question: '5 + 5 == 10', answer: 'true' },
    { level: 'intermediate', question: '12 < 8', answer: 'false' },
    { level: 'intermediate', question: '3 * 4 >= 12', answer: 'true' },
    { level: 'intermediate', question: '15 != 15', answer: 'false' },
    { level: 'intermediate', question: '20 / 2 < 9', answer: 'false' },
    { level: 'intermediate', question: '7 + 3 == 11', answer: 'false' },
    { level: 'intermediate', question: '100 >= 99', answer: 'true' },
    { level: 'intermediate', question: '6 * 2 != 10', answer: 'true' },
    { level: 'intermediate', question: '8 - 2 <= 5', answer: 'false' }
];

const levelAdvanced = [
    { level: 'advanced', question: 'true && false', answer: 'false' },
    { level: 'advanced', question: 'true || false', answer: 'true' },
    { level: 'advanced', question: '!true', answer: 'false' },
    { level: 'advanced', question: '0b101 (bin -> dec)', answer: '5' },
    { level: 'advanced', question: '0b111 (bin -> dec)', answer: '7' },
    { level: 'advanced', question: '0b1000 (bin -> dec)', answer: '8' },
    { level: 'advanced', question: '0b10 + 0b10 (в dec)', answer: '4' },
    { level: 'advanced', question: '0b11 + 0b1 (в dec)', answer: '4' },
    { level: 'advanced', question: '(5 > 2) && (1 == 1)', answer: 'true' },
    { level: 'advanced', question: '!(10 < 5)', answer: 'true' }
];

// Элементы DOM
const levelLabel = document.querySelector("#level");
const questionEl = document.querySelector("#question");
const answerInput = document.querySelector("#answer");
const resultMessage = document.querySelector("#result-message");
const correctCountEl = document.querySelector("#correct-count");
const incorrectCountEl = document.querySelector("#incorrect-count");
const gameArea = document.querySelector("#game-area");
const levelTransition = document.querySelector("#level-transition");
const transitionTitle = document.querySelector("#transition-title");
const transitionMsg = document.querySelector("#transition-msg");
const nextLevelBtn = document.querySelector("#nextLevelBtn");
const restartBtn = document.querySelector("#restartBtn");
const exitBtn = document.querySelector("#exitBtn");
const form = document.querySelector("#my-form");

// Состояние игры
let currentLevelIndex = 0; // 0: Beginner, 1: Intermediate, 2: Advanced
let currentQuestions = [];
let questionIndex = 0;
let correctAnswers = 0;
let incorrectAnswers = 0;

// Функция перемешивания массива (алгоритм Фишера-Йетса)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Инициализация уровня
function startLevel(levelIndex) {
    currentLevelIndex = levelIndex;
    questionIndex = 0;
    correctAnswers = 0;
    incorrectAnswers = 0;
    
    // Сброс UI
    updateScoreBoard();
    resultMessage.textContent = "";
    resultMessage.className = "result-message";
    answerInput.value = "";
    gameArea.classList.remove("hidden");
    levelTransition.classList.add("hidden");

    // Выбор массива вопросов
    let sourceArray = [];
    if (levelIndex === 0) sourceArray = [...levelBeginner];
    else if (levelIndex === 1) sourceArray = [...levelIntermediate];
    else if (levelIndex === 2) sourceArray = [...levelAdvanced];

    // Перемешивание вопросов для уникальности
    currentQuestions = shuffleArray(sourceArray);
    
    showQuestion();
}

function showQuestion() {
    if (questionIndex < currentQuestions.length) {
        const q = currentQuestions[questionIndex];
        levelLabel.textContent = `Level: ${q.level}`;
        questionEl.textContent = q.question;
    } else {
        endLevel();
    }
}

function updateScoreBoard() {
    correctCountEl.textContent = correctAnswers;
    incorrectCountEl.textContent = incorrectAnswers;
}

function handleAnswer(e) {
    e.preventDefault(); // Предотвращаем перезагрузку страницы
    
    const userAnswer = answerInput.value.trim().toLowerCase();
    const correctAnswer = currentQuestions[questionIndex].answer.toLowerCase();
    
    if (userAnswer === correctAnswer) {
        correctAnswers++;
        resultMessage.textContent = "Correct!";
        resultMessage.style.color = "green";
    } else {
        incorrectAnswers++;
        resultMessage.textContent = `Wrong! Answer was: ${currentQuestions[questionIndex].answer}`;
        resultMessage.style.color = "red";
    }

    updateScoreBoard();
    answerInput.value = "";
    questionIndex++;

    // Небольшая задержка перед следующим вопросом
    setTimeout(() => {
        resultMessage.textContent = "";
        showQuestion();
    }, 1000);
}

function endLevel() {
    gameArea.classList.add("hidden");
    levelTransition.classList.remove("hidden");
    
    const totalQuestions = currentQuestions.length;
    const percentage = (correctAnswers / totalQuestions) * 100;
    
    transitionMsg.textContent = `You got ${correctAnswers} out of ${totalQuestions} correct (${percentage}%).`;

    if (percentage >= 80) {
        if (currentLevelIndex < 2) {
            // Успешное прохождение, есть следующий уровень
            transitionTitle.textContent = "Level Complete!";
            nextLevelBtn.style.display = "block";
            restartBtn.style.display = "none";
            exitBtn.style.display = "block";
            
            // Настройка кнопки перехода
            nextLevelBtn.onclick = () => startLevel(currentLevelIndex + 1);
        } else {
            // Победа в игре
            transitionTitle.textContent = "Congratulations!";
            transitionMsg.textContent += " You have completed all levels!";
            nextLevelBtn.style.display = "none";
            restartBtn.style.display = "block";
            restartBtn.textContent = "Play Again";
            exitBtn.style.display = "block";
        }
    } else {
        // Провал уровня
        transitionTitle.textContent = "Level Failed";
        transitionMsg.textContent += " You need 80% to proceed.";
        nextLevelBtn.style.display = "none";
        restartBtn.style.display = "block";
        restartBtn.textContent = "Restart Level";
        exitBtn.style.display = "block";
        
        // Кнопка рестарта запускает тот же уровень
        restartBtn.onclick = () => startLevel(currentLevelIndex);
    }
}

// Обработчики событий
form.addEventListener("submit", handleAnswer);

restartBtn.addEventListener("click", () => startLevel(0)); // Полный сброс при победе

exitBtn.addEventListener("click", () => {
    document.body.innerHTML = '<div class="game-card"><h1>Game Over</h1><p>Thanks for playing!</p><button onclick="location.reload()">Restart</button></div>';
});

// Запуск игры
startLevel(0);
