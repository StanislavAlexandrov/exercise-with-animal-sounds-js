const quizData = [
    {
        questionAudio: 'src/sounds/cat.wav',
        options: ['Rabbit', 'Dog', 'Horse', 'Cat'],
        correctAnswer: 3,
    },
    {
        questionAudio: 'src/sounds/wolf.wav',
        options: ['Fish', 'Dog', 'Wolf', 'Tiger'],
        correctAnswer: 2,
    },
    {
        questionAudio: 'src/sounds/pig.wav',
        options: ['Lion', 'Bird', 'Monkey', 'Pig'],
        correctAnswer: 3,
    },
    {
        questionAudio: 'src/sounds/duck.wav',
        options: ['Fish', 'Duck', 'Giraffe', 'Kangaroo'],
        correctAnswer: 1,
    },
    {
        questionAudio: 'src/sounds/horse.wav',
        options: ['Elephant', 'Leopard', 'Snake', 'Horse'],
        correctAnswer: 3,
    },
    {
        questionAudio: 'src/sounds/elephant.wav',
        options: ['Fish', 'Elephant', 'Bear', 'Zebra'],
        correctAnswer: 1,
    },
    {
        questionAudio: 'src/sounds/fly.wav',
        options: ['Koala', 'Fly', 'Hippo', 'Penguin'],
        correctAnswer: 1,
    },
    {
        questionAudio: 'src/sounds/rooster.wav',
        options: ['Rooster', 'Whale', 'Lion', 'Gorilla'],
        correctAnswer: 0,
    },
    {
        questionAudio: 'src/sounds/frog.wav',
        options: ['Snake', 'Frog', 'Alligator', 'Parrot'],
        correctAnswer: 1,
    },
    {
        questionAudio: 'src/sounds/owl.wav',
        options: ['Dolphin', 'Monkey', 'Owl', 'Rhinoceros'],
        correctAnswer: 2,
    },
];

let currentQuestion = 0;
let mistakes = 0;
let gameIsRunning = true;
let audio;

const questionElement = document.getElementById('question');
const optionsElements = document.querySelectorAll('#options button');
const feedbackElement = document.getElementById('feedback');
const mistakesElement = document.getElementById('mistakes');
const winImageElement = document.getElementById('win-image');

// An array to hold the click listener functions for each button
let buttonListeners = [];

function startQuiz() {
    loadQuestion();
}

function loadQuestion() {
    // Create the Audio object but don't play it yet
    audio = new Audio(quizData[currentQuestion].questionAudio);

    // Add a listener to the PLAY button to start playing the sound when clicked
    document
        .getElementById('play-button')
        .addEventListener('click', function () {
            audio.play();
        });

    for (let i = 0; i < optionsElements.length; i++) {
        optionsElements[i].textContent = quizData[currentQuestion].options[i];

        // Remove the previous event listener, if it exists
        if (buttonListeners[i]) {
            optionsElements[i].removeEventListener('click', buttonListeners[i]);
        }

        // Create a new listener function and add it
        buttonListeners[i] = function () {
            if (gameIsRunning) {
                checkAnswer(i);
            }
        };
        optionsElements[i].addEventListener('click', buttonListeners[i]);
    }
}

function checkAnswer(answer) {
    audio.pause(); // Stop the sound
    if (answer === quizData[currentQuestion].correctAnswer) {
        anime({
            targets: optionsElements,
            scale: [1, 1.2, 1],
            duration: 800,
            easing: 'easeInOutQuad',
        });
        feedbackElement.style.color = 'green';

        feedbackElement.textContent = 'Correct!';
        currentQuestion++;
        if (currentQuestion >= quizData.length) {
            gameIsRunning = false;
            questionElement.style.display = 'none';
            optionsElements.forEach((element) => {
                element.style.display = 'none';
            });
            feedbackElement.textContent = 'JENYA WINS!';
            feedbackElement.style.fontSize = '24px';
            winImageElement.src =
                'https://images.pexels.com/photos/6250942/pexels-photo-6250942.jpeg'; // Set your own image URL
            winImageElement.style.display = 'block';
            anime({
                targets: '#win-image',
                translateX: 10,
                translateY: 10,
                loop: 16,
                direction: 'alternate',
                duration: 100,
                easing: 'easeInOutSine',
            });
            winImageElement.addEventListener('click', function () {
                resetQuiz();
                feedbackElement.textContent = '';
            });
        } else {
            loadQuestion();
        }
    } else {
        anime({
            targets: optionsElements[answer],
            translateX: [0, -10, 0, 10, 0],
            duration: 800,
            easing: 'easeInOutQuad',
        });
        feedbackElement.style.color = 'red';
        feedbackElement.textContent = 'INCORRECT';
        mistakes++;
        mistakesElement.textContent = mistakes;
        resetQuiz();
    }
}

function resetQuiz() {
    currentQuestion = 0;
    gameIsRunning = true;
    questionElement.style.display = 'block';
    optionsElements.forEach((element) => {
        element.style.display = 'block';
    });
    winImageElement.style.display = 'none';
    loadQuestion();
}

startQuiz();
