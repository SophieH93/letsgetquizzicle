const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalscore = document.getElementById("finalscore");
const mostRecentScore = localStorage.getItem("mostRecentScore");


const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

const max_high_scores = 5;

finalscore.innerText = mostRecentScore;

username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value;
    // If no username inputted btn will stay disabled, when username inputted btn becomes visable
})

savingHighScore = e => {
    console.log("clicked the save button");
    e.preventDefault();
    
const score = {
    score: Math.floor(Math.random() * 100),
    name: username.value
};

highScores.push(score);
highScores.sort((a, b) => b.score - a.score)
highScores.splice(5);

localStorage.setItem('highScores', JSON.stringify(highScores));
window.location.assign('/');

};