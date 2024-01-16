var scoresList = document.querySelector("#highscores");
var clearScoresBtn = document.querySelector("#clear");
var scores = JSON.parse(localStorage.getItem("highScores"));

// Displays the stored scores in the local storage
if (scores != null) {
  for (let i = 0; i < scores.length; i++) {
    var scoresItem = document.createElement('li');
    scoresItem.textContent = scores[i][0] + "  " + scores[i][1];
    scoresList.appendChild(scoresItem);
  }
}

// Adds click event listener to the Clear HighScore button
clearScoresBtn.addEventListener('click', emptyStorage);

// Clears local storage and the screen
function emptyStorage() {
  localStorage.clear();
  scoresList.style.display = "none";
}