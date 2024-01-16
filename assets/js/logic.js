// Gets HTML elements
var startScreen = document.querySelector("#start-screen");
var startBtn = document.querySelector("#start");
var questionsElm = document.querySelector("#questions");
var questionTitle = document.querySelector("#question-title");
var questionChoices = document.querySelector("#choices");
var feedback = document.querySelector("#feedback");
var timeElm = document.querySelector("#time");
var endScreen = document.querySelector("#end-screen");
var score = document.querySelector("#final-score");
var submitBtn = document.querySelector("#submit");

// Creates audio variables
var correctAudio = new Audio('./assets/sfx/correct.wav');
var wrongAudio = new Audio('./assets/sfx/incorrect.wav');

var questionNumber = 0;       // Number of questions displayed
var secondsLeft = 100;        // Time left

// Creates answer buttons and adds them as the question title's children 
// and adds 'click' event listeners and attribute "value" to the buttons
var choicesBtn = [];

for (let i = 0; i < 4; i++) {
    choicesBtn[i] = document.createElement('button');
    questionChoices.appendChild(choicesBtn[i]);
    choicesBtn[i].addEventListener('click', checkAnswer);
    choicesBtn[i].setAttribute("value", i + 1);
}


// Adds 'click' event listener to start and submit buttons 
startBtn.addEventListener("click", startQuiz);
submitBtn.addEventListener("click", saveScore);

var highScores = [];
//localStorage.setItem("highScores", JSON.stringify(highScores));

// Called when start button is clicked 
function startQuiz() {
    // Hides the content of start screen
    startScreen.setAttribute("class", "hide");

    // Displays the questions and answer choices
    questionsElm.style.display = "block";

    // Shows one questions and answers
    showNextQuestion();

    // Starts and displays timer
    setTimer();
}

function checkAnswer() {
    // Finds the question index
    let result;
    var index = questions.findIndex(element => element[0] === questionTitle.textContent);
    if (questions[index][5] == this.getAttribute("value")) {
        result = "Correct!";
        correctAudio.play();
    } else {
        result = "Wrong!";
        wrongAudio.play();
        secondsLeft -= 10;
        timeElm.textContent = secondsLeft;
    }
    feedback.textContent = result;
    feedback.style.display = "block";

    questionNumber++;
    if (questionNumber < 5) {

        // Adds 1.5 sec delay before displaying next question
        setTimeout(() => {
            showNextQuestion();
            feedback.style.display = "none";
        }, 1500);
    }
}

function setTimer() {

    var timerInterval = setInterval(function () {
        secondsLeft--;
        timeElm.textContent = secondsLeft;

        // Stops the timer after last question or when timer is zero and shows the end screen
        if (secondsLeft === 0 || questionNumber > 4) {
            clearInterval(timerInterval);
            endQuiz();
        }
    }, 1000);

}

function showNextQuestion() {
    // Sets the text of questions and answers
    questionTitle.textContent = questions[questionNumber][0];
    for (let i = 0; i < 4; i++) {
        choicesBtn[i].textContent = questions[questionNumber][i + 1];
        choicesBtn[i].setAttribute("style", "width: 450px; text-align: left;");
    }
}

// Displays the score and end screen
function endQuiz() {
    questionsElm.style.display = "none";
    feedback.style.display = "none";
    endScreen.style.display = "block";
    score.textContent = secondsLeft;
}

// Stores the highest score of each user and their initials in the local storage
function saveScore() {
    var initials = document.querySelector("#initials").value;
    if (initials != "") {
        var oldScores = JSON.parse(localStorage.getItem("highScores"));
        if (oldScores != null) {
            var indexOfInitials = oldScores.findIndex(element => element[0] === initials);
            if (indexOfInitials > -1) {
                if (oldScores[indexOfInitials][1] < secondsLeft) {
                    oldScores[indexOfInitials][1] = secondsLeft;
                }
            } else {
                oldScores[oldScores.length] = [initials, secondsLeft];
            }

        } else {
            oldScores = [[initials, secondsLeft]];
        }

        localStorage.setItem("highScores", JSON.stringify(oldScores));
        window.location = "highscores.html";  // Goes to highscores screen

    } else {
        alert("Initials cannot be null.");
    }
}