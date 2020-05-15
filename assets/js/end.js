const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");

username.addEventListener('keyup', () => {
    console.log(username.value);
    saveScoreBtn.disabled = !username.value;
    // If no username inputted btn will stay disabled, when username inputted btn becomes visable
})

saveingScore = e => {
    
}