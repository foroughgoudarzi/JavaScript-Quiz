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

var questionNumber = 0;
var secondsLeft = 100;

// Creates answer buttons and adds them as the question title' children 
// and adds 'click' event listeners and attributes "value" to the buttons
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

function startQuiz() {
    // Hides the content of start screen
    startScreen.setAttribute("class", "hide");

    // Displays the questions and answer choices
    questionsElm.style.display = "block";

    showNextQuestion();
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

        if (secondsLeft === 0 || questionNumber > 4) {
            // Stops the timer after last uestion or when timer is zero
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
    }
}

function endQuiz() {
    questionsElm.style.display = "none";
    feedback.style.display = "none";
    endScreen.style.display = "block";
    score.textContent = secondsLeft;
}

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

    } else {
        console.alert("Initials cannot be null.");
    }
}