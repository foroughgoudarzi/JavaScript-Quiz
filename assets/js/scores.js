var scoresList = document.querySelector("#highscores");
var clearScoresBtn = document.querySelector("#clear");
var scores = JSON.parse(localStorage.getItem("highScores"));

if (scores != null) {
  for (let i = 0; i < scores.length; i++) {
    var scoresItem = document.createElement('div');
    scoresItem.textContent = scores[i][0] + "  " + scores[i][1];
    scoresList.appendChild(scoresItem);
  }
}
clearScoresBtn.addEventListener('click', emptyStorage);

function emptyStorage() {
  localStorage.clear();
  scoresList.style.display = "none";
}