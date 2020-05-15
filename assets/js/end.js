const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalscore = document.getElementById("finalscore");
const mostRecentScore = localStorage.getItem("mostRecentScore");


const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
finalscore.innerText = mostRecentScore;

username.addEventListener('keyup', () => {
    console.log(username.value);
    saveScoreBtn.disabled = !username.value;
    // If no username inputted btn will stay disabled, when username inputted btn becomes visable
})

savingHighScore = e => {
    console.log("clicked the save button");
    e.preventDefault();

    const score = {
        score: mostRecentScore,
        name: username.value
    };
    console.log(score);
    highScores.push(score);
    console.log(highScores); 
}